import json
import requests

SUPABASE_URL = "https://mdcgzvfeazrmvkpanpho.supabase.co"
SUPABASE_KEY = "sb_publishable_HX_nDGxsiEvlV-E3ztJpRw_Va5P13tO"

def clean_and_sync():
    target_date = "2026-05-14"
    headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "Content-Type": "application/json"
    }
    
    # 1. Delete all existing articles for today to avoid duplicates/residue
    print(f"Deleting existing articles for {target_date}...")
    delete_url = f"{SUPABASE_URL}/rest/v1/news_trends_articles?target_date=eq.{target_date}"
    r = requests.delete(delete_url, headers=headers)
    print(f"Delete Status: {r.status_code}")

    # 2. Prepare clean data (5 Tourism + 5 AI/Data)
    tourism_articles = [
        {
            "target_date": target_date,
            "category": "Tourism News",
            "title": "신한은행, 관광공사 등과 4자 협약…\"日관광객 충청권 유치\"",
            "press": "연합뉴스",
            "excerpt": "신한은행이 한국관광공사 및 충청권 지자체들과 협력하여 일본인 관광객 유치를 위한 마케팅을 대폭 강화합니다. 일본 현지법인 SBJ은행의 네트워크를 활용해 지역 특화 관광 상품을 홍보하고 결제 편의성을 높이는 등 실질적인 인바운드 활성화를 추진합니다.",
            "tag": "여행/관광",
            "link": "https://n.news.naver.com/mnews/article/001/0016077742?sid=101",
            "thumbnail": f"/images/news/{target_date}/article_1.jpg"
        },
        {
            "target_date": target_date,
            "category": "Tourism News",
            "title": "롯데관광개발 1분기 영업익 288억원…전년 동기 대비 2.2배 증가",
            "press": "연합뉴스",
            "excerpt": "카지노와 호텔 부문의 동반 성장에 힘입어 1분기 매출 1562억원을 기록하며 사상 최대 분기 실적을 달성했습니다. 이는 외국인 관광객 증가와 보복 소비 심리가 맞물린 결과로 분석됩니다.",
            "tag": "기업/금융",
            "link": "https://n.news.naver.com/mnews/article/001/0016078012?sid=101",
            "thumbnail": f"/images/news/{target_date}/article_2.jpg"
        },
        {
            "target_date": target_date,
            "category": "Tourism News",
            "title": "\"일본 대신 제주도 갈래\"…중국 관광객 몰리자 역대급 '잭팟'",
            "press": "한국경제",
            "excerpt": "중국인 무비자 입국 확대와 크루즈 입항 증가로 제주를 찾는 중국 관광객이 급증하며 관련 관광 업계가 유례없는 호황을 누리고 있습니다. 관광 수지가 11년 만에 흑자로 전환되었습니다.",
            "tag": "여행/관광",
            "link": "https://n.news.naver.com/mnews/article/015/0005287036?sid=101",
            "thumbnail": f"/images/news/{target_date}/article_3.jpg"
        },
        {
            "target_date": target_date,
            "category": "Tourism News",
            "title": "속초 영랑호 벚꽃축제, 봄 관광 수요 이끈 대표 콘텐츠",
            "press": "스포츠서울",
            "excerpt": "영랑호 벚꽃축제 기간 동안 4만 8천 명의 방문객이 몰리며 지역 축제를 넘어 외지인에게도 매력적인 관광 콘텐츠로 자리매김했습니다.",
            "tag": "여행/관광",
            "link": "https://n.news.naver.com/mnews/article/468/0001240350?sid=102",
            "thumbnail": f"/images/news/{target_date}/article_4.jpg"
        },
        {
            "target_date": target_date,
            "category": "Tourism News",
            "title": "'G마켓, 인천지역 관광 상품·굿즈 등 온라인 판로 확대한다'",
            "press": "뉴시스",
            "excerpt": "G마켓과 인천관광공사가 협업하여 '온라인 인천상회' 기획전 등을 통해 인천 기반 관광 상품의 온라인 유통망을 대폭 강화합니다.",
            "tag": "여행/관광",
            "link": "https://n.news.naver.com/mnews/article/003/0013943453?sid=101",
            "thumbnail": f"/images/news/{target_date}/article_5.jpg"
        }
    ]

    ai_articles = [
        {
            "target_date": target_date,
            "category": "AI & Data",
            "title": "관광·전시 현장 AI로 읽는다…나무기술, 정부 사업 GPU 핵심 엔진 구축",
            "press": "지디넷코리아",
            "excerpt": "나무기술이 정부 주도 관광·마이스(MICE) 인공지능(AI) 시뮬레이션 플랫폼 구축 사업에 참여하며 AI·디지털트윈 기반 공간 분석 시장 공략에 나섭니다.",
            "tag": "관광 AI",
            "link": "https://n.news.naver.com/mnews/article/092/0002422762?sid=105",
            "thumbnail": f"/images/news/{target_date}/article_ai_1.jpg"
        },
        {
            "target_date": target_date,
            "category": "AI & Data",
            "title": "제주, 관광사업체 키오스크·서빙로봇 구입비 50% 지원",
            "press": "연합뉴스",
            "excerpt": "제주도는 도내 관광사업체를 대상으로 키오스크와 서빙로봇 등 스마트 기기 구입비의 50%를 지원하는 '관광사업체 디지털 전환 지원사업'을 추진합니다.",
            "tag": "디지털 전환",
            "link": "https://n.news.naver.com/mnews/article/001/0016076259?sid=105",
            "thumbnail": f"/images/news/{target_date}/article_ai_2.jpg"
        },
        {
            "target_date": target_date,
            "category": "AI & Data",
            "title": "\"1163만명 대이동, 7436억 잭팟\"…노동절 황금연휴 효과",
            "press": "이데일리",
            "excerpt": "데이터 분석 결과, 이번 노동절 연휴 동안 기록적인 인구 이동이 발생했으며 이에 따른 관광 소비 및 경제적 파급 효과를 수치로 정밀 분석했습니다.",
            "tag": "테크/디지털",
            "link": "https://n.news.naver.com/mnews/article/018/0006281067?sid=100",
            "thumbnail": f"/images/news/{target_date}/article_ai_3.jpg"
        },
        {
            "target_date": target_date,
            "category": "AI & Data",
            "title": "경북도, AI 관광플랫폼 구축 본격화…황룡사 3D 복원 추진",
            "press": "매일신문",
            "excerpt": "경상북도가 인공지능(AI)과 가상융합(XR) 기술을 접목한 차세대 관광 플랫폼 구축에 나섭니다. 과기정통부 공모 선정으로 국비 12억원을 확보했습니다.",
            "tag": "AI 관광플랫폼",
            "link": "https://n.news.naver.com/mnews/article/088/0001009963?sid=102",
            "thumbnail": f"/images/news/{target_date}/article_ai_4.jpg"
        },
        {
            "target_date": target_date,
            "category": "AI & Data",
            "title": "빅데이터로 본 속초 영랑호 벚꽃축제…지역경제 활기 뚜렷",
            "press": "연합뉴스",
            "excerpt": "빅데이터 분석을 통해 영랑호 벚꽃축제 방문객의 71.3%가 증가했음을 확인했으며, 먹거리와 체험 위주의 지역 소비 패턴을 도출했습니다.",
            "tag": "테크/디지털",
            "link": "https://n.news.naver.com/mnews/article/001/0016076030?sid=103",
            "thumbnail": f"/images/news/{target_date}/article_ai_5.jpg"
        }
    ]

    all_articles = tourism_articles + ai_articles
    print(f"Inserting {len(all_articles)} clean articles...")
    r = requests.post(f"{SUPABASE_URL}/rest/v1/news_trends_articles", headers=headers, json=all_articles)
    print(f"Insert Status: {r.status_code}")

clean_and_sync()
