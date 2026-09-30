import re

with open('hitung_waktu_rewind_v20260915.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. HTML tag & Title
content = content.replace('<html lang="id" class="dark">', '<html lang="id">')
content = content.replace('<title>Estimasi Waktu Produksi Kabel v20260915</title>', '<title>Estimasi Waktu Produksi Kabel v20260930</title>')

# 2. Font & Theme Script
old_font = '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">'
new_font = '<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">'
content = content.replace(old_font, new_font)

content = content.replace("sans: ['Inter', 'sans-serif'],", "sans: ['\"Plus Jakarta Sans\"', 'sans-serif'],")

head_insert = '''  <style>
    .scrollbar-none::-webkit-scrollbar {
      display: none;
    }
    .scrollbar-none {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
    *, *::before, *::after {
      transition-property: background-color, border-color, color, fill, stroke;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-duration: 300ms;
    }
  </style>
  <script>
    if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
  </script>'''

pattern_old_style = r'\s*<style>\s*\.scrollbar-none::-webkit-scrollbar\s*\{\s*display:\s*none;\s*\}\s*\.scrollbar-none\s*\{\s*-ms-overflow-style:\s*none;\s*scrollbar-width:\s*none;\s*\}\s*</style>'
content = re.sub(pattern_old_style, '\n' + head_insert, content)

# 3. Replace version badge with theme toggle
pattern_badge = r'<span[^>]*>v20260915</span>'
theme_toggle_html = '''<button id="theme-toggle" type="button"
          class="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 hover:bg-slate-100 dark:hover:bg-slate-700 active:scale-95 transition-all">
          <svg id="theme-toggle-dark-icon" class="w-4 h-4 text-slate-500 dark:text-slate-400 block dark:hidden" fill="none"
              viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
          <svg id="theme-toggle-light-icon" class="w-4 h-4 text-indigo-500 hidden dark:block" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
          </svg>
        </button>'''
content = re.sub(pattern_badge, theme_toggle_html, content)

# 4. Global Color Replacements (Dark to Light/Dark)
content = content.replace('bg-slate-950 text-slate-100', 'bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100')
content = content.replace('bg-slate-900/85 backdrop-blur-xl border border-slate-800/80', 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80')

content = content.replace('text-slate-100', 'text-slate-800 dark:text-slate-100')
content = content.replace('text-slate-300', 'text-slate-600 dark:text-slate-300')
content = content.replace('text-slate-400', 'text-slate-500 dark:text-slate-400')

content = content.replace('bg-slate-950/60', 'bg-slate-100/60 dark:bg-slate-900/60')
content = content.replace('border-slate-800', 'border-slate-300 dark:border-slate-700')

# Options in select (if any) - no select here

# 5. Borders and Spacing (the requested fix)
content = content.replace('mb-3 border-b border-slate-800/80 pb-2.5', 'mb-3 border-b-2 border-slate-200 dark:border-slate-800/80 pb-2.5')
content = content.replace('<div class="shrink-0 mt-2 pt-2 border-t border-slate-800/80">', '<div class="shrink-0 mt-2 pt-3.5 border-t-2 border-slate-200 dark:border-slate-800/80">')
content = content.replace('<div class="shrink-0 mt-2 pt-2 border-t border-slate-300 dark:border-slate-700">', '<div class="shrink-0 mt-2 pt-3.5 border-t-2 border-slate-200 dark:border-slate-800/80">')
content = content.replace('<div class="grid grid-cols-3 gap-2 mb-3">', '<div class="grid grid-cols-3 gap-2 mb-3.5">')
content = content.replace('mt-4 pt-3 pb-2 border-t border-slate-200 dark:border-slate-800', 'mt-0 pt-3 pb-2 border-t-2 border-slate-200 dark:border-slate-800/80')

# 6. Button Kembali
btn_kembali_old = 'bg-slate-800/80 hover:bg-slate-700 active:scale-95 text-slate-300 font-medium text-xs rounded-xl transition-all duration-150 border border-slate-700/50 shadow-sm'
btn_kembali_new = 'bg-slate-200/80 dark:bg-slate-800/80 hover:bg-slate-300 dark:hover:bg-slate-700 active:scale-95 text-slate-600 dark:text-slate-300 font-medium text-xs rounded-xl transition-all duration-150 border border-slate-300/50 dark:border-slate-700/50 shadow-sm'
# wait, because text-slate-300 was replaced globally earlier, it might be text-slate-600 dark:text-slate-300 now in btn_kembali_old
btn_kembali_old_modified = 'bg-slate-800/80 hover:bg-slate-700 active:scale-95 text-slate-600 dark:text-slate-300 font-medium text-xs rounded-xl transition-all duration-150 border border-slate-700/50 shadow-sm'
content = content.replace(btn_kembali_old_modified, btn_kembali_new)
content = content.replace(btn_kembali_old, btn_kembali_new)

# 7. Button Hapus/Reset - just replace the whole button HTML with regex
reset_btn_regex = r'<button type="button" id="hapusBtn" class="flex items-center justify-center gap-1 py\.5 px-2 bg-rose-950/40.*?Reset\s*</button>'
# actually just replacing manually
old_reset = '''<button type="button" id="hapusBtn" class="flex items-center justify-center gap-1 py-2.5 px-2 bg-rose-950/40 hover:bg-rose-900/60 active:scale-95 text-rose-400 font-medium text-xs rounded-xl transition-all duration-150 border border-rose-500/30">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
          </svg>
          Reset
        </button>'''

new_reset = '''<button type="button" id="hapusBtn" class="flex items-center justify-center gap-1.5 py-2 px-3 bg-rose-50 dark:bg-rose-900/20 hover:bg-rose-100 dark:hover:bg-rose-900/40 active:scale-95 text-rose-600 dark:text-rose-400 font-medium text-xs rounded-xl border border-rose-200 dark:border-rose-800/50 transition-all shadow-sm">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Reset
        </button>'''
content = content.replace(old_reset, new_reset)

# 8. JS Output formatting
content = content.replace('bg-rose-950/50 border border-rose-500/40 rounded-xl text-center text-xs text-rose-300', 'bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-500/40 rounded-xl text-center text-xs text-rose-600 dark:text-rose-300')
content = content.replace('bg-gradient-to-br from-indigo-950/60 via-slate-900 to-slate-950 border border-indigo-500/30', 'bg-gradient-to-br from-indigo-50/60 via-slate-100 to-indigo-50/60 dark:from-indigo-950/60 dark:via-slate-900 dark:to-slate-950 border border-indigo-200/50 dark:border-indigo-500/30')
content = content.replace('text-indigo-300', 'text-indigo-700 dark:text-indigo-300')
content = content.replace('text-emerald-400', 'text-emerald-600 dark:text-emerald-400')
content = content.replace('text-indigo-400', 'text-indigo-600 dark:text-indigo-400')
content = content.replace('text-slate-200', 'text-slate-800 dark:text-slate-200')
content = content.replace('bg-slate-950/60 border border-slate-800/80 rounded-xl text-xs text-slate-300', 'bg-slate-100/60 dark:bg-slate-950/60 border border-slate-300/80 dark:border-slate-800/80 rounded-xl text-xs text-slate-600 dark:text-slate-300')

# Also fix toggle background if it exists (lanjutkanSwitch)
content = content.replace('bg-slate-800 rounded-full', 'bg-slate-200 dark:bg-slate-800 rounded-full')
content = content.replace('bg-slate-700 w-full', 'bg-slate-200 dark:bg-slate-700 w-full')

# 9. Add Theme Listener
theme_listener = '''
    // Dark Mode
    const themeToggleBtn = document.getElementById('theme-toggle');
    if(themeToggleBtn) {
        themeToggleBtn.addEventListener('click', function () {
            if (document.documentElement.classList.contains('dark')) {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('color-theme', 'light');
            } else {
                document.documentElement.classList.add('dark');
                localStorage.setItem('color-theme', 'dark');
            }
        });
    }
'''
content = content.replace('  </script>', theme_listener + '  </script>')

with open('hitung_waktu_rewind_v20260915.html', 'w', encoding='utf-8') as f:
    f.write(content)
