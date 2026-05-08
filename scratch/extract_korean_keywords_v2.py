import re

def extract_korean_trends(file_path, encoding='utf-16'):
    try:
        with open(file_path, 'r', encoding=encoding, errors='ignore') as f:
            content = f.read()
    except Exception as e:
        return [("Error reading file: " + str(e), 0)]
    
    # Find all Korean characters and sequences
    matches = re.findall(r'"([^"]*[가-힣]+[^"]*)"', content)
    
    # Also try finding text between tags or just raw Korean words
    raw_korean = re.findall(r'[가-힣]+(?:\s+[가-힣]+)*', content)
    
    # Filter and count
    from collections import Counter
    counts = Counter(raw_korean)
    
    return counts.most_common(50)

print("Web Trends (UTF-16):")
print(extract_korean_trends(r"D:\뉴프로젝트\투어리즘인사이트\홈페이지_리뉴얼\Trend_source\2026_05_05_Tourism_Web.html", 'utf-16'))
print("\nYoutube Trends (UTF-16):")
print(extract_korean_trends(r"D:\뉴프로젝트\투어리즘인사이트\홈페이지_리뉴얼\Trend_source\2026_05_05_Tourism_Youtube.html", 'utf-16'))

print("\nWeb Trends (EUC-KR):")
print(extract_korean_trends(r"D:\뉴프로젝트\투어리즘인사이트\홈페이지_리뉴얼\Trend_source\2026_05_05_Tourism_Web.html", 'euc-kr'))
