import pandas as pd
import json
import os

file_path = r'd:\뉴프로젝트\투어리즘인사이트\홈페이지_리뉴얼\Web\scratch\trends\2026-05-14.xlsx'
output_path = r'd:\뉴프로젝트\투어리즘인사이트\홈페이지_리뉴얼\Web\scratch\debug_excel.json'

def debug_excel(file_path):
    if not os.path.exists(file_path):
        return {"error": f"File not found: {file_path}"}
    
    try:
        xl = pd.ExcelFile(file_path)
        info = {}
        for sheet_name in xl.sheet_names:
            # Skip empty or irrelevant sheets if any
            df = xl.parse(sheet_name)
            info[sheet_name] = {
                "columns": df.columns.tolist(),
                "head": df.head(10).to_dict(orient='records')
            }
        
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(info, f, ensure_ascii=False, indent=2)
            
        return {"success": True}
    except Exception as e:
        return {"error": str(e)}

result = debug_excel(file_path)
print(json.dumps(result))
