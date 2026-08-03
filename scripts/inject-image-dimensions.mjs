// scripts/inject-image-dimensions.mjs
// ---------------------------------------------------------------------------
// Post-build: recorre los HTML generados y añade width/height a cualquier
// <img> del cuerpo del contenido (posts del blog, proyectos) que no los tenga.
// Lee los bytes de los WebP/JPEG/PNG referenciados para extraer las dimensiones
// reales, igual que hace SEO.astro para og:image. Esto elimina el CLS que
// producen las imágenes del markdown de los posts.
// ---------------------------------------------------------------------------

import { readdirSync, readFileSync, writeFileSync, statSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const DIST_DIR = resolve(__dirname, '..', 'dist');

/** Lee dimensiones de un WebP/PNG/JPEG/GIF a partir de los bytes. */
function getImageSize(filePath) {
  try {
    const buf = readFileSync(filePath);
    // --- WEBP ---
    if (buf.toString('ascii', 0, 4) === 'RIFF' && buf.toString('ascii', 8, 12) === 'WEBP') {
      const fmt = buf.toString('ascii', 12, 16);
      if (fmt === 'VP8X') {
        return { w: 1 + buf.readUIntLE(24, 3), h: 1 + buf.readUIntLE(27, 3) };
      }
      if (fmt === 'VP8 ') {
        return { w: buf.readUInt16LE(26) & 0x3fff, h: buf.readUInt16LE(28) & 0x3fff };
      }
      if (fmt === 'VP8L') {
        const b0 = buf[21], b1 = buf[22], b2 = buf[23], b3 = buf[24];
        return {
          w: 1 + (((b1 & 0x3f) << 8) | b0),
          h: 1 + (((b3 & 0x0f) << 10) | (b2 << 2) | ((b1 & 0xc0) >> 6)),
        };
      }
    }
    // --- PNG ---
    if (buf.toString('ascii', 1, 4) === 'PNG') {
      return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
    }
    // --- JPEG ---
    if (buf[0] === 0xff && buf[1] === 0xd8) {
      let i = 2;
      while (i < buf.length) {
        while (i < buf.length && buf[i] !== 0xff) i++;
        while (i < buf.length && buf[i] === 0xff) i++;
        if (i >= buf.length) break;
        const marker = buf[i]; i++;
        if (marker === 0xd9 || marker === 0xda) break; // EOI / SOS
        const len = buf.readUInt16BE(i);
        if (marker === 0xc0 || marker === 0xc1 || marker === 0xc2) {
          const h = buf.readUInt16BE(i + 3);
          const w = buf.readUInt16BE(i + 5);
          return { w, h };
        }
        i += len;
      }
    }
    // --- GIF ---
    if (buf.toString('ascii', 0, 4) === 'GIF8') {
      return { w: buf.readUInt16LE(6), h: buf.readUInt16LE(8) };
    }
  } catch {}
  return null;
}

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) walk(full, files);
    else if (entry.endsWith('.html')) files.push(full);
  }
  return files;
}

/**
 * Reemplaza los <img> que NO tienen width/height, inyectándolos a partir de
 * la imagen real en disco. Solo actúa sobre <img src="/..."> (no _astro, no
 * externos) y solo si el archivo existe.
 */
function injectSizes(html) {
  return html.replace(
    /<img\b([^>]*?)>/gi,
    (match, attrsStr) => {
      if (/\bwidth=/i.test(attrsStr) && /\bheight=/i.test(attrsStr)) return match;
      const srcMatch = attrsStr.match(/\ssrc=(["'])([^"']+)\1/i);
      if (!srcMatch) return match;
      const src = srcMatch[2];
      if (!src.startsWith('/')) return match;
      if (src.startsWith('/_astro/') || src.startsWith('/fonts/')) return match;
      // strip query/hash
      const cleanSrc = src.split('#')[0].split('?')[0];
      const abs = join(DIST_DIR, cleanSrc);
      if (!existsSync(abs)) return match;
      const size = getImageSize(abs);
      if (!size) return match;
      const newAttrs = attrsStr + ` width="${size.w}" height="${size.h}" loading="lazy" decoding="async"`;
      return `<img${newAttrs}>`;
    }
  );
}

const files = walk(DIST_DIR);
let fixed = 0;
for (const file of files) {
  const original = readFileSync(file, 'utf8');
  const out = injectSizes(original);
  if (out !== original) {
    writeFileSync(file, out, 'utf8');
    fixed += 1;
  }
}

console.log('  Dimensiones automáticas en <img>');
console.log('  ────────────────────────────────');
console.log(`  Páginas HTML revisadas : ${files.length}`);
console.log(`  Páginas modificadas    : ${fixed}`);
console.log(`  ✓ Imágenes del contenido con width/height inyectados desde los binarios.`);
