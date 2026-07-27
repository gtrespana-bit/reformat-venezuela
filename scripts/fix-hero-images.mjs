import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const dirs = ['src/pages', 'src/pages/servicios'];
let count = 0;

for (const dir of dirs) {
  for (const file of readdirSync(dir).filter(f => f.endsWith('.astro'))) {
    const path = join(dir, file);
    let content = readFileSync(path, 'utf-8');
    
    if (content.includes('integrales-antes-despues.webp')) {
      content = content.replace(/integrales-antes-despues\.webp/g, 'integrales-proyecto-completo.webp');
      writeFileSync(path, content);
      console.log(`✅ ${file}`);
      count++;
    }
  }
}

console.log(`\n🎉 ${count} archivos corregidos`);