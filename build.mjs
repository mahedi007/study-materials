// Runs automatically on Cloudflare Pages (build command: node build.mjs).
// Scans every folder inside /public that has a meta.json and writes public/catalog.json,
// which the home page reads to show the cards.
import { readdirSync, readFileSync, writeFileSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = 'public';
const items = [];

for (const name of readdirSync(ROOT)) {
  if (name.startsWith('_') || name.startsWith('.')) continue;
  const dir = join(ROOT, name);
  if (!statSync(dir).isDirectory()) continue;

  const metaPath = join(dir, 'meta.json');
  if (!existsSync(metaPath)) { console.warn(`skipped  ${name}/  (no meta.json)`); continue; }

  let meta;
  try { meta = JSON.parse(readFileSync(metaPath, 'utf8')); }
  catch (e) { console.error(`\nERROR: ${name}/meta.json is not valid JSON.\n${e.message}\nFix it and commit again. The live site stays unchanged until then.\n`); process.exit(1); }

  if (!existsSync(join(dir, 'index.html'))) {
    console.error(`\nERROR: ${name}/ has a meta.json but no index.html.\n`); process.exit(1);
  }
  if (meta.hidden) { console.log(`hidden   ${name}/`); continue; }

  items.push({
    slug: name,
    url: `/${encodeURIComponent(name)}/`,
    title: meta.title || name,
    description: meta.description || '',
    subject: meta.subject || 'অন্যান্য',
    tags: Array.isArray(meta.tags) ? meta.tags : [],
    date: meta.date || '',
    icon: meta.icon || '📘',
  });
  console.log(`added    ${name}/`);
}

items.sort((a, b) => (b.date || '').localeCompare(a.date || '') || a.title.localeCompare(b.title));
writeFileSync(join(ROOT, 'catalog.json'), JSON.stringify({ generated: new Date().toISOString(), items }, null, 2));
console.log(`\nDone: ${items.length} material(s) in catalog.json`);
