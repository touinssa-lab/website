import pandas as pd
import os

file_path = r'd:\뉴프로젝트\투어리즘인사이트\홈페이지_리뉴얼\Web\scratch\trends\2026-05-16.xlsx'

def explore_excel():
    if not os.path.exists(file_path):
        print(f"File not found: {file_path}")
        return

    xl = pd.ExcelFile(file_path)
    for sheet_name in xl.sheet_names:
        print(f"\n--- Sheet: {sheet_name} ---")
        df = xl.parse(sheet_name)
        print(df.head(10))
        print(df.columns.tolist())

if __name__ == "__main__":
    explore_excel()
