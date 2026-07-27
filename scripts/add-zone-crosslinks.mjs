import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pagesDir = path.join(__dirname, '..', 'src', 'pages');

const files = fs
  .readdirSync(pagesDir)
  .filter((f) => /^remodelacion-(bano|cocina|integral)-.+\.astro$/.test(f));

let updated = 0;
const problems = [];

for (const file of files) {
  const m = file.match(/^remodelacion-(bano|cocina|integral)-(.+)\.astro$/);
  if (!m) continue;
  const [, service, zone] = m;
  const fp = path.join(pagesDir, file);
  let src = fs.readFileSync(fp, 'utf8');

  if (src.includes('ZoneCrossLinks')) {
    console.log(`skip (ya tiene): ${file}`);
    continue;
  }

  const importAnchor = "import Breadcrumb from '../components/Breadcrumb.astro';";
  if (!src.includes(importAnchor)) {
    problems.push(`SIN ANCHOR IMPORT: ${file}`);
    continue;
  }
  src = src.replace(
    importAnchor,
    importAnchor + "\nimport ZoneCrossLinks from '../components/ZoneCrossLinks.astro';"
  );

  const ctaAnchor = '<!-- CTA -->';
  if (!src.includes(ctaAnchor)) {
    problems.push(`SIN CTA: ${file}`);
    continue;
  }
  src = src.replace(
    ctaAnchor,
    `<ZoneCrossLinks zone="${zone}" service="${service}" />\n\n<!-- CTA -->`
  );

  fs.writeFileSync(fp, src, 'utf8');
  updated++;
}

console.log(`\n✅ Actualizadas: ${updated} zone pages`);
if (problems.length) {
  console.log('⚠️ Problemas:');
  problems.forEach((p) => console.log('  - ' + p));
}
