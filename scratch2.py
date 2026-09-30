import re

with open('kalkulator_waktu_v20260915.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove individual reset buttons (both Waktu and Tanggal)
pattern_reset_btn = r'\s*<!-- Tombol Reset -->\s*<div class=\"mt-2\">[\s\S]*?Reset ke (?:Waktu|Tanggal) Sekarang[\s\S]*?</div>'
content = re.sub(pattern_reset_btn, '', content)

with open('kalkulator_waktu_v20260915.html', 'w', encoding='utf-8') as f:
    f.write(content)
