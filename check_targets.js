const fs = require('fs');

const targets = [
  'generator_angka_v20261104.html',
  'flame_retardant_v20261104.html',
  'konverter_satuan_teknik_v20261115.html',
  'slice_calculation_v20261104.html',
  'spek_ir_v20261115.html',
  'visualizer_konstruksi_kabel_v20261109.html',
  'wire_weight_calculation_v20261104.html'
];

targets.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const matches = [...content.matchAll(/<button[^>]*>(?:(?!<\/button>)[\s\S])*?(?:Reset|btnReset|resetBtn|tombolReset)(?:(?!<\/button>)[\s\S])*?<\/button>/gi)];
  console.log(`=== ${f} ===`);
  matches.forEach(m => console.log(m[0].replace(/\s+/g, ' ')));
});
