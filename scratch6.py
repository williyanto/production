import re

with open('generator_angka_v20260915.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix duplicates from previous regex
content = content.replace('text-slate-800 dark:text-slate-800 dark:text-slate-100', 'text-slate-800 dark:text-slate-100')
content = content.replace('border-slate-200/80 dark:border-slate-200/80 dark:border-slate-800/80', 'border-slate-200/80 dark:border-slate-800/80')

# Fix bg-slate-950/60 inputs
content = content.replace('bg-slate-950/60 border border-slate-200 dark:border-slate-800', 'bg-slate-100/60 dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800')

# Fix generated number items in JS
content = content.replace("item.className = 'flex items-center justify-between p-1.5 bg-slate-900/90 rounded border border-slate-200 dark:border-slate-800/60';", "item.className = 'flex items-center justify-between p-1.5 bg-white/90 dark:bg-slate-900/90 rounded border border-slate-300 dark:border-slate-800/60';")

# Ensure text of generated numbers is correct
content = content.replace("const spanNo = document.createElement('span');\n        spanNo.className = 'text-[10px] text-slate-500 font-medium';", "const spanNo = document.createElement('span');\n        spanNo.className = 'text-[10px] text-slate-500 dark:text-slate-500 font-medium';")

content = content.replace("const spanValue = document.createElement('span');\n        spanValue.className = 'text-sky-400 font-bold tracking-wide';", "const spanValue = document.createElement('span');\n        spanValue.className = 'text-sky-600 dark:text-sky-400 font-bold tracking-wide';")


with open('generator_angka_v20260915.html', 'w', encoding='utf-8') as f:
    f.write(content)
