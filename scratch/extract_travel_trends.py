import re
from collections import Counter

def get_keywords(path):
    with open(path, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    potential = re.findall(r'"([^"]*[가-힣]+[^"]*)"', content)
    excluded = ["지역 선택", "지난", "대한민국", "검색어", "여행", "관광", "삭제", "닫기", "일 오전", "일 오후"]
    keywords = [k for k in potential if 2 <= len(k) < 20 and k not in excluded and not any(e in k for e in ["jsname", "action", "data", "다운로드"])]
    return Counter(keywords).most_common(15)

print("Travel Web Trends:")
print(get_keywords(r"d:\뉴프로젝트\투어리즘인사이트\홈페이지_리뉴얼\Web\scratch\travel_web_dump.txt"))
print("\nTravel Youtube Trends:")
print(get_keywords(r"d:\뉴프로젝트\투어리즘인사이트\홈페이지_리뉴얼\Web\scratch\travel_youtube_dump.txt"))
