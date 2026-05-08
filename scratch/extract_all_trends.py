import re
import os

def extract_trends(path, label):
    if not os.path.exists(path):
        return []
    
    with open(path, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    # Filter out common UI elements or long sentences
    # Look for quoted strings with Korean
    potential = re.findall(r'"([^"]*[가-힣]+[^"]*)"', content)
    
    excluded = ["상위 검색어", "급상승 검색어", "대한민국", "지난 24시간", "검색어", "관광", "여행", "삭제", "닫기", "지역 선택", "일 오후", "일 오전"]
    
    # Simple list extraction: find keywords that look like search terms (1-4 words)
    keywords = [k for k in potential if 2 <= len(k) < 20 and k not in excluded and not any(e in k for e in ["jsname", "action", "데이터", "다운로드", "비교"])]
    
    from collections import Counter
    counts = Counter(keywords)
    
    # For "Travel" keyword, let's also look for common destinations
    return [k for k, c in counts.most_common(10)]

base = r"D:\뉴프로젝트\투어리즘인사이트\홈페이지_리뉴얼\Trend_source"
files = [
    (f"{base}\\2026_05_05_Tourism_Web.html", "Tourism Web"),
    (f"{base}\\2026_05_05_Tourism_Youtube.html", "Tourism YT"),
    (f"{base}\\2026_05_05_Travel_Web.html", "Travel Web"),
    (f"{base}\\2026_05_05_Travel_Youtube.html", "Travel YT")
]

all_keywords = []
for path, label in files:
    trends = extract_trends(path, label)
    print(f"{label}: {trends}")
    all_keywords.extend(trends)

unique_keywords = list(set(all_keywords))
print("\nCombined unique keywords:")
print(unique_keywords)
