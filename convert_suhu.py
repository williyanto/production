import re

with open('faktor_koreksi_suhu_v20260915.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. HTML tag & Title
content = content.replace('<html lang="id" class="dark">', '<html lang="id">')
content = content.replace('<title>Kalkulator Faktor Koreksi Suhu v20260915</title>', '<title>Kalkulator Faktor Koreksi Suhu v20260930</title>')

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

# 3. Theme Toggle Badge Replacement
pattern_badge = r'<span[^>]*>v20260915</span>'
theme_toggle_html = '''<button id="theme-toggle" type="button"
          class="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 hover:bg-slate-100 dark:hover:bg-slate-700 active:scale-95 transition-all">
          <svg id="theme-toggle-dark-icon" class="w-4 h-4 text-slate-500 dark:text-slate-400 block dark:hidden" fill="none"
              viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
          <svg id="theme-toggle-light-icon" class="w-4 h-4 text-sky-500 hidden dark:block" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
          </svg>
        </button>'''
content = re.sub(pattern_badge, theme_toggle_html, content)

# 4. Color adjustments
content = content.replace('bg-slate-950 text-slate-100', 'bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100')
content = content.replace('bg-slate-900/85 backdrop-blur-xl border border-slate-800/80', 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80')
content = content.replace('bg-slate-950/60 border border-slate-800', 'bg-slate-50 dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800')
content = content.replace('text-slate-100', 'text-slate-800 dark:text-slate-100')
content = content.replace('text-slate-300', 'text-slate-700 dark:text-slate-300')
content = content.replace('text-slate-400', 'text-slate-500 dark:text-slate-400')
content = content.replace('placeholder-slate-600', 'placeholder-slate-400 dark:placeholder-slate-600')
content = content.replace('class="bg-slate-900"', 'class="bg-white dark:bg-slate-900"')

# Fix the internal result card layout
content = content.replace('bg-gradient-to-br from-sky-900/40 via-slate-900 to-indigo-900/40 border border-sky-500/30', 'bg-gradient-to-br from-sky-50/60 via-slate-100 to-indigo-50/60 dark:from-sky-900/40 dark:via-slate-900 dark:to-indigo-900/40 border border-sky-200/50 dark:border-sky-500/30')
content = content.replace('text-sky-400', 'text-sky-600 dark:text-sky-400')
content = content.replace('text-sky-300', 'text-sky-600 dark:text-sky-300')
content = content.replace('mt-2 pt-2 border-t border-slate-800/80', 'mt-2 pt-2 border-t-2 border-slate-200 dark:border-slate-800/80')

# 5. Borders and Reset Button
content = content.replace('mb-3 border-b border-slate-800/80 pb-2.5', 'mb-3 border-b-2 border-slate-200 dark:border-slate-800/80 pb-2.5')
content = content.replace('<div class="shrink-0 mt-2 pt-2 border-t border-slate-800/80">', '<div class="shrink-0 mt-2 pt-3.5 border-t-2 border-slate-200 dark:border-slate-800/80">')
content = content.replace('<div class="shrink-0 mt-2 pt-2 border-t border-slate-300 dark:border-slate-800/80">', '<div class="shrink-0 mt-2 pt-3.5 border-t-2 border-slate-200 dark:border-slate-800/80">')
content = content.replace('mt-4 pt-3 pb-2 border-t border-slate-200 dark:border-slate-800', 'mt-0 pt-3 pb-2 border-t-2 border-slate-200 dark:border-slate-800/80')

new_grid = '''<div class="grid grid-cols-3 gap-2 mb-3.5">
        <button
          onclick="if(window.top!==window.self&&window.parent.closePreviewModal){window.parent.closePreviewModal();}else{history.back();}"
          class="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-slate-200/80 dark:bg-slate-800/80 hover:bg-slate-300 dark:hover:bg-slate-700 active:scale-95 text-slate-600 dark:text-slate-300 font-medium text-xs rounded-xl transition-all duration-150 border border-slate-300/50 dark:border-slate-700/50 shadow-sm">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Kembali
        </button>
        <button type="button" id="btnReset" class="flex items-center justify-center gap-1.5 py-2 px-3 bg-rose-50 dark:bg-rose-900/20 hover:bg-rose-100 dark:hover:bg-rose-900/40 active:scale-95 text-rose-600 dark:text-rose-400 font-medium text-xs rounded-xl border border-rose-200 dark:border-rose-800/50 transition-all shadow-sm">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Reset
        </button>
        <a href="index.html" target="_top"
          class="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-sky-600/90 hover:bg-sky-500 active:scale-95 text-white font-medium text-xs rounded-xl transition-all duration-150 shadow-lg shadow-sky-600/20">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 00-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Beranda
        </a>
      </div>'''
old_btn_group_regex = r'<div class="grid grid-cols-2 gap-2 mb-3">.*?</a>\s*</div>'
content = re.sub(old_btn_group_regex, new_grid, content, flags=re.DOTALL)

# 6. JS Fixes
content = content.replace("displayHasil.classList.remove('text-rose-400');", "displayHasil.classList.remove('text-rose-600', 'dark:text-rose-400');")
content = content.replace("displayHasil.classList.add('text-sky-300');", "displayHasil.classList.add('text-sky-600', 'dark:text-sky-300');")
content = content.replace("inputSuhu.classList.remove('border-rose-500');", "inputSuhu.classList.remove('border-rose-300', 'dark:border-rose-500');")

content = content.replace("displayHasil.classList.remove('text-sky-300');", "displayHasil.classList.remove('text-sky-600', 'dark:text-sky-300');")
content = content.replace("displayHasil.classList.add('text-rose-400');", "displayHasil.classList.add('text-rose-600', 'dark:text-rose-400');")
content = content.replace("inputSuhu.classList.add('border-rose-500');", "inputSuhu.classList.add('border-rose-300', 'dark:border-rose-500');")

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

    const btnReset = document.getElementById('btnReset');
    if(btnReset) {
      btnReset.addEventListener('click', () => {
        document.getElementById('specSelect').value = 'IEC';
        document.getElementById('conductorTypeSelect').value = 'Cu';
        document.getElementById('suhuInput').value = '20';
        hitungFaktor();
      });
    }
'''
content = content.replace('  </script>\n</body>', theme_listener + '  </script>\n</body>')

with open('faktor_koreksi_suhu_v20260915.html', 'w', encoding='utf-8') as f:
    f.write(content)
