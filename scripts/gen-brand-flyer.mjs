/**
 * Flyer RemodelaT — obras REALES del portafolio.
 * Layout: panel oscuro de marca + collage de 3 fotos documentadas
 * (Cocina Finalizada, Baño zona 1, Baño 1) con sellos "OBRA REAL".
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const GOLD = '#C9A961';
const GOLD_LIGHT = '#E8D5A3';
const INK = '#0A0806';
const WHITE = '#FFFFFF';

const PHONE = '+58 422 799 7043';
const PHONE_SHORT = '0422 799 7043';
const WEB = 'remodelat.net';
const EMAIL = 'contacto@remodelat.net';

const P = {
  logo: 'public/images/logo-header.webp',
  cocina: 'public/images/proyectos/cocina-lujo-guataparo/resultado-final-cocina-lineal.webp',
  cocina2: 'public/images/proyectos/cocina-lujo-guataparo/resultado-final-comedor-abierto.webp',
  banoZona1: 'public/images/proyectos/banos-quinta-la-lagunita/bano-zona-1-completado.webp',
  banoZona1b: 'public/images/proyectos/banos-quinta-la-lagunita/bano-zona-1-completado-2.webp',
  bano1: 'public/images/proyectos/bano-caracas/bano-principal-finalizado-1.webp',
};

const abs = (p) => path.join(root, p);
const OUT = [
  path.join(root, 'public/images/brand'),
  path.join(root, 'marketing/facebook/export'),
];
for (const d of OUT) fs.mkdirSync(d, { recursive: true });

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

async function framePhoto(src, w, h, opts = {}) {
  const {
    position = 'centre',
    radius = 18,
    label,
    sublabel,
    stamp = true,
  } = opts;

  const photo = await sharp(abs(src))
    .rotate()
    .resize(w, h, { fit: 'cover', position })
    .modulate({ brightness: 1.04, saturation: 1.05 })
    .sharpen({ sigma: 0.6 })
    .png()
    .toBuffer();

  // Rounded rect mask
  const mask = Buffer.from(`
    <svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="${w}" height="${h}" rx="${radius}" ry="${radius}" fill="white"/>
    </svg>
  `);

  // Gold border + bottom gradient for label legibility + labels
  const chrome = Buffer.from(`
    <svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bot" x1="0" y1="0" x2="0" y2="1">
          <stop offset="45%" stop-color="#000" stop-opacity="0"/>
          <stop offset="100%" stop-color="#000" stop-opacity="0.78"/>
        </linearGradient>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#E8D5A3"/>
          <stop offset="100%" stop-color="#C9A961"/>
        </linearGradient>
      </defs>
      <rect x="1.5" y="1.5" width="${w - 3}" height="${h - 3}" rx="${radius - 1}" ry="${radius - 1}"
            fill="none" stroke="url(#g)" stroke-width="2.5"/>
      <rect x="0" y="0" width="${w}" height="${h}" rx="${radius}" fill="url(#bot)"/>
      ${
        stamp
          ? `<rect x="14" y="14" width="108" height="28" rx="6" fill="${GOLD}"/>
             <text x="68" y="33" text-anchor="middle" font-family="DejaVu Sans, Arial, sans-serif"
                   font-size="12" font-weight="700" letter-spacing="1.2" fill="${INK}">OBRA REAL</text>`
          : ''
      }
      ${
        label
          ? `<text x="16" y="${h - (sublabel ? 34 : 18)}" font-family="DejaVu Sans, Arial, sans-serif"
                   font-size="15" font-weight="700" letter-spacing="0.6" fill="${WHITE}">${esc(label)}</text>`
          : ''
      }
      ${
        sublabel
          ? `<text x="16" y="${h - 14}" font-family="DejaVu Sans, Arial, sans-serif"
                   font-size="12" fill="rgba(255,255,255,0.82)">${esc(sublabel)}</text>`
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

async function buildPortrait() {
  const W = 1080;
  const H = 1350;

  /* Layout vertical limpio (sin solapes):
   * 0–300   marca + titular
   * 320–660 cocina (340px)
   * 680–980 dos baños (300px)
   * 1000–1070 sello autenticidad
   * 1090–1350 barra blanca contacto
   */
  const photoCocina = await framePhoto(P.cocina2, 980, 340, {
    position: 'centre',
    radius: 18,
    label: 'COCINA FINALIZADA',
    sublabel: 'Guataparo, Valencia · Proyecto RemodelaT',
  });
  const photoBano1 = await framePhoto(P.banoZona1, 470, 300, {
    position: 'centre',
    radius: 18,
    label: 'BAÑO ZONA 1 COMPLETADO',
    sublabel: 'Quinta Guataparo · Foto real',
  });
  const photoBano2 = await framePhoto(P.bano1, 470, 300, {
    position: 'centre',
    radius: 18,
    label: 'BAÑO 1 FINALIZADO',
    sublabel: 'Caracas · Foto real',
  });

  const logo = await sharp(abs(P.logo)).resize({ width: 320 }).png().toBuffer();

  const ui = Buffer.from(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glow" cx="70%" cy="6%" r="45%">
      <stop offset="0%" stop-color="${GOLD}" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="${GOLD}" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="${INK}"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>

  <!-- Badge -->
  <rect x="50" y="112" rx="16" ry="16" width="560" height="34" fill="rgba(201,169,97,0.12)" stroke="${GOLD}" stroke-opacity="0.7"/>
  <circle cx="72" cy="129" r="5" fill="${GOLD}"/>
  <text x="88" y="134" font-family="DejaVu Sans, Arial, sans-serif" font-size="13" font-weight="700"
        letter-spacing="1.4" fill="${GOLD_LIGHT}">FOTOS REALES DE REMODELACIONES HECHAS POR NOSOTROS</text>

  <!-- Headline -->
  <text x="50" y="200" font-family="DejaVu Serif, Georgia, serif" font-size="44" fill="${WHITE}">Remodelamos tu hogar,</text>
  <text x="50" y="252" font-family="DejaVu Serif, Georgia, serif" font-size="44" fill="${GOLD}">transformamos tu vida.</text>
  <text x="50" y="295" font-family="DejaVu Sans, Arial, sans-serif" font-size="15" fill="rgba(255,255,255,0.78)">
    Cada imagen es de una obra entregada. No usamos stock ni imágenes generadas.
  </text>

  <!-- Services row under photos -->
  <text x="50" y="1015" font-family="DejaVu Sans, Arial, sans-serif" font-size="12" font-weight="700"
        letter-spacing="2" fill="${GOLD}">NUESTROS SERVICIOS</text>
  <text x="50" y="1045" font-family="DejaVu Sans, Arial, sans-serif" font-size="15" fill="rgba(255,255,255,0.88)">
    Interiores  ·  Cocinas  ·  Baños  ·  Obras civiles y acabados
  </text>
  <text x="1030" y="1015" text-anchor="end" font-family="DejaVu Sans, Arial, sans-serif" font-size="12"
        font-weight="700" letter-spacing="1.2" fill="rgba(232,213,163,0.9)">SIN STOCK · SIN IA · OBRA DOCUMENTADA</text>

  <!-- Bottom bar -->
  <rect x="0" y="1080" width="${W}" height="270" fill="${WHITE}"/>
  <rect x="0" y="1080" width="${W}" height="3" fill="${GOLD}"/>

  <circle cx="120" cy="1170" r="24" fill="none" stroke="${GOLD}" stroke-width="1.6"/>
  <text x="120" y="1176" text-anchor="middle" font-family="DejaVu Sans, Arial, sans-serif" font-size="13" fill="${GOLD}">www</text>
  <text x="160" y="1163" font-family="DejaVu Sans, Arial, sans-serif" font-size="13" fill="#666">Visita nuestra web</text>
  <text x="160" y="1187" font-family="DejaVu Sans, Arial, sans-serif" font-size="20" font-weight="700" fill="${INK}">${esc(WEB)}</text>

  <circle cx="430" cy="1170" r="24" fill="none" stroke="${GOLD}" stroke-width="1.6"/>
  <text x="430" y="1176" text-anchor="middle" font-family="DejaVu Sans, Arial, sans-serif" font-size="16" fill="${GOLD}">✓</text>
  <text x="470" y="1163" font-family="DejaVu Sans, Arial, sans-serif" font-size="13" fill="#666">Asesoría personalizada</text>
  <text x="470" y="1187" font-family="DejaVu Sans, Arial, sans-serif" font-size="17" font-weight="700" fill="${INK}">en cada proyecto</text>

  <circle cx="760" cy="1170" r="24" fill="none" stroke="${GOLD}" stroke-width="1.6"/>
  <text x="760" y="1176" text-anchor="middle" font-family="DejaVu Sans, Arial, sans-serif" font-size="16" fill="${GOLD}">✆</text>
  <text x="800" y="1163" font-family="DejaVu Sans, Arial, sans-serif" font-size="13" fill="#666">Contáctanos hoy</text>
  <text x="800" y="1187" font-family="DejaVu Sans, Arial, sans-serif" font-size="18" font-weight="700" fill="${INK}">${esc(PHONE)}</text>

  <line x1="80" y1="1240" x2="1000" y2="1240" stroke="#E8E0D0" stroke-width="1"/>
  <text x="540" y="1280" text-anchor="middle" font-family="DejaVu Sans, Arial, sans-serif" font-size="14" fill="#777">
    WhatsApp ${esc(PHONE_SHORT)}  ·  ${esc(EMAIL)}  ·  Caracas · Valencia · Carabobo  ·  Desde 2003
  </text>
  <text x="540" y="1320" text-anchor="middle" font-family="DejaVu Sans, Arial, sans-serif" font-size="12"
        font-weight="700" letter-spacing="1.6" fill="${GOLD}">
    TODAS LAS FOTOS SON DE OBRAS REALES EJECUTADAS POR REMODELAT
  </text>
</svg>`);

  return sharp({
    create: { width: W, height: H, channels: 3, background: INK },
  })
    .composite([
      { input: ui, left: 0, top: 0 },
      { input: logo, left: 44, top: 32 },
      { input: photoCocina, left: 50, top: 320 },
      { input: photoBano1, left: 50, top: 680 },
      { input: photoBano2, left: 560, top: 680 },
    ])
    .jpeg({ quality: 92, mozjpeg: true, chromaSubsampling: '4:4:4' })
    .toBuffer();
}

async function buildSquare() {
  const W = 1080;
  const H = 1080;

  const photoCocina = await framePhoto(P.cocina2, 980, 340, {
    position: 'centre',
    radius: 18,
    label: 'COCINA FINALIZADA · GUATAPARO',
    sublabel: 'Obra real RemodelaT',
  });
  const photoBano1 = await framePhoto(P.banoZona1, 470, 300, {
    position: 'centre',
    radius: 18,
    label: 'BAÑO ZONA 1 COMPLETADO',
    sublabel: 'Quinta Guataparo',
  });
  const photoBano2 = await framePhoto(P.bano1, 470, 300, {
    position: 'centre',
    radius: 18,
    label: 'BAÑO 1 FINALIZADO',
    sublabel: 'Caracas',
  });
  const logo = await sharp(abs(P.logo)).resize({ width: 300 }).png().toBuffer();

  const ui = Buffer.from(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${W}" height="${H}" fill="${INK}"/>
  <rect x="50" y="100" rx="14" ry="14" width="480" height="30" fill="rgba(201,169,97,0.12)" stroke="${GOLD}" stroke-opacity="0.7"/>
  <circle cx="70" cy="115" r="4.5" fill="${GOLD}"/>
  <text x="84" y="120" font-family="DejaVu Sans, Arial, sans-serif" font-size="12" font-weight="700"
        letter-spacing="1.3" fill="${GOLD_LIGHT}">FOTOS REALES DE NUESTRAS OBRAS — NO STOCK / NO IA</text>

  <text x="50" y="175" font-family="DejaVu Serif, Georgia, serif" font-size="36" fill="${WHITE}">Remodelamos tu hogar,</text>
  <text x="50" y="218" font-family="DejaVu Serif, Georgia, serif" font-size="36" fill="${GOLD}">transformamos tu vida.</text>

  <rect x="0" y="900" width="${W}" height="180" fill="${WHITE}"/>
  <rect x="0" y="900" width="${W}" height="3" fill="${GOLD}"/>
  <text x="540" y="955" text-anchor="middle" font-family="DejaVu Sans, Arial, sans-serif" font-size="17" font-weight="700" fill="${INK}">${esc(WEB)}  ·  WhatsApp ${esc(PHONE)}</text>
  <text x="540" y="990" text-anchor="middle" font-family="DejaVu Sans, Arial, sans-serif" font-size="14" fill="#666">Caracas · Valencia · San Diego · Carabobo</text>
  <text x="540" y="1030" text-anchor="middle" font-family="DejaVu Sans, Arial, sans-serif" font-size="13" font-weight="700" letter-spacing="1.5" fill="${GOLD}">OBRAS REALES DOCUMENTADAS · DESDE 2003</text>
</svg>`);

  return sharp({
    create: { width: W, height: H, channels: 3, background: INK },
  })
    .composite([
      { input: ui, left: 0, top: 0 },
      { input: logo, left: 40, top: 28 },
      { input: photoCocina, left: 50, top: 245 },
      { input: photoBano1, left: 50, top: 605 },
      { input: photoBano2, left: 560, top: 605 },
    ])
    .jpeg({ quality: 92, mozjpeg: true })
    .toBuffer();
}

async function buildHorizontal() {
  const W = 1200;
  const H = 628;

  const photoCocina = await framePhoto(P.cocina2, 560, 360, {
    position: 'centre',
    radius: 16,
    label: 'COCINA FINALIZADA',
    sublabel: 'Guataparo · Obra real',
  });
  const photoBano1 = await framePhoto(P.banoZona1, 270, 220, {
    position: 'centre',
    radius: 14,
    label: 'BAÑO ZONA 1',
    sublabel: 'Completado',
  });
  const photoBano2 = await framePhoto(P.bano1, 270, 220, {
    position: 'centre',
    radius: 14,
    label: 'BAÑO 1 FINALIZADO',
    sublabel: 'Caracas',
  });
  const logo = await sharp(abs(P.logo)).resize({ width: 260 }).png().toBuffer();

  const ui = Buffer.from(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${W}" height="${H}" fill="${INK}"/>
  <rect x="36" y="100" rx="12" ry="12" width="360" height="28" fill="rgba(201,169,97,0.12)" stroke="${GOLD}" stroke-opacity="0.7"/>
  <circle cx="54" cy="114" r="4" fill="${GOLD}"/>
  <text x="68" y="119" font-family="DejaVu Sans, Arial, sans-serif" font-size="12" font-weight="700"
        letter-spacing="1.1" fill="${GOLD_LIGHT}">FOTOS REALES · OBRAS PROPIAS · NO STOCK</text>

  <text x="36" y="180" font-family="DejaVu Serif, Georgia, serif" font-size="34" fill="${WHITE}">Remodelamos tu hogar,</text>
  <text x="36" y="222" font-family="DejaVu Serif, Georgia, serif" font-size="34" fill="${GOLD}">transformamos tu vida.</text>

  <text x="36" y="270" font-family="DejaVu Sans, Arial, sans-serif" font-size="15" fill="rgba(255,255,255,0.78)">
    <tspan x="36" dy="0">Cocinas, baños y reformas integrales</tspan>
    <tspan x="36" dy="22">con fotos reales de nuestros proyectos.</tspan>
  </text>

  <text x="36" y="360" font-family="DejaVu Sans, Arial, sans-serif" font-size="13" font-weight="700" letter-spacing="1.4" fill="${GOLD}">SIN IA  ·  SIN CATÁLOGO  ·  OBRA DOCUMENTADA</text>

  <text x="36" y="500" font-family="DejaVu Sans, Arial, sans-serif" font-size="18" font-weight="700" fill="${WHITE}">${esc(WEB)}</text>
  <text x="36" y="532" font-family="DejaVu Sans, Arial, sans-serif" font-size="16" fill="${GOLD}">WhatsApp ${esc(PHONE)}</text>
  <text x="36" y="565" font-family="DejaVu Sans, Arial, sans-serif" font-size="13" fill="rgba(255,255,255,0.55)">Desde 2003 · Caracas · Valencia · Carabobo</text>
</svg>`);

  return sharp({
    create: { width: W, height: H, channels: 3, background: INK },
  })
    .composite([
      { input: ui, left: 0, top: 0 },
      { input: logo, left: 32, top: 24 },
      { input: photoCocina, left: 600, top: 40 },
      { input: photoBano1, left: 600, top: 420 },
      { input: photoBano2, left: 890, top: 420 },
    ])
    .jpeg({ quality: 92, mozjpeg: true })
    .toBuffer();
}

async function writeAll(buf, name) {
  for (const dir of OUT) {
    const p = path.join(dir, name);
    fs.writeFileSync(p, buf);
    console.log('→', path.relative(root, p), `${(buf.length / 1024).toFixed(0)}KB`);
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
  const webp = await sharp(buf).webp({ quality: 85 }).toBuffer();
  fs.writeFileSync(path.join(root, 'public/images/brand', name), webp);
  console.log('→ public/images/brand/' + name, `${(webp.length / 1024).toFixed(0)}KB`);
}

const og = await sharp(horizontal).resize(1200, 630).webp({ quality: 86 }).toBuffer();
fs.writeFileSync(path.join(root, 'public/images/brand/og-obras-reales.webp'), og);
console.log('→ public/images/brand/og-obras-reales.webp');
console.log('OK');
