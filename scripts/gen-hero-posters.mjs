#!/usr/bin/env node
/**
 * gen-hero-posters.mjs — Genera el póster del hero a partir del PRIMER FOTOGRAMA
 * real de cada vídeo.
 *
 * Por qué existe este script
 * --------------------------
 * El hero muestra una imagen fija mientras el vídeo carga. Si esa imagen no es
 * exactamente el fotograma 0 del vídeo, al arrancar la reproducción se ve un
 * "salto" de escena que queda poco profesional.
 *
 * La única forma de que el relevo imagen -> vídeo sea invisible es que el
 * póster SEA el fotograma 0, al mismo tamaño que el vídeo (si el póster fuese
 * más nítido que el vídeo, al arrancar se notaría una bajada de calidad).
 *
 * Requisitos: Python 3 con PyAV y Pillow.
 *   pip install av pillow
 *
 * Uso:  node scripts/gen-hero-posters.mjs
 *
 * Si cambias los vídeos del hero, vuelve a ejecutarlo y commitea los .webp.
 */
import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();

const JOBS = [
  { video: 'public/videos/hero-desktop.mp4', out: 'public/images/hero-poster-desktop.webp' },
  { video: 'public/videos/hero-mobile.mp4', out: 'public/images/hero-poster-mobile.webp' }
];

for (const job of JOBS) {
  if (!existsSync(join(ROOT, job.video))) {
    console.error(`  ✗ No existe ${job.video}`);
    process.exit(1);
  }
}

const PY = `
import av
from PIL import Image
import json, sys

jobs = json.loads(sys.argv[1])
out = []
for job in jobs:
    container = av.open(job["video"])
    stream = container.streams.video[0]
    frame = next(container.decode(video=0))
    img = frame.to_image()  # fotograma 0, tamaño nativo del vídeo
    # q=92: el error medio frente al fotograma real baja de ~1.6 a ~1.2 sobre 255
    # (imperceptible) y el archivo sigue pesando menos que el hero anterior.
    img.save(job["out"], "WEBP", quality=92, method=6)
    out.append({"out": job["out"], "w": img.width, "h": img.height})
    container.close()
print(json.dumps(out))
`;

const res = spawnSync('python3', ['-c', PY, JSON.stringify(JOBS)], { encoding: 'utf8' });

if (res.status !== 0) {
  console.error('  ✗ Falló la extracción de fotogramas.');
  console.error(res.stderr || res.stdout);
  console.error('    ¿Tienes PyAV y Pillow?  pip install av pillow');
  process.exit(1);
}

const made = JSON.parse(res.stdout.trim().split('\n').pop());

console.log('');
console.log('  Pósters del hero (fotograma 0 de cada vídeo)');
console.log('  ────────────────────────────────────────────');
for (const m of made) {
  const { size } = await import('node:fs').then((fs) => ({ size: fs.statSync(join(ROOT, m.out)).size }));
  console.log(`  ✓ ${m.out}  ${m.w}×${m.h}  ${(size / 1024).toFixed(1)} KB`);
}
console.log('');
