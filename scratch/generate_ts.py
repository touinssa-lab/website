import json

def generate_ts():
    with open('scratch/trends/2026-05-13_keywords.json', 'r', encoding='utf-8') as f:
        keywords = json.load(f)
    
    insights = [
        {
            "keyword": "디지털 관광 주민증",
            "category": "정책/행정",
            "reason": "[팩트체크] 인구 소멸 위기 지역의 생활 인구 유치를 위한 디지털 관광 주민증 발급 지역이 확대되면서 관련 검색량이 급증하고 있습니다. [산업영향] 디지털 기반의 지역 정체성 부여를 통해 재방문율을 높이고, 지역 내 실질적인 소비를 유도하는 데이터 기반 관광 정책의 효과가 나타나고 있습니다.",
            "type": "analysis"
        },
        {
            "keyword": "의료 관광",
            "category": "의료/웰니스",
            "reason": "[팩트체크] 글로벌 이동 제한 해제 이후 K-메디컬에 대한 신뢰도를 바탕으로 외국인 환자 유치 및 의료 목적으로 한국을 방문하는 수요가 다시 상위권에 진입했습니다. [산업영향] 고부가가치 산업인 의료 관광의 부활은 장기 체류형 관광객 증대로 이어져 의료, 숙박, 쇼핑 등 연관 산업의 동반 성장을 견인할 것으로 보입니다.",
            "type": "analysis"
        },
        {
            "keyword": "여행 유튜버 커뮤니티",
            "category": "미디어/콘텐츠",
            "reason": "[팩트체크] '여행 유튜버 갤러리' 등 특정 크리에이터를 중심으로 한 커뮤니티 활동이 활발해지며, 이들의 행보가 실시간 여행 트렌드에 즉각적인 영향을 미치고 있습니다. [산업영향] 단순 정보 제공을 넘어 팬덤을 기반으로 한 공동 구매, 팬 미팅 투어 등 커뮤니티 중심의 새로운 관광 비즈니스 모델이 확장되고 있습니다.",
            "type": "unique"
        },
        {
            "keyword": "합천 반값 여행",
            "category": "경제/지역",
            "reason": "[팩트체크] 고물가 시대 여행 비용 부담을 줄여주는 지자체 주도의 공격적인 '반값' 할인 프로모션이 가성비를 중시하는 여행객들에게 폭발적인 반응을 얻고 있습니다. [산업영향] 가격 경쟁력을 앞세운 지역 관광 상품은 특정 지역으로의 쏠림 현상을 완화하고 지역 경제 활성화에 직접적인 마중물 역할을 하고 있습니다.",
            "type": "unique"
        }
    ]
    
    content = "export interface WebTrendKeyword {\n"
    content += "  id: string;\n"
    content += "  section: string;\n"
    content += "  rank: number;\n"
    content += "  keyword: string;\n"
    content += "  interest: number;\n"
    content += "  change: string;\n"
    content += "}\n\n"
    content += "export interface InsightCard {\n"
    content += "  keyword: string;\n"
    content += "  category: string;\n"
    content += "  reason: string;\n"
    content += "  type: 'analysis' | 'unique';\n"
    content += "}\n\n"
    content += "export const webTrendKeywords: WebTrendKeyword[] = [\n"
    
    for i, k in enumerate(keywords):
        comma = "," if i < len(keywords) - 1 else ""
        content += f"  {json.dumps(k, ensure_ascii=False)}{comma}\n"
        
    content += "];\n\n"
    content += "export const insightCards: InsightCard[] = [\n"
    
    for i, c in enumerate(insights):
        comma = "," if i < len(insights) - 1 else ""
        content += f"  {json.dumps(c, ensure_ascii=False)}{comma}\n"
        
    content += "];\n"
    
    with open('src/data/aiHotKeywords.ts', 'w', encoding='utf-8') as f:
        f.write(content)

generate_ts()
print("Successfully generated aiHotKeywords.ts")
