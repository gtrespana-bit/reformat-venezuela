import fs from 'node:fs';

let report = [];

function replaceInFile(file, oldStr, newStr, label) {
  let src = fs.readFileSync(file, 'utf8');
  const parts = src.split(oldStr);
  const n = parts.length - 1;
  if (n > 0) {
    src = parts.join(newStr);
    fs.writeFileSync(file, src, 'utf8');
    report.push(`OK ${n}x  ${label}`);
  } else {
    report.push(`MISS     ${label}  -> "${oldStr.slice(0, 50)}..."`);
  }
}

const INDEX = 'src/pages/index.astro';
const BASE = 'src/layouts/BaseLayout.astro';

// --- HOME: H1 hero (3 spans, reemplazo por texto unico de cada span) ---
replaceInFile(INDEX,
  '<span class="line">Transformamos</span>',
  '<span class="line">Remodelaciones en Venezuela</span>',
  'index H1 linea 1');

replaceInFile(INDEX,
  '<span class="line gold">Tu Hogar y Negocio</span>',
  '<span class="line gold">Transformamos Tu Hogar</span>',
  'index H1 linea 2');

replaceInFile(INDEX,
  '<span class="line">con Excelencia</span>',
  '<span class="line">y Negocio con Excelencia</span>',
  'index H1 linea 3');

// --- HOME: hero-sub (keyword + geo completo) ---
replaceInFile(INDEX,
  'Con más de 20 años de experiencia en reforma de viviendas y negocios, garantizamos acabados impecables y la mayor confianza en Carabobo y la capital.',
  'Con más de 20 años de experiencia en remodelaciones y reformas de viviendas y negocios, garantizamos acabados impecables y la mayor confianza en Valencia, San Diego, Carabobo y Caracas.',
  'index hero-sub');

// --- HOME: H2s genericos -> con keywords ---
replaceInFile(INDEX,
  '<h2 class="section-title">Damos Vida a Tus Espacios</h2>',
  '<h2 class="section-title">Remodelaciones que Dan Vida a Tus Espacios</h2>',
  'index H2 servicios');

replaceInFile(INDEX,
  '<h2 class="section-title">Experiencia Europea,<br/>Ejecución Local</h2>',
  '<h2 class="section-title">Experiencia Europea en Reformas,<br/>Ejecución Local en Venezuela</h2>',
  'index H2 about');

replaceInFile(INDEX,
  '<h2 class="cta-title">Tu Espacio, Nuestra Pasión</h2>',
  '<h2 class="cta-title">Tu Remodelación, Nuestra Pasión</h2>',
  'index H2 cta');

replaceInFile(INDEX,
  '<h2 class="section-title">Hablemos de Tu Proyecto</h2>',
  '<h2 class="section-title">Hablemos de Tu Proyecto de Remodelación</h2>',
  'index H2 contacto');

// --- BASELAYOUT: eliminar bloque hreflang/canonical duplicado (lo emite SEO.astro) ---
{
  let src = fs.readFileSync(BASE, 'utf8');
  const re = /<!-- Hreflang: indicar a Google las versiones en cada idioma -->\r?\n\s*<link rel="canonical"[^>]*\/>\r?\n\s*<link rel="alternate" hreflang="es"[^>]*\/>\r?\n\s*<link rel="alternate" hreflang="en"[^>]*\/>\r?\n\s*<link rel="alternate" hreflang="x-default"[^>]*\/>/;
  if (re.test(src)) {
    src = src.replace(re, '<!-- Canonical + hreflang: emitidos por SEO.astro (fuente unica) -->');
    fs.writeFileSync(BASE, src, 'utf8');
    report.push('OK 1x  BaseLayout hreflang/canonical duplicado eliminado');
  } else {
    report.push('MISS     BaseLayout hreflang block (no encontro el patron)');
  }
}

console.log(report.join('\n'));
