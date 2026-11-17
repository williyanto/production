const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && f !== 'index.html' && f !== 'proyek_belum_tersedia.html');

console.log('--- DETAILED RESET BUTTON AUDIT ---');

const summary = [];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  
  // Find all buttons containing Reset
  const matches = [...content.matchAll(/<button[^>]*>([\s\S]*?Reset[\s\S]*?)<\/button>/gi)];
  
  if (matches.length === 0) {
    summary.push({ file: f, status: 'NO_RESET_BUTTON', button: null });
  } else {
    matches.forEach(m => {
      const full = m[0];
      const classMatch = full.match(/class=["']([^"']+)["']/i);
      const classes = classMatch ? classMatch[1] : '';
      const isSolidRed = (classes.includes('bg-rose-500') || classes.includes('bg-rose-600') || classes.includes('bg-red-500') || classes.includes('bg-red-600')) && classes.includes('text-white');
      summary.push({
        file: f,
        status: isSolidRed ? 'ALREADY_SOLID_RED' : 'NEEDS_UPDATE',
        classes,
        snippet: full.replace(/\s+/g, ' ').substring(0, 140)
      });
    });
  }
});

summary.forEach(s => {
  console.log(`[${s.status}] ${s.file}`);
  if (s.classes) console.log(`   Classes: ${s.classes}`);
});
