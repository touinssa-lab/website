import re
import os

def extract_keywords_from_dump(file_path):
    if not os.path.exists(file_path):
        return []
    
    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    # Looking for keywords. In Google Trends, they often appear as:
    # "query":"keyword" or in lists like ["keyword", value]
    
    # Try finding patterns that look like keywords
    # Often they are inside double quotes and contain Korean
    potential_keywords = re.findall(r'"([^"]*[가-힣]+[^"]*)"', content)
    
    # Filter: exclude common UI elements or long sentences
    excluded = ["상위 검색어", "급상승 검색어", "대한민국", "지난 24시간", "검색어", "관광"]
    keywords = [k for k in potential_keywords if 1 < len(k) < 20 and k not in excluded]
    
    # Let's see the most frequent ones
    from collections import Counter
    counts = Counter(keywords)
    
    # Based on the user's screenshot, I'll look for specific tourism-related terms
    # 관광 버스, 서울 관광 코스, 경기 관광 고등학교, 살곶이, 도쿄 관광, 대구 관광, 관광 통역 안내 사, 관광 공사 홍보 영상, 역 관광, 디스코 메들리
    
    return counts.most_common(40)

print("Web Trends (from dump):")
print(extract_keywords_from_dump(r"d:\뉴프로젝트\투어리즘인사이트\홈페이지_리뉴얼\Web\scratch\web_dump.txt"))

print("\nYoutube Trends (from dump):")
print(extract_keywords_from_dump(r"d:\뉴프로젝트\투어리즘인사이트\홈페이지_리뉴얼\Web\scratch\youtube_dump.txt"))
