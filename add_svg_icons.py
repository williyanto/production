import os, glob, re

path = r'd:\My Project\Mengkoding\WEB\06_GITHUB_REPO_PAGE\williyanto\production\**\*.html'
files = glob.glob(path, recursive=True)

svg_back_str = '<svg class="w-4 h-4 mr-1 inline-block" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>'
svg_trash_str = '<svg class="w-4 h-4 mr-1 inline-block" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>'
svg_home_str = '<svg class="w-4 h-4 mr-1 inline-block" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>'

count = 0
for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    new_content = re.sub(r'(?<!</svg)(?<!</i)>(\s*)Kembali(\s*)<', r'>\g<1>' + svg_back_str + r' Kembali\g<2><', content)
    new_content = re.sub(r'(?<!</svg)(?<!</i)>(\s*)Hapus(\s*)<', r'>\g<1>' + svg_trash_str + r' Hapus\g<2><', new_content)
    new_content = re.sub(r'(?<!</svg)(?<!</i)>(\s*)Beranda(\s*)<', r'>\g<1>' + svg_home_str + r' Beranda\g<2><', new_content)
    
    if new_content != content:
        with open(f, 'w', encoding='utf-8') as file:
            file.write(new_content)
        count += 1
        print(f"Added SVG icons to {f}")

print(f'Updated {count} files.')
