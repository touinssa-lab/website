import json
import os

file_path = r'd:\뉴프로젝트\투어리즘인사이트\홈페이지_리뉴얼\Web\src\data\personas_sample.json'

with open(file_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

occupations = set()
districts = set()
hobbies = set()

for p in data:
    if 'occupation' in p: occupations.add(p['occupation'])
    if 'district' in p: districts.add(p['district'])
    if 'hobbies_and_interests' in p: 
        h = p['hobbies_and_interests']
        for item in h.split(','):
            hobbies.add(item.strip())

print(f"Total personas: {len(data)}")
print(f"Unique Occupations: {len(occupations)}")
print(f"Unique Districts: {len(districts)}")
print(f"Unique Hobby segments: {len(hobbies)}")
