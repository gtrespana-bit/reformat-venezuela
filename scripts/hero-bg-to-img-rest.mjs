import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.join(__dirname, '..', 'src');

function walk(d) {
  let out = [];
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) out = out.concat(walk(p));
    else if (e.name.endsWith('.astro')) out.push(p);
  }
  return out;
}

// ---- alt text maps ----
const serviceAltEs = {
  'fontaneria-plomeria': 'Servicios de fontanería y plomería profesional en Venezuela | RemodelaT',
  'instalacion-electrica': 'Instalación eléctrica residencial certificada en Venezuela | RemodelaT',
  'instalacion-pisos': 'Instalación de pisos de porcelanato, cerámica y madera en Venezuela | RemodelaT',
  'pintura-acabados': 'Pintura y acabados profesionales de interiores en Venezuela | RemodelaT',
  'piscinas-mantenimiento': 'Construcción y mantenimiento de piscinas en Venezuela | RemodelaT',
  'remodelacion-bano': 'Remodelación de baños con acabados premium en Venezuela | RemodelaT',
  'remodelacion-cocina': 'Remodelación de cocinas modernas con acabados premium | RemodelaT',
  'remodelacion-integral': 'Remodelación integral de apartamentos y casas en Venezuela | RemodelaT',
  'revestimientos-pared': 'Revestimientos de pared decorativos y porcelanato en Venezuela | RemodelaT',
};
const serviceAltEn = {
  bathrooms: 'Premium bathroom remodeling with spa-quality finishes in Venezuela | RemodelaT',
  electrical: 'Certified residential electrical installation services in Venezuela | RemodelaT',
  flooring: 'Porcelain, ceramic and hardwood flooring installation in Venezuela | RemodelaT',
  kitchens: 'Modern kitchen remodeling with premium finishes in Venezuela | RemodelaT',
  painting: 'Professional interior and exterior painting services in Venezuela | RemodelaT',
  plumbing: 'Professional plumbing services and installations in Venezuela | RemodelaT',
  pools: 'Swimming pool construction and maintenance in Venezuela | RemodelaT',
  'wall-coverings': 'Decorative wall coverings and large-format porcelain in Venezuela | RemodelaT',
  'whole-home': 'Whole-home remodeling and complete transformations in Venezuela | RemodelaT',
};
const cityAlt = {
  valencia: 'Remodelaciones y reformas de casas y apartamentos en Valencia, Carabobo | RemodelaT',
  caracas: 'Remodelaciones y reformas de apartamentos y casas en Caracas | RemodelaT',
  'san-diego': 'Remodelaciones y reformas de casas y apartamentos en San Diego, Carabobo | RemodelaT',
  'la-guaira': 'Remodelaciones y reformas de casas y apartamentos en La Guaira | RemodelaT',
};
const ctaAlt = {
  valencia: 'Cocina moderna terminada lista para entrega en Valencia | RemodelaT',
  caracas: 'Cocina moderna terminada lista para entrega en Caracas | RemodelaT',
  'san-diego': 'Cocina moderna terminada lista para entrega en San Diego | RemodelaT',
  'la-guaira': 'Cocina moderna terminada lista para entrega en La Guaira | RemodelaT',
};
const pageAlt = {
  contacto: 'Equipo de RemodelaT Venezuela en proyecto de remodelación residencial',
  proyectos: 'Proyecto de remodelación integral completado por RemodelaT Venezuela',
  'en/contact': 'RemodelaT Venezuela remodeling team working on a residential project',
  'en/projects': 'Completed whole-home remodeling project by RemodelaT Venezuela',
};

const results = [];

for (const fp of walk(srcDir)) {
  const rel = path.relative(srcDir, fp).replace(/\\/g, '/');
  let src = fs.readFileSync(fp, 'utf8');
  const orig = src;
  const fileResults = [];

  // determine alt resolver by path
  const base = path.basename(fp, '.astro');
  let altFor = null;
  if (rel.startsWith('pages/servicios/')) altFor = () => serviceAltEs[base] || `Servicio de remodelación ${base} | RemodelaT`;
  else if (rel.startsWith('pages/en/services/')) altFor = () => serviceAltEn[base] || `${base} service in Venezuela | RemodelaT`;
  else if (rel.startsWith('pages/') && cityAlt[base]) altFor = () => cityAlt[base];
  else if (pageAlt[rel.replace('.astro', '')]) altFor = () => pageAlt[rel.replace('.astro', '')];
  else altFor = () => 'Proyecto de remodelación residencial en Venezuela | RemodelaT';

  // ---- 1) static background-image divs ----
  const staticRe = /<div class="(hero-bg|cta-bg|page-hero-bg)" style="background-image: url\('([^']+)'\)"><\/div>/g;
  src = src.replace(staticRe, (m, cls, url) => {
    const alt = cls === 'cta-bg'
      ? (ctaAlt[base] || 'Espacio remodelado con acabados premium por RemodelaT Venezuela')
      : altFor();
    const prio = cls === 'hero-bg' || cls === 'page-hero-bg' ? ' fetchpriority="high" loading="eager"' : ' loading="lazy"';
    fileResults.push(`${cls} <- ${url}`);
    return `<img class="${cls}" src="${url}" alt="${alt}"${prio} decoding="async" />`;
  });

  // ---- 2) dynamic template-literal background-image divs (city pages) ----
  const dynRe = /<div class="(hero-bg|cta-bg)" style=\{`background-image: url\('\$\{([^}]+)\}'\)`\}><\/div>/g;
  src = src.replace(dynRe, (m, cls, expr) => {
    let alt;
    if (cls === 'cta-bg') alt = ctaAlt[base] || 'Espacio remodelado con acabados premium por RemodelaT Venezuela';
    else alt = altFor();
    const prio = cls === 'hero-bg' ? ' fetchpriority="high" loading="eager"' : ' loading="lazy"';
    fileResults.push(`${cls} <- \${${expr}}`);
    return `<img class="${cls}" src={${expr}} alt="${alt}"${prio} decoding="async" />`;
  });

  // ---- 3) CSS: make .hero-bg / .cta-bg / .page-hero-bg work as <img> ----
  // handles single-line and multi-line declarations, preserving extra props (z-index, transform)
  const cssClasses = ['hero-bg', 'cta-bg', 'page-hero-bg'];
  for (const cls of cssClasses) {
    const cssRe = new RegExp(
      '(\\.' + cls + '\\s*\\{)([^}]*)(\\})',
      'g'
    );
    src = src.replace(cssRe, (m, open, body, close) => {
      // only touch if it still has background sizing (i.e. was a bg element)
      if (!/background-size|background-position/.test(body)) return m;
      let nb = body;
      nb = nb.replace(/background-size\s*:\s*cover\s*;?/g, '');
      nb = nb.replace(/background-position\s*:\s*center\s*;?/g, '');
      // collapse whitespace/newlines left behind
      nb = nb.replace(/\s+/g, ' ').trim();
      const inject = 'width: 100%; height: 100%; object-fit: cover; object-position: center;';
      // keep it single-line if original was single-line, else multiline-ish
      const wasSingle = !body.includes('\n');
      if (wasSingle) {
        return `${open} ${[inject, nb].filter(Boolean).join(' ')} ${close}`;
      }
      return `${open}\n    ${inject}\n    ${nb}\n  ${close}`;
    });
  }

  if (src !== orig) {
    fs.writeFileSync(fp, src, 'utf8');
    results.push(`${rel}: ${fileResults.length} bg->img (${fileResults.join(', ')})`);
  }
}

console.log(`✅ Archivos modificados: ${results.length}`);
results.forEach((r) => console.log('  ' + r));
