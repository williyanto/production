import re

with open('konverter_panjang_v20260915.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove the broken dark prefixes caused by nested replacements
content = content.replace('dark:bg-white ', '')
content = content.replace('dark:bg-slate-50 ', '')
content = content.replace('dark:bg-slate-100 ', '')
content = content.replace('dark:bg-slate-200 ', '')
content = content.replace('dark:bg-slate-800/50 border border-slate-200 dark:border-slate-300/60 dark:border-slate-700/60', 'dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60')

with open('konverter_panjang_v20260915.html', 'w', encoding='utf-8') as f:
    f.write(content)
