const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && f !== 'index.html' && f !== 'proyek_belum_tersedia.html');

console.log('=== FILES NEEDING RESET BUTTON UPDATE ===');

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const regex = /<button\b[^>]*>(?:(?!<\/button>)[\s\S])*?\bReset\b(?:(?!<\/button>)[\s\S])*?<\/button>/gi;
  const matches = [...content.matchAll(regex)];
  matches.forEach(m => {
    const tag = m[0];
    const classMatch = tag.match(/class=["']([^"']+)["']/i);
    const classes = classMatch ? classMatch[1] : '';
    const isSolidRed = (classes.includes('bg-rose-500') || classes.includes('bg-rose-600') || classes.includes('bg-red-500') || classes.includes('bg-red-600')) && classes.includes('text-white');
    if (!isSolidRed) {
      console.log('FILE:', f);
      console.log('  CLASSES:', classes);
      console.log('  TAG    :', tag.replace(/\s+/g, ' '));
      console.log('---');
    }
  });
});
