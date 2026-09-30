import re

with open('kalkulator_waktu_v20260915.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove individual reset buttons
pattern_reset_btn = r'\s*<!-- Tombol Reset -->\s*<div class=\"mt-2\">\s*<button type=\"button\" onclick=\"reset[a-zA-Z]+\(\)\"[\s\S]*?Reset ke Waktu Sekarang\s*</button>\s*</div>'
content = re.sub(pattern_reset_btn, '', content)

# Update bottom grid from grid-cols-2 to grid-cols-3 and add Reset button
pattern_bottom_grid = r'<div class=\"grid grid-cols-2 gap-2 mb-2\">([\s\S]*?)<a href=\"index.html\"'
replacement_bottom_grid = r'''<div class="grid grid-cols-3 gap-2 mb-2">\1<button
          onclick="resetCurrentTab()"
          class="flex items-center justify-center gap-1.5 py-2 px-3 bg-rose-50 dark:bg-rose-900/20 hover:bg-rose-100 dark:hover:bg-rose-900/40 active:scale-95 text-rose-600 dark:text-rose-400 font-medium text-xs rounded-xl border border-rose-200 dark:border-rose-800/50 transition-all">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Reset
        </button>
        <a href="index.html"'''
content = re.sub(pattern_bottom_grid, replacement_bottom_grid, content)

# Update switchTab logic
pattern_switchTab = r'function switchTab\(tabName\) \{'
replacement_switchTab = r'''let currentActiveTab = 'durasi';
    function resetCurrentTab() {
      if (currentActiveTab === 'durasi') resetDurasi();
      else if (currentActiveTab === 'hari') resetHari();
      else if (currentActiveTab === 'kedepan') resetKedepan();
      else if (currentActiveTab === 'tanggal') resetTanggal();
      else if (currentActiveTab === 'tambah') resetTambah();
    }
    function switchTab(tabName) {
      currentActiveTab = tabName;'''
content = re.sub(pattern_switchTab, replacement_switchTab, content)

with open('kalkulator_waktu_v20260915.html', 'w', encoding='utf-8') as f:
    f.write(content)
