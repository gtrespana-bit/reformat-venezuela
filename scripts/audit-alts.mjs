import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.join(__dirname, '..', 'src');

function walk(d) {
  let out = [];
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) out = out.concat(walk(p));
    else if (e.name.endsWith('.astro')) out.push(p);
  }
  return out;
}

const files = walk(srcDir);
const alts = [];
for (const f of files) {
  const src = fs.readFileSync(f, 'utf8');
  const re = /<img\b[^>]*>/gs;
  let m;
  while ((m = re.exec(src))) {
    const tag = m[0];
    const staticAlt = (tag.match(/alt=["']([^"']*)["']/) || [])[1];
    const dyn = /alt=\{/.test(tag);
    alts.push({
      f: path.relative(srcDir, f).replace(/\\/g, '/'),
      alt: staticAlt !== undefined ? staticAlt : dyn ? '{dinamico}' : 'SIN ALT',
    });
  }
}

const uniq = {};
for (const a of alts) uniq[a.alt] = (uniq[a.alt] || 0) + 1;

console.log(`Total IMG: ${alts.length} | Alts únicos: ${Object.keys(uniq).length}`);
console.log('=== DISTRIBUCION (count x alt) ===');
Object.entries(uniq)
  .sort((x, y) => y[1] - x[1])
  .forEach(([a, n]) => console.log(`${n}x | ${a}`));
