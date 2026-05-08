import urllib.request
import urllib.parse
from bs4 import BeautifulSoup
import json
import time

keywords = [
    "인바운드 관광", "지역 경제 활성화", "한류 관광", "문화 유산 관광", 
    "스마트 관광", "친환경 여행", "온라인 여행사", "디지털 노마드", 
    "인플루언서 마케팅 여행", "여행 챗봇", "관광 외교", "오버투어리즘"
]

all_articles = []
seen_links = set()

for keyword in keywords:
    # pd=4 (1일 이내), sort=0 (관련도순)
    url = f"https://search.naver.com/search.naver?where=news&query={urllib.parse.quote(keyword)}&pd=4"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'})
    
    try:
        html = urllib.request.urlopen(req).read()
        soup = BeautifulSoup(html, 'html.parser')
        
        for li in soup.select('.list_news > li'):
            title_tag = li.select_one('.news_tit')
            if not title_tag:
                continue
            title = title_tag.get('title') or title_tag.get_text(strip=True)
            link = title_tag.get('href')
            
            if link in seen_links:
                continue
            seen_links.add(link)
            
            press_tag = li.select_one('.info_group > a.info.press')
            press = press_tag.get_text(strip=True) if press_tag else "언론사"
            press = press.replace('언론사 선정', '')
            
            time_tag = li.select_one('.info_group > span.info')
            time_str = time_tag.get_text(strip=True) if time_tag else "최근"
            
            dsc_tag = li.select_one('.news_dsc')
            excerpt = dsc_tag.get_text(strip=True) if dsc_tag else ""
            
            all_articles.append({
                "title": title,
                "press": press,
                "time": time_str,
                "excerpt": excerpt,
                "category": "관광 트렌드",
                "tag": keyword,
                "link": link
            })
            
    except Exception as e:
        print(f"Error fetching {keyword}: {e}")
        
    time.sleep(0.5)

# Generate TypeScript file
ts_content = f"""// Auto-generated from Naver News Scraper
export const naverNewsData = {json.dumps(all_articles, ensure_ascii=False, indent=2)};
"""

with open('src/data/naverNewsData.ts', 'w', encoding='utf-8') as f:
    f.write(ts_content)

print(f"Scraped {len(all_articles)} articles.")
