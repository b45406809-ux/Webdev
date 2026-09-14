import { readFile, readdir, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { hash } from 'blake3-wasm';
import { ProxyAgent, setGlobalDispatcher } from 'undici';

const API = 'https://api.cloudflare.com/client/v4';
const projectName = 'averk';
const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
const apiToken = process.env.CLOUDFLARE_API_TOKEN;
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.join(root, '.deploy', 'averk');

const proxy = process.env.HTTPS_PROXY || process.env.https_proxy;
if (proxy) setGlobalDispatcher(new ProxyAgent(proxy));

if (!accountId || !apiToken) {
  throw new Error('CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_API_TOKEN are required.');
}

async function request(endpoint, options = {}, token = apiToken) {
  const response = await fetch(`${API}${endpoint}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      ...options.headers
    }
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok || payload.success === false) {
    const details = payload.errors?.map(error => error.message).join('; ') || response.statusText;
    const error = new Error(`Cloudflare API ${response.status}: ${details}`);
    error.status = response.status;
    throw error;
  }
  return payload.result;
}

async function ensureProject() {
  try {
    await request(`/accounts/${accountId}/pages/projects/${projectName}`);
  } catch (error) {
    if (error.status !== 404) throw error;
    await request(`/accounts/${accountId}/pages/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: projectName, production_branch: 'main' })
    });
    console.log(`Created Cloudflare Pages project: ${projectName}`);
  }
}

async function walk(directory, base = directory) {
  const files = [];
  for (const entry of await readdir(directory)) {
    const absolute = path.join(directory, entry);
    if ((await stat(absolute)).isDirectory()) files.push(...await walk(absolute, base));
    else files.push({ absolute, relative: path.relative(base, absolute).split(path.sep).join('/') });
  }
  return files;
}

function contentType(file) {
  return ({
    '.css': 'text/css', '.html': 'text/html', '.jpg': 'image/jpeg',
    '.js': 'text/javascript', '.json': 'application/json', '.png': 'image/png',
    '.svg': 'image/svg+xml', '.webp': 'image/webp'
  })[path.extname(file).toLowerCase()] || 'application/octet-stream';
}

await ensureProject();
const { jwt } = await request(`/accounts/${accountId}/pages/projects/${projectName}/upload-token`);
const files = await Promise.all((await walk(output)).map(async file => {
  const contents = await readFile(file.absolute);
  const extension = path.extname(file.relative).slice(1);
  const key = hash(contents.toString('base64') + extension).toString('hex').slice(0, 32);
  return { ...file, contents, key, contentType: contentType(file.relative) };
}));

const missing = await request('/pages/assets/check-missing', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ hashes: files.map(file => file.key) })
}, jwt);

const uploads = files.filter(file => missing.includes(file.key));
for (let index = 0; index < uploads.length; index += 20) {
  const batch = uploads.slice(index, index + 20).map(file => ({
    key: file.key,
    value: file.contents.toString('base64'),
    metadata: { contentType: file.contentType },
    base64: true
  }));
  await request('/pages/assets/upload', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(batch)
  }, jwt);
}

await request('/pages/assets/upsert-hashes', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ hashes: files.map(file => file.key) })
}, jwt);

const manifest = Object.fromEntries(files.map(file => [`/${file.relative}`, file.key]));
const form = new FormData();
form.append('manifest', JSON.stringify(manifest));
form.append('branch', 'main');
form.append('commit_message', 'Deploy Averk Travel & Tours');

const deployment = await request(
  `/accounts/${accountId}/pages/projects/${projectName}/deployments`,
  { method: 'POST', body: form }
);

console.log(`Uploaded ${uploads.length} new assets (${files.length} total).`);
console.log(`Deployment: ${deployment.url}`);
