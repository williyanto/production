const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && f !== 'index.html' && f !== 'proyek_belum_tersedia.html');

const report = [];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  
  // Find lines around reset
  const lines = content.split('\n');
  const matchingLineIndices = [];
  lines.forEach((line, idx) => {
    if (line.toLowerCase().includes('reset') && (line.includes('<button') || line.includes('<a') || line.includes('onclick'))) {
      matchingLineIndices.push(idx);
    }
  });

  const resetButtons = [];
  matchingLineIndices.forEach(idx => {
    // Grab snippet of 5 lines around it
    const start = Math.max(0, idx - 2);
    const end = Math.min(lines.length - 1, idx + 2);
    const snippet = lines.slice(start, end + 1).join('\n');
    if (snippet.includes('Reset') || snippet.includes('reset')) {
      resetButtons.push({ line: idx + 1, text: lines[idx].trim() });
    }
  });

  report.push({
    file: f,
    matches: resetButtons
  });
});

report.forEach(r => {
  console.log(`\n=== File: ${r.file} ===`);
  r.matches.forEach(m => {
    console.log(`Line ${m.line}: ${m.text}`);
  });
});
