const fs = require('fs');
const path = require('path');

const serviceData = {
  'cocinas.astro': {
    name: 'Reformas de Cocina',
    serviceType: 'Kitchen Remodeling',
    description: 'Diseno y construccion de cocinas premium en Valencia y San Diego'
  },
  'banos.astro': {
    name: 'Reformas de Bano',
    serviceType: 'Bathroom Remodeling',
    description: 'Transformacion completa de banos con acabados premium'
  },
  'integrales.astro': {
    name: 'Reformas Integrales',
    serviceType: 'Whole Home Remodeling',
    description: 'Gestion profesional de reformas integrales de vivienda'
  },
  'electricidad.astro': {
    name: 'Instalaciones Electricas',
    serviceType: 'Electrical Services',
    description: 'Instalaciones electricas seguras y eficientes'
  },
  'fontaneria.astro': {
    name: 'Fontaneria',
    serviceType: 'Plumbing Services',
    description: 'Soluciones profesionales en fontaneria'
  },
  'pintura-acabados.astro': {
    name: 'Pintura y Acabados',
    serviceType: 'Painting and Finishing',
    description: 'Servicios profesionales de pintura y acabados decorativos'
  },
  'suelos.astro': {
    name: 'Instalacion de Suelos',
    serviceType: 'Flooring Installation',
    description: 'Instalacion profesional de todo tipo de suelos'
  },
  'piscinas.astro': {
    name: 'Construccion de Piscinas',
    serviceType: 'Pool Construction',
    description: 'Diseno y construccion de piscinas residenciales'
  },
  'revestimientos.astro': {
    name: 'Revestimientos Decorativos',
    serviceType: 'Wall Coverings',
    description: 'Instalacion profesional de revestimientos decorativos'
  }
};

const dir = 'C:/Users/kr-im/.openclaw/workspace/reformat-venezuela/src/pages/servicios';
const files = Object.keys(serviceData);

let updated = 0;

files.forEach(filename => {
  const fp = path.join(dir, filename);
  let content = fs.readFileSync(fp, 'utf8');
  const data = serviceData[filename];
  
  if (content.includes('ServiceSchema')) {
    console.log('SKIP: ' + filename + ' already has ServiceSchema');
    return;
  }
  
  const importLine = "import ServiceSchema from '../../components/ServiceSchema.astro';";
  
  const importMatch = content.match(/^(import .+)$/gm);
  if (importMatch && importMatch.length > 0) {
    const lastImport = importMatch[importMatch.length - 1];
    content = content.replace(lastImport, lastImport + '\n' + importLine);
  }
  
  const schemaComponent = '\n  <ServiceSchema\n    name="' + data.name + '"\n    description="' + data.description + '"\n    serviceType="' + data.serviceType + '"\n  />\n';
  
  content = content.replace('</BaseLayout>', schemaComponent + '</BaseLayout>');
  
  fs.writeFileSync(fp, content, 'utf8');
  console.log('OK: ' + filename);
  updated++;
});

console.log('\nTotal updated: ' + updated + '/' + files.length);
