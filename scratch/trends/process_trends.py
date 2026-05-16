import pandas as pd
import json
import os

file_path = r'd:\뉴프로젝트\투어리즘인사이트\홈페이지_리뉴얼\Web\scratch\trends\2026-05-16.xlsx'
output_path = r'd:\뉴프로젝트\투어리즘인사이트\홈페이지_리뉴얼\Web\scratch\trends\2026-05-16_keywords.json'

def process_excel():
    if not os.path.exists(file_path):
        print(f"File not found: {file_path}")
        return

    xl = pd.ExcelFile(file_path)
    all_keywords = []
    sections = ['여행', '관광', '축제', '행사', '공연', '호텔', '항공', '맛집', '크루즈']
    sheet_names = xl.sheet_names
    
    id_counter = 1
    
    for section in sections:
        sheet_name = next((s for s in sheet_names if section in s), None)
        if not sheet_name:
            continue
            
        df = xl.parse(sheet_name)
        
        for index, row in df.iterrows():
            if index >= 50: break
            
            # Use column names found in exploration: 'query', 'search interest', 'increase percent'
            keyword = str(row.get('query', '')).strip()
            interest_raw = row.get('search interest', 0)
            change_raw = row.get('increase percent', "0")
            
            interest = 0
            change = str(change_raw)
            
            if isinstance(interest_raw, (int, float)):
                interest = int(interest_raw)
            elif str(interest_raw).lower() == 'breakout' or '급상승' in str(interest_raw):
                interest = 0
                change = "급상승"
            
            if change.lower() == 'breakout':
                change = "급상승"

            item = {
                "id": str(id_counter),
                "section": section,
                "rank": index + 1,
                "keyword": keyword,
                "interest": interest,
                "change": change
            }
            all_keywords.append(item)
            id_counter += 1

    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(all_keywords, f, ensure_ascii=False, indent=2)
    print(f"Successfully processed and saved to {output_path}")

if __name__ == "__main__":
    process_excel()
