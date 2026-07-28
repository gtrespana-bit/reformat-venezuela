const fs = require('fs');
const path = require('path');
const blogDir = 'C:\\Users\\kr-im\\.openclaw\\workspace\\reformat-venezuela\\src\\content\\blog';

const fixes = {
  'cuanto-cuesta-reforma-cocina-valencia.md': {
    replacement: `\n\n---\n\n## \u{1F4DA} Art\u00edculos Relacionados\n\n- **[Porcelanato vs Cer\u00e1mica: Cu\u00e1l Elegir](/blog/porcelanato-vs-ceramica)** \u2014 Compara materiales antes de decidir los acabados de tu cocina\n- **[Presupuesto de Reforma: 7 Errores Comunes](/blog/presupuesto-reforma-errores)** \u2014 Evita sorpresas financieras en tu proyecto\n- **[Tendencias en Cocinas 2025](/blog/tendencias-cocinas-2025)** \u2014 Insp\u00edrate con las \u00faltimas tendencias en dise\u00f1o de cocinas\n\n\u00bfNecesitas un presupuesto personalizado para tu reforma de cocina? **[Solicita tu cotizaci\u00f3n gratuita \u2192](/servicios/cocinas)**\n`
  },
  'porcelanato-vs-ceramica.md': {
    replacement: `\n\n---\n\n## \u{1F4DA} Art\u00edculos Relacionados\n\n- **[Cu\u00e1nto Cuesta Reformar una Cocina](/blog/cuanto-cuesta-reforma-cocina-valencia)** \u2014 Gu\u00eda de precios actualizada para tu proyecto\n- **[Presupuesto de Reforma: 7 Errores Comunes](/blog/presupuesto-reforma-errores)** \u2014 Protege tu inversi\u00f3n desde el primer d\u00eda\n\n\u00bfNecesitas asesoramiento para elegir revestimientos? **[Consulta nuestro servicio de revestimientos \u2192](/servicios/revestimientos)**\n`
  },
  'presupuesto-reforma-errores.md': {
    replacement: `\n\n---\n\n## \u{1F4DA} Art\u00edculos Relacionados\n\n- **[Cu\u00e1nto Cuesta Reformar una Cocina](/blog/cuanto-cuesta-reforma-cocina-valencia)** \u2014 Precios reales y desglosados para tu reforma de cocina\n- **[Reformas de Ba\u00f1os en Carabobo](/blog/reformas-banos-carabobo)** \u2014 Gu\u00eda completa de presupuestos y materiales para ba\u00f1os\n\n\u00bfListo para un presupuesto sin sorpresas? **[Solicita tu cotizaci\u00f3n gratuita \u2192](/contacto)**\n`
  },
  'reformas-banos-carabobo.md': {
    replacement: `\n\n---\n\n## \u{1F4DA} Art\u00edculos Relacionados\n\n- **[Porcelanato vs Cer\u00e1mica: Cu\u00e1l Elegir](/blog/porcelanato-vs-ceramica)** \u2014 Elige el material perfecto para tu ba\u00f1o\n- **[Presupuesto de Reforma: 7 Errores Comunes](/blog/presupuesto-reforma-errores)** \u2014 Controla el presupuesto de tu reforma\n\n\u00bfPlanificando la reforma de tu ba\u00f1o? **[Consulta nuestro servicio de ba\u00f1os \u2192](/servicios/banos)**\n`
  },
  'tendencias-cocinas-2025.md': {
    replacement: `\n\n---\n\n## \u{1F4DA} Art\u00edculos Relacionados\n\n- **[Cu\u00e1nto Cuesta Reformar una Cocina](/blog/cuanto-cuesta-reforma-cocina-valencia)** \u2014 Presupuestos reales para hacer realidad tu cocina ideal\n- **[Porcelanato vs Cer\u00e1mica: Cu\u00e1l Elegir](/blog/porcelanato-vs-ceramica)** \u2014 Los mejores materiales para encimeras y revestimientos\n\n\u00bfQuieres una cocina con las \u00faltimas tendencias? **[Dise\u00f1a tu cocina con nosotros \u2192](/servicios/cocinas)**\n`
  },
  'bathroom-remodel-carabobo-guide.md': {
    replacement: `\n\n---\n\n## \u{1F4DA} Related Articles\n\n- **[Porcelain Tile vs Ceramic Tile](/en/blog/porcelain-tile-vs-ceramic-tile-guide)** \u2014 Choose the right material for your bathroom\n- **[Remodel Budget Mistakes](/en/blog/remodel-budget-mistakes-avoid)** \u2014 Protect your investment from day one\n\nPlanning your bathroom remodel? **[Explore our bathroom services \u2192](/en/services/bathrooms)**\n`
  },
  'kitchen-design-trends-2026.md': {
    replacement: `\n\n---\n\n## \u{1F4DA} Related Articles\n\n- **[Kitchen Remodel Cost in Caracas & Valencia](/en/blog/kitchen-remodel-cost-caracas-valencia-2026)** \u2014 Real prices for your dream kitchen\n- **[Porcelain vs Ceramic Tile Guide](/en/blog/porcelain-tile-vs-ceramic-tile-guide)** \u2014 Best materials for countertops and backsplashes\n\nWant a trendy kitchen? **[Design your kitchen with us \u2192](/en/services/kitchens)**\n`
  },
  'kitchen-remodel-cost-caracas-valencia-2026.md': {
    replacement: `\n\n---\n\n## \u{1F4DA} Related Articles\n\n- **[5 Kitchen Design Trends for 2026](/en/blog/kitchen-design-trends-2026)** \u2014 Get inspired by the latest kitchen trends\n- **[Remodel Budget Mistakes to Avoid](/en/blog/remodel-budget-mistakes-avoid)** \u2014 Avoid costly budget surprises\n\nNeed a custom quote? **[Explore our kitchen remodeling service \u2192](/en/services/kitchens)**\n`
  },
  'porcelain-tile-vs-ceramic-tile-guide.md': {
    replacement: `\n\n---\n\n## \u{1F4DA} Related Articles\n\n- **[Kitchen Remodel Cost Guide](/en/blog/kitchen-remodel-cost-caracas-valencia-2026)** \u2014 Updated pricing for your kitchen project\n- **[Bathroom Remodel Guide in Carabobo](/en/blog/bathroom-remodel-carabobo-guide)** \u2014 Complete guide for bathroom renovations\n\nNeed help choosing materials? **[Check our flooring & cladding services \u2192](/en/services/flooring)**\n`
  },
  'remodel-budget-mistakes-avoid.md': {
    replacement: `\n\n---\n\n## \u{1F4DA} Related Articles\n\n- **[Kitchen Remodel Cost in Caracas & Valencia](/en/blog/kitchen-remodel-cost-caracas-valencia-2026)** \u2014 Real prices for kitchen renovations\n- **[Bathroom Remodel Guide](/en/blog/bathroom-remodel-carabobo-guide)** \u2014 Budget planning for bathroom projects\n\nReady for a stress-free remodel? **[Get your free quote \u2192](/contacto)**\n`
  }
};

let fixed = 0;
for (const [file, config] of Object.entries(fixes)) {
  const filePath = path.join(blogDir, file);
  if (!fs.existsSync(filePath)) { console.log('SKIP: ' + file); continue; }
  let content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  let cutIndex = -1;
  for (let i = lines.length - 1; i >= 0; i--) {
    const line = lines[i];
    if (line.match(/## .* (Art.culos|Related) (Relacionados|Articles)/i) || line.match(/## .*Art.culos/)) {
      cutIndex = i;
      if (i > 0 && lines[i-1].trim() === '') cutIndex = i - 1;
      if (i > 1 && lines[i-2].trim() === '---') cutIndex = i - 2;
      if (i > 2 && lines[i-3].trim() === '') cutIndex = i - 3;
      break;
    }
  }
  if (cutIndex >= 0) {
    const cleanContent = lines.slice(0, cutIndex).join('\n').trimEnd();
    content = cleanContent + '\n' + config.replacement + '\n';
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('FIXED: ' + file);
    fixed++;
  } else {
    console.log('NO CORRUPT SECTION FOUND: ' + file);
  }
}
console.log('\nFixed ' + fixed + ' files');
