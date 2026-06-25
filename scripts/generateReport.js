import { readFileSync, writeFileSync, mkdirSync } from 'fs';

const LEADS_PATH = './data/leads.json';
const REPORT_PATH = './reports/queue.html';

function loadJSON(path) {
  try { return JSON.parse(readFileSync(path, 'utf8')); } catch { return []; }
}

export function generateReport() {
  const leads = loadJSON(LEADS_PATH);
  const queued = leads.filter(l => l.status === 'queued' && !l.do_not_contact);

  const cards = queued.map((lead, i) => `
    <div class="card" id="card-${i}" data-id="${lead.id}">
      <div class="card-header">
        <div>
          <h2>${lead.name}</h2>
          <span class="tag">${lead.category}</span>
          <span class="tag tag-area">${lead.area}</span>
        </div>
        <div class="rating">
          <span class="stars">${'★'.repeat(Math.round(lead.rating))}${'☆'.repeat(5 - Math.round(lead.rating))}</span>
          <strong>${lead.rating}</strong>
          <small>(${lead.review_count})</small>
        </div>
      </div>

      <div class="card-body">
        <p class="address">📍 ${lead.address}</p>

        <div class="actions-row">
          <a href="${lead.wa_link}" class="btn btn-wa" target="_blank">💬 Open WhatsApp Chat</a>
          ${lead.live_url ? `<a href="${lead.live_url}" class="btn btn-demo" target="_blank">🌐 View Demo</a>` : ''}
        </div>

        <div class="message-box">
          <label>Your message (copy & paste into WhatsApp):</label>
          <textarea id="msg-${i}" readonly>${lead.message_drafted}</textarea>
          <button class="btn btn-copy" onclick="copyMsg(${i})">📋 Copy Message</button>
        </div>

        <div class="note">⚠️ ${lead.notes}</div>

        <div class="sent-row">
          <button class="btn btn-sent" id="sent-${i}" onclick="markSent('${lead.id}', ${i})">✓ Mark as Sent</button>
          <button class="btn btn-dnc" onclick="markDNC('${lead.id}', ${i})">🚫 Do Not Contact</button>
        </div>
      </div>
    </div>
  `).join('');

  mkdirSync('./reports', { recursive: true });

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Outreach Queue — ${queued.length} ready</title>
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: system-ui, sans-serif; background: #1a1a1a; color: #e0e0e0; padding: 24px; }
  h1 { font-size: 1.6rem; margin-bottom: 4px; }
  .subtitle { color: #888; margin-bottom: 32px; font-size: 0.9rem; }
  .card { background: #252525; border-radius: 12px; margin-bottom: 24px; overflow: hidden; border: 1px solid #333; transition: border-color 0.2s; }
  .card.sent { opacity: 0.5; border-color: #2a5c2a; }
  .card-header { display: flex; justify-content: space-between; align-items: flex-start; padding: 20px 24px 16px; border-bottom: 1px solid #333; }
  h2 { font-size: 1.2rem; color: #fff; margin-bottom: 6px; }
  .tag { display: inline-block; padding: 2px 10px; border-radius: 12px; font-size: 0.75rem; background: #333; color: #CFA24C; margin-right: 6px; text-transform: capitalize; }
  .tag-area { color: #B6677A; }
  .rating { text-align: right; }
  .stars { color: #CFA24C; font-size: 1rem; }
  .rating strong { font-size: 1.4rem; color: #fff; margin: 0 4px; }
  .rating small { color: #888; }
  .card-body { padding: 20px 24px 24px; }
  .address { color: #888; font-size: 0.85rem; margin-bottom: 16px; }
  .actions-row { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 20px; }
  .btn { display: inline-flex; align-items: center; gap: 6px; padding: 10px 18px; border-radius: 8px; font-size: 0.88rem; font-weight: 600; text-decoration: none; cursor: pointer; border: none; transition: opacity 0.15s; }
  .btn:hover { opacity: 0.85; }
  .btn-wa { background: #25D366; color: #000; }
  .btn-demo { background: #4A90D9; color: #fff; }
  .btn-copy { background: #CFA24C; color: #1a1a1a; margin-top: 8px; }
  .btn-sent { background: #2a5c2a; color: #7ec87e; }
  .btn-dnc { background: #5c2a2a; color: #c87e7e; }
  .message-box { margin-bottom: 16px; }
  .message-box label { display: block; font-size: 0.8rem; color: #888; margin-bottom: 6px; }
  textarea { width: 100%; height: 120px; background: #1a1a1a; border: 1px solid #444; border-radius: 8px; color: #e0e0e0; padding: 12px; font-size: 0.9rem; line-height: 1.5; resize: vertical; font-family: inherit; }
  .note { font-size: 0.8rem; color: #888; background: #1a1a1a; border-radius: 6px; padding: 10px 14px; margin-bottom: 16px; border-left: 3px solid #555; }
  .sent-row { display: flex; gap: 10px; }
  .copy-toast { position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%); background: #CFA24C; color: #1a1a1a; padding: 10px 24px; border-radius: 8px; font-weight: 600; font-size: 0.9rem; opacity: 0; transition: opacity 0.3s; pointer-events: none; }
  .copy-toast.show { opacity: 1; }
</style>
</head>
<body>
<h1>📤 Outreach Queue</h1>
<p class="subtitle">${queued.length} lead${queued.length !== 1 ? 's' : ''} ready to send · Generated ${new Date().toLocaleString()}</p>

${cards || '<p style="color:#888;text-align:center;padding:48px">No queued leads yet. Run "find me more" to get started.</p>'}

<div class="copy-toast" id="toast">Copied!</div>

<script>
  const sentIds = JSON.parse(localStorage.getItem('sentIds') || '[]');
  const dncIds = JSON.parse(localStorage.getItem('dncIds') || '[]');

  sentIds.forEach(id => {
    const card = document.querySelector('[data-id="' + id + '"]');
    if (card) { card.classList.add('sent'); const btn = card.querySelector('.btn-sent'); if(btn) btn.textContent = '✓ Sent'; }
  });

  function copyMsg(i) {
    const ta = document.getElementById('msg-' + i);
    navigator.clipboard.writeText(ta.value).then(() => {
      const toast = document.getElementById('toast');
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 2000);
    });
  }

  function markSent(id, i) {
    const ids = JSON.parse(localStorage.getItem('sentIds') || '[]');
    if (!ids.includes(id)) ids.push(id);
    localStorage.setItem('sentIds', JSON.stringify(ids));
    const card = document.getElementById('card-' + i);
    card.classList.add('sent');
    document.getElementById('sent-' + i).textContent = '✓ Sent';
  }

  function markDNC(id, i) {
    if (!confirm('Mark this business as Do Not Contact? This hides them permanently.')) return;
    const ids = JSON.parse(localStorage.getItem('dncIds') || '[]');
    if (!ids.includes(id)) ids.push(id);
    localStorage.setItem('dncIds', JSON.stringify(ids));
    document.getElementById('card-' + i).remove();
  }
</script>
</body>
</html>`;

  writeFileSync(REPORT_PATH, html);
  return { count: queued.length, path: REPORT_PATH };
}
