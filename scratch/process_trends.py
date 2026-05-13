import pandas as pd
import json
import os

def process_excel(file_path):
    xl = pd.ExcelFile(file_path)
    sheets = xl.sheet_names
    
    # Mapping garbled sheet names or index based on expected order
    # Expected: 여행, 관광, 축제, 행사, 공연, 호텔, 항공, 맛집, 크루즈
    expected_sections = ['여행', '관광', '축제', '행사', '공연', '호텔', '항공', '맛집', '크루즈']
    
    results = []
    id_counter = 1
    
    # Filter list
    filter_keywords = ['에이전틱 AI', '초개인화 여정', '디지털 휴머니티', '에이전틱 AI 여정', 'Digital Humanity', 'Agentic AI']

    for i, sheet_name in enumerate(sheets):
        if i >= len(expected_sections):
            break
            
        section = expected_sections[i]
        df = pd.read_excel(file_path, sheet_name=sheet_name)
        
        # Assume columns: 'query', 'search interest', 'increase percent'
        # Some files might have different column names if exported from different sources, 
        # but let's try to find them by index if names fail.
        
        # Print columns for debugging
        print(f"Sheet {i} ({section}) columns: {df.columns.tolist()}")
        
        for idx, row in df.iterrows():
            if idx >= 50: # Limit to 50 as per manual
                break
                
            keyword = str(row.iloc[0]).strip()
            
            # Filtering
            if any(fk in keyword for fk in filter_keywords):
                continue
            
            # Skip nan or empty
            if not keyword or keyword.lower() == 'nan':
                continue
                
            interest = 0
            try:
                interest = int(row.iloc[1])
            except:
                pass
                
            change = str(row.iloc[2]).strip()
            if change == 'Breakout':
                change = '급상승'
                
            results.append({
                "id": str(id_counter),
                "section": section,
                "rank": idx + 1,
                "keyword": keyword,
                "interest": interest,
                "change": change
            })
            id_counter += 1
            
    return results

file_path = 'scratch/trends/2026-05-13.xlsx'
keywords = process_excel(file_path)

with open('scratch/trends/2026-05-13_keywords.json', 'w', encoding='utf-8') as f:
    json.dump(keywords, f, ensure_ascii=False, indent=2)

print(f"Processed {len(keywords)} keywords.")
