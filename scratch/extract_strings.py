import json
import os

file_path = r'd:\뉴프로젝트\투어리즘인사이트\홈페이지_리뉴얼\Web\src\data\personas_sample.json'

with open(file_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

occupations = set()
districts = set()
provinces = set()
hobbies = set()
cultural_backgrounds = set()

for p in data:
    if 'occupation' in p: occupations.add(p['occupation'])
    if 'district' in p: districts.add(p['district'])
    if 'province' in p: provinces.add(p['province'])
    if 'hobbies_and_interests' in p: 
        # Sometimes it's a list string or comma separated
        h = p['hobbies_and_interests']
        for item in h.split(','):
            hobbies.add(item.strip())
    if 'cultural_background' in p:
        cultural_backgrounds.add(p['cultural_background'])

print("Unique Occupations:")
for o in sorted(list(occupations)):
    print(f'"{o}",')

print("\nUnique Hobbies:")
for h in sorted(list(hobbies)):
    print(f'"{h}",')

print("\nUnique Cultural Backgrounds:")
for c in sorted(list(cultural_backgrounds)):
    print(f'"{c}",')
