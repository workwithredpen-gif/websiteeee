import os
import glob

html_files = glob.glob('*.html')

for filepath in html_files:
    if not os.path.isfile(filepath): continue
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update font sizes in header
    header_start = content.find('<header')
    header_end = content.find('</header>')
    if header_start != -1 and header_end != -1:
        header_end += len('</header>')
        header_chunk = content[header_start:header_end]
        header_chunk_updated = header_chunk.replace('text-lg', 'text-base')
        content = content[:header_start] + header_chunk_updated + content[header_end:]

    # 2. Reorder Mobile Nav First
    start_mobile = content.find('<!-- Service links -->')
    photo_mobile = content.find('<!-- Photography accordion -->')
    about_mobile = content.find('<a href="about.html"', photo_mobile)
    
    if start_mobile != -1 and photo_mobile != -1 and about_mobile != -1:
        top_links = content[start_mobile:photo_mobile].strip().split('\n')
        ev_link = next((l for l in top_links if 'event-marketing.html' in l), '')
        brand_link = next((l for l in top_links if 'brand-design.html' in l), '')
        web_link = next((l for l in top_links if 'web-development.html' in l), '')
        
        photo_chunk = content[photo_mobile:about_mobile]
        
        indent = "                    "
        if ev_link: indent = ev_link[:len(ev_link) - len(ev_link.lstrip())]
            
        new_mobile = (
            photo_chunk + 
            indent + "<!-- Service links -->\n" +
            brand_link + "\n" +
            web_link + "\n" +
            ev_link + "\n" +
            indent
        )
        content = content[:start_mobile] + new_mobile + content[about_mobile:]

    # 3. Reorder Desktop Nav Last
    start_desktop = content.find('<!-- Top-level service links -->')
    photo_desktop = content.find('<!-- Photography Dropdown -->')
    about_desktop = content.find('<a href="about.html"', photo_desktop)
    
    if start_desktop != -1 and photo_desktop != -1 and about_desktop != -1:
        top_links = content[start_desktop:photo_desktop].strip().split('\n')
        ev_link = next((l for l in top_links if 'event-marketing.html' in l), '')
        brand_link = next((l for l in top_links if 'brand-design.html' in l), '')
        web_link = next((l for l in top_links if 'web-development.html' in l), '')
        
        photo_chunk = content[photo_desktop:about_desktop]
        
        indent = "                    "
        if ev_link: indent = ev_link[:len(ev_link) - len(ev_link.lstrip())]
            
        new_desktop = (
            photo_chunk + 
            indent + "<!-- Top-level service links -->\n" +
            brand_link + "\n" +
            web_link + "\n" +
            ev_link + "\n" +
            indent
        )
        content = content[:start_desktop] + new_desktop + content[about_desktop:]

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print('Updated DOM structure successfully!')
