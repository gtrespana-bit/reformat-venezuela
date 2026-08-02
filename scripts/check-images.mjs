#!/usr/bin/env node
/**
 * check-images.mjs — Verificador de imágenes.
 *
 * Detecta los dos fallos que rompieron /proyectos:
 *   1. Referencias a imágenes que no existen en public/ (404 en producción).
 *   2. Nombres de archivo no seguros para URL: tildes, espacios, "+",
 *      paréntesis, mayúsculas... El "+" es el peor: casi todos los CDNs lo
 *      decodifican como espacio, así que la petición nunca encuentra el fichero.
 *   3. Imágenes subidas a public/images/proyectos que ninguna página usa.
 *
 * Uso:  node scripts/check-images.mjs
 * Salida distinta de 0 si hay algún problema (apto para CI).
 */
import { readFileSync, existsSync, readdirSync, statSync } from 'fs';
import { join, relative } from 'path';

const ROOT = process.cwd();
const PUBLIC = join(ROOT, 'public');
const SRC = join(ROOT, 'src');

const IMG_EXT = /\.(webp|jpe?g|png|avif|gif|svg)$/i;
// Sólo estos caracteres son seguros sin codificar en una ruta de URL.
const URL_SAFE = /^[a-zA-Z0-9/._-]+$/;

function walk(dir, filter) {
  if (!existsSync(dir)) return [];
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...walk(full, filter));
    else if (filter(full)) out.push(full);
  }
  return out;
}

// --- 1. Recolectar referencias desde el código fuente ---
const sourceFiles = walk(SRC, (f) => /\.(astro|md|mdx|ts|js|json)$/.test(f));
const refs = new Map(); // ruta url -> Set(archivos que la referencian)

const addRef = (url, file) => {
  if (!refs.has(url)) refs.set(url, new Set());
  refs.get(url).add(relative(ROOT, file));
};

for (const file of sourceFiles) {
  const text = readFileSync(file, 'utf8');
  const re = /\/images\/[^"'`)\s,]+?\.(?:webp|jpe?g|png|avif|gif|svg)/gi;
  for (const m of text.matchAll(re)) {
    addRef(m[0], file);
  }

  // Detectar llamadas dinámicas getSrcSet('base', [400, 800, 1600], 'ext')
  const srcSetRe = /getSrcSet\(\s*['"]([^'"]+)['"]\s*,\s*\[([\d\s,]+)\](?:\s*,\s*['"]([^'"]+)['"])?\s*\)/g;
  for (const m of text.matchAll(srcSetRe)) {
    const base = m[1];
    const widths = m[2].split(',').map(s => s.trim()).filter(Boolean);
    const ext = m[3] || 'webp';
    for (const w of widths) {
      addRef(`/images/${base}-${w}.${ext}`, file);
    }
  }
}

const problems = { missing: [], unsafe: [], unused: [] };

// --- 2. Referencias rotas ---
for (const [url, users] of refs) {
  if (!existsSync(join(PUBLIC, url))) {
    problems.missing.push({ url, users: [...users] });
  }
}

// --- 3. Nombres de archivo inseguros para URL ---
const allImages = walk(join(PUBLIC, 'images'), (f) => IMG_EXT.test(f));
for (const file of allImages) {
  const url = '/' + relative(PUBLIC, file).split('\\').join('/');
  if (!URL_SAFE.test(url)) problems.unsafe.push(url);
}

// --- 4. Fotos de proyectos huérfanas ---
const projectImages = walk(join(PUBLIC, 'images', 'proyectos'), (f) => IMG_EXT.test(f));
for (const file of projectImages) {
  const url = '/' + relative(PUBLIC, file).split('\\').join('/');
  if (!refs.has(url)) problems.unused.push(url);
}

// --- Informe ---
const line = (s) => console.log(s);
line('');
line('  Verificación de imágenes');
line('  ────────────────────────');
line(`  Referencias encontradas : ${refs.size}`);
line(`  Imágenes en public      : ${allImages.length}`);
line('');

let failed = false;

if (problems.missing.length) {
  failed = true;
  line(`  ✗ ${problems.missing.length} referencia(s) a imágenes inexistentes (serán 404):`);
  for (const { url, users } of problems.missing) {
    line(`      ${url}`);
    for (const u of users) line(`         ← ${u}`);
  }
  line('');
}

if (problems.unsafe.length) {
  failed = true;
  line(`  ✗ ${problems.unsafe.length} archivo(s) con nombre no seguro para URL:`);
  line('      (tildes, espacios, "+", paréntesis o mayúsculas rompen en el CDN)');
  for (const url of problems.unsafe) line(`      ${url}`);
  line('');
}

if (problems.unused.length) {
  line(`  ⚠ ${problems.unused.length} foto(s) de proyecto sin usar en ninguna página:`);
  for (const url of problems.unused) line(`      ${url}`);
  line('');
}

if (!failed && !problems.unused.length) {
  line('  ✓ Todo correcto: sin enlaces rotos, sin nombres problemáticos.');
  line('');
}

process.exit(failed ? 1 : 0);
