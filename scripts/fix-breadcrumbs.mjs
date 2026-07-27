import { readFileSync, writeFileSync, readdirSync } from 'fs';

let count = 0;

// ── Service pages: mover breadcrumb de antes del hero a antes de article-section ──
const serviceDir = 'src/pages/servicios/';
for (const file of readdirSync(serviceDir).filter(f => f.endsWith('.astro'))) {
  const path = serviceDir + file;
  let c = readFileSync(path, 'utf-8');

  const bcStart = c.indexOf('<Breadcrumb');
  if (bcStart === -1) continue;

  const bcEnd = c.indexOf('/>', bcStart) + 2;
  const bc = c.substring(bcStart, bcEnd);

  // Remove from original position (between BaseLayout and hero)
  c = c.substring(0, bcStart) + c.substring(bcEnd);
  c = c.replace(/\n{3,}/g, '\n\n');

  // Insert before article-section (between hero and content)
  const marker = '<section class="article-section">';
  const idx = c.indexOf(marker);
  if (idx === -1) { console.log('⚠️ ' + file + ': sin article-section'); continue; }

  c = c.substring(0, idx) + bc + '\n\n' + c.substring(idx);
  writeFileSync(path, c);
  console.log('✅ ' + file);
  count++;
}

// ── City pages: mover breadcrumb de antes del hero a antes de INTRO ──
for (const file of ['caracas.astro', 'valencia.astro', 'san-diego.astro', 'la-guaira.astro']) {
  const path = 'src/pages/' + file;
  let c = readFileSync(path, 'utf-8');

  const bcStart = c.indexOf('<Breadcrumb');
  if (bcStart === -1) { console.log('⚠️ ' + file + ': sin breadcrumb'); continue; }

  const bcEnd = c.indexOf('/>', bcStart) + 2;
  const bc = c.substring(bcStart, bcEnd);

  // Remove from original position
  c = c.substring(0, bcStart) + c.substring(bcEnd);
  c = c.replace(/\n{3,}/g, '\n\n');

  // Insert before INTRO section comment
  const introIdx = c.indexOf('INTRO');
  if (introIdx === -1) { console.log('⚠️ ' + file + ': sin INTRO'); continue; }
  const commentStart = c.lastIndexOf('<!--', introIdx);
  if (commentStart === -1) { console.log('⚠️ ' + file + ': sin comentario'); continue; }

  c = c.substring(0, commentStart) + bc + '\n\n' + c.substring(commentStart);
  writeFileSync(path, c);
  console.log('✅ ' + file);
  count++;
}

console.log(`\n🎉 ${count} breadcrumbs reubicados`);
