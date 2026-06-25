import { mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';

const CATEGORY_ACCENTS = {
  salons:    { gold: '#CFA24C', rose: '#B6677A', motif: 'scissors' },
  barbers:   { gold: '#CFA24C', rose: '#8B6F5E', motif: 'razor' },
  boutiques: { gold: '#C8A882', rose: '#B6677A', motif: 'hanger' },
  bakeries:  { gold: '#D4A853', rose: '#C47B5A', motif: 'wheat' },
  'cake makers': { gold: '#E8B89A', rose: '#B6677A', motif: 'cake' },
  'auto repair': { gold: '#CFA24C', rose: '#6B7B8D', motif: 'wrench' },
  plumbers:  { gold: '#4A90A4', rose: '#CFA24C', motif: 'pipe' },
  electricians: { gold: '#F5C842', rose: '#CFA24C', motif: 'bolt' },
  gyms:      { gold: '#CFA24C', rose: '#8B3A3A', motif: 'dumbbell' },
  'guest houses': { gold: '#CFA24C', rose: '#7A9E87', motif: 'key' },
  photographers: { gold: '#CFA24C', rose: '#B6677A', motif: 'aperture' },
  caterers:  { gold: '#CFA24C', rose: '#8B5E3C', motif: 'fork' },
  tailors:   { gold: '#CFA24C', rose: '#B6677A', motif: 'needle' },
  'car washes': { gold: '#4A90D9', rose: '#CFA24C', motif: 'water' },
  'tutoring centers': { gold: '#CFA24C', rose: '#5B8DB8', motif: 'book' },
};

const SVG_MOTIFS = {
  scissors: `<svg viewBox="0 0 100 20" xmlns="http://www.w3.org/2000/svg"><path d="M0,10 Q25,2 50,10 Q75,18 100,10" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.4"/><circle cx="20" cy="8" r="2" fill="currentColor" opacity="0.3"/><circle cx="80" cy="12" r="2" fill="currentColor" opacity="0.3"/></svg>`,
  wheat: `<svg viewBox="0 0 100 20" xmlns="http://www.w3.org/2000/svg"><path d="M10,15 Q30,5 50,10 Q70,15 90,5" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.4"/><ellipse cx="25" cy="8" rx="4" ry="2" fill="currentColor" opacity="0.2"/><ellipse cx="75" cy="12" rx="4" ry="2" fill="currentColor" opacity="0.2"/></svg>`,
  bolt: `<svg viewBox="0 0 100 20" xmlns="http://www.w3.org/2000/svg"><polyline points="15,2 35,10 25,10 45,18 65,10 55,10 75,2" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.4"/></svg>`,
  default: `<svg viewBox="0 0 100 20" xmlns="http://www.w3.org/2000/svg"><path d="M0,10 Q10,4 20,10 Q30,16 40,10 Q50,4 60,10 Q70,16 80,10 Q90,4 100,10" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.4"/></svg>`,
};

function getMotifSVG(motif) {
  return SVG_MOTIFS[motif] || SVG_MOTIFS.default;
}

function paraphraseReviews(reviews) {
  if (!reviews || reviews.length === 0) return [];
  return reviews.slice(0, 3).map(r => {
    const text = r.text || '';
    const words = text.split(' ');
    if (words.length < 6) return null;
    const themes = [];
    if (/friendly|welcom|warm|kind|profes/i.test(text)) themes.push('friendly and professional team');
    if (/clean|neat|tidy|fresh/i.test(text)) themes.push('clean, well-kept space');
    if (/quick|fast|prompt|time/i.test(text)) themes.push('quick turnaround');
    if (/quality|great|excel|amaz|outstand/i.test(text)) themes.push('quality results');
    if (/price|afford|value|worth/i.test(text)) themes.push('good value');
    if (themes.length === 0) themes.push('excellent service');
    return `Customers frequently mention the ${themes[0]}.`;
  }).filter(Boolean);
}

export function buildDemo(lead) {
  const accents = CATEGORY_ACCENTS[lead.category] || { gold: '#CFA24C', rose: '#B6677A', motif: 'default' };
  const motifSVG = getMotifSVG(accents.motif);
  const highlights = paraphraseReviews(lead.reviews_raw);
  const slug = `${lead.id.slice(0, 8)}-${lead.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`;
  const dir = `./demos/${slug}`;
  mkdirSync(dir, { recursive: true });

  const hoursHTML = lead.hours?.length
    ? `<ul class="hours-list">${lead.hours.map(h => `<li>${h}</li>`).join('')}</ul>`
    : '<p>Call us for hours</p>';

  const highlightsHTML = highlights.length
    ? highlights.map(h => `<div class="highlight-card"><span class="quote-mark">"</span><p>${h}</p></div>`).join('')
    : '';

  const stars = '★'.repeat(Math.round(lead.rating)) + '☆'.repeat(5 - Math.round(lead.rating));

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${lead.name} — Free Concept</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,700;1,9..144,400&family=Sora:wght@300;400;600&display=swap" rel="stylesheet">
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --espresso: #241712;
    --espresso-light: #362420;
    --gold: ${accents.gold};
    --rose: ${accents.rose};
    --cream: #F5EDD9;
    --text: #E8DCC8;
  }
  body { background: var(--espresso); color: var(--text); font-family: 'Sora', sans-serif; font-weight: 300; line-height: 1.6; }
  .banner { background: var(--gold); color: var(--espresso); text-align: center; padding: 10px 20px; font-family: 'Sora', sans-serif; font-weight: 600; font-size: 0.85rem; letter-spacing: 0.12em; text-transform: uppercase; }
  header { background: var(--espresso-light); padding: 60px 24px 40px; text-align: center; position: relative; overflow: hidden; }
  .header-pattern { position: absolute; inset: 0; opacity: 0.06; background: repeating-linear-gradient(45deg, ${accents.gold} 0px, ${accents.gold} 1px, transparent 1px, transparent 20px); }
  header h1 { font-family: 'Fraunces', serif; font-size: clamp(2rem, 6vw, 3.5rem); font-weight: 700; color: var(--cream); position: relative; }
  header .category-tag { display: inline-block; margin-top: 10px; padding: 4px 16px; border: 1px solid var(--gold); color: var(--gold); font-size: 0.75rem; letter-spacing: 0.2em; text-transform: uppercase; border-radius: 20px; position: relative; }
  .divider { color: var(--gold); padding: 8px 0; text-align: center; }
  .divider svg { width: 100%; max-width: 400px; height: 20px; }
  section { padding: 48px 24px; max-width: 680px; margin: 0 auto; }
  .rating-row { display: flex; align-items: center; gap: 12px; justify-content: center; margin: 24px 0; }
  .stars { color: var(--gold); font-size: 1.3rem; letter-spacing: 2px; }
  .rating-num { font-family: 'Fraunces', serif; font-size: 1.8rem; color: var(--cream); }
  .review-count { color: var(--text); font-size: 0.85rem; opacity: 0.7; }
  .info-grid { display: grid; gap: 12px; margin: 32px 0; }
  .info-item { display: flex; gap: 12px; align-items: flex-start; padding: 14px 18px; background: var(--espresso-light); border-radius: 8px; border-left: 3px solid var(--gold); }
  .info-icon { font-size: 1.1rem; flex-shrink: 0; margin-top: 2px; }
  .info-text { font-size: 0.9rem; }
  .highlights { margin: 32px 0; }
  .highlights h2 { font-family: 'Fraunces', serif; font-size: 1.4rem; color: var(--cream); margin-bottom: 20px; }
  .highlight-card { background: var(--espresso-light); border-radius: 8px; padding: 20px; margin-bottom: 12px; border-top: 2px solid var(--rose); position: relative; }
  .quote-mark { font-family: 'Fraunces', serif; font-size: 2.5rem; color: var(--rose); opacity: 0.5; position: absolute; top: 8px; left: 14px; line-height: 1; }
  .highlight-card p { padding-left: 24px; font-style: italic; font-size: 0.95rem; color: var(--text); }
  .hours-section h2 { font-family: 'Fraunces', serif; font-size: 1.4rem; color: var(--cream); margin-bottom: 16px; }
  .hours-list { list-style: none; display: grid; gap: 6px; }
  .hours-list li { font-size: 0.88rem; padding: 8px 14px; background: var(--espresso-light); border-radius: 6px; }
  .cta-section { text-align: center; padding: 48px 24px 64px; background: var(--espresso-light); }
  .cta-section h2 { font-family: 'Fraunces', serif; font-size: 1.6rem; color: var(--cream); margin-bottom: 8px; }
  .cta-section p { color: var(--text); opacity: 0.8; margin-bottom: 28px; font-size: 0.95rem; }
  .btn { display: inline-flex; align-items: center; gap: 10px; padding: 14px 32px; border-radius: 50px; font-family: 'Sora', sans-serif; font-weight: 600; font-size: 0.95rem; text-decoration: none; transition: transform 0.15s, box-shadow 0.15s; }
  .btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.3); }
  .btn-primary { background: var(--gold); color: var(--espresso); }
  .btn-secondary { background: transparent; border: 2px solid var(--rose); color: var(--rose); margin-left: 12px; }
  footer { text-align: center; padding: 24px; font-size: 0.78rem; opacity: 0.4; border-top: 1px solid rgba(255,255,255,0.06); }
  @media (max-width: 480px) { .btn-secondary { margin-left: 0; margin-top: 12px; } }
</style>
</head>
<body>

<div class="banner">FREE CONCEPT — not yet live &nbsp;|&nbsp; Built to show what your online presence could look like</div>

<header>
  <div class="header-pattern"></div>
  <h1>${lead.name}</h1>
  <div class="category-tag">${lead.category}</div>
</header>

<div class="divider">${motifSVG}</div>

<section>
  <div class="rating-row">
    <span class="stars">${stars}</span>
    <span class="rating-num">${lead.rating}</span>
    <span class="review-count">(${lead.review_count} reviews)</span>
  </div>

  <div class="info-grid">
    <div class="info-item">
      <span class="info-icon">📍</span>
      <span class="info-text">${lead.address}</span>
    </div>
    ${lead.phone_raw ? `<div class="info-item">
      <span class="info-icon">📞</span>
      <span class="info-text">${lead.phone_raw}</span>
    </div>` : ''}
  </div>

  ${highlightsHTML ? `<div class="highlights">
    <h2>What clients are saying</h2>
    ${highlightsHTML}
  </div>` : ''}

  <div class="hours-section">
    <h2>Hours</h2>
    ${hoursHTML}
  </div>
</section>

<div class="divider" style="color:var(--rose)">${motifSVG}</div>

<div class="cta-section">
  <h2>Ready to go live?</h2>
  <p>This is a free concept. Your real site — fully live and yours — for $50.</p>
  <a href="${lead.wa_link}" class="btn btn-primary" target="_blank">
    💬 Chat on WhatsApp
  </a>
  <a href="tel:${lead.phone_raw}" class="btn btn-secondary">
    📞 Call us
  </a>
</div>

<footer>
  Free concept demo · ${lead.name} · ${lead.area}, Zimbabwe
</footer>

</body>
</html>`;

  const demoPath = `${dir}/index.html`;
  writeFileSync(demoPath, html);
  return { slug, demoPath };
}
