import 'dotenv/config';
import axios from 'axios';
import { readFileSync, writeFileSync } from 'fs';

const PLACES_KEY = process.env.GOOGLE_PLACES_API_KEY;
const LEADS_PATH = './data/leads.json';
const QUERIES_PATH = './data/queries.json';

const CATEGORIES = [
  'salons', 'barbers', 'boutiques', 'bakeries', 'cake makers',
  'auto repair', 'plumbers', 'electricians', 'gyms', 'guest houses',
  'photographers', 'caterers', 'tailors', 'car washes', 'tutoring centers'
];

const SOCIAL_DOMAINS = ['facebook.com', 'instagram.com', 'linktree.ee', 'wa.me', 'whatsapp.com', 'twitter.com', 'tiktok.com'];

function loadJSON(path) {
  try { return JSON.parse(readFileSync(path, 'utf8')); } catch { return []; }
}

function saveJSON(path, data) {
  writeFileSync(path, JSON.stringify(data, null, 2));
}

function slugify(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function isSocialOnly(url) {
  if (!url) return false;
  return SOCIAL_DOMAINS.some(d => url.includes(d));
}

function formatPhone(raw) {
  if (!raw) return null;
  let digits = raw.replace(/\D/g, '');
  if (digits.startsWith('0') && digits.length === 10) digits = '263' + digits.slice(1);
  if (!digits.startsWith('263')) return null;
  return digits;
}

async function textSearch(query) {
  const url = 'https://maps.googleapis.com/maps/api/place/textsearch/json';
  const res = await axios.get(url, { params: { query, key: PLACES_KEY } });
  return res.data.results || [];
}

async function placeDetails(placeId) {
  const url = 'https://maps.googleapis.com/maps/api/place/details/json';
  const fields = 'place_id,name,formatted_address,formatted_phone_number,international_phone_number,website,rating,user_ratings_total,reviews,opening_hours';
  const res = await axios.get(url, { params: { place_id: placeId, fields, key: PLACES_KEY } });
  return res.data.result || {};
}

export async function discover(area = 'Harare', maxCategories = 3) {
  if (!PLACES_KEY) throw new Error('GOOGLE_PLACES_API_KEY not set in .env');

  const leads = loadJSON(LEADS_PATH);
  const queries = loadJSON(QUERIES_PATH);
  const existingIds = new Set(leads.map(l => l.id));

  const searchedSet = new Set(queries.map(q => `${q.category}|${q.area}`));
  const todo = CATEGORIES
    .filter(cat => !searchedSet.has(`${cat}|${area}`))
    .slice(0, maxCategories);

  if (todo.length === 0) {
    console.log(`All categories already searched for ${area}.`);
    return { found: 0, filteredOut: 0, newLeads: 0 };
  }

  let totalFound = 0, totalFiltered = 0, newLeads = 0;

  for (const category of todo) {
    console.log(`\nSearching: ${category} in ${area}...`);
    const results = await textSearch(`${category} in ${area} Zimbabwe`);
    queries.push({ category, area, searched_at: new Date().toISOString() });

    for (const place of results) {
      if (existingIds.has(place.place_id)) continue;
      totalFound++;

      const details = await placeDetails(place.place_id);
      await new Promise(r => setTimeout(r, 200)); // gentle rate limit

      const hasWebsite = !!(details.website && !isSocialOnly(details.website));
      const rating = details.rating || 0;
      const reviewCount = details.user_ratings_total || 0;
      const phoneRaw = details.formatted_phone_number || details.international_phone_number || '';
      const phoneIntl = formatPhone(details.international_phone_number || details.formatted_phone_number || '');

      let status = 'new';
      let filterReason = '';

      if (hasWebsite) { status = 'filtered_out'; filterReason = 'has website'; }
      else if (rating < 4.0) { status = 'filtered_out'; filterReason = `rating too low (${rating})`; }
      else if (reviewCount < 3) { status = 'filtered_out'; filterReason = `too few reviews (${reviewCount})`; }
      else if (!phoneIntl) { status = 'filtered_out'; filterReason = 'no valid phone'; }

      if (status === 'filtered_out') totalFiltered++;
      else newLeads++;

      const lead = {
        id: place.place_id,
        name: details.name || place.name,
        category,
        area,
        address: details.formatted_address || '',
        phone_raw: phoneRaw,
        phone_intl: phoneIntl || '',
        wa_link: phoneIntl ? `https://wa.me/${phoneIntl}` : '',
        rating,
        review_count: reviewCount,
        has_website: hasWebsite,
        website_evidence: details.website || '',
        demo_path: '',
        live_url: '',
        message_drafted: '',
        status,
        do_not_contact: false,
        found_at: new Date().toISOString(),
        added_to_queue_at: '',
        notes: phoneIntl
          ? 'Click the link before sending — if it doesn\'t open a chat, this number isn\'t on WhatsApp; skip it.'
          : '',
        filter_reason: filterReason,
        reviews_raw: details.reviews || [],
        hours: details.opening_hours?.weekday_text || []
      };

      leads.push(lead);
      existingIds.add(place.place_id);
      console.log(`  ${status === 'filtered_out' ? '✗' : '✓'} ${lead.name} (${filterReason || 'passes filter'})`);
    }
  }

  saveJSON(LEADS_PATH, leads);
  saveJSON(QUERIES_PATH, queries);

  return { found: totalFound, filteredOut: totalFiltered, newLeads, categoriesSearched: todo };
}
