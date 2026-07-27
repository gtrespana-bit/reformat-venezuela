import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const newSlugs = [
  'instalacion-electrica-precios-venezuela',
  'senales-reinstalacion-electrica-casa',
  'fontaneria-plomeria-precios-caracas',
  'fugas-agua-tuberias-como-detectar',
  'pintura-interior-precios-m2-venezuela',
  'microcemento-vs-pintura-acabados',
  'revestimiento-piedra-madera-pared-precios',
];

const cardImages = {
  'instalacion-electrica-precios-venezuela': '/images/electricidad-800.webp',
  'senales-reinstalacion-electrica-casa': '/images/electricidad-seguridad.webp',
  'fontaneria-plomeria-precios-caracas': '/images/fontaneria-800.webp',
  'fugas-agua-tuberias-como-detectar': '/images/fontaneria.webp',
  'pintura-interior-precios-m2-venezuela': '/images/pintura-800.webp',
  'microcemento-vs-pintura-acabados': '/images/pintura-microcemento-bano.webp',
  'revestimiento-piedra-madera-pared-precios': '/images/revestimiento-piedra.webp',
};

// ---- 1) [slug].astro: add slugs to spanishSlugs array ----
const slugPath = path.join(root, 'src', 'pages', 'blog', '[slug].astro');
let slugSrc = fs.readFileSync(slugPath, 'utf8');
const anchor = "'errores-remodelar-zonas-premium-caracas'";
if (slugSrc.includes(anchor)) {
  const insertion = anchor + ',\n' + newSlugs.map((s) => `    '${s}'`).join(',\n');
  slugSrc = slugSrc.replace(anchor, insertion);
  fs.writeFileSync(slugPath, slugSrc, 'utf8');
  console.log(`[slug].astro: ${newSlugs.length} slugs agregados`);
} else {
  console.log('[slug].astro: anchor no encontrado, revisar manualmente');
}

// ---- 2) index.astro: add slugs to spanishSlugs + cardImages ----
const indexPath = path.join(root, 'src', 'pages', 'blog', 'index.astro');
let indexSrc = fs.readFileSync(indexPath, 'utf8');

// Add to spanishSlugs array
if (indexSrc.includes(anchor)) {
  const insertion = anchor + ',\n' + newSlugs.map((s) => `  '${s}'`).join(',\n');
  indexSrc = indexSrc.replace(anchor, insertion);
  console.log('index.astro: spanishSlugs actualizado');
} else {
  console.log('index.astro: anchor spanishSlugs no encontrado');
}

// Add to cardImages object
const cardAnchor = "'errores-remodelar-zonas-premium-caracas': '/images/arquitectura-400.webp'";
if (indexSrc.includes(cardAnchor)) {
  const cardInsertion =
    cardAnchor +
    ',\n' +
    Object.entries(cardImages)
      .map(([k, v]) => `  '${k}': '${v}'`)
      .join(',\n');
  indexSrc = indexSrc.replace(cardAnchor, cardInsertion);
  console.log('index.astro: cardImages actualizado');
} else {
  console.log('index.astro: anchor cardImages no encontrado');
}

fs.writeFileSync(indexPath, indexSrc, 'utf8');
console.log('Listo. Slugs registrados.');
