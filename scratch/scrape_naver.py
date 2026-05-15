import requests
from bs4 import BeautifulSoup
import json
import urllib.parse
from datetime import datetime

# Today's date
today = "2026-05-15"

def search_naver_news(query, limit=5):
    encoded_query = urllib.parse.quote(query)
    # Removed pd=4 to find any articles regardless of date
    url = f"https://search.naver.com/search.naver?where=news&query={encoded_query}"
    
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
    }
    
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.text, 'html.parser')
    
    articles = []
    
    # Find news items
    news_items = soup.select('div.news_area')
    for item in news_items:
        if len(articles) >= limit:
            break
            
        title_tag = item.select_one('a.news_tit')
        if not title_tag:
            continue
            
        title = title_tag.get('title') or title_tag.text
        
        # We need the n.news.naver.com link
        info_tags = item.select('div.info_group a.info')
        naver_url = None
        for info in info_tags:
            if '네이버뉴스' in info.text:
                naver_url = info.get('href')
                break
                
        if not naver_url:
            continue
            
        press_tag = item.select_one('a.info.press')
        press = press_tag.text.replace('언론사 선정', '').strip() if press_tag else "알 수 없음"
        
        desc_tag = item.select_one('a.api_txt_lines.dsc_txt_wrap')
        desc = desc_tag.text if desc_tag else ""
        
        articles.append({
            "title": title,
            "url": naver_url,
            "press": press,
            "desc": desc
        })
        
    return articles

queries = [
    ("관광 특구 지정", "Tourism News", "정책/행정"),
    ("지역 경제 승수효과 관광", "Tourism News", "경제/지역"),
    ("스마트 관광도시", "Tourism News", "테크/디지털"),
    ("메디컬 투어리즘", "Tourism News", "의료/웰니스"),
    ("관광 빅데이터 분석", "AI & Data", "테크/디지털"),
    ("트래블 테크 플랫폼", "AI & Data", "테크/디지털")
]

results = []
for q, cat, tag in queries:
    print(f"Searching for {q}...")
    articles = search_naver_news(q, limit=2)
    for a in articles:
        a['category'] = cat
        a['tag'] = tag
        results.append(a)

with open('scratch/news_results_0515.json', 'w', encoding='utf-8') as f:
    json.dump(results, f, ensure_ascii=False, indent=2)

print(f"Found {len(results)} articles.")
