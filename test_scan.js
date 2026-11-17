const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  // Match buttons containing Reset
  const btnMatches = content.match(/<button[^>]*>[\s\S]*?<\/button>/gi) || [];
  btnMatches.forEach(btn => {
    if (btn.toLowerCase().includes('reset') && !btn.includes('basic-preset-btn')) {
      const isSolidRed = btn.includes('bg-rose-500') || btn.includes('bg-red-500');
      const firstLine = btn.split('\n')[0].replace(/\s+/g, ' ').substring(0, 100);
      console.log(`${file}: [SolidRed: ${isSolidRed}] -> ${firstLine}...`);
    }
  });
});
