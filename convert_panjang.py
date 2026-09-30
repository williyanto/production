import re

with open('konverter_panjang_v20260915.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. HTML tag
content = content.replace('<html lang="id" class="dark">', '<html lang="id">')
content = content.replace('<title>Konverter Panjang v20260915</title>', '<title>Konverter Panjang v20260930</title>')

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
content = content.replace('bg-slate-900/85 backdrop-blur-xl border border-slate-800/80', 'bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80')
content = content.replace('text-slate-100', 'text-slate-800 dark:text-slate-100')
content = content.replace('text-slate-200', 'text-slate-700 dark:text-slate-200')
content = content.replace('text-slate-300', 'text-slate-600 dark:text-slate-300')
content = content.replace('text-slate-400', 'text-slate-500 dark:text-slate-400')
content = content.replace('text-white', 'text-white') 
content = content.replace('bg-slate-950/60', 'bg-slate-100/60 dark:bg-slate-950/60')
content = content.replace('bg-slate-950/50', 'bg-slate-100/50 dark:bg-slate-950/50')
content = content.replace('bg-slate-950/40', 'bg-slate-100/40 dark:bg-slate-950/40')
content = content.replace('bg-slate-950', 'bg-slate-50 dark:bg-slate-950')
content = content.replace('bg-slate-900/50', 'bg-slate-100/50 dark:bg-slate-900/50')
content = content.replace('bg-slate-900/40', 'bg-slate-100/40 dark:bg-slate-900/40')
content = content.replace('bg-slate-900', 'bg-white dark:bg-slate-900')
content = content.replace('bg-slate-800/80', 'bg-slate-200/80 dark:bg-slate-800/80')
content = content.replace('bg-slate-800', 'bg-slate-200 dark:bg-slate-800')
content = content.replace('hover:bg-slate-700', 'hover:bg-slate-300 dark:hover:bg-slate-700')
content = content.replace('border-slate-800/80', 'border-slate-200/80 dark:border-slate-800/80')
content = content.replace('border-slate-800', 'border-slate-200 dark:border-slate-800')
content = content.replace('border-slate-700/60', 'border-slate-300/60 dark:border-slate-700/60')
content = content.replace('border-slate-700/50', 'border-slate-300/50 dark:border-slate-700/50')

# Cleanup duplicates from potential overlap
content = content.replace('text-slate-800 dark:text-slate-800 dark:text-slate-100', 'text-slate-800 dark:text-slate-100')
content = content.replace('border-slate-200/80 dark:border-slate-200/80 dark:border-slate-800/80', 'border-slate-200/80 dark:border-slate-800/80')

# Options in select
content = content.replace('class="bg-white dark:bg-slate-900"', 'class="bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100"')

# Bottom Actions
bottom_nav_old = '''<div class="grid grid-cols-2 gap-2 mb-3">
        <button onclick="if(window.top!==window.self&&window.parent.closePreviewModal){window.parent.closePreviewModal();}else{history.back();}" class="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-slate-200/80 dark:bg-slate-800/80 hover:bg-slate-300 dark:hover:bg-slate-700 active:scale-95 text-slate-600 dark:text-slate-300 font-medium text-xs rounded-xl transition-all duration-150 border border-slate-300/50 dark:border-slate-700/50">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
          </svg>
          Kembali
        </button>
        <a href="index.html" target="_top" class="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-teal-600/90 hover:bg-teal-500 active:scale-95 text-white font-medium text-xs rounded-xl transition-all duration-150 shadow-lg shadow-teal-600/20">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 00-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
          </svg>
          Beranda
        </a>
      </div>'''

bottom_nav_new = '''<div class="grid grid-cols-3 gap-2 mb-3">
        <button onclick="if(window.top!==window.self&&window.parent.closePreviewModal){window.parent.closePreviewModal();}else{history.back();}" class="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-slate-200/80 dark:bg-slate-800/80 hover:bg-slate-300 dark:hover:bg-slate-700 active:scale-95 text-slate-600 dark:text-slate-300 font-medium text-xs rounded-xl transition-all duration-150 border border-slate-300/50 dark:border-slate-700/50">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
          </svg>
          Kembali
        </button>
        <button type="button" id="tombolReset"
            class="flex items-center justify-center gap-1.5 py-2 px-3 bg-rose-50 dark:bg-rose-900/20 hover:bg-rose-100 dark:hover:bg-rose-900/40 active:scale-95 text-rose-600 dark:text-rose-400 font-medium text-xs rounded-xl border border-rose-200 dark:border-rose-800/50 transition-all">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Reset
        </button>
        <a href="index.html" target="_top" class="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-teal-600/90 hover:bg-teal-500 active:scale-95 text-white font-medium text-xs rounded-xl transition-all duration-150 shadow-lg shadow-teal-600/20">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 00-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
          </svg>
          Beranda
        </a>
      </div>'''

content = content.replace(bottom_nav_old, bottom_nav_new)
if bottom_nav_new not in content:
    pattern_nav = r'<div class="grid grid-cols-2 gap-2 mb-3">[\s\S]*?</a>\s*</div>'
    content = re.sub(pattern_nav, bottom_nav_new, content)

# Inject event listeners for Reset and Dark mode
listeners = '''
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

    // Reset logic
    const tombolReset = document.getElementById('tombolReset');
    if(tombolReset) {
      tombolReset.addEventListener('click', function() {
        inputValueLength.value = '';
        selectSatuanMainLength.value = 'm';
        selectSatuanOutputLength.value = 'ft';
        updateResultLength();
      });
    }
'''
content = content.replace('updateResultLength();\n  </script>', 'updateResultLength();\n' + listeners + '  </script>')

with open('konverter_panjang_v20260915.html', 'w', encoding='utf-8') as f:
    f.write(content)
