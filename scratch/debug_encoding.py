import re

def try_decode(file_path):
    encodings = ['utf-8', 'cp949', 'utf-16']
    for enc in encodings:
        try:
            with open(file_path, 'r', encoding=enc) as f:
                content = f.read()
                if "관광" in content or "검색어" in content:
                    print(f"Success with {enc}")
                    return content
        except:
            continue
    return None

def extract(content):
    if not content: return
    # Find all quoted strings that contain Korean
    matches = re.findall(r'"([^"]*[가-힣]+[^"]*)"', content)
    # Filter for typical trend length
    trends = [m for m in matches if 2 <= len(m) <= 20]
    return trends

path_web = r"D:\뉴프로젝트\투어리즘인사이트\홈페이지_리뉴얼\Trend_source\2026_05_05_Tourism_Web.html"
path_yt = r"D:\뉴프로젝트\투어리즘인사이트\홈페이지_리뉴얼\Trend_source\2026_05_05_Tourism_Youtube.html"

print("Web:")
content_web = try_decode(path_web)
if content_web:
    # Find "상위 검색어" and "급상승 검색어" sections
    # They are often in JSON arrays: [["상위 검색어", ...], ...]
    
    # Let's look for known keywords from the screenshot
    keywords = ["관광 버스", "서울 관광 코스", "경기 관광 고등학교", "살곶이", "도쿄 관광", "대구 관광", "관광 통역 안내 사", "관광 공사 홍보 영상"]
    found = [k for k in keywords if k in content_web]
    print(f"Found keywords: {found}")
    
    # Extract more
    all_korean = re.findall(r'[가-힣\s]{2,20}', content_web)
    from collections import Counter
    print(Counter(all_korean).most_common(20))
