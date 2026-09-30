import re

with open('kalkulator_waktu_v20260915.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update html tag
content = content.replace('<html lang="id" class="dark">', '<html lang="id">')

# 2. Add style and initial script to head
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

# Replace old style block
pattern_old_style = r'\s*<style>\s*\.scrollbar-none::-webkit-scrollbar\s*\{\s*display:\s*none;\s*\}\s*\.scrollbar-none\s*\{\s*-ms-overflow-style:\s*none;\s*scrollbar-width:\s*none;\s*\}\s*</style>'
content = re.sub(pattern_old_style, '\n' + head_insert, content)

# 3. Update toggle icons
content = content.replace('id="theme-toggle-dark-icon" class="w-4 h-4 text-slate-500 dark:text-slate-400 hidden"', 'id="theme-toggle-dark-icon" class="w-4 h-4 text-slate-500 dark:text-slate-400 block dark:hidden"')
content = content.replace('id="theme-toggle-light-icon" class="w-4 h-4 text-amber-500 hidden"', 'id="theme-toggle-light-icon" class="w-4 h-4 text-amber-500 hidden dark:block"')

# 4. Simplify event listener at the bottom
pattern_old_listener = r'// Dark Mode\s*const themeToggleBtn = document\.getElementById\(\'theme-toggle\'\);\s*const themeToggleDarkIcon = document\.getElementById\(\'theme-toggle-dark-icon\'\);\s*const themeToggleLightIcon = document\.getElementById\(\'theme-toggle-light-icon\'\);\s*if \(localStorage\.getItem\(\'color-theme\'\) === \'dark\' \|\| \(!\(\'color-theme\' in localStorage\) && window\.matchMedia\(\'\(prefers-color-scheme: dark\)\'\)\.matches\)\) \{\s*document\.documentElement\.classList\.add\(\'dark\'\);\s*themeToggleLightIcon\.classList\.remove\(\'hidden\'\);\s*\} else \{\s*themeToggleDarkIcon\.classList\.remove\(\'hidden\'\);\s*\}\s*themeToggleBtn\.addEventListener\(\'click\', function \(\) \{\s*themeToggleDarkIcon\.classList\.toggle\(\'hidden\'\);\s*themeToggleLightIcon\.classList\.toggle\(\'hidden\'\);\s*if \(localStorage\.getItem\(\'color-theme\'\) === \'light\'\) \{\s*document\.documentElement\.classList\.add\(\'dark\'\);\s*localStorage\.setItem\(\'color-theme\', \'dark\'\);\s*\} else \{\s*document\.documentElement\.classList\.remove\(\'dark\'\);\s*localStorage\.setItem\(\'color-theme\', \'light\'\);\s*\}\s*\}\);'

new_listener = '''// Dark Mode
      const themeToggleBtn = document.getElementById('theme-toggle');
      themeToggleBtn.addEventListener('click', function () {
          if (document.documentElement.classList.contains('dark')) {
              document.documentElement.classList.remove('dark');
              localStorage.setItem('color-theme', 'light');
          } else {
              document.documentElement.classList.add('dark');
              localStorage.setItem('color-theme', 'dark');
          }
      });'''

content = re.sub(pattern_old_listener, new_listener, content)

with open('kalkulator_waktu_v20260915.html', 'w', encoding='utf-8') as f:
    f.write(content)
