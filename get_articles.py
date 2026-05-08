import json
import urllib.request
from bs4 import BeautifulSoup

with open('src/data/naverNewsData.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix the JSON parsing
start_token = "naverNewsData: NaverNewsItem[] = "
start_idx = content.find(start_token) + len(start_token)
end_idx = content.rfind(']') + 1
json_str = content[start_idx:end_idx]

articles = json.loads(json_str)
full_articles = []

for i, article in enumerate(articles[:10]):
    link = article['link']
    try:
        req = urllib.request.Request(link, headers={'User-Agent': 'Mozilla/5.0'})
        html = urllib.request.urlopen(req).read()
        soup = BeautifulSoup(html, 'html.parser')
        body = soup.select_one('#dic_area')
        text = body.get_text(separator=' ', strip=True) if body else article['excerpt']
        
        full_articles.append({
            "title": article['title'],
            "press": article['press'],
            "time": article['time'],
            "category": article['category'],
            "tag": article['tag'],
            "link": link,
            "full_text": text
        })
    except Exception as e:
        print(f"Error fetching {link}: {e}")

with open('articles_full.json', 'w', encoding='utf-8') as f:
    json.dump(full_articles, f, ensure_ascii=False, indent=2)

print(f"Saved {len(full_articles)} full articles to articles_full.json")
