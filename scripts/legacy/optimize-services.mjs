import sharp from 'sharp';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

const BASE = 'C:\\Users\\kr-im\\.openclaw\\workspace\\reformat-venezuela';
const IMG_DIR = join(BASE, 'public', 'images');

async function getDims(filename) {
  try {
    const meta = await sharp(join(IMG_DIR, filename)).metadata();
    return { w: meta.width, h: meta.height };
  } catch {
    return { w: 800, h: 533 };
  }
}

const servicesES = [
  { file: 'servicios/banos.astro', name: 'Remodelaci\u00f3n de Ba\u00f1os', desc: 'Dise\u00f1o y remodelaci\u00f3n de ba\u00f1os con acabados premium, duchas italianas y mobiliario a medida en Venezuela.', url: '/servicios/banos' },
  { file: 'servicios/cocinas.astro', name: 'Remodelaci\u00f3n de Cocinas', desc: 'Dise\u00f1o y remodelaci\u00f3n de cocinas funcionales y elegantes con materiales de primera calidad en Venezuela.', url: '/servicios/cocinas' },
  { file: 'servicios/electricidad.astro', name: 'Servicios El\u00e9ctricos', desc: 'Instalaciones el\u00e9ctricas certificadas, adecuaci\u00f3n de circuitos y automatizaci\u00f3n inteligente del hogar en Venezuela.', url: '/servicios/electricidad' },
  { file: 'servicios/fontaneria.astro', name: 'Fontaner\u00eda Profesional', desc: 'Instalaciones sanitarias, detecci\u00f3n de fugas y sistemas de agua eficientes para hogares y negocios en Venezuela.', url: '/servicios/fontaneria' },
  { file: 'servicios/integrales.astro', name: 'Reformas Integrales', desc: 'Transformaci\u00f3n completa de hogares y locales comerciales con gesti\u00f3n profesional y garant\u00eda integral en Venezuela.', url: '/servicios/integrales' },
  { file: 'servicios/pintura-acabados.astro', name: 'Pintura y Acabados', desc: 'Pintura de interiores y exteriores, estuco veneciano, microcemento y t\u00e9cnicas decorativas premium en Venezuela.', url: '/servicios/pintura-acabados' },
  { file: 'servicios/piscinas.astro', name: 'Piscinas', desc: 'Construcci\u00f3n, renovaci\u00f3n y mantenimiento de piscinas con sistemas de filtrado modernos en Venezuela.', url: '/servicios/piscinas' },
  { file: 'servicios/revestimientos.astro', name: 'Revestimientos de Paredes', desc: 'Porcelanato gran formato, paneles decorativos, piedra natural y microcemento para paredes en Venezuela.', url: '/servicios/revestimientos' },
  { file: 'servicios/suelos.astro', name: 'Instalaci\u00f3n de Suelos', desc: 'Porcelanato, laminados, vin\u00edlicos SPC/PVC y madera maciza con instalaci\u00f3n t\u00e9cnica profesional en Venezuela.', url: '/servicios/suelos' },
];

const servicesEN = [
  { file: 'en/services/bathrooms.astro', name: 'Bathroom Remodeling', desc: 'Bathroom design and remodeling with premium finishes, Italian showers and custom cabinetry in Venezuela.', url: '/en/services/bathrooms' },
  { file: 'en/services/kitchens.astro', name: 'Kitchen Remodeling', desc: 'Functional and elegant kitchen design and remodeling with first-quality materials in Venezuela.', url: '/en/services/kitchens' },
  { file: 'en/services/electrical.astro', name: 'Electrical Services', desc: 'Certified electrical installations, circuit upgrades and smart home automation in Venezuela.', url: '/en/services/electrical' },
  { file: 'en/services/plumbing.astro', name: 'Plumbing Services', desc: 'Professional plumbing installations, leak detection and efficient water systems in Venezuela.', url: '/en/services/plumbing' },
  { file: 'en/services/whole-home.astro', name: 'Whole-Home Remodeling', desc: 'Complete transformation of homes and commercial spaces with professional management in Venezuela.', url: '/en/services/whole-home' },
  { file: 'en/services/painting.astro', name: 'Painting & Finishes', desc: 'Interior and exterior painting, Venetian plaster, microcement and premium decorative techniques in Venezuela.', url: '/en/services/painting' },
  { file: 'en/services/pools.astro', name: 'Swimming Pools', desc: 'Pool construction, renovation and maintenance with modern filtration systems in Venezuela.', url: '/en/services/pools' },
  { file: 'en/services/wall-coverings.astro', name: 'Wall Coverings', desc: 'Large-format porcelain, decorative panels, natural stone and microcement for walls in Venezuela.', url: '/en/services/wall-coverings' },
  { file: 'en/services/flooring.astro', name: 'Flooring Installation', desc: 'Porcelain tiles, laminate, vinyl SPC/PVC and hardwood with professional installation in Venezuela.', url: '/en/services/flooring' },
];

const DOMAIN = 'https://reformatvenezuela.com';

function buildServiceSchema(svc) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": svc.name,
    "description": svc.desc,
    "url": DOMAIN + svc.url,
    "provider": {
      "@type": "HomeAndConstructionBusiness",
      "name": "ReformaT Venezuela",
      "url": DOMAIN
    },
    "areaServed": [
      { "@type": "City", "name": "Valencia" },
      { "@type": "City", "name": "San Diego" },
      { "@type": "City", "name": "Caracas" },
      { "@type": "City", "name": "La Guaira" }
    ]
  };
  return `\n<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`;
}

async function fixImages(content) {
  const imgRegex = /<img\s[^>]*?>/gs;
  let result = content;
  const replacements = [];
  let match;

  while ((match = imgRegex.exec(content)) !== null) {
    const fullTag = match[0];

    // Skip hero/LCP images
    if (fullTag.includes('fetchpriority="high"')) continue;
    // Skip if already fully optimized
    if (fullTag.includes('loading="lazy"') && fullTag.includes('decoding="async"') && /width="\d+"/.test(fullTag) && /height="\d+"/.test(fullTag)) continue;

    // Extract src
    const srcMatch = fullTag.match(/src="([^"]+)"/);
    if (!srcMatch) continue;
    const src = srcMatch[1];
    const filename = src.replace('/images/', '');
    const dims = await getDims(filename);

    let newTag = fullTag;

    // Fix loading attribute
    if (newTag.includes('loading="eager"')) {
      newTag = newTag.replace('loading="eager"', 'loading="lazy"');
    } else if (!newTag.includes('loading=')) {
      newTag = newTag.replace(/\s*\/?>$/, ' loading="lazy"$&');
    }

    // Add decoding if missing
    if (!newTag.includes('decoding=')) {
      newTag = newTag.replace(/\s*\/?>$/, ' decoding="async"$&');
    }

    // Add width/height if missing
    if (!/width="\d+"/.test(newTag)) {
      newTag = newTag.replace(/\s*\/?>$/, ` width="${dims.w}" height="${dims.h}"$&`);
    }

    if (newTag !== fullTag) {
      replacements.push({ old: fullTag, new: newTag });
    }
  }

  for (const r of replacements) {
    result = result.replace(r.old, r.new);
  }
  return result;
}

async function processFile(svc) {
  const filePath = join(BASE, 'src', 'pages', svc.file);
  let content = await readFile(filePath, 'utf-8');

  content = await fixImages(content);

  if (!content.includes('"@type": "Service"')) {
    const schema = buildServiceSchema(svc);
    const closeTag = '</BaseLayout>';
    if (content.includes(closeTag)) {
      content = content.replace(closeTag, schema + '\n' + closeTag);
    }
  }

  await writeFile(filePath, content, 'utf-8');
  console.log(`OK ${svc.file}`);
}

async function main() {
  console.log('--- ES pages ---');
  for (const svc of servicesES) await processFile(svc);
  console.log('--- EN pages ---');
  for (const svc of servicesEN) await processFile(svc);
  console.log('Done: 18 files updated');
}

main().catch(e => { console.error(e); process.exit(1); });
