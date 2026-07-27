import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pagesDir = path.join(__dirname, '..', 'src', 'pages');

const ctaAlt = {
  valencia: 'Cocina moderna terminada lista para entrega en Valencia | ReformaT',
  caracas: 'Cocina moderna terminada lista para entrega en Caracas | ReformaT',
  'san-diego': 'Cocina moderna terminada lista para entrega en San Diego | ReformaT',
  'la-guaira': 'Cocina moderna terminada lista para entrega en La Guaira | ReformaT',
};

const files = ['valencia.astro', 'caracas.astro', 'san-diego.astro', 'la-guaira.astro'];

// template literal with STATIC url (no ${} interpolation):
// <div class="cta-bg" style={`background-image: url('/images/x.webp')`}></div>
const re = /<div class="cta-bg" style=\{`background-image: url\('([^']+)'\)`\}><\/div>/g;

let fixed = 0;
for (const name of files) {
  const fp = path.join(pagesDir, name);
  const base = name.replace('.astro', '');
  let src = fs.readFileSync(fp, 'utf8');
  const alt = ctaAlt[base] || 'Espacio remodelado con acabados premium por ReformaT Venezuela';
  src = src.replace(re, (m, url) => {
    fixed++;
    return `<img class="cta-bg" src="${url}" alt="${alt}" loading="lazy" decoding="async" />`;
  });
  fs.writeFileSync(fp, src, 'utf8');
}

console.log(`CTA backgrounds fixed: ${fixed}`);
