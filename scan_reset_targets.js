const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && f !== 'index.html');

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  // Match buttons that have "Reset" in their text or onclick containing reset
  const regex = /<button[^>]*onclick=["'][^"']*reset[^"']*["'][^>]*>[\s\S]*?<\/button>|<button[^>]*>[\s\S]*?Reset[\s\S]*?<\/button>|<a[^>]*>[\s\S]*?Reset[\s\S]*?<\/a>/gi;
  const matches = [...content.matchAll(regex)];
  if (matches.length > 0) {
    console.log(`\n=== File: ${f} ===`);
    matches.forEach(m => {
      console.log(m[0].replace(/\s+/g, ' '));
    });
  }
});
