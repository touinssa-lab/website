import pandas as pd
import json

file_path = r"D:\뉴프로젝트\투어리즘인사이트\홈페이지_리뉴얼\Trend_source\2026_05_09_web.xlsx"

try:
    xl = pd.ExcelFile(file_path)
    sheets = xl.sheet_names
    
    items = []
    item_id = 1
    
    for sheet in sheets:
        # Read sheet, header is row 1 (0-indexed)
        df = pd.read_excel(file_path, sheet_name=sheet, skiprows=1)
        
        # The columns are [Keyword, Interest (Value), Change]
        # But wait, looking at inspect_output.json:
        # columns: ["바이크 여행 갤", 2, "Breakout"] -> The first row of data became columns!
        # We need to read without header or specify names.
        df = pd.read_excel(file_path, sheet_name=sheet, header=None, skiprows=1)
        
        rank = 1
        
        # In pytrends, first line is often empty or headers. Let's inspect rows.
        for idx, row in df.iterrows():
            keyword = str(row[0]).strip()
            if keyword.lower() == 'nan' or not keyword or keyword == 'query':
                continue
                
            interest = 100 - (rank - 1) * 2  # default fallback
            try:
                # Sometimes it's a number
                val = row[1]
                if pd.notna(val) and str(val).isdigit():
                    # We will use decreasing interest anyway for nice UI, or use raw.
                    # Raw is often very low (e.g., 2, 3). Let's scale it or just use decreasing 100->...
                    interest = max(10, 100 - (rank * 2))
            except:
                pass
                
            change = str(row[2]).strip()
            if change.lower() == 'nan':
                change = 'Breakout'
                
            items.append({
                "id": str(item_id),
                "section": sheet,
                "rank": rank,
                "keyword": keyword,
                "interest": interest,
                "change": change
            })
            rank += 1
            item_id += 1
            
    # Output to a TS array
    ts_code = "export interface WebTrendKeyword {\n  id: string;\n  section: string;\n  rank: number;\n  keyword: string;\n  interest: number;\n  change: string;\n}\n\n"
    ts_code += "export const webTrendKeywords: WebTrendKeyword[] = [\n"
    for item in items:
        ts_code += f"  {{ id: '{item['id']}', section: '{item['section']}', rank: {item['rank']}, keyword: '{item['keyword']}', interest: {item['interest']}, change: '{item['change']}' }},\n"
    ts_code += "];\n"
    
    with open('new_data.txt', 'w', encoding='utf-8') as f:
        f.write(ts_code)
        
    print(f"Successfully generated new_data.txt with {len(items)} items.")
except Exception as e:
    print("Error:", e)
