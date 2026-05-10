import os
import shutil
import glob

brain_dir = r"C:\Users\junglee\.gemini\antigravity\brain\238d5a65-9f27-4e5b-969e-9e0d112e1c06"
base_path = r"d:\뉴프로젝트\투어리즘인사이트\홈페이지_리뉴얼\Web\public\images\news\20260510"

if not os.path.exists(base_path):
    os.makedirs(base_path)

mappings = [
    ("article_1_pata_summit_*.png", "article_1.png"),
    ("article_2_gyeonggi_visitors_*.png", "article_2.png"),
    ("article_3_cheongju_kpop_*.png", "article_3.png"),
    ("article_4_incheon_parking_*.png", "article_4.png"),
    ("article_5_sancheong_wellness_*.png", "article_5.png"),
    ("article_6_gyeongju_forum_world_*.png", "article_6.png"),
    ("article_7_jeju_ai_center_*.png", "article_7.png"),
    ("article_8_gangjin_ai_hub_city_*.png", "article_8.png")
]

for pattern, target in mappings:
    full_pattern = os.path.join(brain_dir, pattern)
    files = glob.glob(full_pattern)
    if files:
        latest_file = max(files, key=os.path.getmtime)
        shutil.copy(latest_file, os.path.join(base_path, target))
        print(f"Copied {latest_file} to {os.path.join(base_path, target)}")
    else:
        print(f"No files found for pattern: {full_pattern}")
