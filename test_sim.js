const fs = require('fs');

// Read app.js and inspect for potential runtime bugs or undefined variables
const js = fs.readFileSync('Servis.In/js/app.js', 'utf8');

// Check all function calls of toast, askConfirm, openModal, closeModal
const toastCalls = [...js.matchAll(/toast\(([^)]*)\)/g)];
console.log('Total toast calls:', toastCalls.length);

const askConfirmCalls = [...js.matchAll(/askConfirm\(([^)]*)\)/g)];
console.log('Total askConfirm calls:', askConfirmCalls.length);

// Check if createCustomTplRowHTML has 'lainnya'
if (!js.includes('value="lainnya"')) {
  console.log('Notice: createCustomTplRowHTML does not have category lainnya option');
}

// Check mini tab rate unit handling
console.log('Checking profileRateUnit mentions:');
const rateMentions = js.split('\n').filter(l => l.includes('profileRateUnit'));
console.log(rateMentions.map(l => l.trim()));
