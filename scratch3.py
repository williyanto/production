import re

with open('kalkulator_waktu_v20260915.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove remaining reset buttons
pattern_reset_btn = r'\s*<button[^>]*onclick=\"reset[a-zA-Z]+\(\)\"[^>]*>[\s\S]*?Reset ke (?:Waktu|Tanggal) Sekarang\s*</button>'
content = re.sub(pattern_reset_btn, '', content)

# Update font colors in hari pane result box
content = content.replace('class="text-2xl font-black text-white tracking-wide my-0.5"', 'class="text-2xl font-black text-slate-800 dark:text-slate-100 tracking-wide my-0.5"')
content = content.replace('class="text-xs text-indigo-300 font-medium"', 'class="text-xs text-indigo-600 dark:text-indigo-300 font-medium"')
content = content.replace('class="text-indigo-400 font-medium"', 'class="text-indigo-600 dark:text-indigo-400 font-medium"')

# Update mode toggle buttons
content = content.replace('class="flex bg-slate-900 rounded-lg p-0.5 border border-slate-200 dark:border-slate-800"', 'class="flex bg-slate-200 dark:bg-slate-900 rounded-lg p-0.5 border border-slate-300 dark:border-slate-800"')

# Fix JS for setHariMode
content = content.replace("btnEks.className = 'px-2 py-0.5 rounded text-[10px] font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:text-slate-200 transition-all';", "btnEks.className = 'px-2 py-0.5 rounded text-[10px] font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-all';")
content = content.replace("btnInk.className = 'px-2 py-0.5 rounded text-[10px] font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:text-slate-200 transition-all';", "btnInk.className = 'px-2 py-0.5 rounded text-[10px] font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-all';")
content = content.replace("class=\"px-2 py-0.5 rounded text-[10px] font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:text-slate-200 transition-all\"", "class=\"px-2 py-0.5 rounded text-[10px] font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-all\"")

with open('kalkulator_waktu_v20260915.html', 'w', encoding='utf-8') as f:
    f.write(content)
