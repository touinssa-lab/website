import pandas as pd
import json
import os

file_path = r'd:\뉴프로젝트\투어리즘인사이트\홈페이지_리뉴얼\Web\scratch\trends\2026-05-14.xlsx'
output_path = r'd:\뉴프로젝트\투어리즘인사이트\홈페이지_리뉴얼\Web\scratch\trends\2026-05-14_keywords.json'

def process_excel(file_path):
    if not os.path.exists(file_path):
        return {"error": f"File not found: {file_path}"}
    
    try:
        xl = pd.ExcelFile(file_path)
        all_data = []
        global_id = 1
        
        sections_map = {
            '여행': '여행',
            '관광': '관광',
            '축제': '축제',
            '행사': '행사',
            '공연': '공연',
            '호텔': '호텔',
            '항공': '항공',
            '맛집': '맛집',
            '크루즈': '크루즈'
        }
        
        for sheet_name in xl.sheet_names:
            if sheet_name in sections_map:
                df = xl.parse(sheet_name)
                # Correct column mapping based on debug output
                # query -> keyword
                # search interest -> interest
                # increase percent -> change
                
                # Filter out empty rows
                df = df.dropna(subset=['query'])
                
                for i, row in df.iterrows():
                    keyword = str(row.get('query', '')).strip()
                    if not keyword:
                        continue
                        
                    item = {
                        "id": str(global_id),
                        "section": sections_map[sheet_name],
                        "rank": i + 1,
                        "keyword": keyword,
                        "interest": int(row.get('search interest', 0)),
                        "change": str(row.get('increase percent', ''))
                    }
                    all_data.append(item)
                    global_id += 1
        
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(all_data, f, ensure_ascii=False, indent=2)
            
        return {"success": True, "count": len(all_data)}
    except Exception as e:
        return {"error": str(e)}

result = process_excel(file_path)
print(json.dumps(result))
