import json
import requests
import os

SUPABASE_URL = "https://mdcgzvfeazrmvkpanpho.supabase.co"
SUPABASE_KEY = "sb_publishable_HX_nDGxsiEvlV-E3ztJpRw_Va5P13tO"

def master_sync():
    target_date = "2026-05-14"
    headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "Content-Type": "application/json",
        "Prefer": "resolution=merge-duplicates"
    }
    
    # 1. Keywords Sync (355 items)
    keywords_path = f'scratch/trends/{target_date}_keywords.json'
    if os.path.exists(keywords_path):
        with open(keywords_path, 'r', encoding='utf-8') as f:
            keywords_raw = json.load(f)
        
        keywords_payload = []
        for k in keywords_raw:
            keywords_payload.append({
                "target_date": target_date,
                "section": k["section"],
                "rank": k["rank"],
                "keyword": k["keyword"],
                "change": k["change"]
            })
        
        print(f"Syncing {len(keywords_payload)} keywords...")
        r = requests.post(f"{SUPABASE_URL}/rest/v1/news_trends_keywords", headers=headers, json=keywords_payload)
        print(f"Keywords Sync Status: {r.status_code}")
    else:
        print(f"Warning: {keywords_path} not found.")

    # 2. Insights Sync (5 items)
    insights_payload = [
        {"keyword": "신안 퍼플섬 라벤더 축제", "category": "미디어/콘텐츠", "reason": "[팩트체크] 신안 퍼플섬이 5월 라벤더 개화 시기를 맞아 '퍼플 섬'이라는 강력한 지역 브랜딩을 바탕으로 실시간 트렌드 상위권에 올랐습니다. 보라색 테마와 연계된 지역 특화 콘텐츠가 관광객들에게 명확한 방문 동기를 제공하며 인스타그램 등 미디어 콘텐츠로의 확산성이 높게 나타나고 있습니다. [산업영향] 지자체의 명확한 컬러 마케팅과 계절 콘텐츠의 결합이 실질적인 관광객 유입과 지역 이미지 제고로 이어지는 선순환 구조를 보여주고 있습니다.", "type": "analysis", "target_date": target_date},
        {"keyword": "대학 축제 및 로컬 콘텐츠", "category": "사회/인구", "reason": "[팩트체크] 5월 대학 축제 시즌을 맞아 한양대, 경희대 등 주요 대학의 라인업과 입장권 정보가 핵심 키워드로 부상했습니다. 대학 축제가 단순한 학내 행사를 넘어 지역의 주요 관광 및 문화 콘텐츠로 자리매김하고 있습니다. [산업영향] 젊은 층의 대규모 이동을 유발하는 대학 축제는 주변 상권의 소비 활성화는 물론, '로컬 페스티벌'로서의 관광 상품화 가능성을 시사하고 있습니다.", "type": "analysis", "target_date": target_date},
        {"keyword": "항공업계 통합 기대감", "category": "정책/행정", "reason": "[팩트체크] 대한항공과 아시아나항공의 합병 절차가 막바지에 다다르며 마일리지 전환 및 통합 항공사 출범에 대한 검색량이 폭증했습니다. [산업영향] 항공업계의 거대 구조 개편은 향후 인바운드 및 아웃바운드 관광 시장의 노선 경쟁력과 가격 체계에 지대한 영향을 미칠 것이며, 이는 여행사들의 상품 구성 변화로 이어질 전망입니다.", "type": "analysis", "target_date": target_date},
        {"keyword": "로컬 미식 여행의 세분화", "category": "유통/식음료", "reason": "[팩트체크] '잠실역', '삼성동', '을지로' 등 특정 거점 중심의 맛집 검색이 강화되며 도시 내 미식 투어가 더욱 정교하게 세분화되고 있습니다. [산업영향] 여행객들이 지역만의 독특한 미식 경험을 중요시함에 따라, 단순 명소 방문을 넘어 특정 상권의 '찐 맛집'을 찾아다니는 목적형 관광이 주류로 자리 잡고 있습니다.", "type": "unique", "target_date": target_date},
        {"keyword": "민둥산 정산 등반 수요", "category": "환경/기후", "reason": "[팩트체크] 봄철 야외 활동 인구가 늘어남에 따라 억새꽃으로 유명한 정선 민둥산이 급상승 검색어 1위를 기록했습니다. [산업영향] 계절적 요인과 연계된 자연 경관 중심의 관광 수요는 지역의 등산 및 나들이 관련 인프라에 대한 높은 관심을 반영하며, 웰니스 및 액티비티 관광 시장의 확대를 보여줍니다.", "type": "unique", "target_date": target_date}
    ]
    print(f"Syncing {len(insights_payload)} insights...")
    r = requests.post(f"{SUPABASE_URL}/rest/v1/news_trends_insights", headers=headers, json=insights_payload)
    print(f"Insights Sync Status: {r.status_code}")

    # 3. Articles Sync (10 items)
    tourism_articles = [
        {"target_date": target_date, "category": "Tourism News", "title": "신한은행, 관광공사 등과 4자 협약…\"日관광객 충청권 유치\"", "press": "연합뉴스", "excerpt": "신한은행이 한국관광공사 및 충청권 지자체들과 협력하여 일본인 관광객 유치를 위한 마케팅을 대폭 강화합니다.", "tag": "여행/관광", "link": "https://n.news.naver.com/mnews/article/001/0016077742?sid=101", "thumbnail": f"/images/news/{target_date}/article_1.jpg"},
        {"target_date": target_date, "category": "Tourism News", "title": "롯데관광개발 1분기 영업익 288억원…전년 동기 대비 2.2배 증가", "press": "연합뉴스", "excerpt": "카지노와 호텔 부문의 동반 성장에 힘입어 1분기 매출 1562억원을 기록하며 사상 최대 분기 실적을 달성했습니다.", "tag": "기업/금융", "link": "https://n.news.naver.com/mnews/article/001/0016078012?sid=101", "thumbnail": f"/images/news/{target_date}/article_2.jpg"},
        {"target_date": target_date, "category": "Tourism News", "title": "\"일본 대신 제주도 갈래\"…중국 관광객 몰리자 역대급 '잭팟'", "press": "한국경제", "excerpt": "중국인 단체 관광객들의 제주 방문이 급증하면서 관련 업계가 유례없는 호황을 맞고 있습니다.", "tag": "여행/관광", "link": "https://n.news.naver.com/mnews/article/015/0005287036?sid=101", "thumbnail": f"/images/news/{target_date}/article_3.jpg"},
        {"target_date": target_date, "category": "Tourism News", "title": "속초 영랑호 벚꽃축제, 봄 관광 수요 이끈 대표 콘텐츠", "press": "스포츠서울", "excerpt": "영랑호 벚꽃축제 기간 동안 4만 8천 명의 방문객이 몰리며 지역 축제를 넘어 외지인에게도 매력적인 관광 콘텐츠로 자리매김했습니다.", "tag": "여행/관광", "link": "https://n.news.naver.com/mnews/article/468/0001240350?sid=102", "thumbnail": f"/images/news/{target_date}/article_4.jpg"},
        {"target_date": target_date, "category": "Tourism News", "title": "'G마켓, 인천지역 관광 상품·굿즈 등 온라인 판로 확대한다'", "press": "뉴시스", "excerpt": "G마켓과 인천관광공사가 협업하여 '온라인 인천상회' 기획전 등을 통해 인천 기반 관광 상품의 온라인 유통망을 대폭 강화합니다.", "tag": "여행/관광", "link": "https://n.news.naver.com/mnews/article/003/0013943453?sid=101", "thumbnail": f"/images/news/{target_date}/article_5.jpg"}
    ]
    ai_articles = [
        {"target_date": target_date, "category": "AI & Data", "title": "관광·전시 현장 AI로 읽는다…나무기술, 정부 사업 GPU 핵심 엔진 구축", "press": "지디넷코리아", "excerpt": "나무기술이 정부 주도 관광·마이스(MICE) 인공지능(AI) 시뮬레이션 플랫폼 구축 사업에 참여하며 AI·디지털트윈 기반 공간 분석 시장 공략에 나섭니다.", "tag": "관광 AI", "link": "https://n.news.naver.com/mnews/article/092/0002422762?sid=105", "thumbnail": f"/images/news/{target_date}/article_ai_1.jpg"},
        {"target_date": target_date, "category": "AI & Data", "title": "제주, 관광사업체 키오스크·서빙로봇 구입비 50% 지원", "press": "연합뉴스", "excerpt": "제주도는 도내 관광사업체를 대상으로 키오스크와 서빙로봇 등 스마트 기기 구입비의 50%를 지원하는 '관광사업체 디지털 전환 지원사업'을 추진합니다.", "tag": "디지털 전환", "link": "https://n.news.naver.com/mnews/article/001/0016076259?sid=105", "thumbnail": f"/images/news/{target_date}/article_ai_2.jpg"},
        {"target_date": target_date, "category": "AI & Data", "title": "\"1163만명 대이동, 7436억 잭팟\"…노동절 황금연휴 효과", "press": "이데일리", "excerpt": "데이터 분석 결과, 이번 노동절 연휴 동안 기록적인 인구 이동이 발생했으며 이에 따른 관광 소비 및 경제적 파급 효과를 수치로 정밀 분석했습니다.", "tag": "테크/디지털", "link": "https://n.news.naver.com/mnews/article/018/0006281067?sid=100", "thumbnail": f"/images/news/{target_date}/article_ai_3.jpg"},
        {"target_date": target_date, "category": "AI & Data", "title": "경북도, AI 관광플랫폼 구축 본격화…황룡사 3D 복원 추진", "press": "매일신문", "excerpt": "경상북도가 인공지능(AI)과 가상융합(XR) 기술을 접목한 차세대 관광 플랫폼 구축에 나섭니다.", "tag": "AI 관광플랫폼", "link": "https://n.news.naver.com/mnews/article/088/0001009963?sid=102", "thumbnail": f"/images/news/{target_date}/article_ai_4.jpg"},
        {"target_date": target_date, "category": "AI & Data", "title": "빅데이터로 본 속초 영랑호 벚꽃축제…지역경제 활기 뚜렷", "press": "연합뉴스", "excerpt": "빅데이터 분석을 통해 영랑호 벚꽃축제 방문객의 71.3%가 증가했음을 확인했으며 지역 소비 패턴을 도출했습니다.", "tag": "테크/디지털", "link": "https://n.news.naver.com/mnews/article/001/0016076030?sid=103", "thumbnail": f"/images/news/{target_date}/article_ai_5.jpg"}
    ]
    all_articles = tourism_articles + ai_articles
    
    # Delete existing articles for today FIRST to be safe
    print(f"Deleting articles for {target_date}...")
    requests.delete(f"{SUPABASE_URL}/rest/v1/news_trends_articles?target_date=eq.{target_date}", headers=headers)
    
    print(f"Inserting {len(all_articles)} clean articles...")
    r = requests.post(f"{SUPABASE_URL}/rest/v1/news_trends_articles", headers=headers, json=all_articles)
    print(f"Articles Sync Status: {r.status_code}")

master_sync()
