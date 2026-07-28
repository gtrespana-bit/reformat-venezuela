import { readFileSync, writeFileSync } from 'fs';

const path = 'src/layouts/BaseLayout.astro';
let c = readFileSync(path, 'utf-8');
const lines = c.split('\n');

console.log('Before:', lines.length, 'lines');

// Find and remove the hardcoded "Skip to content" line (keep only the {skipLinkText} one)
const filtered = lines.filter((line, i) => {
  // Remove the hardcoded English skip-link (the one without {skipLinkText})
  if (line.includes('class="skip-link"') && line.includes('>Skip to content</a>') && !line.includes('{skipLinkText}')) {
    console.log(`Removed line ${i}: ${line.trim()}`);
    return false;
  }
  return true;
});

let content = filtered.join('\n');

// Fix duplicate <main> opening tags
content = content.replace(/<main id="main-content"><main id="main-content">/g, '<main id="main-content">');

// Fix duplicate </main> closing tags  
content = content.replace(/<\/main><\/main>/g, '</main>');

// Remove duplicate skip-link CSS blocks - keep only one
const skipLinkCSS = `.skip-link {
position: absolute;
left: -9999px;
top: auto;
width: 1px;
height: 1px;
overflow: hidden;
z-index: 9999;
background: #c9a961;
color: #1a1a2e;
padding: 12px 24px;
font-weight: 600;
font-size: 0.95rem;
text-decoration: none;
border-radius: 0 0 6px 0;
}
.skip-link:focus {
position: fixed;
left: 0;
top: 0;
width: auto;
height: auto;
clip: auto;
}`;

// Count occurrences
const occurrences = content.split(skipLinkCSS).length - 1;
console.log('Skip-link CSS blocks found:', occurrences);

if (occurrences > 1) {
  // Remove all but the last occurrence
  let first = true;
  while (content.includes(skipLinkCSS)) {
    if (first) {
      // skip first removal - we want to keep the one inside the <style> block at the end
      break;
    }
  }
  // Actually, just remove the first standalone block if there's a duplicate
  // The old inline one was: .skip-link { position: absolute; top: -100px; ... }
  const oldSkipCSS = `.skip-link {
position: absolute; top: -100px; left: 0; background: #0a0a0a; color: #fff;
padding: 12px 16px; z-index: 9999; transition: top 0.3s; text-decoration: none;
}
.skip-link:focus { top: 0; }`;
  
  if (content.includes(oldSkipCSS)) {
    content = content.replace(oldSkipCSS + '\n', '');
    console.log('Removed old skip-link CSS block');
  }
}

writeFileSync(path, content, 'utf-8');

// Verify
const final = readFileSync(path, 'utf-8');
const finalLines = final.split('\n');
console.log('After:', finalLines.length, 'lines');

// Check for remaining issues
const skipLinks = finalLines.filter(l => l.includes('class="skip-link"'));
console.log('Skip-link elements:', skipLinks.length);
skipLinks.forEach(l => console.log('  ', l.trim()));

const mainTags = finalLines.filter(l => l.includes('id="main-content"'));
console.log('Main-content elements:', mainTags.length);
mainTags.forEach(l => console.log('  ', l.trim()));
