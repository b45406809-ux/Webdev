import { readFileSync, writeFileSync } from 'fs';
import { addLead } from './scripts/discover.js';
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

async function buildQueue() {
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
      lead.status = 'demo_built';
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
📊 Build & deploy summary
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Demos built:  ${builtCount}
  Deployed:     ${deployedCount}
  Added to queue: ${queuedCount}
  Total ready:  ${report.count}
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

function listNew() {
  const leads = loadJSON(LEADS_PATH);
  const newLeads = leads.filter(l => l.status === 'new' && !l.do_not_contact);
  if (newLeads.length === 0) { console.log('\nNo new leads waiting to build.\n'); return; }
  console.log(`\n${newLeads.length} new leads ready to build:\n`);
  newLeads.forEach((l, i) => {
    console.log(`${i+1}. ${l.name} (${l.category}) — ${l.rating}⭐ | ${l.phone_raw}`);
  });
  console.log('\nRun: node index.js build');
}

switch (command) {
  case 'add':
    if (args.length < 4) {
      console.log(`\nUsage: node index.js add <name> <category> <area> <phone> [address] [rating] [reviews]\n`);
      process.exit(1);
    }
    const result = addLead(args[0], args[1], args[2], args[3], args[4] || '', parseFloat(args[5]) || 0, parseInt(args[6]) || 0);
    console.log(`\n${result.success ? '✓' : '✗'} ${result.message || result.error}\n`);
    break;

  case 'list':
    listNew();
    break;

  case 'build':
    await buildQueue();
    break;

  case 'queue':
    await showQueue();
    break;

  case 'optout':
    optOut(args.join(' '));
    break;

  default:
    console.log(`
🏪 Local Business Outreach Pipeline

Workflow:
  1. node index.js add <name> <category> <area> <phone> [address] [rating] [reviews]
       → Add a lead manually (I'll search, you approve)
  2. node index.js list
       → See new leads waiting to build
  3. node index.js build
       → Generate demos, deploy to Cloudflare, draft WhatsApp messages
  4. node index.js queue
       → View/send from the queue report

Examples:
  node index.js add "Sunshine Salon" "salons" "Harare" "0712345678" "123 Main St" "4.5" "8"
  node index.js add "Mike's Barber" "barbers" "Bulawayo" "+263712999888"
  node index.js optout "Sunshine Salon"
    `);
}
