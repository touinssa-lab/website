import json
import requests
import os

SUPABASE_URL = "https://mdcgzvfeazrmvkpanpho.supabase.co"
SUPABASE_KEY = "sb_publishable_HX_nDGxsiEvlV-E3ztJpRw_Va5P13tO"

def sync_data():
    target_date = "2026-05-13"
    
    headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "Content-Type": "application/json",
        "Prefer": "resolution=merge-duplicates"
    }
    
    # 1. Sync Keywords
    with open('scratch/trends/2026-05-13_keywords.json', 'r', encoding='utf-8') as f:
        keywords = json.load(f)
    
    keywords_payload = []
    for k in keywords:
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

    # 2. Sync Insights
    insights = [
        {
            "keyword": "디지털 관광 주민증",
            "category": "정책/행정",
            "reason": "[팩트체크] 인구 소멸 위기 지역의 생활 인구 유치를 위한 디지털 관광 주민증 발급 지역이 확대되면서 관련 검색량이 급증하고 있습니다. [산업영향] 디지털 기반의 지역 정체성 부여를 통해 재방문율을 높이고, 지역 내 실질적인 소비를 유도하는 데이터 기반 관광 정책의 효과가 나타나고 있습니다.",
            "type": "analysis",
            "target_date": target_date
        },
        {
            "keyword": "의료 관광",
            "category": "의료/웰니스",
            "reason": "[팩트체크] 글로벌 이동 제한 해제 이후 K-메디컬에 대한 신뢰도를 바탕으로 외국인 환자 유치 및 의료 목적으로 한국을 방문하는 수요가 다시 상위권에 진입했습니다. [산업영향] 고부가가치 산업인 의료 관광의 부활은 장기 체류형 관광객 증대로 이어져 의료, 숙박, 쇼핑 등 연관 산업의 동반 성장을 견인할 것으로 보입니다.",
            "type": "analysis",
            "target_date": target_date
        },
        {
            "keyword": "여행 유튜버 커뮤니티",
            "category": "미디어/콘텐츠",
            "reason": "[팩트체크] '여행 유튜버 갤러리' 등 특정 크리에이터를 중심으로 한 커뮤니티 활동이 활발해지며, 이들의 행보가 실시간 여행 트렌드에 즉각적인 영향을 미치고 있습니다. [산업영향] 단순 정보 제공을 넘어 팬덤을 기반으로 한 공동 구매, 팬 미팅 투어 등 커뮤니티 중심의 새로운 관광 비즈니스 모델이 확장되고 있습니다.",
            "type": "unique",
            "target_date": target_date
        },
        {
            "keyword": "합천 반값 여행",
            "category": "경제/지역",
            "reason": "[팩트체크] 고물가 시대 여행 비용 부담을 줄여주는 지자체 주도의 공격적인 '반값' 할인 프로모션이 가성비를 중시하는 여행객들에게 폭발적인 반응을 얻고 있습니다. [산업영향] 가격 경쟁력을 앞세운 지역 관광 상품은 특정 지역으로의 쏠림 현상을 완화하고 지역 경제 활성화에 직접적인 마중물 역할을 하고 있습니다.",
            "type": "unique",
            "target_date": target_date
        }
    ]
    
    print(f"Syncing {len(insights)} insights...")
    r = requests.post(f"{SUPABASE_URL}/rest/v1/news_trends_insights", headers=headers, json=insights)
    print(f"Insights Sync Status: {r.status_code}")
    if r.status_code >= 400:
        print(f"Error: {r.text}")

    # 3. Sync Articles
    tourism_articles = [
        {
            "target_date": target_date,
            "category": "Tourism News",
            "title": "\"BTS 공연 보고 8일간 쇼핑, 350만원 썼다\"…관광수지 11년4개월 만에 흑자",
            "press": "매일경제",
            "excerpt": "최근 K-팝 공연 관람과 연계된 방한 관광객들의 1인당 소비 지출이 대폭 증가한 것으로 나타났습니다. 특히 대형 공연이 열린 기간 동안 외국인 관광객들은 평균 8일간 체류하며 쇼핑 등에 약 350만 원을 지출했습니다. 이러한 고부가가치 소비 트렌드에 힘입어 우리나라 관광수지가 11년 4개월 만에 의미 있는 흑자를 기록했습니다. 향후 대형 K-콘텐츠와 연계한 프리미엄 관광 상품 개발이 관광수지 개선의 핵심 동력이 될 전망입니다.",
            "tag": "경제/지역",
            "link": "https://n.news.naver.com/mnews/article/009/0005679132?sid=101",
            "thumbnail": f"/images/news/{target_date}/article_1.jpg"
        },
        {
            "target_date": target_date,
            "category": "Tourism News",
            "title": "우리은행, 외국인 관광객 전용 선불카드 인천공항 수령 개시",
            "press": "연합뉴스",
            "excerpt": "우리은행이 외국인 관광객들의 국내 결제 편의를 위해 전용 선불카드인 '와우패스'의 인천공항 수령 서비스를 시작했습니다. 관광객들은 입국 즉시 공항에서 카드를 수령하여 환전 번거로움 없이 국내 대중교통과 온·오프라인 매장에서 결제할 수 있습니다. 이는 디지털 금융 기술을 활용해 외국인 관광객의 수용 태세를 개선하고 여행 편의성을 높이는 실무적인 조치입니다. 편리한 결제 인프라는 외국인 관광객의 국내 소비 활성화를 촉진하는 중요한 기반이 될 것입니다.",
            "tag": "모빌리티/교통",
            "link": "https://n.news.naver.com/mnews/article/001/0016073674?sid=101",
            "thumbnail": f"/images/news/{target_date}/article_2.jpg"
        },
        {
            "target_date": target_date,
            "category": "Tourism News",
            "title": "“천년고찰 화엄사, 해외 크루즈 관광객 맞는다”",
            "press": "스포츠경향",
            "excerpt": "전남 구례의 화엄사가 해외 크루즈 관광객들을 위한 특별 템플스테이 및 전통문화 체험 프로그램을 본격적으로 운영합니다. 이는 대형 크루즈를 통해 입국한 단체 관광객들이 지역의 전통 사찰에서 한국의 정신문화를 깊이 있게 체험할 수 있도록 설계된 상품입니다. 해양 관광과 지역의 역사 문화 자원을 결합한 '랜드 익스커션(Land Excursion)'의 성공적인 사례로 평가받고 있습니다. 지역 특화 콘텐츠를 활용한 크루즈 관광의 다변화는 지역 경제에 새로운 활력을 불어넣을 것으로 기대됩니다.",
            "tag": "미디어/콘텐츠",
            "link": "https://n.news.naver.com/mnews/article/144/0001115078?sid=103",
            "thumbnail": f"/images/news/{target_date}/article_3.jpg"
        },
        {
            "target_date": target_date,
            "category": "Tourism News",
            "title": "인천관광공사, 몽골 울란바타르서 의료관광 설명회 개최",
            "press": "국민일보",
            "excerpt": "인천관광공사가 몽골 울란바타르 현지에서 인천의 우수한 의료 인프라와 관광 자원을 알리는 '인천 의료관광 설명회'를 성황리에 개최했습니다. 몽골은 한국 의료에 대한 신뢰도가 매우 높은 전략 시장으로, 이번 설명회를 통해 현지 유치 업체들과 긴밀한 협력 네트워크를 구축했습니다. 공사는 중증 질환 치료부터 웰니스 케어까지 아우르는 맞춤형 의료 관광 상품을 집중적으로 홍보했습니다. 타겟 시장별 맞춤형 마케팅을 통해 인천은 글로벌 의료 관광 허브로서의 입지를 더욱 공고히 할 계획입니다.",
            "tag": "의료/웰니스",
            "link": "https://n.news.naver.com/mnews/article/005/0001848655?sid=102",
            "thumbnail": f"/images/news/{target_date}/article_4.jpg"
        },
        {
            "target_date": target_date,
            "category": "Tourism News",
            "title": "\"친구도 한국 데려오겠다\"…관광시장 거대 소비층 된 주한 외국인",
            "press": "한국경제",
            "excerpt": "국내에 거주하는 주한 외국인들이 본국의 지인들을 한국으로 초대하는 'VFR(친구 및 친지 방문)' 관광의 핵심 주체로 떠오르고 있습니다. 이들은 한국 생활 경험을 바탕으로 로컬 맛집과 숨은 명소를 SNS로 공유하며 강력한 '바이럴 마케팅' 효과를 창출하고 있습니다. 실제로 주한 외국인의 추천으로 한국을 찾은 관광객들은 일반 패키지 여행객보다 체류 기간이 길고 만족도도 높은 것으로 조사되었습니다. 주한 외국인을 '민간 관광 홍보대사'로 활용하는 전략적인 접근이 인바운드 시장 확대의 새로운 열쇠가 되고 있습니다.",
            "tag": "사회/인구",
            "link": "https://n.news.naver.com/mnews/article/015/0005286249?sid=103",
            "thumbnail": f"/images/news/{target_date}/article_5.jpg"
        }
    ]

    ai_articles = [
        {
            "target_date": target_date,
            "category": "AI & Data",
            "title": "딥파인, 경주 관광 AX 추진…공간지능 관광 플랫폼 실증",
            "press": "이데일리",
            "excerpt": "확장현실(XR) 전문 기업 딥파인이 경주시와 협력하여 공간지능 기술을 활용한 관광 DX(디지털 전환) 프로젝트를 본격 추진합니다. 이번 사업은 경주의 주요 문화유산 공간을 디지털로 정밀 구현하여 관광객에게 실감형 정보를 제공하는 플랫폼 실증을 목표로 합니다. 인공지능이 관광객의 위치와 시선을 분석해 맞춤형 가이드를 제공함으로써 더욱 몰입감 있는 관광 경험을 선사할 예정입니다. 첨단 AX(AI Transformation) 기술의 도입은 유네스코 세계문화유산인 경주의 관광 가치를 현대적으로 재해석하는 계기가 될 것입니다.",
            "tag": "테크/디지털",
            "link": "https://n.news.naver.com/mnews/article/018/0006280144?sid=105",
            "thumbnail": f"/images/news/{target_date}/article_ai_1.jpg"
        },
        {
            "target_date": target_date,
            "category": "AI & Data",
            "title": "전주한옥마을 ‘스마트 관광지로’… 전주시, 인공지능 접목",
            "press": "세계일보",
            "excerpt": "전주시가 전주한옥마을을 대한민국을 대표하는 스마트 관광도시로 격상시키기 위해 인공지능(AI) 기술을 전면 도입합니다. AI 챗봇을 통한 실시간 다국어 안내 서비스와 빅데이터 기반의 인파 밀집도 관리 시스템을 구축하여 관광객의 편의와 안전을 동시에 확보할 계획입니다. 특히 관광객의 이동 패턴 데이터를 분석하여 최적의 동선을 추천하는 맞춤형 서비스도 개발 중입니다. 전통적인 한옥 마을의 매력에 최첨단 AI 기술이 결합되어 스마트 관광의 새로운 모델을 제시할 것으로 보입니다.",
            "tag": "테크/디지털",
            "link": "https://n.news.naver.com/mnews/article/022/0004127877?sid=102",
            "thumbnail": f"/images/news/{target_date}/article_ai_2.jpg"
        },
        {
            "target_date": target_date,
            "category": "AI & Data",
            "title": "\"석유화학 산단·관광에 AI 입힌다\"… 여수시, 3년 청사진 마련",
            "press": "한국일보",
            "excerpt": "여수시가 주력 산업인 석유화학 단지와 관광 분야에 인공지능을 융합하는 'AI 도시 3년 청사진'을 발표했습니다. 관광 분야에서는 AI를 활용한 실시간 교통 제어와 스마트 주차 시스템을 도입하여 만성적인 관광지 교통 체증 문제를 해결할 방침입니다. 또한 개별 관광객의 취향을 분석해 맛집과 숙소를 정교하게 매칭해주는 AI 컨시어지 서비스도 강화합니다. 산업과 관광이 조화를 이루는 AI 융합 전략은 여수의 도시 경쟁력을 한 단계 높이는 원동력이 될 전망입니다.",
            "tag": "정책/행정",
            "link": "https://n.news.naver.com/mnews/article/469/0000930523?sid=102",
            "thumbnail": f"/images/news/{target_date}/article_ai_3.jpg"
        },
        {
            "target_date": target_date,
            "category": "AI & Data",
            "title": "“내 폰에 지능이 들어왔다”… 실생활 AI 비서 시대 본격화",
            "press": "세계일보",
            "excerpt": "스마트폰 제조사들이 기기 자체에서 AI를 구동하는 '온디바이스 AI' 기술을 강화하면서 실생활 밀착형 AI 비서 서비스가 여행 분야로 빠르게 확산되고 있습니다. 별도의 앱 설치 없이도 AI가 사용자의 이메일과 일정 정보를 파악해 최적의 항공권과 호텔을 제안하고 복잡한 일정을 자동으로 정리해줍니다. 특히 실시간 통번역 기능은 해외 여행 시 언어 장벽을 획기적으로 낮추어 개별 자유 여행(FIT) 시장의 확대를 가속화하고 있습니다. 지능형 모바일 기술의 진화는 관광객의 여정 전반을 더욱 쉽고 스마트하게 변화시키고 있습니다.",
            "tag": "테크/디지털",
            "link": "https://n.news.naver.com/mnews/article/022/0004127982?sid=101",
            "thumbnail": f"/images/news/{target_date}/article_ai_4.jpg"
        },
        {
            "target_date": target_date,
            "category": "AI & Data",
            "title": "박형준, AI 공약 발표 \"핵심은 데이터…공공데이터망 조성\"",
            "press": "파이낸셜뉴스",
            "excerpt": "박형준 부산시장이 부산을 글로벌 AI 거점 도시로 만들기 위해 공공데이터 개방과 데이터 고속도로 구축을 골자로 한 AI 공약을 발표했습니다. 특히 관광 분야의 공공데이터를 민간에 적극 개방하여 트래블 테크 스타트업들이 혁신적인 AI 서비스를 개발할 수 있는 생태계를 조성할 계획입니다. 고품질의 관광 빅데이터와 인공지능 학습의 핵심 자원으로서 부산만의 특화된 AI 관광 산업을 육성하는 기반이 될 것입니다. 데이터 중심의 AI 행정 혁신은 부산 관광 산업의 고도화와 디지털 경제로의 전환을 앞당길 것으로 기대됩니다.",
            "tag": "정책/행정",
            "link": "https://n.news.naver.com/mnews/article/014/0005520965?sid=100",
            "thumbnail": f"/images/news/{target_date}/article_ai_5.jpg"
        },
        {
            "target_date": target_date,
            "category": "AI & Data",
            "title": "폭격의 굉음 멈춘 자리에 철새의 노래…매향리, ‘평화관광’ 명소로",
            "press": "세계일보",
            "excerpt": "화성시 매향리가 과거 사격장에서 생태 평화 관광지로 탈바꿈하는 과정에서 관광 빅데이터 분석을 적극 활용하여 맞춤형 명소화 전략을 추진하고 있습니다. 시는 방문객들의 통신 데이터와 소비 패턴을 분석하여 매향리의 생태적 가치와 평화의 메시지를 가장 잘 전달할 수 있는 체험 프로그램을 설계했습니다. 빅데이터 분석 결과, 고요한 자연 속에서의 힐링을 원하는 중장년층과 교육적 가치를 찾는 가족 단위 방문객의 비중이 높은 것으로 나타났습니다. 데이터에 기반한 과학적인 관광지 조성은 매향리를 지속 가능한 평화 관광의 상징으로 만들고 있습니다.",
            "tag": "테크/디지털",
            "link": "https://n.news.naver.com/mnews/article/022/0004127750?sid=102",
            "thumbnail": f"/images/news/{target_date}/article_ai_6.jpg"
        }
    ]

    all_articles = tourism_articles + ai_articles
    print(f"Syncing {len(all_articles)} articles...")
    r = requests.post(f"{SUPABASE_URL}/rest/v1/news_trends_articles", headers=headers, json=all_articles)
    print(f"Articles Sync Status: {r.status_code}")

sync_data()
