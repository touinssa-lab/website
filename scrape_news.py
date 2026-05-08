import urllib.request
import json
from bs4 import BeautifulSoup

def get_naver_news_headlines(sid1):
    url = f"https://news.naver.com/section/{sid1}"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'})
    try:
        html = urllib.request.urlopen(req).read()
        soup = BeautifulSoup(html, 'html.parser')
        headlines = []
        # Find elements with class "sa_text_title" or similar
        for a in soup.select('.sa_text_title'):
            title = a.get_text(strip=True)
            link = a.get('href')
            headlines.append({'title': title, 'link': link})
        return headlines
    except Exception as e:
        print(f"Error fetching {sid1}: {e}")
        return []

sections = {
    '100': '정치',
    '101': '경제',
    '102': '사회',
    '103': '생활/문화',
    '104': '세계',
    '105': 'IT/과학'
}

all_news = {}
for sid1, name in sections.items():
    all_news[name] = get_naver_news_headlines(sid1)

with open('naver_news.json', 'w', encoding='utf-8') as f:
    json.dump(all_news, f, ensure_ascii=False, indent=2)
