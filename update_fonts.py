import os
import re

files_inter_tailwind = [
    "generator_angka_v20260930.html",
    "hitung_persen_v20260930.html",
    "kalkulator_waktu_v20260930.html",
    "konverter_panjang_v20260930.html",
]

for fname in files_inter_tailwind:
    with open(fname, 'r', encoding='utf-8') as f:
        c = f.read()
    # Replace Google Fonts link
    c = c.replace(
        "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap",
        "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
    )
    # Replace Tailwind config
    c = c.replace("sans: ['Inter', 'sans-serif'],", "sans: ['Plus Jakarta Sans', 'sans-serif'],")
    with open(fname, 'w', encoding='utf-8') as f:
        f.write(c)
    print(f"Updated: {fname}")

# rapihkan_teks uses Tailwind v4 - add Google Fonts + @theme directive
with open("rapihkan_teks_v20260915.html", 'r', encoding='utf-8') as f:
    c = f.read()

# Add Google Fonts link after <head>
if "Plus Jakarta Sans" not in c:
    c = c.replace(
        '<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>',
        '<link rel="preconnect" href="https://fonts.googleapis.com">\n  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">\n  <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>'
    )
    # Add @theme config in existing <style> tag
    c = c.replace(
        '<style>',
        '<style>\n    @import url("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap");\n    :root, * { --font-sans: "Plus Jakarta Sans", sans-serif; }\n    body { font-family: "Plus Jakarta Sans", sans-serif !important; }',
        1
    )
    print("Updated: rapihkan_teks_v20260915.html")

with open("rapihkan_teks_v20260915.html", 'w', encoding='utf-8') as f:
    f.write(c)

# manajemen_aset already has PJS but let's ensure it's first in priority
with open("manajemen_aset_v20260911.html", 'r', encoding='utf-8') as f:
    c = f.read()
# Already has Plus Jakarta Sans first in sans array
if "font-family: 'Inter'" in c:
    c = c.replace("font-family: 'Inter'", "font-family: 'Plus Jakarta Sans'")
    print("Updated Inter -> PJS in manajemen_aset")
    with open("manajemen_aset_v20260911.html", 'w', encoding='utf-8') as f:
        f.write(c)
else:
    print("manajemen_aset OK")

print("All done!")
