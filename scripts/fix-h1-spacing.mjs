import fs from 'node:fs';
import path from 'node:path';

// Agrega un espacio entre spans pegados en H1/H2 tipo:
//   <span class="line">Texto</span><span class="line gold">Texto</span>
// => <span class="line">Texto</span> <span class="line gold">Texto</span>
// Visualmente no cambia (CSS .line { display:block }), pero evita texto pegado
// para crawlers, lectores de pantalla y extraccion de IA ("Cocinasen" -> "Cocinas en").

const ROOT = 'src';
const exts = ['.astro'];
let filesChanged = 0;
let replacements = 0;

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
    } else if (exts.includes(path.extname(entry.name))) {
      processFile(full);
    }
  }
}

function processFile(fp) {
  const src = fs.readFileSync(fp, 'utf8');
  // Solo spans de titulo (.line / .line gold) pegados sin espacio
  const fixed = src.replace(/<\/span>(\s*)<span class="line/g, (m, ws) => {
    // Si ya hay salto de linea/espacio entre ellos, no tocar
    if (ws.length > 0) return m;
    return '</span> <span class="line';
  });
  if (fixed !== src) {
    const n = (src.match(/<\/span><span class="line/g) || []).length;
    fs.writeFileSync(fp, fixed, 'utf8');
    filesChanged++;
    replacements += n;
    console.log(`${n}x  ${fp.replace(/\\/g, '/')}`);
  }
}

walk(ROOT);
console.log(`\nArchivos modificados: ${filesChanged}`);
console.log(`Reemplazos totales: ${replacements}`);
