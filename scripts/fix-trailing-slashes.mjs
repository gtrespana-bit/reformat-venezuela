// scripts/fix-trailing-slashes.mjs
// Normaliza todos los enlaces internos en el HTML generado para que
// apunten con trailing slash. Esto evita la cadena de 308 redirects
// que Vercel aplica al tener `trailingSlash: true` cuando los enlaces
// se escriben sin la barra en los archivos .astro.
//
// Se ejecuta AUTOMÁTICAMENTE después de `astro build` (ver package.json).

import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const DIST_DIR = join(__dirname, '..', 'dist');

// Patrones que NUNCA deben llevar trailing slash:
//  - archivos con extensión (.css, .js, .png, .webp, .mp4, .ico, .xml, .json, .webmanifest...)
//  - anchors (#seccion) o query strings (?x=1)
//  - URLs externas (empiezan por http:// o https://)
//  - protocolos especiales (tel:, mailto:, whatsapp:)
//  - el propio "/" (ya está bien)
const INTERNAL_HREF = /^\/(?!\/)([^?#"']*)$/;
const HAS_EXTENSION = /\.[a-zA-Z0-9]{1,8}$/;

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) {
      walk(full, files);
    } else if (entry.endsWith('.html')) {
      files.push(full);
    }
  }
  return files;
}

/**
 * Reescribe href="/x/y" -> href="/x/y/" dejando intactos:
 *  - href="/"
 *  - href="/archivo.ext"
 *  - href="/x/y/" (ya tiene barra)
 *  - href="#anchor", href="?query", href="https://...", href="tel:..."
 */
function normalizeHrefs(html) {
  return html.replace(
    /\b(href|action|srcset)=(["'])([^"']+)\2/gi,
    (match, attr, quote, value) => {
      // srcset puede llevar múltiples URLs separadas por coma. Para simplificar
      // y por seguridad (srcset se usa para imágenes con anchos, no páginas)
      // lo dejamos intacto. Idem para src de assets.
      if (attr.toLowerCase() === 'srcset' || attr.toLowerCase() === 'src') {
        return match;
      }

      // action en formularios: también normalizamos.
      const parts = value.split(/([?#])/);
      let path = parts[0];
      const suffix = parts.length > 1 ? parts.slice(1).join('') : '';

      if (!INTERNAL_HREF.test(path)) return match;
      if (path === '/') return match;
      if (HAS_EXTENSION.test(path)) return match;
      if (path.endsWith('/')) return match;

      return `${attr}=${quote}${path}/${suffix}${quote}`;
    }
  );
}

const files = walk(DIST_DIR);
let totalFixed = 0;
let filesTouched = 0;

for (const file of files) {
  const original = readFileSync(file, 'utf8');
  const normalized = normalizeHrefs(original);
  if (normalized !== original) {
    writeFileSync(file, normalized, 'utf8');
    const count = (normalized.match(/href="\/[^"]+\/"/g) || []).length -
                  (original.match(/href="\/[^"]+\/"/g) || []).length;
    totalFixed += Math.max(0, (original.match(/href="\//g) || []).length - (normalized.match(/href="\/(?:[^"]*\/)"/g) || []).length);
    filesTouched += 1;
  }
}

// Estadísticas
import { execSync } from 'node:child_process';

console.log('  Normalización de trailing slashes');
console.log('  ─────────────────────────────────');
console.log(`  Páginas HTML revisadas : ${files.length}`);
console.log(`  Páginas modificadas    : ${filesTouched}`);

// Verificación: contamos cuántos enlaces internos siguen sin barra tras el fix
let remaining = 0;
for (const file of files) {
  const html = readFileSync(file, 'utf8');
  const m = html.match(/\bhref=(["'])\/(?!\/)([^"'?#]+)\1/g) || [];
  for (const href of m) {
    const val = href.replace(/^\bhref=["']|["']$/g, '');
    if (val === '/') continue;
    if (HAS_EXTENSION.test(val)) continue;
    if (val.endsWith('/')) continue;
    remaining += 1;
  }
}
console.log(`  Enlaces sin barra (debug): ${remaining}`);
console.log(remaining === 0 ? '\n  ✓ Todos los enlaces internos terminan en "/".' : `\n  ⚠ Quedan ${remaining} enlaces sin normalizar (revisar).`);
