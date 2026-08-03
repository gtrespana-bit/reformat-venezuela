// scripts/shorten-meta.mjs
// ---------------------------------------------------------------------------
// Recorre los archivos fuente (.astro y .md) y acorta titles/descriptions que
// superan los límites de visualización en SERP (60/158 caracteres).
// NO toca dist/; se aplica al código fuente. Re-ejecutable (idempotente).
// ---------------------------------------------------------------------------

import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const SRC_DIR = join(__dirname, '..', 'src');
const CONTENT_DIR = join(__dirname, '..', 'src', 'content', 'blog');

// ---- Helpers ---------------------------------------------------------------
function walk(dir, exts, out = []) {
  for (const e of readdirSync(dir)) {
    const full = join(dir, e);
    const st = statSync(full);
    if (st.isDirectory()) walk(full, exts, out);
    else if (exts.some(x => e.endsWith(x))) out.push(full);
  }
  return out;
}

/**
 * Acorta un string añadiendo ellipsis en el último espacio antes del límite.
 */
function smartShorten(s, max) {
  if (!s || s.length <= max) return s;
  const cut = s.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(' ');
  return (lastSpace > max * 0.7 ? cut.slice(0, lastSpace) : cut).trimEnd() + '…';
}

// ---- Patrones de reemplazo por tipo de archivo -----------------------------

// 1) EN zone pages: any title of the form "<Service> in <Zone> | 2026 Prices | RemodelaT"
//    where <Service> puede ser "Bathroom Remodeling", "Kitchen Remodeling" o "Full Home Remodeling".
const enZoneTitleRe = /title="((?:Bathroom|Kitchen|Full Home) Remodeling in [A-Za-zÁÉÍÓÚáéíóúÑñÜü .'()-]+) \| 2026 Prices \| RemodelaT"/g;

// 2) ES zone pages: title="Remodelación de Baños en <Zona> | Precios 2026 | RemodelaT"
//    Similar a EN: "Precios 2026" son 13 caracteres que se pueden quitar; el
//    año ya es 2026 (raro y no aporta en título de SERP).
const esZoneBanoRe = /title="Remodelación de Baños en ([A-Za-zÁÉÍÓÚáéíóúÑñÜü .'()-]+) \| Precios 2026 \| RemodelaT"/g;
const esZoneCocinaRe = /title="Remodelación de Cocinas en ([A-Za-zÁÉÍÓÚáéíóúÑñÜü .'()-]+) \| Precios 2026 \| RemodelaT"/g;
const esZoneIntegralRe = /title="Remodelación Integral en ([A-Za-zÁÉÍÓÚáéíóúÑñÜü .'()-]+) \| Precios 2026 \| RemodelaT"/g;

// 3) Blog posts en Astro: title={`${post.data.title} | RemodelaT`}
//    El sufijo " | RemodelaT" son 11 caracteres. Los títulos frontmatter
//    ya traen el título largo del post. En vez de mutar el frontmatter
//    (que puede afectar h1), cambiamos la plantilla para usar una función
//    que acorta el <title> a 60 caracteres. Lo haremos editando los .astro
//    del blog para usar helper en vez de concatenar a ciegas. (Abajo.)

function fixEnZoneTitle(_m, svcZone) {
  return `title="${svcZone} | RemodelaT"`;
}
function fixEsBanoTitle(_m, zone) {
  return `title="Remodelación de Baños en ${zone} | RemodelaT"`;
}
function fixEsCocinaTitle(_m, zone) {
  return `title="Remodelación de Cocinas en ${zone} | RemodelaT"`;
}
function fixEsIntegralTitle(_m, zone) {
  return `title="Remodelación Integral en ${zone} | RemodelaT"`;
}

// ---- Descripciones: acortar a 158 caracteres ------------------------------
// Busca description="..." en cualquier archivo fuente.
const attrDescRe = /\bdescription=(["'])([^"']{170,}?)\1/gs;

function fixDescription(m, quote, text) {
  const shortened = smartShorten(text, 158);
  return `description=${quote}${shortened}${quote}`;
}

// ---- Títulos de proyecto (ES/EN): quitar " | Step-by-Step Case Study" ------
// Los títulos de /proyectos/x son tipo "Cocina de Lujo en Guataparo | Caso Real | RemodelaT"
// Algunos traen más texto; cortamos el sufijo redundante.
const projectStepByStepEn = / \| Step-by-Step Case Study/g;

// ---- Procesar --------------------------------------------------------------
let changedFiles = 0;
let totalReplacements = 0;

function processFile(fp) {
  const orig = readFileSync(fp, 'utf8');
  let out = orig;

  if (fp.includes('/pages/en/remodelacion-')) {
    out = out.replace(enZoneTitleRe, fixEnZoneTitle);
  }
  if (fp.endsWith('.astro')) {
    out = out.replace(esZoneBanoRe, fixEsBanoTitle);
    out = out.replace(esZoneCocinaRe, fixEsCocinaTitle);
    out = out.replace(esZoneIntegralRe, fixEsIntegralTitle);
    out = out.replace(projectStepByStepEn, '');
  }

  // Acortar description="..." en cualquier archivo fuente.
  out = out.replace(attrDescRe, fixDescription);

  if (out !== orig) {
    writeFileSync(fp, out, 'utf8');
    changedFiles += 1;
    return true;
  }
  return false;
}

// Recorrer src/pages
const astroFiles = walk(join(SRC_DIR, 'pages'), ['.astro']);
for (const f of astroFiles) processFile(f) && (totalReplacements += 1);

// Blog markdown: mutar el frontmatter `excerpt` cuando supere 158 caracteres
const mdFiles = walk(CONTENT_DIR, ['.md']);
const excerptRe = /^excerpt: ["'](.+?)["']\s*$/gm;
let mdChanged = 0;
for (const f of mdFiles) {
  const orig = readFileSync(f, 'utf8');
  let out = orig;
  out = out.replace(excerptRe, (m, text) => {
    if (text.length <= 160) return m;
    return `excerpt: "${smartShorten(text, 158)}"`;
  });
  if (out !== orig) {
    writeFileSync(f, out, 'utf8');
    mdChanged += 1;
  }
}

console.log('  Acortar títulos y descripciones de SERP');
console.log('  ───────────────────────────────────────');
console.log(`  Archivos .astro modificados : ${changedFiles}`);
console.log(`  Archivos .md modificados    : ${mdChanged}`);
console.log('  ✓ Aplicado patrones de acortamiento (Precios 2026/2026 Prices fuera,');
console.log('    descripciones a 158 chars, títulos de proyecto simplificados).');
