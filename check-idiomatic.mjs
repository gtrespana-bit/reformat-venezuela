import { readFileSync } from 'fs';

const files = [
  'bathrooms', 'kitchens', 'electrical',
  'plumbing', 'whole-home', 'painting',
  'pools', 'wall-coverings', 'flooring'
];

const idioms = ["you'll", "we've", "don't", "Let's", "you're", "we'll", "it's", "that's"];

for (const f of files) {
  try {
    const c = readFileSync(`src/pages/en/services/${f}.astro`, 'utf-8');
    const lines = c.split('\n').length;
    const found = idioms.filter(id => c.includes(id));
    const score = found.length;
    console.log(`${f}: ${lines} lines, idiomatic markers: ${score} [${found.join(', ')}]`);
  } catch (e) {
    console.log(`${f}: ERROR - ${e.message}`);
  }
}
