import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const seoPath = path.join(root, 'src', 'components', 'SEO.astro');
const svcPath = path.join(root, 'src', 'components', 'ServiceSchema.astro');

// ---- 1) Resolve real Google Business Profile URL ----
const shareUrl = 'https://share.google/hdo3YDIIaqd4vwTl5';
let gbpUrl = shareUrl; // fallback
try {
  const res = await fetch(shareUrl, { redirect: 'follow' });
  if (res.url && res.url.startsWith('http')) gbpUrl = res.url;
  console.log('GBP resolved ->', gbpUrl);
} catch (e) {
  console.log('GBP resolve failed, using share link ->', e.message);
}

// ---- 2) Edit SEO.astro ----
let seo = fs.readFileSync(seoPath, 'utf8');
const log = [];
function rep(label, re, replacement, src) {
  const n = (src.match(re) || []).length;
  const out = src.replace(re, replacement);
  log.push(`${label}: ${n} match(es)`);
  return out;
}

// Address
seo = rep('streetAddress', /("streetAddress":\s*)"[^"]*"/, '$1"Callejón Los Cocos S/N"', seo);
seo = rep('addressLocality', /("addressLocality":\s*)"Valencia"/, '$1"San Diego"', seo);
seo = rep('postalCode', /("postalCode":\s*)"2001"/, '$1"2006"', seo);

// Geo coordinates (schema + meta) — global, these tokens are geo-only
const latCount = (seo.match(/10\.1620/g) || []).length;
const lngCount = (seo.match(/-68\.0077/g) || []).length;
seo = seo.replace(/10\.1620/g, '10.2669');
seo = seo.replace(/-68\.0077/g, '-67.9659');
log.push(`latitude 10.1620->10.2669: ${latCount}`);
log.push(`longitude -68.0077->-67.9659: ${lngCount}`);

// geo.placename meta: put San Diego first (business location)
seo = rep(
  'geo.placename',
  /content="Valencia, San Diego, Caracas, Carabobo"/,
  'content="San Diego, Valencia, Caracas, Carabobo"',
  seo
);

// sameAs: add Google Business Profile
seo = rep('sameAs', /"sameAs":\s*\[siteUrl\]/, `"sameAs": [siteUrl, '${gbpUrl}']`, seo);

// Add aggregateRating to main HomeAndConstructionBusiness (genuine 5.0 / 1 review)
if (!/"aggregateRating"/.test(seo)) {
  seo = seo.replace(
    /("priceRange":\s*"\$\$",)/,
    `$1\n  "aggregateRating": {\n    "@type": "AggregateRating",\n    "ratingValue": "5.0",\n    "reviewCount": "1",\n    "bestRating": "5"\n  },`
  );
  log.push('aggregateRating inserted into HomeAndConstructionBusiness: 1');
} else {
  log.push('aggregateRating already present in SEO.astro: skipped');
}

fs.writeFileSync(seoPath, seo, 'utf8');

// ---- 3) Fix ServiceSchema.astro fake rating (4.9/47 -> genuine 5.0/1) ----
let svc = fs.readFileSync(svcPath, 'utf8');
const svcLog = [];
svc = svc.replace(/"ratingValue":\s*"4\.9"/, '"ratingValue": "5.0"');
svcLog.push('ratingValue 4.9->5.0');
svc = svc.replace(/"reviewCount":\s*"47"/, '"reviewCount": "1"');
svcLog.push('reviewCount 47->1');
fs.writeFileSync(svcPath, svc, 'utf8');

// ---- 4) Scan city pages for stale address (report only) ----
const pagesDir = path.join(root, 'src', 'pages');
const stale = [];
for (const f of ['caracas.astro', 'valencia.astro', 'san-diego.astro', 'la-guaira.astro']) {
  const fp = path.join(pagesDir, f);
  if (!fs.existsSync(fp)) continue;
  const c = fs.readFileSync(fp, 'utf8');
  if (/2001|Avenida Bol|Centro Profesional/.test(c)) stale.push(f);
}

console.log('\n=== SEO.astro ===');
log.forEach((l) => console.log('  ' + l));
console.log('\n=== ServiceSchema.astro ===');
svcLog.forEach((l) => console.log('  ' + l));
console.log('\n=== City pages con direccion vieja (revisar) ===');
console.log(stale.length ? stale.join(', ') : 'ninguna');
console.log('\nGBP URL usada:', gbpUrl);
