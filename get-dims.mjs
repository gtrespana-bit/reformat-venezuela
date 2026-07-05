import sharp from 'sharp';
import { readdir } from 'fs/promises';
import { join } from 'path';

const base = 'C:\\Users\\kr-im\\.openclaw\\workspace\\reformat-venezuela\\public\\images';
const files = await readdir(base);

for (const f of files) {
  if (!f.endsWith('.webp') && !f.endsWith('.jpg') && !f.endsWith('.png')) continue;
  if (f.includes('-400') || f.includes('-600')) continue;
  try {
    const meta = await sharp(join(base, f)).metadata();
    console.log(`${f}|${meta.width}|${meta.height}`);
  } catch (e) {
    console.log(`${f}|error|error`);
  }
}
