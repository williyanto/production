const fs = require('fs');

const html = fs.readFileSync('Servis.In/index.html', 'utf8');
const js = fs.readFileSync('Servis.In/js/app.js', 'utf8');

// Check ctpl-type options in HTML
const ctplTypeMatch = html.match(/<select id="ctpl-type"[^>]*>([\s\S]*?)<\/select>/);
console.log('ctpl-type options:');
if (ctplTypeMatch) {
  const opts = [...ctplTypeMatch[1].matchAll(/value="([^"]*)"/g)].map(m => m[1]);
  console.log(opts);
}

// Check MODEL_TEMPLATES types in js
const templateTypes = [...js.matchAll(/type:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
console.log('Template types in JS:');
console.log(Array.from(new Set(templateTypes)));
