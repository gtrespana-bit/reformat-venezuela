import { readFileSync, writeFileSync, existsSync } from 'fs';

const serviceNames = {
  'fontaneria-plomeria': 'Fontanería y Plomería',
  'instalacion-electrica': 'Instalación Eléctrica',
  'instalacion-pisos': 'Instalación de Suelos',
  'pintura-acabados': 'Pintura y Acabados',
  'piscinas-mantenimiento': 'Piscinas y Mantenimiento',
  'remodelacion-bano': 'Remodelación de Baños',
  'remodelacion-cocina': 'Remodelación de Cocinas',
  'remodelacion-integral': 'Remodelación Integral',
  'revestimientos-pared': 'Revestimientos de Pared',
};

const cityNames = {
  'caracas': 'Caracas',
  'valencia': 'Valencia',
  'la-guaira': 'La Guaira',
  'san-diego': 'San Diego',
};

let count = 0;

// ── Service sub-pages ──
for (const [slug, name] of Object.entries(serviceNames)) {
  const file = `src/pages/servicios/${slug}.astro`;
  if (!existsSync(file)) { console.log(`❌ ${file} no existe`); continue; }
  let c = readFileSync(file, 'utf-8');
  if (c.includes('Breadcrumb')) { console.log(`⏭️  servicios/${slug} (ya tiene)`); continue; }

  c = c.replace(
    "import ServiceSchema from '../../components/ServiceSchema.astro';",
    "import ServiceSchema from '../../components/ServiceSchema.astro';\nimport Breadcrumb from '../../components/Breadcrumb.astro';"
  );
  c = c.replace(
    '<header class="article-hero">',
    `<Breadcrumb items={[\n  { name: 'Inicio', url: '/' },\n  { name: 'Servicios', url: '/servicios' },\n  { name: '${name}', url: '/servicios/${slug}' }\n]} />\n\n<header class="article-hero">`
  );

  writeFileSync(file, c);
  console.log(`✅ servicios/${slug}`);
  count++;
}

// ── City pages ──
for (const [slug, name] of Object.entries(cityNames)) {
  const file = `src/pages/${slug}.astro`;
  if (!existsSync(file)) { console.log(`❌ ${file} no existe`); continue; }
  let c = readFileSync(file, 'utf-8');
  if (c.includes('Breadcrumb')) { console.log(`⏭️  ${slug} (ya tiene)`); continue; }

  c = c.replace(
    "import { getCollection } from 'astro:content';",
    "import { getCollection } from 'astro:content';\nimport Breadcrumb from '../components/Breadcrumb.astro';"
  );
  c = c.replace(
    '  <!-- ═══════════════ HERO ═══════════════ -->',
    `  <Breadcrumb items={[\n    { name: 'Inicio', url: '/' },\n    { name: '${name}', url: '/${slug}' }\n  ]} />\n\n  <!-- ═══════════════ HERO ═══════════════ -->`
  );

  writeFileSync(file, c);
  console.log(`✅ ${slug}`);
  count++;
}

console.log(`\n🎉 ${count} archivos actualizados`);
