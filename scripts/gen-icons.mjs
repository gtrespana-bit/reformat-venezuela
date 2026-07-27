import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const pub = path.join(root, 'public');
const src = path.join(pub, 'favicon-v3.png');

const iconsDir = path.join(pub, 'icons');
fs.mkdirSync(iconsDir, { recursive: true });

const sizes = [
  { name: 'icon-192.png', size: 192 },
  { name: 'icon-512.png', size: 512 },
  { name: 'icon-180.png', size: 180 }, // apple-touch
  { name: 'icon-32.png', size: 32 },
  { name: 'icon-16.png', size: 16 },
];

for (const { name, size } of sizes) {
  const out = path.join(iconsDir, name);
  await sharp(src)
    .resize(size, size, { fit: 'cover', position: 'centre' })
    .png({ compressionLevel: 9 })
    .toFile(out);
  console.log(`icons/${name} (${size}x${size}) -> ${fs.statSync(out).size}B`);
}

// manifest.json
const manifest = {
  name: 'ReformaT Venezuela',
  short_name: 'ReformaT',
  description:
    'Reformas integrales, cocinas y baños con estándares europeos en Valencia, San Diego, Carabobo y Caracas.',
  start_url: '/',
  scope: '/',
  display: 'standalone',
  orientation: 'portrait',
  background_color: '#0a0a0a',
  theme_color: '#0a0a0a',
  lang: 'es',
  icons: [
    { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
    { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
    { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
  ],
};
fs.writeFileSync(path.join(pub, 'manifest.json'), JSON.stringify(manifest, null, 2), 'utf8');
console.log('manifest.json escrito');
