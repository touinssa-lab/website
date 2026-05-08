import re

def extract_korean_trends(file_path):
    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    # Find all Korean characters and sequences
    # Usually keywords are in quotes: "Keyword"
    matches = re.findall(r'"([^"]*[가-힣]+[^"]*)"', content)
    
    # Filter out long sentences, focus on shorter keywords (1-4 words)
    keywords = [m for m in matches if 1 < len(m) < 30]
    
    # Let's look for "관광" related ones
    relevant = [k for k in keywords if "관광" in k or any(x in k for x in ["여행", "축제", "버스", "코스"])]
    
    # Unique and count
    from collections import Counter
    counts = Counter(relevant)
    
    return counts.most_common(50)

print("Web Trends:")
print(extract_korean_trends(r"D:\뉴프로젝트\투어리즘인사이트\홈페이지_리뉴얼\Trend_source\2026_05_05_Tourism_Web.html"))
print("\nYoutube Trends:")
print(extract_korean_trends(r"D:\뉴프로젝트\투어리즘인사이트\홈페이지_리뉴얼\Trend_source\2026_05_05_Tourism_Youtube.html"))
