import re

with open('kalkulator_waktu_v20260915.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the presets HTML
old_presets = '''<div class="flex flex-wrap gap-1">
            <button type="button" onclick="setPresetHari(7)"
              class="px-2 py-1 bg-slate-200 dark:bg-slate-800/90 hover:bg-indigo-600/60 text-slate-700 dark:text-slate-200 text-[10px] rounded-lg border border-slate-300 dark:border-slate-700/60 transition-all">+7
              hr</button>
            <button type="button" onclick="setPresetHari(14)"
              class="px-2 py-1 bg-slate-200 dark:bg-slate-800/90 hover:bg-indigo-600/60 text-slate-700 dark:text-slate-200 text-[10px] rounded-lg border border-slate-300 dark:border-slate-700/60 transition-all">+14
              hr</button>
            <button type="button" onclick="setPresetHari(30)"
              class="px-2 py-1 bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 text-[10px] font-bold rounded-lg transition-all">+30
              hr</button>
            <button type="button" onclick="setPresetHari(60)"
              class="px-2 py-1 bg-slate-200 dark:bg-slate-800/90 hover:bg-indigo-600/60 text-slate-700 dark:text-slate-200 text-[10px] rounded-lg border border-slate-300 dark:border-slate-700/60 transition-all">+60
              hr</button>
            <button type="button" onclick="setPresetHari(90)"
              class="px-2 py-1 bg-slate-200 dark:bg-slate-800/90 hover:bg-indigo-600/60 text-slate-700 dark:text-slate-200 text-[10px] rounded-lg border border-slate-300 dark:border-slate-700/60 transition-all">+90
              hr</button>
            <button type="button" onclick="setPresetHari(365)"
              class="px-2 py-1 bg-slate-200 dark:bg-slate-800/90 hover:bg-indigo-600/60 text-slate-700 dark:text-slate-200 text-[10px] rounded-lg border border-slate-300 dark:border-slate-700/60 transition-all">+1
              thn</button>
          </div>'''

new_presets = '''<div class="flex flex-wrap gap-1" id="presetButtonsContainer">
            <button type="button" onclick="setPresetHari(7)" id="btn-preset-7"
              class="preset-btn px-2 py-1 bg-slate-200 dark:bg-slate-800/90 hover:bg-indigo-200 dark:hover:bg-indigo-600/60 text-slate-700 dark:text-slate-200 text-[10px] rounded-lg border border-slate-300 dark:border-slate-700/60 transition-all">+7 hr</button>
            <button type="button" onclick="setPresetHari(14)" id="btn-preset-14"
              class="preset-btn px-2 py-1 bg-slate-200 dark:bg-slate-800/90 hover:bg-indigo-200 dark:hover:bg-indigo-600/60 text-slate-700 dark:text-slate-200 text-[10px] rounded-lg border border-slate-300 dark:border-slate-700/60 transition-all">+14 hr</button>
            <button type="button" onclick="setPresetHari(30)" id="btn-preset-30"
              class="preset-btn px-2 py-1 bg-indigo-600/30 text-indigo-700 dark:text-indigo-300 border border-indigo-500/40 text-[10px] font-bold rounded-lg transition-all">+30 hr</button>
            <button type="button" onclick="setPresetHari(60)" id="btn-preset-60"
              class="preset-btn px-2 py-1 bg-slate-200 dark:bg-slate-800/90 hover:bg-indigo-200 dark:hover:bg-indigo-600/60 text-slate-700 dark:text-slate-200 text-[10px] rounded-lg border border-slate-300 dark:border-slate-700/60 transition-all">+60 hr</button>
            <button type="button" onclick="setPresetHari(90)" id="btn-preset-90"
              class="preset-btn px-2 py-1 bg-slate-200 dark:bg-slate-800/90 hover:bg-indigo-200 dark:hover:bg-indigo-600/60 text-slate-700 dark:text-slate-200 text-[10px] rounded-lg border border-slate-300 dark:border-slate-700/60 transition-all">+90 hr</button>
            <button type="button" onclick="setPresetHari(365)" id="btn-preset-365"
              class="preset-btn px-2 py-1 bg-slate-200 dark:bg-slate-800/90 hover:bg-indigo-200 dark:hover:bg-indigo-600/60 text-slate-700 dark:text-slate-200 text-[10px] rounded-lg border border-slate-300 dark:border-slate-700/60 transition-all">+1 thn</button>
          </div>'''

content = content.replace(old_presets, new_presets)

# Add logic to calculateHari
# Find calculateHari function and insert updatePresetActiveState
target = 'function calculateHari() {\n'
insertion = '''    function calculateHari() {
      const jumlahHari = parseInt(document.getElementById('hariJumlah').value) || 0;
      updatePresetActiveState(jumlahHari);\n'''
content = content.replace('function calculateHari() {\n', insertion)
content = content.replace("const hari = parseInt(document.getElementById('hariJumlah').value) || 0;", "const hari = jumlahHari;")

# Find setPresetHari and replace to ensure it just sets value
old_set_preset = '''    function setPresetHari(n) {
      document.getElementById('hariJumlah').value = n;
      calculateHari();
    }'''

new_set_preset = '''    function updatePresetActiveState(val) {
      const presets = [7, 14, 30, 60, 90, 365];
      presets.forEach(p => {
        const btn = document.getElementById('btn-preset-' + p);
        if (btn) {
          if (p === val) {
            btn.className = 'preset-btn px-2 py-1 bg-indigo-600/30 text-indigo-700 dark:text-indigo-300 border border-indigo-500/40 text-[10px] font-bold rounded-lg transition-all';
          } else {
            btn.className = 'preset-btn px-2 py-1 bg-slate-200 dark:bg-slate-800/90 hover:bg-indigo-200 dark:hover:bg-indigo-600/60 text-slate-700 dark:text-slate-200 text-[10px] rounded-lg border border-slate-300 dark:border-slate-700/60 transition-all';
          }
        }
      });
    }

    function setPresetHari(n) {
      document.getElementById('hariJumlah').value = n;
      calculateHari();
    }'''

content = content.replace(old_set_preset, new_set_preset)

with open('kalkulator_waktu_v20260915.html', 'w', encoding='utf-8') as f:
    f.write(content)
