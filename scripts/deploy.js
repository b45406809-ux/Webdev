import { execSync } from 'child_process';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';

const GH_PAGES_BRANCH = 'gh-pages';
const BASE_URL = 'https://b45406809-ux.github.io/Webdev';

function run(cmd, opts = {}) {
  return execSync(cmd, { encoding: 'utf8', timeout: 60000, ...opts });
}

export async function deployDemo(lead, demoPath) {
  const slug = demoPath.replace('./demos/', '').replace('/index.html', '');
  const html = readFileSync(demoPath, 'utf8');
  const worktreePath = `/tmp/ghpages-deploy`;

  // Clean up any leftover worktree
  try { run(`git worktree remove "${worktreePath}" --force`); } catch {}

  // Check if gh-pages branch exists on remote
  const remoteExists = run('git ls-remote --heads origin gh-pages').trim();

  if (remoteExists) {
    run(`git fetch origin ${GH_PAGES_BRANCH} --quiet`);
    run(`git worktree add "${worktreePath}" ${GH_PAGES_BRANCH}`);
  } else {
    // Create orphan gh-pages branch
    run(`git worktree add --orphan -B ${GH_PAGES_BRANCH} "${worktreePath}"`);
    // Root index for the gh-pages branch
    writeFileSync(`${worktreePath}/index.html`,
      `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Demo Sites</title>
      <style>body{font-family:sans-serif;padding:40px;background:#111;color:#eee}
      h1{color:#CFA24C}a{color:#CFA24C}</style></head>
      <body><h1>Business Demo Sites</h1><p>Each demo is at <code>/demos/&lt;slug&gt;/</code></p></body></html>`
    );
    run(`git -C "${worktreePath}" add index.html`);
    run(`git -C "${worktreePath}" commit -m "Initialize gh-pages branch"`);
  }

  // Write the demo
  mkdirSync(`${worktreePath}/demos/${slug}`, { recursive: true });
  writeFileSync(`${worktreePath}/demos/${slug}/index.html`, html);

  run(`git -C "${worktreePath}" add "demos/${slug}/index.html"`);
  run(`git -C "${worktreePath}" commit -m "Deploy demo: ${lead.name}"`);
  run(`git -C "${worktreePath}" push origin ${GH_PAGES_BRANCH}`);

  // Clean up worktree
  try { run(`git worktree remove "${worktreePath}" --force`); } catch {}

  return `${BASE_URL}/demos/${slug}/`;
}
