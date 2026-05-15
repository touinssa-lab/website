import json
import os

keywords_file = 'scratch/trends/2026-05-15_keywords.json'
with open(keywords_file, 'r', encoding='utf-8') as f:
    keywords = json.load(f)

# Hardcode the insights
insights = [
  {"keyword": "지역 생태 축제 부상", "category": "환경/기후", "reason": "[팩트체크] 부천 백만송이 장미 축제가 개막을 앞두고 급상승 검색어에 올랐습니다. 도심 속 대규모 생태 공원 조성을 통한 지역 축제 활성화 사례입니다. [산업영향] 계절별 꽃을 테마로 한 지역 생태 축제는 지속 가능한 관광 자원으로서 방문객 유치와 지역 상권 활성화에 크게 기여하고 있습니다.", "type": "analysis"},
  {"keyword": "근거리 아웃바운드 강세", "category": "경제/지역", "reason": "[팩트체크] '오사카 여행 코스'와 '베트남 다낭 여행' 검색량이 최상위권을 차지하며 근거리 해외여행에 대한 견조한 수요를 보여줍니다. [산업영향] 다가오는 여름 휴가철을 앞두고 근거리 아웃바운드 여행 수요가 집중되며 항공 및 여행업계의 단거리 맞춤형 상품 기획 방향성을 제시하고 있습니다.", "type": "analysis"},
  {"keyword": "로컬 대학 축제 관광화", "category": "사회/인구", "reason": "[팩트체크] 충남대 등 지역 거점 대학의 축제 관련 검색량이 급증했습니다. 대학 축제가 학생들만의 행사를 넘어 지역 주민이 참여하는 문화 행사로 자리잡고 있습니다. [산업영향] 대규모 관람객을 동원하는 대학 축제는 젊은 층의 지역 간 이동을 유발하여 숙박 및 식음료 소비 등 로컬 경제에 긍정적인 파급 효과를 미칩니다.", "type": "analysis"},
  {"keyword": "해양 크루즈 산업 회복세", "category": "모빌리티/교통", "reason": "[팩트체크] '부산 크루즈 여행'과 '일본 크루즈 여행'이 급상승하며 고부가가치 해양 관광에 대한 관심이 눈에 띄게 높아지고 있습니다. [산업영향] 부산을 모항으로 하는 다양한 크루즈 노선이 재개되면서 크루즈 시장이 뚜렷한 회복세를 보이며 지역 내 연관 산업의 동반 성장이 가시화되고 있습니다.", "type": "unique"}
]

ts_content = f"""export interface WebTrendKeyword {{
  id: string;
  section: string;
  rank: number;
  keyword: string;
  interest: number;
  change: string;
}}

export interface InsightCard {{
  keyword: string;
  category: string;
  reason: string;
  type: 'analysis' | 'unique';
}}

export const webTrendKeywords: WebTrendKeyword[] = {json.dumps(keywords, ensure_ascii=False, indent=2)};

export const insightCards: InsightCard[] = {json.dumps(insights, ensure_ascii=False, indent=2)};
"""

with open('src/data/aiHotKeywords.ts', 'w', encoding='utf-8') as f:
    f.write(ts_content)

print("Successfully updated src/data/aiHotKeywords.ts")
