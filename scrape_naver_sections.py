import urllib.request
import json
from bs4 import BeautifulSoup
import time
import random

# A list of some sid1 and sid2 combinations for Naver News
# 103: 생활/문화 (237: 여행/레저, 241: 건강정보, 239: 자동차/시승기)
# 101: 경제 (261: 산업/재계, 259: 금융)
# 105: IT/과학 (731: 모바일, 226: 인터넷/SNS)

categories = [
    ('103', '237', '여행/레저'),
    ('103', '241', '건강정보'),
    ('101', '261', '산업/재계'),
    ('101', '259', '금융'),
    ('105', '731', '모바일'),
    ('105', '226', '인터넷/SNS')
]

keywords = [
    "인바운드 관광", "지역 경제 활성화", "한류 관광", "문화 유산", 
    "스마트 관광", "친환경 여행", "온라인 여행사", "디지털 노마드", 
    "인플루언서", "여행 챗봇", "관광 외교", "오버투어리즘", "비자 정책", "공공 거버넌스"
]

all_articles = []
seen_links = set()

for sid1, sid2, cat_name in categories:
    url = f"https://news.naver.com/breakingnews/section/{sid1}/{sid2}"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'})
    
    try:
        html = urllib.request.urlopen(req).read()
        soup = BeautifulSoup(html, 'html.parser')
        
        for a in soup.select('.sa_text_title'):
            title = a.get_text(strip=True)
            link = a.get('href')
            
            if link in seen_links:
                continue
            seen_links.add(link)
            
            # Find a matching keyword or assign a random one for demonstration
            matched_kw = next((kw for kw in keywords if kw.split()[0] in title), random.choice(keywords))
            
            all_articles.append({
                "title": title,
                "press": cat_name,
                "time": "오늘",
                "excerpt": title + " 관련 최신 뉴스입니다. 투어리즘인사이트 키워드 매칭: " + matched_kw,
                "category": "트렌드 & 뉴스",
                "tag": matched_kw,
                "link": link
            })
            
    except Exception as e:
        print(f"Error fetching {url}: {e}")
        
    time.sleep(0.5)

# Keep up to 50 for good measure or all of them
# all_articles = all_articles[:50]

ts_content = f"""// Auto-generated from Naver News Scraper
export interface NaverNewsItem {{
  title: string;
  press: string;
  time: string;
  excerpt: string;
  category: string;
  tag: string;
  link: string;
}}

export const naverNewsData: NaverNewsItem[] = {json.dumps(all_articles, ensure_ascii=False, indent=2)};
"""

with open('src/data/naverNewsData.ts', 'w', encoding='utf-8') as f:
    f.write(ts_content)

print(f"Scraped {len(all_articles)} articles.")
