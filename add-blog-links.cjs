const fs = require('fs');
const p = 'C:/Users/kr-im/.openclaw/workspace/reformat-venezuela/src/pages/blog/[slug].astro';
let c = fs.readFileSync(p, 'utf8');

if (c.includes('related-services')) {
  console.log('Already has related-services');
  process.exit(0);
}

const section = `
      <div class="related-services">
        <h2>Servicios Relacionados</h2>
        <p>Si este artículo te fue útil, explora nuestros servicios de reformas profesionales:</p>
        <ul>
          <li><a href="/servicios/cocinas/">Reformas de Cocina en Valencia</a></li>
          <li><a href="/servicios/banos/">Reformas de Baño</a></li>
          <li><a href="/servicios/integrales/">Reformas Integrales</a></li>
          <li><a href="/servicios/">Ver todos los servicios</a></li>
        </ul>
      </div>`;

// Find the closing of the post-content section (before post-cta)
const marker = '      </div>\n    </section>\n\n  <section class="post-cta"';
if (c.includes(marker)) {
  c = c.replace(marker, section + '\n      </div>\n    </section>\n\n  <section class="post-cta"');
  fs.writeFileSync(p, c, 'utf8');
  console.log('OK internal links added');
} else {
  // fallback: insert before post-cta
  const idx = c.indexOf('<section class="post-cta"');
  if (idx > 0) {
    const before = c.substring(0, idx);
    const after = c.substring(idx);
    // Find the last </section> before post-cta
    const lastSectionEnd = before.lastIndexOf('</section>');
    if (lastSectionEnd > 0) {
      const newContent = before.substring(0, lastSectionEnd) + section + '\n    ' + before.substring(lastSectionEnd) + after;
      fs.writeFileSync(p, newContent, 'utf8');
      console.log('OK internal links added (fallback)');
    } else {
      console.log('Could not find insertion point');
    }
  } else {
    console.log('Could not find post-cta section');
  }
}
