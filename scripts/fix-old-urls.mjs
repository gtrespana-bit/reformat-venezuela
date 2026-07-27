import fs from 'node:fs';

const fixes = [
  // [file, old, new]
  // index.astro - service card links
  ['src/pages/index.astro', '"/servicios/cocinas"', '"/servicios/remodelacion-cocina"'],
  ['src/pages/index.astro', '"/servicios/banos"', '"/servicios/remodelacion-bano"'],
  ['src/pages/index.astro', '"/servicios/integrales"', '"/servicios/remodelacion-integral"'],
  ['src/pages/index.astro', '"/servicios/electricidad"', '"/servicios/instalacion-electrica"'],
  ['src/pages/index.astro', '"/servicios/suelos"', '"/servicios/instalacion-pisos"'],
  // SEO.astro - hreflang route map
  ['src/components/SEO.astro', "'/servicios/cocinas'", "'/servicios/remodelacion-cocina'"],
  ['src/components/SEO.astro', "'/servicios/banos'", "'/servicios/remodelacion-bano'"],
  ['src/components/SEO.astro', "'/servicios/integrales'", "'/servicios/remodelacion-integral'"],
  ['src/components/SEO.astro', "'/servicios/electricidad'", "'/servicios/instalacion-electrica'"],
  ['src/components/SEO.astro', "'/servicios/fontaneria'", "'/servicios/fontaneria-plomeria'"],
  ['src/components/SEO.astro', "'/servicios/revestimientos'", "'/servicios/revestimientos-pared'"],
  ['src/components/SEO.astro', "'/servicios/suelos'", "'/servicios/instalacion-pisos'"],
  ['src/components/SEO.astro', "'/servicios/piscinas'", "'/servicios/piscinas-mantenimiento'"],
  // instalacion-pisos.astro - schema URL
  ['src/pages/servicios/instalacion-pisos.astro', 'https://reformatvenezuela.com/servicios/suelos', 'https://reformatvenezuela.com/servicios/instalacion-pisos'],
];

let total = 0;
for (const [file, old, neu] of fixes) {
  let src = fs.readFileSync(file, 'utf8');
  const parts = src.split(old);
  const n = parts.length - 1;
  if (n > 0) {
    src = parts.join(neu);
    fs.writeFileSync(file, src, 'utf8');
    console.log(`${n}x  ${file}: ${old} -> ${neu}`);
    total += n;
  } else {
    console.log(`MISS ${file}: ${old}`);
  }
}
console.log(`\nTotal: ${total}`);
