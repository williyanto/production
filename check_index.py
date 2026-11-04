import os
import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Check all hrefs and src
hrefs = re.findall(r'(?:href|src)=["\']([^"\']+)["\']', content)
print(f'Total links in index.html: {len(hrefs)}')

missing = []
for h in hrefs:
    if h.startswith('http') or h.startswith('#') or h.startswith('mailto:') or h.startswith('javascript:'):
        continue
    path = h.split('?')[0].split('#')[0]
    if path.startswith('./'):
        path = path[2:]
    if not os.path.exists(path):
        missing.append((h, path))

if missing:
    print('Broken / Missing links in index.html:')
    for orig, p in missing:
        print(f'  {orig} -> {p}')
else:
    print('No broken links found in index.html!')

# Also list all html files in directory and subdirectories
all_html_files = []
for root, dirs, files in os.walk('.'):
    # skip .git
    if '.git' in root:
        continue
    for file in files:
        if file.endswith('.html'):
            rel_path = os.path.relpath(os.path.join(root, file), '.').replace('\\', '/')
            all_html_files.append(rel_path)

print(f'\nTotal HTML files found in repo: {len(all_html_files)}')
for hf in sorted(all_html_files):
    if hf == 'index.html':
        continue
    # check if hf is in index.html
    basename = os.path.basename(hf)
    if hf not in content and f'./{hf}' not in content and basename not in content:
        print(f'  [NOT in index.html]: {hf}')
    else:
        print(f'  [FOUND in index.html]: {hf}')
