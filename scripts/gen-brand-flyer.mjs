/**
 * Flyers premium RemodelaT — obras reales, diseño editorial.
 *
 * Fotos:
 *  - Cocina de lujo · Guataparo
 *  - Baño de lujo · Guataparo
 *  - Baño TEKA · San Diego
 *
 * Etiquetas de proyecto legibles (nunca nombres de archivo).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const GOLD = '#C9A961';
const GOLD_LIGHT = '#E8D5A3';
const GOLD_DEEP = '#A68B45';
const INK = '#0A0806';
const WHITE = '#FFFFFF';

const PHONE = '+58 422 799 7043';
const PHONE_SHORT = '0422 799 7043';
const WEB = 'remodelat.net';
const EMAIL = 'contacto@remodelat.net';

const P = {
  logo: 'public/images/logo-header.webp',
  cocina: 'public/images/proyectos/cocina-lujo-guataparo/resultado-final-cocina-lineal.webp',
  banoLujo: 'public/images/proyectos/banos-quinta-la-lagunita/bano-zona-1-completado.webp',
  banoTeka: 'public/images/proyectos/bano-san-diego/bano-finalizado-3.webp',
};

const abs = (p) => path.join(root, p);
const OUT = [
  path.join(root, 'public/images/brand'),
  path.join(root, 'marketing/facebook/export'),
];
for (const d of OUT) fs.mkdirSync(d, { recursive: true });

const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/**
 * Foto con marco dorado sutil, sello OBRA REAL y etiqueta de proyecto.
 */
async function framedPhoto(src, w, h, { position = 'centre', radius = 16, title, place, stamp = true } = {}) {
  const photo = await sharp(abs(src))
    .rotate()
    .resize(w, h, { fit: 'cover', position })
    .modulate({ brightness: 1.06, saturation: 1.08 })
    .sharpen({ sigma: 0.65 })
    .png()
    .toBuffer();

  const mask = Buffer.from(`
    <svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="${w}" height="${h}" rx="${radius}" ry="${radius}" fill="#fff"/>
    </svg>
  `);

  const chrome = Buffer.from(`
    <svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="shade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="42%" stop-color="#000" stop-opacity="0"/>
          <stop offset="100%" stop-color="#000" stop-opacity="0.72"/>
        </linearGradient>
        <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${GOLD_LIGHT}"/>
          <stop offset="100%" stop-color="${GOLD_DEEP}"/>
        </linearGradient>
      </defs>
      <rect x="1.5" y="1.5" width="${w - 3}" height="${h - 3}" rx="${Math.max(radius - 1, 0)}"
            fill="none" stroke="url(#ring)" stroke-width="2.4"/>
      <rect x="0" y="0" width="${w}" height="${h}" rx="${radius}" fill="url(#shade)"/>
      ${
        stamp
          ? `<g>
               <rect x="14" y="14" width="104" height="28" rx="6" fill="${GOLD}"/>
               <text x="66" y="33" text-anchor="middle"
                     font-family="DejaVu Sans, Arial, sans-serif"
                     font-size="11.5" font-weight="800" letter-spacing="1.3" fill="${INK}">OBRA REAL</text>
             </g>`
          : ''
      }
      ${
        title
          ? `<text x="16" y="${h - (place ? 36 : 20)}"
                   font-family="DejaVu Sans, Arial, sans-serif"
                   font-size="16" font-weight="700" letter-spacing="0.4" fill="${WHITE}">${esc(title)}</text>`
          : ''
      }
      ${
        place
          ? `<text x="16" y="${h - 16}"
                   font-family="DejaVu Sans, Arial, sans-serif"
                   font-size="12.5" fill="rgba(255,255,255,0.82)">${esc(place)}</text>`
          : ''
      }
    </svg>
  `);

  return sharp(photo)
    .ensureAlpha()
    .composite([
      { input: mask, blend: 'dest-in' },
      { input: chrome, blend: 'over' },
    ])
    .png()
    .toBuffer();
}

async function logoBuf(width = 320) {
  return sharp(abs(P.logo)).resize({ width }).png().toBuffer();
}

/* ═══════════════════════════════════════════════
   1080 × 1350  — feed / stories vertical
   ═══════════════════════════════════════════════ */
async function buildPortrait() {
  const W = 1080;
  const H = 1350;

  const photoCocina = await framedPhoto(P.cocina, 980, 360, {
    position: 'right',
    radius: 18,
    title: 'Cocina de lujo',
    place: 'Guataparo, Valencia',
  });
  const photoBanoLujo = await framedPhoto(P.banoLujo, 470, 340, {
    position: 'centre',
    radius: 18,
    title: 'Baño de lujo',
    place: 'Guataparo, Valencia',
  });
  const photoBanoTeka = await framedPhoto(P.banoTeka, 470, 340, {
    position: 'centre',
    radius: 18,
    title: 'Baño con poceta TEKA',
    place: 'San Diego, Carabobo',
  });
  const logo = await logoBuf(300);

  const ui = Buffer.from(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glow" cx="70%" cy="0%" r="55%">
      <stop offset="0%" stop-color="${GOLD}" stop-opacity="0.16"/>
      <stop offset="100%" stop-color="${GOLD}" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="${INK}"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>

  <!-- Badge -->
  <rect x="50" y="108" rx="16" ry="16" width="420" height="32"
        fill="rgba(201,169,97,0.12)" stroke="${GOLD}" stroke-opacity="0.72"/>
  <circle cx="72" cy="124" r="5" fill="${GOLD}"/>
  <text x="88" y="129" font-family="DejaVu Sans, Arial, sans-serif" font-size="12.5" font-weight="700"
        letter-spacing="1.4" fill="${GOLD_LIGHT}">FOTOS REALES DE NUESTRAS OBRAS</text>

  <!-- Headline -->
  <text x="50" y="195" font-family="DejaVu Serif, Georgia, serif" font-size="42" fill="${WHITE}">Remodelamos tu hogar,</text>
  <text x="50" y="246" font-family="DejaVu Serif, Georgia, serif" font-size="42" fill="${GOLD}">transformamos tu vida.</text>
  <text x="50" y="288" font-family="DejaVu Sans, Arial, sans-serif" font-size="15.5" fill="rgba(255,255,255,0.78)">
    Cada imagen es de una obra entregada. Sin stock. Sin inteligencia artificial.
  </text>

  <!-- Services strip under photos -->
  <text x="50" y="1048" font-family="DejaVu Sans, Arial, sans-serif" font-size="12" font-weight="700"
        letter-spacing="2.2" fill="${GOLD}">NUESTROS SERVICIOS</text>
  <text x="50" y="1078" font-family="DejaVu Sans, Arial, sans-serif" font-size="15" fill="rgba(255,255,255,0.88)">
    Interiores  ·  Cocinas  ·  Baños  ·  Obras civiles y acabados
  </text>
  <text x="1030" y="1048" text-anchor="end" font-family="DejaVu Sans, Arial, sans-serif"
        font-size="11.5" font-weight="700" letter-spacing="1.3" fill="rgba(232,213,163,0.9)">
    SIN STOCK · SIN IA · OBRA DOCUMENTADA
  </text>

  <!-- Footer blanco -->
  <rect x="0" y="1105" width="${W}" height="245" fill="${WHITE}"/>
  <rect x="0" y="1105" width="${W}" height="3" fill="${GOLD}"/>

  <circle cx="118" cy="1190" r="23" fill="none" stroke="${GOLD}" stroke-width="1.6"/>
  <text x="118" y="1196" text-anchor="middle" font-family="DejaVu Sans, Arial, sans-serif" font-size="12" fill="${GOLD}">www</text>
  <text x="156" y="1183" font-family="DejaVu Sans, Arial, sans-serif" font-size="13" fill="#666">Visita nuestra web</text>
  <text x="156" y="1207" font-family="DejaVu Sans, Arial, sans-serif" font-size="19" font-weight="700" fill="${INK}">${esc(WEB)}</text>

  <circle cx="430" cy="1190" r="23" fill="none" stroke="${GOLD}" stroke-width="1.6"/>
  <text x="430" y="1196" text-anchor="middle" font-family="DejaVu Sans, Arial, sans-serif" font-size="15" fill="${GOLD}">✓</text>
  <text x="468" y="1183" font-family="DejaVu Sans, Arial, sans-serif" font-size="13" fill="#666">Asesoría personalizada</text>
  <text x="468" y="1207" font-family="DejaVu Sans, Arial, sans-serif" font-size="16" font-weight="700" fill="${INK}">en cada proyecto</text>

  <circle cx="760" cy="1190" r="23" fill="none" stroke="${GOLD}" stroke-width="1.6"/>
  <text x="760" y="1196" text-anchor="middle" font-family="DejaVu Sans, Arial, sans-serif" font-size="15" fill="${GOLD}">✆</text>
  <text x="798" y="1183" font-family="DejaVu Sans, Arial, sans-serif" font-size="13" fill="#666">Contáctanos hoy</text>
  <text x="798" y="1207" font-family="DejaVu Sans, Arial, sans-serif" font-size="17" font-weight="700" fill="${INK}">${esc(PHONE)}</text>

  <line x1="80" y1="1260" x2="1000" y2="1260" stroke="#E8E0D0" stroke-width="1"/>
  <text x="540" y="1298" text-anchor="middle" font-family="DejaVu Sans, Arial, sans-serif" font-size="13.5" fill="#777">
    WhatsApp ${esc(PHONE_SHORT)}  ·  ${esc(EMAIL)}  ·  Caracas · Valencia · Carabobo  ·  Desde 2003
  </text>
  <text x="540" y="1328" text-anchor="middle" font-family="DejaVu Sans, Arial, sans-serif"
        font-size="11.5" font-weight="700" letter-spacing="1.5" fill="${GOLD}">
    TODAS LAS FOTOS SON DE OBRAS REALES EJECUTADAS POR REMODELAT
  </text>
</svg>`);

  return sharp({ create: { width: W, height: H, channels: 3, background: INK } })
    .composite([
      { input: ui, left: 0, top: 0 },
      { input: logo, left: 44, top: 30 },
      { input: photoCocina, left: 50, top: 310 },
      { input: photoBanoLujo, left: 50, top: 690 },
      { input: photoBanoTeka, left: 560, top: 690 },
    ])
    .jpeg({ quality: 93, mozjpeg: true, chromaSubsampling: '4:4:4' })
    .toBuffer();
}

/* ═══════════════════════════════════════════════
   1080 × 1080  — feed cuadrado
   ═══════════════════════════════════════════════ */
async function buildSquare() {
  const W = 1080;
  const H = 1080;

  const photoCocina = await framedPhoto(P.cocina, 980, 330, {
    position: 'right',
    radius: 16,
    title: 'Cocina de lujo',
    place: 'Guataparo, Valencia',
  });
  const photoBanoLujo = await framedPhoto(P.banoLujo, 470, 290, {
    position: 'centre',
    radius: 16,
    title: 'Baño de lujo',
    place: 'Guataparo',
  });
  const photoBanoTeka = await framedPhoto(P.banoTeka, 470, 290, {
    position: 'centre',
    radius: 16,
    title: 'Baño con poceta TEKA',
    place: 'San Diego',
  });
  const logo = await logoBuf(280);

  const ui = Buffer.from(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${W}" height="${H}" fill="${INK}"/>

  <rect x="50" y="100" rx="14" ry="14" width="400" height="30"
        fill="rgba(201,169,97,0.12)" stroke="${GOLD}" stroke-opacity="0.72"/>
  <circle cx="70" cy="115" r="4.5" fill="${GOLD}"/>
  <text x="84" y="120" font-family="DejaVu Sans, Arial, sans-serif" font-size="12" font-weight="700"
        letter-spacing="1.2" fill="${GOLD_LIGHT}">FOTOS REALES · SIN STOCK · SIN IA</text>

  <text x="50" y="175" font-family="DejaVu Serif, Georgia, serif" font-size="36" fill="${WHITE}">Remodelamos tu hogar,</text>
  <text x="50" y="218" font-family="DejaVu Serif, Georgia, serif" font-size="36" fill="${GOLD}">transformamos tu vida.</text>

  <rect x="0" y="910" width="${W}" height="170" fill="${WHITE}"/>
  <rect x="0" y="910" width="${W}" height="3" fill="${GOLD}"/>
  <text x="540" y="968" text-anchor="middle" font-family="DejaVu Sans, Arial, sans-serif"
        font-size="17" font-weight="700" fill="${INK}">${esc(WEB)}  ·  WhatsApp ${esc(PHONE)}</text>
  <text x="540" y="1002" text-anchor="middle" font-family="DejaVu Sans, Arial, sans-serif"
        font-size="14" fill="#666">Caracas · Valencia · San Diego · Carabobo</text>
  <text x="540" y="1040" text-anchor="middle" font-family="DejaVu Sans, Arial, sans-serif"
        font-size="12.5" font-weight="700" letter-spacing="1.5" fill="${GOLD}">OBRAS REALES DOCUMENTADAS · DESDE 2003</text>
</svg>`);

  return sharp({ create: { width: W, height: H, channels: 3, background: INK } })
    .composite([
      { input: ui, left: 0, top: 0 },
      { input: logo, left: 42, top: 26 },
      { input: photoCocina, left: 50, top: 245 },
      { input: photoBanoLujo, left: 50, top: 595 },
      { input: photoBanoTeka, left: 560, top: 595 },
    ])
    .jpeg({ quality: 93, mozjpeg: true })
    .toBuffer();
}

/* ═══════════════════════════════════════════════
   1200 × 628  — horizontal / OG / ads
   ═══════════════════════════════════════════════ */
async function buildHorizontal() {
  const W = 1200;
  const H = 628;

  const photoCocina = await framedPhoto(P.cocina, 560, 340, {
    position: 'right',
    radius: 14,
    title: 'Cocina de lujo',
    place: 'Guataparo',
  });
  const photoBanoLujo = await framedPhoto(P.banoLujo, 270, 210, {
    position: 'centre',
    radius: 12,
    title: 'Baño de lujo',
    place: 'Guataparo',
  });
  const photoBanoTeka = await framedPhoto(P.banoTeka, 270, 210, {
    position: 'centre',
    radius: 12,
    title: 'Baño TEKA',
    place: 'San Diego',
  });
  const logo = await logoBuf(250);

  const ui = Buffer.from(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glow" cx="30%" cy="20%" r="50%">
      <stop offset="0%" stop-color="${GOLD}" stop-opacity="0.14"/>
      <stop offset="100%" stop-color="${GOLD}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="${INK}"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>

  <rect x="36" y="100" rx="14" ry="14" width="300" height="28"
        fill="rgba(201,169,97,0.12)" stroke="${GOLD}" stroke-opacity="0.72"/>
  <circle cx="54" cy="114" r="4" fill="${GOLD}"/>
  <text x="68" y="119" font-family="DejaVu Sans, Arial, sans-serif" font-size="11.5" font-weight="700"
        letter-spacing="1.1" fill="${GOLD_LIGHT}">FOTOS REALES · OBRAS PROPIAS</text>

  <text x="36" y="185" font-family="DejaVu Serif, Georgia, serif" font-size="34" fill="${WHITE}">Remodelamos tu hogar,</text>
  <text x="36" y="228" font-family="DejaVu Serif, Georgia, serif" font-size="34" fill="${GOLD}">transformamos tu vida.</text>

  <text x="36" y="280" font-family="DejaVu Sans, Arial, sans-serif" font-size="15" fill="rgba(255,255,255,0.8)">
    <tspan x="36" dy="0">Cocinas, baños y reformas integrales</tspan>
    <tspan x="36" dy="22">con fotos reales de nuestros proyectos.</tspan>
  </text>

  <text x="36" y="360" font-family="DejaVu Sans, Arial, sans-serif" font-size="12" font-weight="700"
        letter-spacing="1.4" fill="${GOLD}">SIN STOCK  ·  SIN IA  ·  OBRA DOCUMENTADA</text>

  <text x="36" y="500" font-family="DejaVu Sans, Arial, sans-serif" font-size="18" font-weight="700" fill="${WHITE}">${esc(WEB)}</text>
  <text x="36" y="532" font-family="DejaVu Sans, Arial, sans-serif" font-size="16" fill="${GOLD}">WhatsApp ${esc(PHONE)}</text>
  <text x="36" y="565" font-family="DejaVu Sans, Arial, sans-serif" font-size="13" fill="rgba(255,255,255,0.55)">Desde 2003 · Caracas · Valencia · Carabobo</text>
</svg>`);

  return sharp({ create: { width: W, height: H, channels: 3, background: INK } })
    .composite([
      { input: ui, left: 0, top: 0 },
      { input: logo, left: 32, top: 22 },
      { input: photoCocina, left: 600, top: 36 },
      { input: photoBanoLujo, left: 600, top: 396 },
      { input: photoBanoTeka, left: 890, top: 396 },
    ])
    .jpeg({ quality: 93, mozjpeg: true })
    .toBuffer();
}

async function writeAll(buf, name) {
  for (const dir of OUT) {
    fs.writeFileSync(path.join(dir, name), buf);
    console.log('→', path.relative(root, path.join(dir, name)), `${(buf.length / 1024).toFixed(0)}KB`);
  }
}

const portrait = await buildPortrait();
await writeAll(portrait, 'flyer-obras-reales-1080x1350.jpg');
const square = await buildSquare();
await writeAll(square, 'flyer-obras-reales-1080x1080.jpg');
const horizontal = await buildHorizontal();
await writeAll(horizontal, 'flyer-obras-reales-1200x628.jpg');

for (const [name, buf] of [
  ['flyer-obras-reales-1080x1350.webp', portrait],
  ['flyer-obras-reales-1080x1080.webp', square],
  ['flyer-obras-reales-1200x628.webp', horizontal],
]) {
  const webp = await sharp(buf).webp({ quality: 87 }).toBuffer();
  fs.writeFileSync(path.join(root, 'public/images/brand', name), webp);
  console.log('→ public/images/brand/' + name, `${(webp.length / 1024).toFixed(0)}KB`);
}

const og = await sharp(horizontal).resize(1200, 630).webp({ quality: 88 }).toBuffer();
fs.writeFileSync(path.join(root, 'public/images/brand/og-obras-reales.webp'), og);
console.log('→ public/images/brand/og-obras-reales.webp');
console.log('OK');
