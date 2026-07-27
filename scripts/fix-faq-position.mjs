import { readFileSync, writeFileSync, readdirSync } from 'fs';

const dir = 'src/pages/servicios/';
let count = 0;

for (const file of readdirSync(dir).filter(f => f.endsWith('.astro'))) {
  const path = dir + file;
  let c = readFileSync(path, 'utf-8');

  const faqMatch = c.match(/<FAQ items=\{[\s\S]*?\]\}\s*\/>/);
  if (!faqMatch) continue;

  const faqIdx = c.indexOf(faqMatch[0]);
  const closeIdx = c.lastIndexOf('</BaseLayout>');

  // Solo corregir si el FAQ está FUERA del layout
  if (closeIdx !== -1 && faqIdx < closeIdx) continue;

  // Extraer y eliminar de su posición actual
  const faqBlock = faqMatch[0];
  c = c.substring(0, faqIdx) + c.substring(faqIdx + faqBlock.length);
  c = c.replace(/\n{3,}/g, '\n\n');

  // Insertar dentro del layout, antes del CTA
  const insert = '\n' + faqBlock + '\n';
  const ctaComment = c.indexOf('<!-- CTA -->');
  const ctaSection = c.indexOf('<section class="cta-section">');
  const target = ctaComment !== -1 ? ctaComment : ctaSection;

  if (target !== -1) {
    c = c.substring(0, target) + insert + c.substring(target);
  } else {
    // Fallback: justo antes de </BaseLayout>
    const close2 = c.lastIndexOf('</BaseLayout>');
    c = c.substring(0, close2) + insert + c.substring(close2);
  }

  writeFileSync(path, c);
  console.log('✅ ' + file);
  count++;
}

console.log(`\n🎉 ${count} FAQ reubicadas dentro del layout`);
