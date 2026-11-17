const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

console.log('Total HTML files:', files.length);

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  // Match buttons containing "Reset" (case-insensitive)
  const matches = [...content.matchAll(/<button[^>]*>[\s\S]*?reset[\s\S]*?<\/button>/gi)];
  if (matches.length > 0) {
    console.log(`\n=== File: ${f} (${matches.length} reset button(s)) ===`);
    matches.forEach((m, idx) => {
      // Just print opening tag and first 200 chars
      console.log(`[${idx}] ` + m[0].replace(/\s+/g, ' ').substring(0, 150));
    });
  }
});
