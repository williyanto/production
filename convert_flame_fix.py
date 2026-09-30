with open('flame_retardant_v20260915.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Inputs
content = content.replace('bg-slate-950/60 border border-slate-800', 'bg-slate-50 dark:bg-slate-950/60 border border-slate-300 dark:border-slate-800')
content = content.replace('placeholder-slate-600', 'placeholder-slate-400 dark:placeholder-slate-600')

# Select Options
content = content.replace('class="bg-slate-900"', 'class="bg-white dark:bg-slate-900"')

# Checkbox Container
content = content.replace('bg-slate-950/40 border border-slate-800/80', 'bg-slate-100 dark:bg-slate-950/40 border border-slate-300 dark:border-slate-800/80')
content = content.replace('hover:bg-slate-950/60', 'hover:bg-slate-200 dark:hover:bg-slate-950/60')

# Checkbox Input
content = content.replace('border-slate-700 bg-slate-900', 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900')

# Result Card
content = content.replace('bg-gradient-to-br from-emerald-950/60 via-slate-900 to-teal-950/60 border border-emerald-500/30', 'bg-gradient-to-br from-emerald-50/60 via-slate-100 to-teal-50/60 dark:from-emerald-950/60 dark:via-slate-900 dark:to-teal-950/60 border border-emerald-200/50 dark:border-emerald-500/30')
content = content.replace('text-emerald-400', 'text-emerald-600 dark:text-emerald-400')
content = content.replace('text-emerald-300', 'text-emerald-700 dark:text-emerald-300')

# Any other slate-500/slate-600 dark mode fixes
content = content.replace('text-slate-800 dark:text-slate-100', 'text-slate-700 dark:text-slate-100')

with open('flame_retardant_v20260915.html', 'w', encoding='utf-8') as f:
    f.write(content)
