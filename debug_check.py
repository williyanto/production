import os, re

files = [f for f in os.listdir('.') if f.endswith('.html') and f not in ('index.html','proyek_belum_tersedia.html')]

issues = {}

for fname in sorted(files):
    with open(fname, 'r', encoding='utf-8') as f:
        c = f.read()
    
    file_issues = []
    
    # 1. Check theme toggle button exists
    has_toggle_btn = bool(re.search(r'id=["\']theme-toggle["\']|id=["\']themeToggle["\']', c))
    
    # 2. Check theme toggle JS listener
    has_toggle_js = bool(re.search(r'theme-toggle|themeToggle', c.split('<script')[1] if '<script' in c else ''))
    
    # 3. Check reset button
    has_reset_btn = bool(re.search(r'id=["\']btnReset["\']|id=["\']resetBtn["\']', c))
    has_reset_js = bool(re.search(r'btnReset|resetBtn|Reset', c.split('<script')[1] if '<script' in c else ''))
    
    # 4. Check Plus Jakarta Sans
    has_pjs = 'Plus Jakarta Sans' in c
    
    # 5. Check for broken Tailwind config (double-quoted font names in array)
    bad_tailwind = bool(re.search(r"sans:\s*\['\"", c))
    
    # 6. Check localStorage theme persistence (early init script in head)
    has_early_theme = bool(re.search(r'localStorage.*color-theme|localStorage.*theme', c[:1500]))
    
    # 7. Check duplicate script tags or </body> tags
    body_count = c.count('</body>')
    script_count_close = c.count('</script>')
    script_count_open = len(re.findall(r'<script(?:\s[^>]*)?>',c))
    
    # 8. Check for v20260915 in title/strong text that should be v20260930
    # (for files that were renamed but internal text not updated)
    fname_version = re.search(r'v(\d+)', fname)
    if fname_version:
        fver = fname_version.group(1)
        title_match = re.search(r'<title>.*?v(\d+).*?</title>', c, re.IGNORECASE | re.DOTALL)
        if title_match:
            tver = title_match.group(1)
            if tver != fver and tver == '20260915' and fver == '20260930':
                file_issues.append(f"Title still says v{tver} but file is v{fver}")
    
    # Report
    if bad_tailwind:
        file_issues.append("BAD Tailwind font config: has escaped quotes in sans array")
    if not has_pjs:
        file_issues.append("Missing Plus Jakarta Sans")
    if script_count_open != script_count_close:
        file_issues.append(f"Mismatched <script> tags: {script_count_open} open vs {script_count_close} close")
    if body_count > 1:
        file_issues.append(f"Multiple </body> tags: {body_count}")
    if body_count == 0:
        file_issues.append("Missing </body> tag")
    
    issues[fname] = file_issues

print("=== DEBUGGING REPORT ===\n")
for fname, fi in issues.items():
    status = "? OK" if not fi else "? ISSUES"
    print(f"{status}: {fname}")
    for issue in fi:
        print(f"   ? {issue}")

print("\nDone.")
