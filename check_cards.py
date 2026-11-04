import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

cards = re.findall(r'(<a\s+[^>]*href=["\']([^"\']+)["\'][^>]*>([\s\S]*?)</a>)', content)

print(f"Total <a> cards: {len(cards)}")
for full_tag, href, inner in cards:
    if 'list-group-item' in full_tag:
        strong_match = re.search(r'<strong>([^<]+)</strong>', inner)
        strong_text = strong_match.group(1).strip() if strong_match else "(No strong tag)"
        print(f"HREF: {href}")
        print(f"  Title: {strong_text}")
