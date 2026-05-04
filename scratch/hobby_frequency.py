import json
from collections import Counter

file_path = r'd:\뉴프로젝트\투어리즘인사이트\홈페이지_리뉴얼\Web\src\data\personas_sample.json'

with open(file_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

hobby_counts = Counter()
for p in data:
    if 'hobbies_and_interests' in p:
        h = p['hobbies_and_interests']
        for item in h.split(','):
            hobby_counts[item.strip()] += 1

print("Top 100 Hobbies:")
for h, count in hobby_counts.most_common(100):
    print(f'"{h}": {count},')
