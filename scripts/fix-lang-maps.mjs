import fs from 'node:fs';

const file = 'src/layouts/BaseLayout.astro';
let src = fs.readFileSync(file, 'utf8');

// Old ES service slugs -> new SEO slugs (EN slugs unchanged)
// Each old slug appears: 1x in hreflang esToEnMap (trailing slash) + 2x in script routeMap (no slash: ES->EN key and EN->ES value)
const repl = [
  // [old, new]  (both trailing-slash and no-slash variants handled separately)
  ["'/servicios/cocinas/'", "'/servicios/remodelacion-cocina/'"],
  ["'/servicios/cocinas'", "'/servicios/remodelacion-cocina'"],
  ["'/servicios/banos/'", "'/servicios/remodelacion-bano/'"],
  ["'/servicios/banos'", "'/servicios/remodelacion-bano'"],
  ["'/servicios/integrales/'", "'/servicios/remodelacion-integral/'"],
  ["'/servicios/integrales'", "'/servicios/remodelacion-integral'"],
  ["'/servicios/suelos/'", "'/servicios/instalacion-pisos/'"],
  ["'/servicios/suelos'", "'/servicios/instalacion-pisos'"],
  ["'/servicios/fontaneria/'", "'/servicios/fontaneria-plomeria/'"],
  ["'/servicios/fontaneria'", "'/servicios/fontaneria-plomeria'"],
  ["'/servicios/piscinas/'", "'/servicios/piscinas-mantenimiento/'"],
  ["'/servicios/piscinas'", "'/servicios/piscinas-mantenimiento'"],
  ["'/servicios/electricidad/'", "'/servicios/instalacion-electrica/'"],
  ["'/servicios/electricidad'", "'/servicios/instalacion-electrica'"],
  ["'/servicios/revestimientos/'", "'/servicios/revestimientos-pared/'"],
  ["'/servicios/revestimientos'", "'/servicios/revestimientos-pared'"],
];

let total = 0;
for (const [old, neu] of repl) {
  const parts = src.split(old);
  const n = parts.length - 1;
  if (n > 0) {
    src = parts.join(neu);
    console.log(`${n}x  ${old} -> ${neu}`);
    total += n;
  } else {
    console.log(`MISS ${old}`);
  }
}

fs.writeFileSync(file, src, 'utf8');
console.log(`\nTotal replacements: ${total}`);
