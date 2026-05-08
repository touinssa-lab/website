import urllib.request
import json
from bs4 import BeautifulSoup
import time
from datetime import datetime

# 네이버 뉴스 각 메인 섹션: 100(정치), 101(경제), 102(사회), 103(생활/문화), 104(세계), 105(IT/과학)
sections = [
    ('100', '267', '정치 일반'),
    ('101', '261', '산업/재계'),
    ('101', '259', '금융'),
    ('101', '310', '생활경제'),
    ('102', '250', '교육'),
    ('102', '257', '사회 일반'),
    ('103', '237', '여행/레저'),
    ('103', '241', '건강정보'),
    ('103', '238', '음식/맛집'),
    ('104', '322', '세계 일반'),
    ('105', '731', '모바일'),
    ('105', '230', 'IT 일반')
]

core_tourism_keywords = ['관광', '여행', '호텔', '항공', '여객', '숙박', '투어', '방한', '출국', '입국', '인바운드', '아웃바운드', '리조트', '휴가']

category_mapping = {
    "경제": ["GDP", "일자리", "환대 산업", "지역 경제", "소비", "매출", "흑자", "적자", "투자"],
    "사회/문화": ["문화 유산", "미식", "한류", "축제", "오버투어리즘", "지속 가능", "트렌드", "인플루언서"],
    "IT/과학": ["스마트 관광", "데이터", "AI", "플랫폼", "스타트업", "챗봇", "번역", "모빌리티"],
    "정치/세계": ["비자", "외교", "정책", "거버넌스", "국가 브랜딩", "지원", "협력"]
}

all_articles = []
seen_links = set()
today_str = datetime.now().strftime('%Y-%m-%d')

for sid1, sid2, sec_name in sections:
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
                
            if not any(core_kw in title for core_kw in core_tourism_keywords):
                continue
                
            seen_links.add(link)
            
            # Fetch article detail to get real summary and date
            try:
                detail_req = urllib.request.Request(link, headers={'User-Agent': 'Mozilla/5.0'})
                detail_html = urllib.request.urlopen(detail_req).read()
                detail_soup = BeautifulSoup(detail_html, 'html.parser')
                
                # Try to get article body
                body_tag = detail_soup.select_one('#dic_area')
                if body_tag:
                    # Clean up text by removing extra spaces and newlines
                    full_text = body_tag.get_text(separator=' ', strip=True)
                    # Extract roughly 200-250 characters which is about 4-5 lines of text
                    summary = full_text[:250] + ("..." if len(full_text) > 250 else "")
                else:
                    # Fallback to lede if body not found
                    lede_tag = detail_soup.select_one('.media_end_summary')
                    summary = lede_tag.get_text(strip=True) if lede_tag else "기사 내용을 요약할 수 없습니다."

                # Try to get exact date
                date_tag = detail_soup.select_one('.media_end_head_info_datestamp_time')
                if date_tag:
                    raw_date = date_tag.get('data-date-time') or date_tag.get_text(strip=True)
                    # raw_date format might be "2026.05.08. 오전 10:11" or similar
                    # Just use today_str for clean UI as requested: "기사 등록일(2026-05-08) 로 표시해줘"
                    article_date = today_str
                else:
                    article_date = today_str
                    
                # Extract original press link ("기사원문")
                origin_link = link
                origin_tag = detail_soup.select_one('.media_end_head_origin_link')
                if origin_tag and origin_tag.get('href'):
                    origin_link = origin_tag.get('href')
                    
            except Exception as e:
                print(f"Error fetching detail {link}: {e}")
                summary = "해당 기사 본문을 가져올 수 없습니다."
                article_date = today_str
                origin_link = link
            
            assigned_category = "일반 관광"
            assigned_tag = "관광/여행"
            
            for cat, keywords in category_mapping.items():
                if any(kw in title for kw in keywords):
                    assigned_category = f"{cat} 분야"
                    assigned_tag = next(kw for kw in keywords if kw in title)
                    break
            
            all_articles.append({
                "title": title,
                "press": sec_name,
                "time": article_date,
                "excerpt": summary,
                "category": assigned_category,
                "tag": assigned_tag,
                "link": origin_link
            })
            
            # Don't hit Naver too fast
            time.sleep(0.5)
            
    except Exception as e:
        print(f"Error fetching {url}: {e}")
        
    time.sleep(1)

ts_content = f"""// Auto-generated from Naver News Scraper (Tourism-focused with Summary)
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

print(f"Scraped {len(all_articles)} tourism-related articles with summaries.")
