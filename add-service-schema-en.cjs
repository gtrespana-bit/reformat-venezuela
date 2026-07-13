const fs = require('fs');
const path = require('path');

const serviceData = {
  'kitchens.astro': {
    name: 'Kitchen Remodeling',
    serviceType: 'Kitchen Remodeling',
    description: 'Premium kitchen design and construction in Valencia and San Diego'
  },
  'bathrooms.astro': {
    name: 'Bathroom Remodeling',
    serviceType: 'Bathroom Remodeling',
    description: 'Complete bathroom transformations with premium fixtures'
  },
  'whole-home.astro': {
    name: 'Whole Home Remodeling',
    serviceType: 'Whole Home Remodeling',
    description: 'Professional management of complete home renovations'
  },
  'electrical.astro': {
    name: 'Electrical Services',
    serviceType: 'Electrical Services',
    description: 'Safe and efficient electrical installations and upgrades'
  },
  'plumbing.astro': {
    name: 'Plumbing Services',
    serviceType: 'Plumbing Services',
    description: 'Professional plumbing solutions and leak detection'
  },
  'painting.astro': {
    name: 'Painting and Finishing',
    serviceType: 'Painting and Finishing',
    description: 'Professional painting and decorative finishing services'
  },
  'flooring.astro': {
    name: 'Flooring Installation',
    serviceType: 'Flooring Installation',
    description: 'Professional installation of all types of flooring'
  },
  'pools.astro': {
    name: 'Pool Construction',
    serviceType: 'Pool Construction',
    description: 'Residential pool design and construction'
  },
  'wall-coverings.astro': {
    name: 'Wall Coverings',
    serviceType: 'Wall Coverings',
    description: 'Professional installation of decorative wall coverings'
  }
};

const dir = 'C:/Users/kr-im/.openclaw/workspace/reformat-venezuela/src/pages/en/services';
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
  
  // Add import
  const importLine = "import ServiceSchema from '../../../components/ServiceSchema.astro';";
  const importMatch = content.match(/^(import .+)$/gm);
  if (importMatch && importMatch.length > 0) {
    const lastImport = importMatch[importMatch.length - 1];
    content = content.replace(lastImport, lastImport + '\n' + importLine);
  }
  
  // Add component before </BaseLayout>
  const schemaComponent = '\n  <ServiceSchema\n    name="' + data.name + '"\n    description="' + data.description + '"\n    serviceType="' + data.serviceType + '"\n  />\n';
  
  content = content.replace('</BaseLayout>', schemaComponent + '</BaseLayout>');
  
  fs.writeFileSync(fp, content, 'utf8');
  console.log('OK: ' + filename);
  updated++;
});

console.log('\nTotal updated: ' + updated + '/' + files.length);
