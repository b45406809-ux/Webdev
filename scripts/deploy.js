import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';

const LEADS_PATH = './data/leads.json';

function loadJSON(path) {
  try { return JSON.parse(readFileSync(path, 'utf8')); } catch { return []; }
}
function saveJSON(path, data) {
  writeFileSync(path, JSON.stringify(data, null, 2));
}

export async function deployDemo(lead, demoPath) {
  const token = process.env.CLOUDFLARE_API_TOKEN;
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  if (!token) throw new Error('CLOUDFLARE_API_TOKEN not set in .env');

  const projectName = `biz-${lead.id.slice(0, 12).toLowerCase()}`;
  const demoDir = demoPath.replace('/index.html', '');

  try {
    const result = execSync(
      `CLOUDFLARE_API_TOKEN=${token} npx wrangler pages deploy ${demoDir} --project-name=${projectName} --branch=main 2>&1`,
      { encoding: 'utf8', timeout: 60000 }
    );

    const urlMatch = result.match(/https:\/\/[^\s]+\.pages\.dev/);
    const liveUrl = urlMatch ? urlMatch[0] : null;

    if (!liveUrl) throw new Error(`Could not parse deployment URL from: ${result}`);
    return liveUrl;
  } catch (err) {
    console.error('Deploy failed:', err.message);
    throw err;
  }
}
