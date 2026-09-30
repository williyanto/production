import re

with open('hitung_panjang_kabel_didrum_v20260915.html', 'r', encoding='utf-8') as f:
    content = f.read()

# HTML Tag
content = content.replace('<html lang="id" class="transition-all duration-300">', '<html lang="id">')

# Title
content = content.replace('<title>Kalkulator Panjang Kabel dalam Drum - CableMetrics</title>', '<title>Kalkulator Panjang Kabel dalam Drum v20260930</title>')

# Head Script/Style
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
# Find where to insert in <head>
content = content.replace('</head>', head_insert + '\\n</head>')

# Ensure body transition class is removed if it conflicts, but the one injected in style covers it.
# Leave body alone to minimize unexpected styling changes, just the script is important.

# Replace old Theme Button HTML
old_btn = '''<button id="theme-toggle" type="button" class="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-95 transition-all shadow-sm">
                <svg id="theme-toggle-dark-icon" class="w-4 h-4 text-slate-500 dark:text-slate-400 block" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
                <svg id="theme-toggle-light-icon" class="w-4 h-4 text-amber-500 hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
            </button>'''

new_btn = '''<button id="theme-toggle" type="button"
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
content = content.replace(old_btn, new_btn)

# Replace old Theme Script logic with standard
old_js = '''        // Theme Toggle Script
        const themeToggleBtn = document.getElementById('theme-toggle');
        const darkIcon = document.getElementById('theme-toggle-dark-icon');
        const lightIcon = document.getElementById('theme-toggle-light-icon');

        // Init Theme
        if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
            darkIcon.classList.add('hidden');
            darkIcon.classList.remove('block');
            lightIcon.classList.remove('hidden');
            lightIcon.classList.add('block');
        } else {
            document.documentElement.classList.remove('dark');
        }

        themeToggleBtn.addEventListener('click', function() {
            document.documentElement.classList.toggle('dark');
            const isDark = document.documentElement.classList.contains('dark');
            
            if (isDark) {
                localStorage.setItem('color-theme', 'dark');
                darkIcon.classList.add('hidden');
                darkIcon.classList.remove('block');
                lightIcon.classList.remove('hidden');
                lightIcon.classList.add('block');
            } else {
                localStorage.setItem('color-theme', 'light');
                lightIcon.classList.add('hidden');
                lightIcon.classList.remove('block');
                darkIcon.classList.remove('hidden');
                darkIcon.classList.add('block');
            }
        });'''

new_js = '''    // Dark Mode
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
    }'''

content = content.replace(old_js, new_js)

# Also fix the top header border (was mb-3 border-b border-slate-200 dark:border-slate-800/80 pb-2.5)
# Wait, let's see if there is a border on the header
content = content.replace('mb-3 border-b border-slate-200/50 dark:border-slate-700/50 pb-2.5', 'mb-3 border-b-2 border-slate-200 dark:border-slate-800/80 pb-2.5')
content = content.replace('mb-3 border-b border-slate-200 dark:border-slate-800 pb-2.5', 'mb-3 border-b-2 border-slate-200 dark:border-slate-800/80 pb-2.5')

# Make the card match styling bg-white/90 dark:bg-slate-900/90 (the current is bg-white/80 dark:bg-slate-900/80)
content = content.replace('bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border border-slate-200/50 dark:border-slate-700/50', 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80')

with open('hitung_panjang_kabel_didrum_v20260915.html', 'w', encoding='utf-8') as f:
    f.write(content)
