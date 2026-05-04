import json
import os

file_path = r'd:\뉴프로젝트\투어리즘인사이트\홈페이지_리뉴얼\Web\src\data\personas_sample.json'

with open(file_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

unique_strings = {
    'occupations': set(),
    'districts': set(),
    'hobbies': set()
}

for p in data:
    if 'occupation' in p: unique_strings['occupations'].add(p['occupation'])
    if 'district' in p: 
        d = p['district']
        if '-' in d:
            parts = d.split('-')
            for part in parts:
                unique_strings['districts'].add(part.strip())
        else:
            unique_strings['districts'].add(d.strip())
    if 'hobbies_and_interests' in p: 
        h = p['hobbies_and_interests']
        for item in h.split(','):
            unique_strings['hobbies'].add(item.strip())

# Convert sets to sorted lists
output = {
    'occupations': sorted(list(unique_strings['occupations'])),
    'districts': sorted(list(unique_strings['districts'])),
    'hobbies': sorted(list(unique_strings['hobbies']))
}

with open(r'd:\뉴프로젝트\투어리즘인사이트\홈페이지_리뉴얼\Web\scratch\strings_to_translate.json', 'w', encoding='utf-8') as f:
    json.dump(output, f, ensure_ascii=False, indent=2)

print(f"Extracted {len(output['occupations'])} occupations, {len(output['districts'])} districts, and {len(output['hobbies'])} hobby segments.")
