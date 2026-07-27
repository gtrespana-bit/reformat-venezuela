import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pagesDir = path.join(__dirname, '..', 'src', 'pages');

const zoneNames = {
  'altamira': 'Altamira', 'alto-hatillo': 'Alto Hatillo', 'campo-alegre': 'Campo Alegre',
  'chacao': 'Chacao', 'country-club': 'Country Club', 'el-hatillo': 'El Hatillo',
  'el-parral': 'El Parral', 'el-penon': 'El Peñón', 'el-trigal': 'El Trigal',
  'el-vinedo': 'El Viñedo', 'guacara': 'Guacara', 'guataparo': 'Guataparo',
  'la-castellana': 'La Castellana', 'la-lagunita': 'La Lagunita', 'las-mercedes': 'Las Mercedes',
  'la-trigalena': 'La Trigaleña', 'los-guayos': 'Los Guayos', 'los-naranjos': 'Los Naranjos',
  'manongo': 'Manongo', 'naguanagua': 'Naguanagua', 'prados-del-este': 'Prados del Este',
  'prebo': 'Prebo', 'puerto-cabello': 'Puerto Cabello', 'san-diego': 'San Diego',
  'tocuyito': 'Tocuyito', 'valencia-centro': 'Valencia Centro', 'valles-de-camoruco': 'Valles de Camoruco',
};

const serviceAlt = {
  cocina: 'Remodelación de cocinas',
  bano: 'Remodelación de baños',
  integral: 'Reforma integral',
};

const files = fs
  .readdirSync(pagesDir)
  .filter((f) => /^remodelacion-(bano|cocina|integral)-.+\.astro$/.test(f));

let updated = 0;
const problems = [];

for (const file of files) {
  const m = file.match(/^remodelacion-(bano|cocina|integral)-(.+)\.astro$/);
  if (!m) continue;
  const [, service, zone] = m;
  const fp = path.join(pagesDir, file);
  let src = fs.readFileSync(fp, 'utf8');

  if (src.includes('<img class="hero-bg"')) {
    console.log(`skip (ya es img): ${file}`);
    continue;
  }

  // 1) extraer URL del hero-bg background-image
  const bgRe = /<div class="hero-bg" style="background-image: url\('([^']+)'\)"><\/div>/;
  const bgMatch = src.match(bgRe);
  if (!bgMatch) {
    problems.push(`SIN hero-bg div: ${file}`);
    continue;
  }
  const url = bgMatch[1];
  const zoneName = zoneNames[zone] || zone;
  const alt = `${serviceAlt[service]} en ${zoneName} | ReformaT Venezuela`;

  const imgTag = `<img class="hero-bg" src="${url}" alt="${alt}" fetchpriority="high" loading="eager" decoding="async" />`;
  src = src.replace(bgRe, imgTag);

  // 2) actualizar CSS scoped de .hero-bg (de background a object-fit)
  const cssRe = /\.hero-bg \{ position: absolute; inset: 0; background-size: cover; background-position: center; transform: scale\(1\.05\); \}/;
  if (cssRe.test(src)) {
    src = src.replace(
      cssRe,
      '.hero-bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center; transform: scale(1.05); z-index: 1; }'
    );
  } else {
    problems.push(`SIN css .hero-bg esperado: ${file}`);
  }

  fs.writeFileSync(fp, src, 'utf8');
  updated++;
}

console.log(`\n✅ Heroes convertidos a <img>: ${updated}`);
if (problems.length) {
  console.log('⚠️ Problemas:');
  problems.forEach((p) => console.log('  - ' + p));
}
