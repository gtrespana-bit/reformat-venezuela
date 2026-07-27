import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const files = [
  path.join(root, 'src', 'components', 'SEO.astro'),
  path.join(root, 'src', 'components', 'ServiceSchema.astro'),
];

for (const fp of files) {
  let src = fs.readFileSync(fp, 'utf8');
  const before = (src.match(/"reviewCount":\s*"1"/g) || []).length;
  src = src.replace(/"reviewCount":\s*"1"/g, '"reviewCount": "3"');
  fs.writeFileSync(fp, src, 'utf8');
  console.log(`${path.basename(fp)}: reviewCount 1->3 (${before} match)`);
}
