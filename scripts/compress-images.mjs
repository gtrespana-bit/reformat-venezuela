import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const imgDir = path.join(__dirname, '..', 'public', 'images');

const THRESHOLD = 80 * 1024; // recomprimir solo >80KB
const QUALITY = 78;

const files = fs
  .readdirSync(imgDir)
  .filter((f) => /\.(webp|avif|png|jpe?g)$/i.test(f))
  .map((f) => ({ f, size: fs.statSync(path.join(imgDir, f)).size }))
  .filter((x) => x.size > THRESHOLD)
  .sort((a, b) => b.size - a.size);

console.log(`Candidatas (>${THRESHOLD / 1024}KB): ${files.length}\n`);

let savedTotal = 0;
const results = [];

for (const { f, size } of files) {
  const fp = path.join(imgDir, f);
  const ext = path.extname(f).toLowerCase();
  try {
    const img = sharp(fp);
    const meta = await img.metadata();
    let buf;
    if (ext === '.webp') {
      buf = await sharp(fp).webp({ quality: QUALITY }).toBuffer();
    } else if (ext === '.avif') {
      buf = await sharp(fp).avif({ quality: QUALITY + 8 }).toBuffer();
    } else if (ext === '.png') {
      buf = await sharp(fp).png({ compressionLevel: 9, palette: true }).toBuffer();
    } else {
      buf = await sharp(fp).jpeg({ quality: QUALITY, mozjpeg: true }).toBuffer();
    }
    // Solo guardar si realmente baja (y no pierde dimensiones)
    if (buf.length < size * 0.97) {
      fs.writeFileSync(fp, buf);
      const saved = size - buf.length;
      savedTotal += saved;
      results.push(
        `${f}: ${(size / 1024).toFixed(1)}KB -> ${(buf.length / 1024).toFixed(1)}KB (-${((saved / size) * 100).toFixed(0)}%) [${meta.width}x${meta.height}]`
      );
    } else {
      results.push(`${f}: sin ganancia (${(size / 1024).toFixed(1)}KB -> ${(buf.length / 1024).toFixed(1)}KB), omitida`);
    }
  } catch (e) {
    results.push(`${f}: ERROR ${e.message}`);
  }
}

console.log(results.join('\n'));
console.log(`\nAhorro total: ${(savedTotal / 1024).toFixed(1)} KB (${(savedTotal / 1048576).toFixed(2)} MB)`);
