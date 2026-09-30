import re

with open('konverter_panjang_v20260915.html', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('dark:text-slate-500 dark:text-slate-400', 'dark:text-slate-400')
content = content.replace('text-slate-500 dark:text-slate-400 dark:text-slate-600', 'text-slate-400 dark:text-slate-600')
content = content.replace('dark:border-slate-200 dark:border-slate-800', 'dark:border-slate-800')
content = content.replace('text-slate-800 dark:text-slate-800 dark:text-slate-100', 'text-slate-800 dark:text-slate-100')
content = content.replace('dark:border-slate-200/80 dark:border-slate-800/80', 'dark:border-slate-800/80')

with open('konverter_panjang_v20260915.html', 'w', encoding='utf-8') as f:
    f.write(content)
