const fs = require('fs');

const html = fs.readFileSync('Servis.In/index.html', 'utf8');
const js = fs.readFileSync('Servis.In/js/app.js', 'utf8');

const requiredIds = [
  'account-card',
  'account-user-name',
  'account-user-meta',
  'btn-logout',
  'btn-logout-menu',
  'mini-tab-rate-unit',
  'rate-unit-badge',
  'rate-convert-hint',
  'input-daily-km',
  'btn-edit-template',
  'btn-edit-template-label',
  'btn-del-custom-tpl',
  'btn-new-custom-tpl',
  'btn-save-current-as-tpl',
  'modal-custom-template',
  'modal-welcome',
  'welcome-tabs-nav',
  'wtab-btn-saved',
  'wtab-btn-new',
  'wpanel-saved',
  'wpanel-new',
  'saved-accounts-list',
  'btn-welcome-goto-new',
  'form-welcome',
  'wl-acc-name',
  'wl-type',
  'wl-template',
  'wl-name',
  'wl-plate',
  'wl-year',
  'wl-odo',
  'btn-welcome-sample',
  'btn-welcome-back-saved'
];

let missing = [];
requiredIds.forEach(id => {
  if (!html.includes(`id="${id}"`)) {
    missing.push(id);
  }
});

console.log('Missing IDs in HTML:', missing);
if (missing.length === 0) {
  console.log('All required IDs present in index.html! SUCCESS');
}
