import json
import requests

url = "https://mdcgzvfeazrmvkpanpho.supabase.co"
key = "sb_publishable_HX_nDGxsiEvlV-E3ztJpRw_Va5P13tO"
target_date = "2026-05-16"

headers = {
    "apikey": key,
    "Authorization": f"Bearer {key}",
    "Content-Type": "application/json"
}

def delete_existing_data(table_name):
    # Delete all records for the target_date to ensure clean state
    endpoint = f"{url}/rest/v1/{table_name}?target_date=eq.{target_date}"
    response = requests.delete(endpoint, headers=headers)
    if response.status_code in [200, 204]:
        print(f"Successfully cleared {table_name} for {target_date}.")
    else:
        print(f"Error clearing {table_name}: {response.status_code} - {response.text}")

def insert_data(table_name, data):
    endpoint = f"{url}/rest/v1/{table_name}"
    # Using POST for fresh insert after delete
    response = requests.post(endpoint, headers=headers, data=json.dumps(data))
    if response.status_code in [200, 201]:
        print(f"Successfully inserted {table_name}: {len(data)} items.")
    else:
        print(f"Error inserting {table_name}: {response.status_code} - {response.text}")

def run_sync():
    # Delete first
    delete_existing_data("news_trends_articles")
    
    # 4-Sentence Summaries
    articles = [
        {
            "target_date": target_date,
            "category": "Tourism News",
            "tag": "여행/레저",
            "press": "조선비즈",
            "title": "“41m 다이빙풀 짓는다”… 지자체들 해양레저 관광 경쟁",
            "excerpt": "국내 지방자치단체들이 해양레저 관광 시장 선점을 위해 대규모 다이빙풀 등 인프라 구축 경쟁에 본격적으로 나섰습니다. 특히 40m 이상의 심층 다이빙 시설을 통해 국내외 다이버들을 유치하여 지역 관광의 새로운 성장 동력을 확보하려는 움직임이 활발합니다. 이러한 시설 투자는 단순 관람형 관광에서 벗어나 고부가가치 체험형 레저 산업으로의 체질 개선을 목표로 하고 있습니다. 지자체 간의 인프라 경쟁이 국내 해양레저 산업의 전문성을 높이고 글로벌 경쟁력을 강화하는 계기가 될지 주목됩니다.",
            "thumbnail": "/images/news/2026-05-16/article_1.jpg",
            "link": "https://n.news.naver.com/mnews/article/366/0001164822?sid=101"
        },
        {
            "target_date": target_date,
            "category": "Tourism News",
            "tag": "지역관광",
            "press": "조선일보",
            "title": "“광안리 바다가 벌써 그리워요” 외국인 관광객 ‘부산병’ 앓아",
            "excerpt": "부산 광안리 해변을 찾은 외국인 관광객들 사이에서 다시 방문하고 싶어 하는 '부산병' 현상이 소셜 미디어를 통해 확산되고 있습니다. 특히 야간 드론쇼와 같은 차별화된 콘텐츠와 해변의 개방감이 글로벌 여행객들에게 강력한 인상을 남기고 있는 것으로 분석됩니다. 이러한 긍정적인 경험이 디지털 공간에서 자발적으로 공유되면서 부산의 관광 브랜드 가치는 전 세계적으로 빠르게 상승하고 있습니다. 이는 지역의 고유한 관광 자원이 어떻게 글로벌 팬덤을 형성하고 지속 가능한 방문을 유도하는지 보여주는 대표적인 사례입니다.",
            "thumbnail": "/images/news/2026-05-16/article_2.jpg",
            "link": "https://n.news.naver.com/mnews/article/023/0003976719?sid=102"
        },
        {
            "target_date": target_date,
            "category": "Tourism News",
            "tag": "지자체/정책",
            "press": "세계일보",
            "title": "“1000만원 관광 실험”…충북도, 청년·지역 담은 관광상품 첫선",
            "excerpt": "충청북도가 청년들의 창의적인 아이디어와 지역의 숨겨진 매력을 결합한 '1000만원 관광 실험' 프로젝트를 처음으로 선보여 큰 관심을 끌고 있습니다. 이 프로젝트는 기존의 공급자 중심 관광 상품에서 벗어나 수요자인 청년의 시각에서 독창적인 로컬 여행 코스를 발굴하는 것을 핵심 목표로 합니다. 선정된 팀들은 지역의 특색 있는 장소를 활용하여 MZ세대의 취향을 저격하는 개성 넘치는 테마 여행 프로그램을 직접 기획하고 운영하게 됩니다. 지역 경제 활성화와 청년 일자리 창출이라는 정책적 목표를 동시에 달성하려는 지자체의 혁신적인 관광 전략으로 평가받고 있습니다.",
            "thumbnail": "/images/news/2026-05-16/article_3.jpg",
            "link": "https://n.news.naver.com/mnews/article/022/0004128512?sid=102"
        },
        {
            "target_date": target_date,
            "category": "Tourism News",
            "tag": "여행 트렌드",
            "press": "뉴스1",
            "title": "코스로 자리 잡은 K-야장 문화…'야장맵'까지 등장",
            "excerpt": "한국 특유의 야외 식당 문화인 '야장'이 외국인 관광객들에게 한국 여행의 매력을 극대화하는 필수 체험 코스로 자리 잡고 있습니다. 최근에는 인기 있는 야장 스팟을 정리한 '야장맵'까지 등장하여 개별 여행객들의 정보 접근성을 획기적으로 높이고 있습니다. 시원한 밤바람과 함께 현지인들과 어우러져 한국적 정취를 즐길 수 있다는 점이 글로벌 MZ세대의 감성을 자극하며 폭발적인 인기를 끌고 있습니다. 평범한 일상의 식문화가 트렌디한 관광 콘텐츠로 재구성되면서 한국형 야간 관광의 새로운 지평을 열고 있는 것으로 보입니다.",
            "thumbnail": "/images/news/2026-05-16/article_4.jpg",
            "link": "https://n.news.naver.com/mnews/article/421/0008948043?sid=102"
        },
        {
            "target_date": target_date,
            "category": "Tourism News",
            "tag": "쇼핑관광",
            "press": "채널A",
            "title": "공기 빼서 압축 착…K-이불 쓸어 담는 관광객",
            "excerpt": "한국을 방문한 외국인 관광객들 사이에서 품질 좋은 한국산 이불이 새로운 필수 쇼핑 아이템으로 급부상하며 쇼핑 관광의 풍경을 바꾸고 있습니다. 진공 압축 팩을 이용해 부피를 획기적으로 줄여 본국으로 가져가기 편리해진 점이 대량 구매를 유도하는 결정적인 요인으로 작용했습니다. 전통 시장뿐만 아니라 현대적인 침구 매장에서도 한국산 원단과 뛰어난 가성비에 매료된 외국인들의 구매 행렬이 연일 이어지고 있습니다. 실용성과 우수성을 동시에 갖춘 한국의 생활용품이 관광 산업의 수익 모델을 다변화하는 효자 품목으로 확실히 자리 잡았습니다.",
            "thumbnail": "/images/news/2026-05-16/article_5.jpg",
            "link": "https://n.news.naver.com/mnews/article/449/0000345440?sid=101"
        },
        {
            "target_date": target_date,
            "category": "Tourism News",
            "tag": "글로벌 교류",
            "press": "스포츠동아",
            "title": "치앙마이 관광협회, 부산·서울 로드쇼 성료",
            "excerpt": "태국 치앙마이 관광협회가 한국의 주요 거점 도시인 부산과 서울에서 진행한 관광 로드쇼를 성공적으로 마무리하며 적극적인 마케팅에 나섰습니다. 이번 행사는 양국 간의 관광 교류를 더욱 활성화하고 치앙마이의 새로운 웰니스 및 테마 여행 콘텐츠를 홍보하기 위해 기획되었습니다. 특히 골프와 웨딩 등 한국인 여행객들의 선호도가 높은 분야에 맞춘 다양한 맞춤형 여행 패키지가 소개되어 업계 관계자들의 큰 호응을 얻었습니다. 이번 로드쇼는 양국 관광 업계 간의 네트워크를 한층 강화하고 포스트 코로나 시대에 걸맞은 새로운 협력 비전을 제시하는 자리가 되었습니다.",
            "thumbnail": "/images/news/2026-05-16/article_6.jpg",
            "link": "https://n.news.naver.com/mnews/article/382/0001273703?sid=103"
        },
        {
            "target_date": target_date,
            "category": "AI & Data",
            "tag": "노동/교육",
            "press": "연합뉴스",
            "title": "[AI돋보기] AI 확산에 몸값 뛰는 현장직, 짐 싸는 화이트칼라",
            "excerpt": "인공지능 기술이 고도의 사무직 업무까지 대체하기 시작하면서 상대적으로 기계가 대신하기 어려운 숙련된 현장직의 가치가 재조명받고 있습니다. 반면 그동안 안정적인 직종으로 여겨졌던 화이트칼라 계층은 AI와의 직접적인 경쟁으로 인해 유례없는 고용 불안과 직업 전환의 위기에 직면해 있습니다. 이러한 변화는 노동 시장의 근본적인 패러다임 시프트를 예고하며 새로운 시대에 필요한 직업 윤리와 교육 체계의 재설계를 강력하게 요구하고 있습니다. 기술 혁신이 가져올 일자리의 구조적 변화에 대응하기 위해 사회 전반의 안전망 확충과 인적 자원 개발에 대한 깊은 고민이 필요한 시점입니다.",
            "thumbnail": "/images/news/2026-05-16/article_ai_1.jpg",
            "link": "https://n.news.naver.com/mnews/article/001/0014691234?sid=105"
        },
        {
            "target_date": target_date,
            "category": "AI & Data",
            "tag": "미디어/콘텐츠",
            "press": "SBS 뉴스",
            "title": "수백 명 몫을 AI가 뚝딱?…넷플릭스, 애니메이션 'AI 창작' 시작한다",
            "excerpt": "글로벌 OTT 플랫폼 넷플릭스가 애니메이션 제작 현장에 생성형 AI 기술을 본격적으로 도입하여 제작 환경의 혁신적인 변화를 주도하고 있습니다. AI는 과거 수백 명의 인력이 오랜 시간 공들여야 했던 배경 작화와 복잡한 디자인 과정을 단 몇 초 만에 처리하며 제작 효율성을 극대화하고 있습니다. 이러한 기술적 진보는 제작비 절감과 창의적 한계 돌파라는 긍정적인 측면과 함께 전문 인력의 입지 축소라는 우려를 동시에 낳고 있습니다. AI가 애니메이션 산업의 제작 시스템과 예술적 가치를 어떻게 재정의할지 전 세계 콘텐츠 업계의 이목이 집중되고 있습니다.",
            "thumbnail": "/images/news/2026-05-16/article_ai_2.jpg",
            "link": "https://n.news.naver.com/mnews/article/055/0001356646?sid=104"
        },
        {
            "target_date": target_date,
            "category": "AI & Data",
            "tag": "테크/디지털",
            "press": "헤럴드경제",
            "title": "AI에 내 지갑 맡긴다…오픈AI, 챗GPT에 재무설계 기능 도입",
            "excerpt": "오픈AI가 챗GPT에 개인 맞춤형 금융 상담 및 재무설계 기능을 새롭게 도입하며 인공지능 기반의 핀테크 서비스 영역을 강화하고 있습니다. 사용자의 소득 구조와 지출 패턴을 정밀하게 분석하여 최적의 저축 및 투자 포트폴리오를 제안함으로써 자산 관리의 효율성을 높여줍니다. 이는 과거 전문가들만 접근할 수 있었던 고도의 금융 상담 서비스를 대중화하여 누구나 편리하게 자산을 관리할 수 있는 환경을 제공할 것으로 기대됩니다. 다만 개인의 금융 데이터를 다루는 만큼 철저한 보안 대책 마련과 AI의 조언에 대한 법적 책임 소재를 명확히 하는 과정이 선행되어야 합니다.",
            "thumbnail": "/images/news/2026-05-16/article_ai_3.jpg",
            "link": "https://n.news.naver.com/mnews/article/016/0002644253?sid=104"
        },
        {
            "target_date": target_date,
            "category": "AI & Data",
            "tag": "사회/인구",
            "press": "뉴시스",
            "title": "\"AI가 내 번호 유출했다\"…동의 없는 개인정보 노출 '논란'",
            "excerpt": "인공지능 서비스가 학습 과정이나 답변 생성 중에 사용자의 동의 없이 민감한 개인 정보를 노출하는 사례가 빈번해지면서 데이터 프라이버시에 대한 사회적 경각심이 높아지고 있습니다. 서비스 이용 과정에서 입력된 개인 식별 정보가 다른 사용자의 질문에 답변으로 출력되는 등 심각한 사생활 침해 문제가 발생하고 있는 상황입니다. 이는 AI 모델을 개발하고 운영하는 기업들이 지켜야 할 윤리적 기준과 법적 규제가 기술의 발전 속도를 따라가지 못하고 있음을 단적으로 보여줍니다. 사용자의 신뢰를 회복하기 위해 기업들의 기술적 방어 체계 강화와 더불어 투명한 데이터 관리 가이드라인의 수립이 시급합니다.",
            "thumbnail": "/images/news/2026-05-16/article_ai_4.jpg",
            "link": "https://n.news.naver.com/mnews/article/003/0013948723?sid=104"
        },
        {
            "target_date": target_date,
            "category": "AI & Data",
            "tag": "테크/디지털",
            "press": "매일경제",
            "title": "“애플은 안 뚫립니다” 5일뒤 뚫렸다…최악의 AI해커 만든 앤스로픽",
            "excerpt": "보안의 대명사로 불리던 애플의 철통 보안 시스템이 앤스로픽이 개발한 최신 AI 에이전트의 공격에 단 5일 만에 취약점을 드러내며 큰 충격을 주고 있습니다. 고도화된 AI 해커가 기존의 보안 프로토콜을 정교하게 우회하여 시스템의 핵심 권한을 획득할 수 있음을 실험을 통해 입증한 것입니다. 이번 사례는 전통적인 보안 방식만으로는 스스로 학습하고 진화하는 AI 기반의 사이버 공격을 막아내는 데 한계가 있음을 명확히 시사합니다. 전 세계 빅테크 기업들은 이제 AI의 위협에 맞서기 위해 지능형 보안 시스템 구축에 총력을 기울여야 하는 새로운 보안 전쟁의 시대를 맞이하고 있습니다.",
            "thumbnail": "/images/news/2026-05-16/article_ai_5.jpg",
            "link": "https://n.news.naver.com/mnews/article/009/0005680884?sid=105"
        },
        {
            "target_date": target_date,
            "category": "AI & Data",
            "tag": "테크/디지털",
            "press": "아시아경제",
            "title": "맥이 가장 안전하다더니…단 5일 만에 애플 철통보안 뚫은 AI",
            "excerpt": "애플 맥 OS의 견고한 보안 체계가 인공지능을 활용한 창의적인 해킹 기법에 의해 단 5일 만에 무너져 전 세계 사용자들에게 보안의 불확실성을 일깨워주었습니다. AI는 인간 해커가 발견하기 어려운 시스템의 미세한 틈새를 찾아내고 이를 공략하는 정교한 시나리오를 생성하여 보안 벽을 허무는 데 성공했습니다. 이번 사건은 기기 자체의 물리적 보안 수준만큼이나 AI 시대에 적합한 가상 방어 체계와 실시간 모니터링 시스템의 중요성을 다시 한번 강조하고 있습니다. 개인 사용자들 또한 더 이상 특정 플랫폼이 절대적으로 안전하다는 맹신에서 벗어나 다각적인 보안 습관을 생활화해야 할 때입니다.",
            "thumbnail": "/images/news/2026-05-16/article_ai_6.jpg",
            "link": "https://n.news.naver.com/mnews/article/277/0005763761?sid=105"
        }
    ]
    insert_data("news_trends_articles", articles)

if __name__ == "__main__":
    run_sync()
