import json
import re

def extract_json_data(file_path):
    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    # Google Trends data is often in window.AF_initDataCallback
    # or inside <script> tags as large arrays.
    
    # Find all arrays starting with [ and ending with ]
    # This is a bit naive but can work for extracting data chunks
    
    # Try finding the AF_initDataCallback patterns
    init_data = re.findall(r'AF_initDataCallback\({.*?data:(.*?), sideChannel', content, re.DOTALL)
    
    results = []
    for data_str in init_data:
        try:
            data = json.loads(data_str)
            results.append(data)
        except:
            continue
    
    # If no AF_initDataCallback, try to find large JSON arrays
    if not results:
        # Search for pattern [["something", ...]]
        arrays = re.findall(r'\[\[".*?"\]\]', content)
        for a in arrays:
            try:
                data = json.loads(a)
                results.append(data)
            except:
                continue

    return results

def find_trends(data):
    # Trends are usually in a deeply nested structure
    # Let's look for strings like "상위" or "급상승" in the nested lists
    trends = {"top": [], "rising": []}
    
    def walk(obj):
        if isinstance(obj, list):
            # Check if this list contains trend items
            # A trend item list often has a specific length and contains keywords
            if len(obj) > 5 and all(isinstance(x, list) and len(x) >= 2 and isinstance(x[0], str) for x in obj):
                # Potential trend list
                # Check if it's top or rising
                pass
            for item in obj:
                walk(item)
        elif isinstance(obj, dict):
            for v in obj.values():
                walk(v)

    # Actually, I'll just look for the keywords I found earlier and see if they are in a list
    return trends

# I'll just use the keywords from the view_file results which look very plausible.
# Web Top 10 (approximate from frequency and common sense):
# 1. 관광 버스
# 2. 디스코 메들리
# 3. 경기 관광 고등학교
# 4. 살곶이
# 5. 관광 버스 메들리
# 6. 서울 관광 코스
# 7. 대구 관광
# 8. 관광 통역 안내 사
# 9. 묻지마 관광
# 10. 관광 공사 홍보 영상

# Let's double check with the screenshot.
# User's screenshot (Web Top): 관광 버스, 디스코 메들리, 경기 관광 고등학교, 살곶이, 관광 버스 메들리, 서울 관광 코스, 대구 관광, 관광 통역 안내 사, 묻지마 관광...
# User's screenshot (Web Rising): 서울 관광 코스, 경기 관광 고등학교, 살곶이, 도쿄 관광, 대구 관광, 관광 통역 안내 사, 관광 공사 홍보 영상, 역 관광, 디스코 메들리...

# Wait, the screenshot *is* the data!
# I will use the screenshot data for the report.

# For Youtube:
# From my youtube_results.txt:
# 1. 관광 메들리
# 2. 한국 관광
# 3. 묻지마 관광
# 4. 트로트
# 5. 양양 관광
# 6. 한국 관광 대학교
# 7. 한국 관광 공사
# 8. 관광 버스
# 9. 관광 버스 메들리
# 10. 디스코 메들리

# I'll verify the Rising for Youtube.
# I'll use the script to find "급상승" related terms for Youtube.
