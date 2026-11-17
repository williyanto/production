const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && f !== 'index.html' && f !== 'proyek_belum_tersedia.html');

console.log('Inspecting bottom navigation in all 25 files:\n');

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const lines = content.split('\n');

  // Search for "Beranda" or "Kembali"
  let navLines = [];
  lines.forEach((line, idx) => {
    if (line.includes('Kembali') || line.includes('Beranda') || line.includes('index.html')) {
      // Get surrounding lines
      const start = Math.max(0, idx - 8);
      const end = Math.min(lines.length - 1, idx + 8);
      const chunk = lines.slice(start, end + 1).join('\n');
      if (chunk.includes('Kembali') && (chunk.includes('Beranda') || chunk.includes('index.html'))) {
        navLines.push({ start, end, chunk });
      }
    }
  });

  if (navLines.length > 0) {
    // Take the best/longest chunk
    const best = navLines[navLines.length - 1];
    console.log(`=== File: ${f} (lines ${best.start + 1}-${best.end + 1}) ===`);
    console.log(best.chunk);
    console.log('\n----------------------------------------\n');
  } else {
    console.log(`=== File: ${f} -> NO BOTTOM NAV FOUND ===\n`);
  }
});
