import json
import urllib.request
from bs4 import BeautifulSoup
import time

with open('src/data/naverNewsData.ts', 'r', encoding='utf-8') as f:
    content = f.read()

start_token = "naverNewsData: NaverNewsItem[] = "
start_idx = content.find(start_token) + len(start_token)
end_idx = content.rfind(']') + 1
json_str = content[start_idx:end_idx]

articles = json.loads(json_str)

for article in articles:
    naver_link = article['link']
    if 'naver.com' in naver_link:
        try:
            req = urllib.request.Request(naver_link, headers={'User-Agent': 'Mozilla/5.0'})
            html = urllib.request.urlopen(req).read()
            soup = BeautifulSoup(html, 'html.parser')
            origin_tag = soup.select_one('.media_end_head_origin_link')
            if origin_tag and origin_tag.get('href'):
                article['link'] = origin_tag.get('href')
                print(f"Updated link: {article['link']}")
        except Exception as e:
            print(f"Error fetching {naver_link}: {e}")
        time.sleep(0.5)

ts_content = content[:start_idx] + json.dumps(articles, ensure_ascii=False, indent=2) + content[end_idx:]

with open('src/data/naverNewsData.ts', 'w', encoding='utf-8') as f:
    f.write(ts_content)

print("naverNewsData.ts links updated.")
