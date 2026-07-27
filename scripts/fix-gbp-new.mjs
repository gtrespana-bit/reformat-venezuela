import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const seoPath = path.join(__dirname, '..', 'src', 'components', 'SEO.astro');

// Clean, stable canonical URL for the NEW Google Business Profile
// kgmid is the permanent Knowledge Graph entity id -> stable & public
const cleanGbp =
  'https://www.google.com/search?kgmid=/g/11nthq0r0m&q=ReformaT+-+Remodelaciones&hl=es-419';

let src = fs.readFileSync(seoPath, 'utf8');

// Replace the whole sameAs array (second element was the dead old profile)
const re = /"sameAs":\s*\[siteUrl,\s*'[^']*'\]/;
const matches = (src.match(re) || []).length;
src = src.replace(re, `"sameAs": [siteUrl, '${cleanGbp}']`);

fs.writeFileSync(seoPath, src, 'utf8');
console.log(`sameAs reemplazado: ${matches} match`);
console.log('Nueva URL GBP:', cleanGbp);
