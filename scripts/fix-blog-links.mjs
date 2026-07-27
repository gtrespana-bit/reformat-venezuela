import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(__dirname, '..', 'src', 'content', 'blog');

const map = {
  '/servicios/cocinas': '/servicios/remodelacion-cocina',
  '/servicios/banos': '/servicios/remodelacion-bano',
  '/servicios/remodelacion-banos': '/servicios/remodelacion-bano',
  '/servicios/revestimientos': '/servicios/revestimientos-pared',
  '/servicios/zonas/remodelacion-bano-altamira': '/remodelacion-bano-altamira',
  '/servicios/zonas/remodelacion-bano-la-castellana': '/remodelacion-bano-la-castellana',
  '/servicios/zonas/remodelacion-bano-la-lagunita': '/remodelacion-bano-la-lagunita',
  '/servicios/zonas/remodelacion-integral-altamira': '/remodelacion-integral-altamira',
  '/servicios/zonas/remodelacion-integral-el-vinedo': '/remodelacion-integral-el-vinedo',
  '/servicios/zonas/remodelacion-integral-guataparo': '/remodelacion-integral-guataparo',
  '/servicios/zonas/remodelacion-integral-la-lagunita': '/remodelacion-integral-la-lagunita',
  '/servicios/zonas/remodelacion-cocina-altamira': '/remodelacion-cocina-altamira',
  '/servicios/zonas/remodelacion-integral-country-club': '/remodelacion-integral-country-club',
  '/servicios/zonas/remodelacion-integral-campo-alegre': '/remodelacion-integral-campo-alegre',
};

let totalFixed = 0;
let filesChanged = 0;
for (const f of fs.readdirSync(dir).filter((f) => f.endsWith('.md'))) {
  const fp = path.join(dir, f);
  let src = fs.readFileSync(fp, 'utf8');
  let count = 0;
  for (const [from, to] of Object.entries(map)) {
    const esc = from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp('\\]\\(' + esc + '(?=[/)#])', 'g');
    src = src.replace(re, () => {
      count++;
      return '](' + to;
    });
  }
  if (count > 0) {
    fs.writeFileSync(fp, src, 'utf8');
    filesChanged++;
    totalFixed += count;
    console.log(`${f}: ${count} links fixed`);
  }
}
console.log('---');
console.log(`Total: ${totalFixed} links fixed in ${filesChanged} files`);
