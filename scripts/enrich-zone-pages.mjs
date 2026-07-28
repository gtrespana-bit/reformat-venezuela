import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PAGES_DIR = path.join(__dirname, '../src/pages');

// Lista de zonas (extraídas del tracker o directamente por nombres de archivos)
function getZoneAndService(filename) {
  // Ej: remodelacion-cocina-altamira.astro
  const parts = filename.replace('.astro', '').split('-');
  
  // parts[0] es siempre "remodelacion"
  let service = 'integral';
  if (parts.includes('cocina')) service = 'cocina';
  else if (parts.includes('bano')) service = 'bano';
  
  // El resto es la zona (puede tener guiones, como "alto-hatillo")
  const serviceIndex = parts.indexOf(service === 'cocina' ? 'cocina' : service === 'bano' ? 'bano' : 'integral');
  const zoneParts = parts.slice(serviceIndex + 1);
  const zone = zoneParts.join('-');
  
  return { zone, service };
}

function enrichFile(filePath, isEn = false) {
  const filename = path.basename(filePath);
  if (!filename.startsWith('remodelacion-') || !filename.endsWith('.astro')) {
    return;
  }
  
  const { zone, service } = getZoneAndService(filename);
  const lang = isEn ? 'en' : 'es';
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // 1. Añadir Imports (idempotente)
  const importRelPath = isEn ? '../../components/' : '../components/';
  const importsToAdd = [
    `import ZoneGallery from '${importRelPath}ZoneGallery.astro';`,
    `import BeforeAfter from '${importRelPath}BeforeAfter.astro';`,
    `import ZoneAside from '${importRelPath}ZoneAside.astro';`
  ];
  
  let modified = false;
  
  // Buscar sección de frontmatter (--- ... ---)
  const frontmatterRegex = /^---([\s\S]*?)---/;
  const match = content.match(frontmatterRegex);
  
  if (match) {
    let frontmatter = match[1];
    let fmModified = false;
    
    importsToAdd.forEach(imp => {
      // Eliminar el .astro al final de la búsqueda por si acaso
      const baseSearch = imp.substring(0, imp.length - 13);
      if (!frontmatter.includes(baseSearch)) {
        frontmatter = frontmatter.trim() + `\n${imp}\n`;
        fmModified = true;
      }
    });
    
    if (fmModified) {
      content = content.replace(frontmatterRegex, `---${frontmatter}---`);
      modified = true;
    }
  }
  
  // 2. Modificar contenedor principal para article-layout
  if (content.includes('<div class="container">') && content.includes('<div class="article-body">')) {
    // Solo modificar si no está ya modificado
    if (!content.includes('<div class="container article-layout">')) {
      content = content.replace(
        '<div class="container">',
        '<div class="container article-layout">'
      );
      modified = true;
    }
  }
  
  // 3. Insertar ZoneAside antes de cerrar .container de article-section
  const closeContainerPattern = '</div>\n    </div>\n  </div>\n</section>';
  const closeContainerPatternAlt = '</div>\n  </div>\n</section>';
  
  if (!content.includes('<ZoneAside')) {
    const asideTag = `<ZoneAside zone="${zone}" service="${service}" lang="${lang}" />`;
    
    // Intentar buscar el final de la sección del artículo
    if (content.includes('</div>\n    </div>\n  </div>\n</section>')) {
      content = content.replace(
        '</div>\n    </div>\n  </div>\n</section>',
        `</div>\n      <ZoneAside zone="${zone}" service="${service}" lang="${lang}" />\n    </div>\n  </div>\n</section>`
      );
      modified = true;
    } else if (content.includes('</div>\n  </div>\n</section>')) {
      content = content.replace(
        '</div>\n  </div>\n</section>',
        `</div>\n    <ZoneAside zone="${zone}" service="${service}" lang="${lang}" />\n  </div>\n</section>`
      );
      modified = true;
    }
  }
  
  // 4. Insertar ZoneGallery justo después del primer local-box
  if (content.includes('class="local-box"') && !content.includes('<ZoneGallery')) {
    const localBoxIndex = content.indexOf('class="local-box"');
    const nextClosingDiv = content.indexOf('</div>', localBoxIndex);
    
    if (nextClosingDiv !== -1) {
      const insertionPoint = nextClosingDiv + 6; // justo después de </div>
      const galleryTag = `\n\n      <ZoneGallery zone="${zone}" service="${service}" />`;
      content = content.slice(0, insertionPoint) + galleryTag + content.slice(insertionPoint);
      modified = true;
    }
  }
  
  // 5. Insertar BeforeAfter antes de "Cómo trabajamos" / "How we work"
  if (!content.includes('<BeforeAfter')) {
    const targetHeader = isEn ? '<h2>How we work' : '<h2>Cómo trabajamos';
    if (content.includes(targetHeader)) {
      const beforeAfterTag = `\n      <BeforeAfter service="${service}" />\n\n      `;
      content = content.replace(targetHeader, beforeAfterTag + targetHeader);
      modified = true;
    }
  }
  
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    return true;
  }
  return false;
}

function main() {
  console.log('Iniciando enriquecimiento de zone pages...');
  
  let esCount = 0;
  let enCount = 0;
  
  // Procesar ES
  const esFiles = fs.readdirSync(PAGES_DIR);
  esFiles.forEach(file => {
    const fullPath = path.join(PAGES_DIR, file);
    if (fs.statSync(fullPath).isFile() && file.startsWith('remodelacion-')) {
      const updated = enrichFile(fullPath, false);
      if (updated) esCount++;
    }
  });
  
  // Procesar EN
  const enDir = path.join(PAGES_DIR, 'en');
  if (fs.existsSync(enDir)) {
    const enFiles = fs.readdirSync(enDir);
    enFiles.forEach(file => {
      const fullPath = path.join(enDir, file);
      if (fs.statSync(fullPath).isFile() && file.startsWith('remodelacion-')) {
        const updated = enrichFile(fullPath, true);
        if (updated) enCount++;
      }
    });
  }
  
  console.log(`Completado. Páginas ES actualizadas: ${esCount}. Páginas EN actualizadas: ${enCount}.`);
}

main();
