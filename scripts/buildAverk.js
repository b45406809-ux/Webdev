import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = path.join(root, 'averk');
const suppliedAssets = path.join(root, 'Averk');
const output = path.join(root, '.deploy', 'averk');

await rm(output, { recursive: true, force: true });
await mkdir(path.join(output, 'assets'), { recursive: true });

const html = await readFile(path.join(source, 'index.html'), 'utf8');
await writeFile(path.join(output, 'index.html'), html.replaceAll('../Averk/', 'assets/'));

for (const file of ['styles.css', 'script.js']) {
  await cp(path.join(source, file), path.join(output, file));
}

for (const file of [
  'logo.jpg',
  'IMG-20260912-WA0010.jpg',
  'IMG-20260912-WA0011.jpg',
  'IMG-20260912-WA0012.jpg',
  'IMG-20260912-WA0013.jpg'
]) {
  await cp(path.join(suppliedAssets, file), path.join(output, 'assets', file));
}

console.log(`Built Averk Pages bundle at ${path.relative(root, output)}`);
