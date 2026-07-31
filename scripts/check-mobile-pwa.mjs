#!/usr/bin/env node
/**
 * Verifica después del build que todas las páginas HTML comparten la
 * configuración móvil/PWA y que el paquete instalable contiene sus recursos.
 */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = process.cwd();
const DIST = join(ROOT, 'dist');
const PUBLIC = join(ROOT, 'public');
const errors = [];

const fail = (message) => errors.push(message);

function walk(dir, predicate) {
  if (!existsSync(dir)) return [];
  const files = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) files.push(...walk(full, predicate));
    else if (predicate(full)) files.push(full);
  }
  return files;
}

function pngSize(path) {
  const data = readFileSync(path);
  const pngSignature = '89504e470d0a1a0a';
  if (data.subarray(0, 8).toString('hex') !== pngSignature || data.length < 24) return null;
  return [data.readUInt32BE(16), data.readUInt32BE(20)];
}

if (!existsSync(DIST)) {
  fail('No existe dist/. Ejecuta la auditoría después de astro build.');
}

const manifestPath = join(PUBLIC, 'manifest.json');
let manifest;
try {
  manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
} catch {
  fail('public/manifest.json no existe o no contiene JSON válido.');
}

if (manifest) {
  for (const key of ['id', 'name', 'short_name', 'start_url', 'scope', 'display', 'background_color', 'theme_color', 'icons']) {
    if (!manifest[key]) fail(`El manifest no define "${key}".`);
  }

  const icons = Array.isArray(manifest.icons) ? manifest.icons : [];
  for (const requiredSize of ['192x192', '512x512']) {
    if (!icons.some((icon) => icon.sizes === requiredSize && String(icon.purpose || 'any').includes('any'))) {
      fail(`Falta un icono PWA ${requiredSize} con purpose "any".`);
    }
  }
  if (!icons.some((icon) => String(icon.purpose || '').includes('maskable'))) {
    fail('Falta un icono PWA con purpose "maskable".');
  }

  for (const icon of icons) {
    const file = join(PUBLIC, String(icon.src || '').replace(/^\//, ''));
    if (!existsSync(file)) {
      fail(`No existe el icono declarado en manifest: ${icon.src}`);
      continue;
    }
    const declared = /^(\d+)x(\d+)$/.exec(String(icon.sizes || ''));
    const actual = pngSize(file);
    if (declared && actual && (actual[0] !== Number(declared[1]) || actual[1] !== Number(declared[2]))) {
      fail(`Dimensiones incorrectas en ${icon.src}: ${actual.join('x')} (declarado ${icon.sizes}).`);
    }
  }
}

for (const asset of ['sw.js', 'offline.html', 'manifest.json', 'icons/icon-maskable-512.png']) {
  if (!existsSync(join(PUBLIC, asset))) fail(`Falta public/${asset}.`);
  if (existsSync(DIST) && !existsSync(join(DIST, asset))) fail(`El build no copió ${asset} a dist/.`);
}

const htmlFiles = walk(DIST, (file) => file.endsWith('.html') && !file.endsWith('offline.html'));
if (!htmlFiles.length) fail('No se encontraron páginas HTML compiladas.');
let auditedPages = 0;

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  /* Astro genera un documento mínimo para redirecciones; no es una página
     navegable ni forma parte de la experiencia instalable. */
  if (/http-equiv="refresh"/i.test(html)) continue;

  auditedPages += 1;
  const name = relative(DIST, file);
  if (!/name="viewport"[^>]+viewport-fit=cover/.test(html)) fail(`${name}: viewport sin viewport-fit=cover.`);
  if (!/rel="manifest"[^>]+href="\/manifest\.json"/.test(html)) fail(`${name}: no enlaza el manifest.`);
  if (!/name="theme-color"/.test(html)) fail(`${name}: no define theme-color.`);
  if (!/apple-mobile-web-app-capable/.test(html)) fail(`${name}: faltan metadatos de instalación iOS.`);
}

for (const route of ['index.html', 'metodo-remodelat/index.html', 'en/our-method/index.html']) {
  const file = join(DIST, route);
  if (!existsSync(file)) {
    fail(`No se generó la ruta crítica ${route}.`);
    continue;
  }
  const html = readFileSync(file, 'utf8');
  if (!html.includes('method-comparison-mobile-label')) {
    fail(`${route}: la comparativa del método no contiene etiquetas móviles.`);
  }
}

const swPath = join(PUBLIC, 'sw.js');
if (existsSync(swPath)) {
  const sw = readFileSync(swPath, 'utf8');
  for (const eventName of ['install', 'activate', 'fetch']) {
    if (!sw.includes(`'${eventName}'`)) fail(`sw.js no gestiona el evento ${eventName}.`);
  }
}

console.log('\n  Auditoría móvil/PWA');
console.log('  ────────────────────');
console.log(`  Páginas HTML revisadas : ${auditedPages}`);
console.log(`  Iconos manifest         : ${manifest?.icons?.length || 0}`);
console.log('');

if (errors.length) {
  for (const error of errors) console.error(`  ✗ ${error}`);
  console.error('');
  process.exit(1);
}

console.log('  ✓ Viewport, metadatos, comparativas móviles y recursos PWA correctos.');
console.log('');
