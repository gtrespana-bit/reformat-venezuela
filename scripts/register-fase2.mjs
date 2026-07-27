import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const newSlugs = [
  'como-elegir-empresa-reformas-venezuela',
  'cuanto-tarda-reforma-integral-plazos',
  'permisos-reforma-apartamento-condominio',
  'antes-despues-reforma-cocina-caso-real',
];

const cardImages = {
  'como-elegir-empresa-reformas-venezuela': '/images/integrales-equipo-trabajando.webp',
  'cuanto-tarda-reforma-integral-plazos': '/images/integrales-proyecto-completo.webp',
  'permisos-reforma-apartamento-condominio': '/images/arquitectura-600.webp',
  'antes-despues-reforma-cocina-caso-real': '/images/cocina-800.webp',
};

// Anchor = last slug from Fase 1
const anchor = "'revestimiento-piedra-madera-pared-precios'";
const cardAnchor = "'revestimiento-piedra-madera-pared-precios': '/images/revestimiento-piedra.webp'";

// ---- [slug].astro ----
const slugPath = path.join(root, 'src', 'pages', 'blog', '[slug].astro');
let slugSrc = fs.readFileSync(slugPath, 'utf8');
if (slugSrc.includes(anchor) && !slugSrc.includes("'como-elegir-empresa-reformas-venezuela'")) {
  slugSrc = slugSrc.replace(anchor, anchor + ',\n' + newSlugs.map((s) => `    '${s}'`).join(',\n'));
  fs.writeFileSync(slugPath, slugSrc, 'utf8');
  console.log('[slug].astro: 4 slugs agregados');
} else {
  console.log('[slug].astro: ya registrado o anchor no encontrado');
}

// ---- index.astro ----
const indexPath = path.join(root, 'src', 'pages', 'blog', 'index.astro');
let indexSrc = fs.readFileSync(indexPath, 'utf8');
if (indexSrc.includes(anchor) && !indexSrc.includes("'como-elegir-empresa-reformas-venezuela'")) {
  indexSrc = indexSrc.replace(anchor, anchor + ',\n' + newSlugs.map((s) => `  '${s}'`).join(',\n'));
  console.log('index.astro: spanishSlugs actualizado');
}
if (indexSrc.includes(cardAnchor)) {
  indexSrc = indexSrc.replace(cardAnchor, cardAnchor + ',\n' + Object.entries(cardImages).map(([k, v]) => `  '${k}': '${v}'`).join(',\n'));
  console.log('index.astro: cardImages actualizado');
}
fs.writeFileSync(indexPath, indexSrc, 'utf8');
console.log('Fase 2 registrada.');
