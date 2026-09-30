import re

with open('hitung_persen_v20260915.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. HTML tag
content = content.replace('<html lang="id" class="dark">', '<html lang="id">')
content = content.replace('<title>Kalkulator Persentase Pro v20260915</title>', '<title>Kalkulator Persentase Pro v20260930</title>')

# 2. Add style and script to <head>
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
          <svg id="theme-toggle-light-icon" class="w-4 h-4 text-amber-500 hidden dark:block" fill="none" viewBox="0 0 24 24"
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
content = content.replace('text-white', 'text-white')

content = content.replace('bg-slate-950/60', 'bg-slate-100/60 dark:bg-slate-900/60')
content = content.replace('border-slate-800', 'border-slate-300 dark:border-slate-700')

# Options in select
content = content.replace('<option value="">', '<option value="" class="bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100">')
content = content.replace('<option value=" m">', '<option value=" m" class="bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100">')
content = content.replace('<option value=" kg">', '<option value=" kg" class="bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100">')
content = content.replace('<option value=" liter">', '<option value=" liter" class="bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100">')
content = content.replace('<option value=" pcs">', '<option value=" pcs" class="bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100">')
content = content.replace('<option value=" jam">', '<option value=" jam" class="bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100">')
content = content.replace('<option value="Rp ">', '<option value="Rp " class="bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100">')

# 5. The 3 result cards
content = content.replace('bg-amber-950/40 border border-amber-500/30', 'bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-500/30')
content = content.replace('text-amber-300', 'text-amber-600 dark:text-amber-300')
content = content.replace('text-amber-400', 'text-amber-600 dark:text-amber-400')

content = content.replace('bg-rose-950/40 border border-rose-500/30', 'bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-500/30')
content = content.replace('text-rose-300', 'text-rose-600 dark:text-rose-300')
content = content.replace('text-rose-400', 'text-rose-600 dark:text-rose-400')

content = content.replace('bg-emerald-950/40 border border-emerald-500/30', 'bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/30')
content = content.replace('text-emerald-300', 'text-emerald-600 dark:text-emerald-300')
content = content.replace('text-emerald-400', 'text-emerald-600 dark:text-emerald-400')

# 6. Borders and Spacing (the requested fix)
content = content.replace('mb-3 border-b border-slate-800/80 pb-2.5', 'mb-3 border-b-2 border-slate-200 dark:border-slate-800/80 pb-2.5')
content = content.replace('<div class="shrink-0 mt-2">\\n      <div class="grid grid-cols-3 gap-2 mb-3">', '<div class="shrink-0 mt-2 pt-3.5 border-t-2 border-slate-200 dark:border-slate-800/80">\\n      <div class="grid grid-cols-3 gap-2 mb-3.5">')
content = content.replace('mt-4 pt-3 pb-2 border-t border-slate-200 dark:border-slate-800', 'mt-0 pt-3 pb-2 border-t-2 border-slate-200 dark:border-slate-800/80')

# For the button wrapper, we'll try a regex replacement if the simple one fails
if '<div class="shrink-0 mt-2 pt-3.5' not in content:
    content = re.sub(r'<div class="shrink-0 mt-2">\s*<div class="grid grid-cols-3 gap-2 mb-3">', '<div class="shrink-0 mt-2 pt-3.5 border-t-2 border-slate-200 dark:border-slate-800/80">\\n      <div class="grid grid-cols-3 gap-2 mb-3.5">', content)

# 7. Button Kembali
btn_kembali_old = 'bg-slate-800/80 hover:bg-slate-700 active:scale-95 text-slate-300 font-medium text-xs rounded-xl transition-all duration-150 border border-slate-700/50 shadow-sm'
btn_kembali_new = 'bg-slate-200/80 dark:bg-slate-800/80 hover:bg-slate-300 dark:hover:bg-slate-700 active:scale-95 text-slate-600 dark:text-slate-300 font-medium text-xs rounded-xl transition-all duration-150 border border-slate-300/50 dark:border-slate-700/50'
content = content.replace(btn_kembali_old, btn_kembali_new)

# 8. JS updates
js_btn_old = "btn.className = 'py-1.5 px-1 bg-slate-950/60 hover:bg-amber-600 hover:text-white border border-slate-800 active:scale-95 text-amber-400 font-bold text-xs rounded-lg transition-all duration-150 text-center';"
js_btn_new = "btn.className = 'py-1.5 px-1 bg-slate-100/60 dark:bg-slate-900/60 hover:bg-amber-600 hover:text-white border border-slate-300 dark:border-slate-700 active:scale-95 text-amber-600 dark:text-amber-400 font-bold text-xs rounded-lg transition-all duration-150 text-center';"
content = content.replace(js_btn_old, js_btn_new)

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
content = content.replace('calculate();\n  </script>', 'calculate();\n' + theme_listener + '  </script>')

# Remove potential duplicates from text-white replacement
content = content.replace('text-white dark:text-slate-100', 'text-white')

with open('hitung_persen_v20260915.html', 'w', encoding='utf-8') as f:
    f.write(content)
