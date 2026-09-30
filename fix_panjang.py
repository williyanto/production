import re

with open('konverter_panjang_v20260915.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Card background
content = content.replace('bg-white/85 dark:bg-slate-900/85', 'bg-white/90 dark:bg-slate-900/90')

# 2. Result gradient
content = content.replace('from-teal-950/60 via-slate-900 to-emerald-950/60', 'from-teal-50/60 via-slate-100 to-emerald-50/60 dark:from-teal-950/60 dark:via-slate-900 dark:to-emerald-950/60')

# 3. Result texts
content = content.replace('text-teal-400 tracking-wider', 'text-teal-600 dark:text-teal-400 tracking-wider')
content = content.replace('text-teal-300 tracking-tight', 'text-teal-700 dark:text-teal-300 tracking-tight')

# 4. JS dynamically generated text
content = content.replace('class="text-teal-300 font-bold"', 'class="text-teal-700 dark:text-teal-300 font-bold"')

# 5. Fix input backgrounds if they were broken
content = content.replace('bg-slate-100/60 dark:bg-slate-950/60', 'bg-slate-100/60 dark:bg-slate-900/60')

# Ensure border colors for inputs are correct (they should have dark:border-slate-700 or 800)
content = content.replace('border-slate-200 dark:border-slate-800', 'border-slate-300 dark:border-slate-700')

with open('konverter_panjang_v20260915.html', 'w', encoding='utf-8') as f:
    f.write(content)
