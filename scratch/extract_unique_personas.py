import json
import ast

file_path = r'd:\뉴프로젝트\투어리즘인사이트\홈페이지_리뉴얼\Web\src\data\personas_sample.json'

with open(file_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

occupations = set()
districts = set()
hobbies = set()

for item in data:
    if 'occupation' in item and item['occupation']:
        occupations.add(item['occupation'])
    
    if 'district' in item and item['district']:
        districts.add(item['district'])
        
    if 'hobbies_and_interests_list' in item and item['hobbies_and_interests_list']:
        h_list_str = item['hobbies_and_interests_list']
        try:
            # The data seems to have strings that look like Python lists: "['a', 'b']"
            # We need to convert this string to an actual list.
            h_list = ast.literal_eval(h_list_str)
            if isinstance(h_list, list):
                for h in h_list:
                    hobbies.add(h.strip())
        except:
            # Fallback if it's just a plain string or badly formatted
            hobbies.add(h_list_str.strip())

print(f"Unique Occupations: {len(occupations)}")
print(f"Unique Districts: {len(districts)}")
print(f"Unique Hobbies: {len(hobbies)}")

result = {
    "occupations": sorted(list(occupations)),
    "districts": sorted(list(districts)),
    "hobbies": sorted(list(hobbies))
}

with open('persona_unique_values.json', 'w', encoding='utf-8') as f:
    json.dump(result, f, ensure_ascii=False, indent=2)

print("Extraction complete. Saved to persona_unique_values.json")
