import re
import os

def analyze(path, name):
    with open(path, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    # Find all Korean words
    korean_words = re.findall(r'[가-힣]+(?:\s+[가-힣]+)*', content)
    
    # Filter out common short words or UI text
    keywords = [w for w in korean_words if len(w) > 1 and "검색어" not in w and "지난" not in w and "대한민국" not in w]
    
    from collections import Counter
    counts = Counter(keywords)
    
    with open(f'scratch/{name}_results.txt', 'w', encoding='utf-8') as out:
        out.write(f"Results for {name}:\n")
        for word, count in counts.most_common(100):
            out.write(f"{word}: {count}\n")

os.makedirs('scratch', exist_ok=True)
analyze(r"D:\뉴프로젝트\투어리즘인사이트\홈페이지_리뉴얼\Trend_source\2026_05_05_Tourism_Web.html", "web")
analyze(r"D:\뉴프로젝트\투어리즘인사이트\홈페이지_리뉴얼\Trend_source\2026_05_05_Tourism_Youtube.html", "youtube")
