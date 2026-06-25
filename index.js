import 'dotenv/config';
import { readFileSync, writeFileSync } from 'fs';
import { discover } from './scripts/discover.js';
import { buildDemo } from './scripts/buildDemo.js';
import { deployDemo } from './scripts/deploy.js';
import { draftMessage } from './scripts/draftMessage.js';
import { generateReport } from './scripts/generateReport.js';

const LEADS_PATH = './data/leads.json';

function loadJSON(path) {
  try { return JSON.parse(readFileSync(path, 'utf8')); } catch { return []; }
}
function saveJSON(path, data) {
  writeFileSync(path, JSON.stringify(data, null, 2));
}

const [,, command, ...args] = process.argv;

async function findMore(area = 'Harare', maxCategories = 3) {
  console.log(`\n🔍 Discovering leads in ${area}...\n`);
  const stats = await discover(area, maxCategories);

  console.log(`\n🏗️  Building demos for new leads...`);
  let leads = loadJSON(LEADS_PATH);
  let builtCount = 0, deployedCount = 0;

  for (const lead of leads) {
    if (lead.status !== 'new' || lead.do_not_contact) continue;

    try {
      const { slug, demoPath } = buildDemo(lead);
      lead.demo_path = demoPath;
      lead.status = 'demo_built';
      builtCount++;

      console.log(`  🚀 Deploying ${lead.name}...`);
      const liveUrl = await deployDemo(lead, demoPath);
      lead.live_url = liveUrl;
      lead.status = 'deployed';
      deployedCount++;
      console.log(`     ✓ ${liveUrl}`);
    } catch (err) {
      console.error(`  ✗ Failed for ${lead.name}: ${err.message}`);
      lead.status = 'demo_built'; // keep partial progress
    }
  }

  saveJSON(LEADS_PATH, leads);

  console.log(`\n✍️  Drafting messages...`);
  leads = loadJSON(LEADS_PATH);
  let queuedCount = 0;

  for (const lead of leads) {
    if (lead.status !== 'deployed' || lead.do_not_contact) continue;
    lead.message_drafted = draftMessage(lead);
    lead.status = 'queued';
    lead.added_to_queue_at = new Date().toISOString();
    queuedCount++;
  }

  saveJSON(LEADS_PATH, leads);

  const report = generateReport();

  console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 Run summary
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Found:        ${stats.found} leads
  Filtered out: ${stats.filteredOut} (no website filter + quality bar)
  Demos built:  ${builtCount}
  Deployed:     ${deployedCount}
  Queue total:  ${report.count} ready to send
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Queue report: ${report.path}
  `);
}

async function showQueue() {
  const report = generateReport();
  console.log(`\n📤 Queue report regenerated: ${report.path}`);
  console.log(`   ${report.count} lead${report.count !== 1 ? 's' : ''} ready to send.\n`);
}

function optOut(businessName) {
  const leads = loadJSON(LEADS_PATH);
  const lead = leads.find(l => l.name.toLowerCase().includes(businessName.toLowerCase()));
  if (!lead) { console.log(`Lead not found: ${businessName}`); return; }
  lead.do_not_contact = true;
  lead.notes += ' [OPT-OUT]';
  saveJSON(LEADS_PATH, leads);
  console.log(`✓ ${lead.name} marked as do-not-contact.`);
}

switch (command) {
  case 'find':
    await findMore(args[0] || 'Harare', parseInt(args[1]) || 3);
    break;
  case 'queue':
    await showQueue();
    break;
  case 'optout':
    optOut(args.join(' '));
    break;
  default:
    console.log(`
Usage:
  node index.js find [area] [max-categories]   — discover + build + deploy + queue
  node index.js queue                           — regenerate queue report
  node index.js optout <business name>          — mark as do-not-contact
    `);
}
