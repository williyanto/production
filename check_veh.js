const fs = require('fs');
const js = fs.readFileSync('Servis.In/js/app.js', 'utf8');

const lines = js.split('\n');
lines.forEach((l, idx) => {
  if (l.includes('switch-vehicle') || l.includes('activeId')) {
    console.log((idx+1) + ': ' + l.trim());
  }
});
