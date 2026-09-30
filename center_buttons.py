import re

with open('konverter_panjang_v20260915.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Header line
content = content.replace('mb-3 border-b border-slate-200/80 dark:border-slate-800/80 pb-2.5', 'mb-3 border-b-2 border-slate-200 dark:border-slate-800/80 pb-2.5')

# 2. Bottom actions wrapper
content = content.replace('mt-2 pt-2 border-t border-slate-200/80 dark:border-slate-800/80', 'mt-2 pt-3.5 border-t-2 border-slate-200 dark:border-slate-800/80')

# 3. Buttons grid (change mb-3 to mb-3.5 for perfect balance)
content = content.replace('<div class="grid grid-cols-3 gap-2 mb-3">', '<div class="grid grid-cols-3 gap-2 mb-3.5">')

# 4. Footer line
content = content.replace('mt-4 pt-3 pb-2 border-t border-slate-300 dark:border-slate-700', 'mt-0 pt-3 pb-2 border-t-2 border-slate-200 dark:border-slate-800/80')

# If I also need to update generator_angka_v20260915.html to match these thick lines and centering? The user only has konverter_panjang open and the screenshot is from konverter_panjang. I'll just do it for konverter_panjang first, then do the same for generator_angka just in case since they want consistency.

with open('konverter_panjang_v20260915.html', 'w', encoding='utf-8') as f:
    f.write(content)
