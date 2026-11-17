const fs = require('fs');
const html = fs.readFileSync('rapihkan_teks_v20261117.html', 'utf8');

// 1. Script syntax check
const scripts = [...html.matchAll(/<script(?![^>]*src)[^>]*>([\s\S]*?)<\/script>/gi)];
console.log('Script tags count:', scripts.length);
scripts.forEach((s, idx) => {
  try {
    new Function(s[1]);
    console.log('Script ' + idx + ': Syntax OK');
  } catch (err) {
    console.error('Script ' + idx + ' syntax error:', err);
    process.exit(1);
  }
});

// 2. Element IDs check
const getElementMatches = [...scripts[scripts.length - 1][1].matchAll(/document\.getElementById\(["']([^"']+)["']\)/g)];
const ids = [...new Set(getElementMatches.map(m => m[1]))];
console.log('Referenced element IDs count:', ids.length);
const missing = [];
ids.forEach(id => {
  if (!html.includes('id="' + id + '"')) {
    missing.push(id);
  }
});
if (missing.length > 0) {
  console.error('Missing IDs in HTML:', missing);
  process.exit(1);
} else {
  console.log('All referenced IDs exist in HTML DOM! OK');
}
