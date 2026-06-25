import { readFileSync, writeFileSync } from 'fs';

const LEADS_PATH = './data/leads.json';

function loadJSON(path) {
  try { return JSON.parse(readFileSync(path, 'utf8')); } catch { return []; }
}

function saveJSON(path, data) {
  writeFileSync(path, JSON.stringify(data, null, 2));
}

function formatPhone(raw) {
  if (!raw) return null;
  let digits = raw.replace(/\D/g, '');
  if (digits.startsWith('0') && digits.length === 10) digits = '263' + digits.slice(1);
  if (!digits.startsWith('263') && !digits.startsWith('1') && digits.length < 10) return null;
  if (!digits.startsWith('263')) digits = '263' + digits;
  return digits;
}

export function addLead(name, category, area, phone, address = '', rating = 0, reviewCount = 0, notes = '') {
  const leads = loadJSON(LEADS_PATH);
  const existingIds = new Set(leads.map(l => l.id));

  const id = `manual-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  if (existingIds.has(id)) return { error: 'Duplicate ID (rare), try again' };

  const phoneIntl = formatPhone(phone);
  if (!phoneIntl) return { error: `Invalid phone: ${phone}. Need Zimbabwean number (e.g. 0712345678 or +263712345678)` };

  const lead = {
    id,
    name,
    category: category.toLowerCase(),
    area: area.charAt(0).toUpperCase() + area.slice(1),
    address: address || `${name}, ${area}, Zimbabwe`,
    phone_raw: phone,
    phone_intl: phoneIntl,
    wa_link: `https://wa.me/${phoneIntl}`,
    rating: Math.max(0, Math.min(5, rating || 0)),
    review_count: Math.max(0, reviewCount || 0),
    has_website: false,
    website_evidence: '',
    demo_path: '',
    live_url: '',
    message_drafted: '',
    status: 'new',
    do_not_contact: false,
    found_at: new Date().toISOString(),
    added_to_queue_at: '',
    notes: notes || 'Click wa.me link before sending — if it doesn\'t open a chat, number isn\'t on WhatsApp; skip it.',
    reviews_raw: [],
    hours: []
  };

  leads.push(lead);
  saveJSON(LEADS_PATH, leads);

  return {
    success: true,
    lead,
    message: `✓ Added ${name} to leads. Status: new. Next: build demo, deploy, queue.`
  };
}
