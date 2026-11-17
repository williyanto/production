const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && f !== 'index.html' && f !== 'proyek_belum_tersedia.html');

console.log('Inspecting', files.length, 'project files:');

const results = [];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  // Find navigation or reset button
  const resetMatches = [...content.matchAll(/<button[^>]*>[\s\S]*?Reset[\s\S]*?<\/button>|<a[^>]*>[\s\S]*?Reset[\s\S]*?<\/a>/gi)];
  
  if (resetMatches.length === 0) {
    results.push({ file: f, status: 'NO_RESET_BUTTON' });
  } else {
    resetMatches.forEach(m => {
      const tag = m[0];
      const classMatch = tag.match(/class=["']([^"']+)["']/i);
      const classes = classMatch ? classMatch[1] : '';
      const isSolidRed = classes.includes('bg-rose-500') || classes.includes('bg-rose-600') || classes.includes('bg-red-500') || classes.includes('bg-red-600');
      results.push({
        file: f,
        classes: classes,
        isSolidRed: isSolidRed,
        fullTag: tag.substring(0, 100) + '...'
      });
    });
  }
});

console.table(results.map(r => ({ file: r.file, isSolidRed: r.isSolidRed, classes: (r.classes || '').substring(0, 70) })));
