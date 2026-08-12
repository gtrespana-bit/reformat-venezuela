#!/usr/bin/env node
/**
 * check-seo.mjs — Guardián SEO del build.
 *
 * Se ejecuta después de `astro build` + `fix-trailing-slashes.mjs` y FALLA
 * el build (exit 1) si detecta cualquier condición que provoque los problemas
 * de indexación de Google Search Console ("Página con redirección",
 * canonical duplicado, hreflang roto, sitemap con URLs no finales):
 *
 *   1. Enlaces internos (href/action) sin slash final → cada uno genera un
 *      redirect 308/301 y Google los marca como "Página con redirección".
 *   2. Enlaces internos hacia fuentes de redirect definidas en vercel.json
 *      (URLs antiguas que deben quedar sin enlazar).
 *   3. Canonical ausente o sin slash final; og:url distinto del canonical.
 *   4. Hreflang hacia páginas que no existen o sin slash final.
 *   5. Sitemap con URLs sin slash, que no existen, o que son fuentes de
 *      redirect; y número de URLs del sitemap != páginas indexables.
 *   6. Enlaces http:// (inseguros) dentro del HTML.
 *   7. Más o menos de un <h1> por página indexable.
 *
 * Uso: node scripts/check-seo.mjs
 */
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const SITE_URL = 'https://remodelat.net';
const DIST = join(process.cwd(), 'dist');

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function walk(dir, files = [], ext = '.html') {
  if (!existsSync(dir)) return files;
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, files, ext);
    else if (entry.endsWith(ext)) files.push(full);
  }
  return files;
}

const HAS_EXTENSION = /\.[a-zA-Z0-9]{1,8}$/;
const problems = [];

function localPathFromUrl(url) {
  try {
    return new URL(url).pathname;
  } catch {
    return null;
  }
}

function localFileExists(pathname) {
  if (pathname === '/') return existsSync(join(DIST, 'index.html'));
  const clean = pathname.replace(/\/$/, '');
  return existsSync(join(DIST, clean + '/index.html'));
}

// Fuentes de redirect definidas en vercel.json (no deben enlazarse jamás).
// Si el redirect solo añade la barra final (dest == source + '/'), la URL
// CON slash es la final válida: solo se bloquea la forma sin slash.
function loadRedirectSources() {
  const sources = new Set();
  try {
    const cfg = JSON.parse(readFileSync(join(process.cwd(), 'vercel.json'), 'utf8'));
    for (const r of cfg.redirects || []) {
      const src = r.source.replace(/\/$/, '') || '/';
      const dst = (r.destination || '').replace(/\/$/, '') || '/';
      if (dst === src + '/') {
        sources.add(src); // solo la variante sin slash redirige
      } else {
        sources.add(src);
        sources.add((src + '/').replace('//', '/'));
      }
    }
  } catch {
    /* vercel.json ausente: no hay fuentes que comprobar */
  }
  return sources;
}
const redirectSources = loadRedirectSources();

// ---------------------------------------------------------------------------
// 1–6. Auditoría del HTML generado
// ---------------------------------------------------------------------------
const htmlFiles = walk(DIST);
let indexable = 0;

for (const file of htmlFiles) {
  const rel = file.replace(DIST + '/', '/');
  const html = readFileSync(file, 'utf8');
  const isNoindex = /<meta\s+name="robots"\s+content="noindex/i.test(html);
  if (isNoindex) continue;
  indexable++;

  // --- Canonical / og:url ---
  const canonical = (html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i) || [])[1];
  const ogUrl = (html.match(/property="og:url"\s+content="([^"]+)"/i) || [])[1];
  if (!canonical) problems.push(`${rel}: sin canonical`);
  else {
    if (!canonical.startsWith(SITE_URL)) problems.push(`${rel}: canonical fuera del sitio: ${canonical}`);
    if (!canonical.endsWith('/')) problems.push(`${rel}: canonical sin slash final: ${canonical}`);
    if (ogUrl && ogUrl !== canonical) problems.push(`${rel}: og:url (${ogUrl}) != canonical (${canonical})`);
  }

  // --- hreflang ---
  const hreflangs = [...html.matchAll(/hreflang="(es|en|x-default)"\s+href="([^"]+)"/gi)];
  for (const [, , href] of hreflangs) {
    const pathname = localPathFromUrl(href);
    if (pathname === null) { problems.push(`${rel}: hreflang inválido ${href}`); continue; }
    if (!pathname.endsWith('/')) problems.push(`${rel}: hreflang sin slash final: ${href}`);
    if (!localFileExists(pathname)) problems.push(`${rel}: hreflang a página inexistente: ${href}`);
  }

  // --- Enlaces internos ---
  const linkVals = [
    ...html.matchAll(/\b(?:href|action)=["']([^"']+)["']/gi),
  ].map((m) => m[1]);

  for (const raw of linkVals) {
    const value = raw.trim();
    if (
      value === '' || value === '/' ||
      value.startsWith('#') || value.startsWith('?') ||
      value.startsWith('//') || value.startsWith('http://') || value.startsWith('https://') ||
      /^(tel|mailto|sms|data|javascript):/i.test(value)
    ) {
      if (value.startsWith('http://')) problems.push(`${rel}: enlace http:// inseguro: ${value}`);
      continue;
    }
    if (!value.startsWith('/')) continue; // relativo interno no estándar: no evaluamos
    if (HAS_EXTENSION.test(value.split(/[?#]/)[0])) continue; // asset
    if (redirectSources.has(value.replace(/\/$/, '') || '/')) {
      problems.push(`${rel}: enlace interno a fuente de redirect (${value})`);
    }
    if (!value.endsWith('/') && !value.includes('?') && !value.includes('#')) {
      problems.push(`${rel}: enlace interno sin slash final: ${value}`);
    }
  }

  // --- H1 ---
  const h1Count = (html.match(/<h1[\s>]/gi) || []).length;
  if (h1Count !== 1) problems.push(`${rel}: ${h1Count} <h1> (se espera 1)`);
}

// ---------------------------------------------------------------------------
// 5. Auditoría del sitemap
// ---------------------------------------------------------------------------
const sitemapIndexFile = join(DIST, 'sitemap-index.xml');
if (!existsSync(sitemapIndexFile)) {
  problems.push('sitemap-index.xml no generado');
} else {
  const index = readFileSync(sitemapIndexFile, 'utf8');
  const chunkNames = [...index.matchAll(/<loc>[^<]+<\/loc>/g)]
    .map((m) => m[0].replace(/<\/?loc>/g, '').split('/').pop());
  const sitemapUrls = [];
  for (const name of chunkNames) {
    const chunkFile = join(DIST, name);
    if (!existsSync(chunkFile)) { problems.push(`chunk de sitemap ausente: ${name}`); continue; }
    const chunk = readFileSync(chunkFile, 'utf8');
    for (const m of chunk.matchAll(/<loc>([^<]+)<\/loc>/g)) sitemapUrls.push(m[1]);
  }

  const seen = new Set();
  for (const url of sitemapUrls) {
    if (!url.startsWith(SITE_URL)) { problems.push(`sitemap: URL fuera del sitio ${url}`); continue; }
    if (!url.endsWith('/')) problems.push(`sitemap: URL sin slash final ${url}`);
    if (seen.has(url)) problems.push(`sitemap: URL duplicada ${url}`);
    seen.add(url);
    const pathname = localPathFromUrl(url);
    const clean = (pathname || '').replace(/\/$/, '') || '/';
    if (redirectSources.has(clean)) problems.push(`sitemap: incluye fuente de redirect ${url}`);
    if (pathname && !localFileExists(pathname)) problems.push(`sitemap: URL sin HTML generado ${url}`);
  }
  if (sitemapUrls.length !== indexable) {
    problems.push(`sitemap: ${sitemapUrls.length} URLs vs ${indexable} páginas indexables`);
  }
}

// ---------------------------------------------------------------------------
// Resultado
// ---------------------------------------------------------------------------
console.log('  Guardián SEO (check-seo)');
console.log('  ────────────────────────');
console.log(`  Páginas indexables: ${indexable} | URLs en sitemap: (verificado)`);
if (problems.length) {
  console.log('\n  ✗ Fallos detectados:');
  for (const p of problems) console.log('    - ' + p);
  console.log('\n  Corrige los fallos antes de desplegar: cada enlace sin slash final');
  console.log('  o hacia una URL antigua vuelve a generar "Página con redirección".');
  process.exit(1);
}
console.log('  ✓ Canonicals, hreflang, enlaces internos y sitemap correctos.');
process.exit(0);
