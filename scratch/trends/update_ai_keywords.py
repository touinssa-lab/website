import json
import os

json_path = r'd:\뉴프로젝트\투어리즘인사이트\홈페이지_리뉴얼\Web\scratch\trends\2026-05-16_keywords.json'
ts_path = r'd:\뉴프로젝트\투어리즘인사이트\홈페이지_리뉴얼\Web\src\data\aiHotKeywords.ts'

insights = [
    {
        "keyword": "세종 낙화 축제",
        "category": "축제",
        "reason": "'낙화'라는 독특한 전통 불꽃 콘텐츠가 세종시의 대표 봄 축제로 급부상하며 전국적인 관심을 모으고 있습니다.",
        "type": "unique"
    },
    {
        "keyword": "연등 축제",
        "category": "관광/문화",
        "reason": "석가탄신일을 앞두고 서울, 부산, 대구 등 전국 주요 도시의 연등 행사가 '급상승' 키워드로 등장하며 야간 관광 수요를 견인하고 있습니다.",
        "type": "analysis"
    },
    {
        "keyword": "서울 장미 축제",
        "category": "축제",
        "reason": "750% 이상의 폭발적인 검색 증가율을 보이며, 5월의 대표적인 도심 속 꽃 축제로 확실히 자리매김했습니다.",
        "type": "analysis"
    },
    {
        "keyword": "당일치기 여행",
        "category": "여행 트렌드",
        "reason": "짧고 강렬한 경험을 선호하는 여행 트렌드가 반영되어 주말 맞이 근교 여행 정보에 대한 수요가 급증하고 있습니다.",
        "type": "analysis"
    },
    {
        "keyword": "크루즈 여행",
        "category": "테마 여행",
        "reason": "해외 크루즈 및 테마형 여행에 대한 대중적 관심이 높아지며 실질적인 여행 계획 단계의 검색이 증가하고 있습니다.",
        "type": "unique"
    }
]

def update_ts():
    with open(json_path, 'r', encoding='utf-8') as f:
        keywords = json.load(f)

    header = """export interface WebTrendKeyword {
  id: string;
  section: string;
  rank: number;
  keyword: string;
  interest: number;
  change: string;
}

export interface InsightCard {
  keyword: string;
  category: string;
  reason: string;
  type: 'analysis' | 'unique';
}

"""
    
    keywords_str = f"export const webTrendKeywords: WebTrendKeyword[] = {json.dumps(keywords, ensure_ascii=False, indent=2)};\n\n"
    insights_str = f"export const insightCards: InsightCard[] = {json.dumps(insights, ensure_ascii=False, indent=2)};\n"

    with open(ts_path, 'w', encoding='utf-8') as f:
        f.write(header)
        f.write(keywords_str)
        f.write(insights_str)
    
    print(f"Successfully updated {ts_path}")

if __name__ == "__main__":
    update_ts()
