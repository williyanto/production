const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && f !== 'index.html' && f !== 'proyek_belum_tersedia.html');

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  // Match buttons that contain ">Reset<" or "> Reset<" or ">Reset " or SVG + "Reset"
  const regex = /<button[^>]*>[^<]*?(?:<svg[^>]*>[\s\S]*?<\/svg>[^<]*?)?\s*Reset[\s\S]*?<\/button>|<button[^>]*id=["'][^"']*reset[^"']*["'][^>]*>[\s\S]*?<\/button>/gi;
  const matches = [...content.matchAll(regex)];
  console.log(`\n=== File: ${f} (${matches.length} matches) ===`);
  matches.forEach(m => {
    console.log(m[0].replace(/\s+/g, ' '));
  });
});
