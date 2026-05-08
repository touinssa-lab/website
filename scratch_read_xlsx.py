import pandas as pd
import json

file_path = r"D:\뉴프로젝트\투어리즘인사이트\홈페이지_리뉴얼\Trend_source\2026_05_09_web.xlsx"

try:
    xl = pd.ExcelFile(file_path)
    sheets = xl.sheet_names
    
    output = {}
    for sheet in sheets:
        df = pd.read_excel(file_path, sheet_name=sheet, skiprows=1)
        output[sheet] = {
            'columns': list(df.columns),
            'head': df.head(3).to_dict(orient='records')
        }
    
    with open('inspect_output.json', 'w', encoding='utf-8') as f:
        json.dump(output, f, ensure_ascii=False, indent=2)
except Exception as e:
    print("Error:", e)
