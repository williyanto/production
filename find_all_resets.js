const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && f !== 'index.html');

console.log('--- SCANNING ALL RESET BUTTONS ---');

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const lines = content.split('\n');

  lines.forEach((line, idx) => {
    if ((line.includes('reset') || line.includes('Reset')) && (line.includes('<button') || line.includes('class='))) {
      // Check if it's the navigation reset button
      if (line.includes('btnReset') || line.includes('resetBtn') || line.includes('resetForm') || line.includes('resetAllBtn') || line.includes('tombolReset') || line.includes('clearData') || line.includes('resetCurrentTab') || line.includes('basicResetBtn') || line.includes('resetKonversi')) {
        console.log(`[${f}:${idx + 1}]`);
        console.log(`   ${line.trim()}`);
      }
    }
  });
});
