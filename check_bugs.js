const fs = require('fs');

const html = fs.readFileSync('Servis.In/index.html', 'utf8');
const js = fs.readFileSync('Servis.In/js/app.js', 'utf8');

// Find all $('...') and getElementById('...')
const idRegex = /\$\(\s*['"]([a-zA-Z0-9_-]+)['"]\s*\)|getElementById\(\s*['"]([a-zA-Z0-9_-]+)['"]\s*\)/g;
let match;
const usedIds = new Set();
while ((match = idRegex.exec(js)) !== null) {
  usedIds.add(match[1] || match[2]);
}

const missingIds = [];
usedIds.forEach(id => {
  const regex = new RegExp('id=["\']' + id + '["\']');
  if (!regex.test(html)) {
    missingIds.push(id);
  }
});

console.log('Total IDs queried in JS:', usedIds.size);
console.log('Missing IDs in HTML:', missingIds);
