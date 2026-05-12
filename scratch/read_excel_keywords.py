import pandas as pd
import json
import os

file_path = r'd:\뉴프로젝트\투어리즘인사이트\홈페이지_리뉴얼\Web\scratch\2026-05-12.xlsx'
output_path = r'd:\뉴프로젝트\투어리즘인사이트\홈페이지_리뉴얼\Web\scratch\keywords_2026-05-12.json'
sections = ['여행', '관광', '축제', '행사', '공연', '호텔', '항공', '맛집', '크루즈']

data = {}

try:
    xl = pd.ExcelFile(file_path)
    sheet_names = xl.sheet_names
    
    for i, section in enumerate(sections):
        if i < len(sheet_names):
            df = pd.read_excel(file_path, sheet_name=sheet_names[i])
            keywords = []
            col = None
            for c in df.columns:
                if 'keyword' in str(c).lower() or '키워드' in str(c):
                    col = c
                    break
            
            if col is not None:
                keywords = df[col].dropna().astype(str).tolist()
            else:
                keywords = df.iloc[:, 0].dropna().astype(str).tolist()
            
            data[section] = [k.strip() for k in keywords[:50]]
        else:
            data[section] = []

    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"Successfully saved to {output_path}")

except Exception as e:
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump({"error": str(e)}, f, ensure_ascii=False)
    print(f"Error occurred: {e}")
