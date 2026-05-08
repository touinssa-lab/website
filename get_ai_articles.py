import json
import urllib.request
from bs4 import BeautifulSoup
import time
from datetime import datetime

# IT/과학 분야에서 AI, 데이터 관련 기사 수집
ai_keywords = ['인공지능', 'AI', '빅데이터', '데이터', '챗봇', 'LLM', '머신러닝']
sec_name = 'IT 일반'
sid1, sid2 = '105', '230'
url = f"https://news.naver.com/breakingnews/section/{sid1}/{sid2}"

all_articles = []
seen_links = set()
today_str = datetime.now().strftime('%Y-%m-%d')

req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'})
try:
    html = urllib.request.urlopen(req).read()
    soup = BeautifulSoup(html, 'html.parser')
    
    for a in soup.select('.sa_text_title'):
        if len(all_articles) >= 6: # Get about 6 articles
            break
            
        title = a.get_text(strip=True)
        link = a.get('href')
        
        if link in seen_links: continue
            
        if not any(kw.lower() in title.lower() for kw in ai_keywords):
            continue
            
        seen_links.add(link)
        
        # Fetch original link
        try:
            detail_req = urllib.request.Request(link, headers={'User-Agent': 'Mozilla/5.0'})
            detail_html = urllib.request.urlopen(detail_req).read()
            detail_soup = BeautifulSoup(detail_html, 'html.parser')
            
            origin_link = link
            origin_tag = detail_soup.select_one('.media_end_head_origin_link')
            if origin_tag and origin_tag.get('href'):
                origin_link = origin_tag.get('href')
                
        except Exception as e:
            print(f"Error detail {link}: {e}")
            origin_link = link
            
        all_articles.append({
            "title": title,
            "press": sec_name,
            "time": today_str,
            "category": "AI & 데이터",
            "tag": "인공지능 기술",
            "link": origin_link
        })
        time.sleep(0.5)
except Exception as e:
    print(f"Error: {e}")

# Save to JSON to mentally process later, or we can just mock them if scrape fails
with open('ai_articles_raw.json', 'w', encoding='utf-8') as f:
    json.dump(all_articles, f, ensure_ascii=False, indent=2)

print(f"Scraped {len(all_articles)} AI/Data articles.")
