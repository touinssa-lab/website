import re
import urllib.request
from bs4 import BeautifulSoup

def get_thumbnail(url):
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        html = urllib.request.urlopen(req).read()
        soup = BeautifulSoup(html, 'html.parser')
        
        # Naver News main image usually has id 'img1' or is inside .end_photo_org
        img_tag = soup.select_one('#img1') or soup.select_one('.end_photo_org img') or soup.select_one('meta[property="og:image"]')
        
        if img_tag:
            if img_tag.name == 'meta':
                return img_tag.get('content', '')
            else:
                return img_tag.get('data-src') or img_tag.get('src', '')
    except Exception as e:
        print(f"Error fetching {url}: {e}")
    return ''

def process_ts_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find all objects
    import ast
    
    # We will use regex to find link and insert thumbnail right after it
    # Pattern: link: "http...",
    
    matches = list(re.finditer(r'"?link"?:\s*"(https?://[^"]+)"', content))
    
    # Process from back to front to not mess up indices
    for match in reversed(matches):
        link = match.group(1)
        thumb = get_thumbnail(link)
        print(f"Found thumbnail for {link}: {thumb}")
        
        insert_pos = match.end()
        # insert thumbnail: "URL",
        insert_str = f',\n    thumbnail: "{thumb}"' if thumb else f',\n    thumbnail: ""'
        
        content = content[:insert_pos] + insert_str + content[insert_pos:]
        
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

process_ts_file('src/data/naverNewsData.ts')
process_ts_file('src/data/naverNewsDataAI.ts')
print("Done extracting thumbnails.")
