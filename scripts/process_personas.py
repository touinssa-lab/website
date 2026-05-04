import pandas as pd
import json
import os
import glob

def process_personas():
    data_path = r'D:\nvidiaNemotron-Personas-Korea\data'
    files = glob.glob(os.path.join(data_path, "*.parquet"))
    
    if not files:
        print("No parquet files found.")
        return

    # To be cost-effective, we only pick a sample of 20 personas per province
    all_selected = []
    
    # We only need to scan a few files to get enough diversity
    for file in files[:3]: 
        print(f"Processing {file}...")
        df = pd.read_parquet(file)
        
        # Clean up data (handle potential encoding issues in strings)
        # Note: If data is broken in parquet, we can't do much, but usually it's fine in Python
        
        # Group by province and sample
        provinces = df['province'].unique()
        for prov in provinces:
            prov_df = df[df['province'] == prov]
            # Sample 10 from each file for each province to get variety
            sample_size = min(len(prov_df), 10)
            sample = prov_df.sample(n=sample_size, random_state=42)
            all_selected.append(sample)

    final_df = pd.concat(all_selected).drop_duplicates(subset=['uuid'])
    
    # Filter to keep it manageable - max 30 per province total
    final_df = final_df.groupby('province').apply(lambda x: x.sample(n=min(len(x), 30), random_state=42)).reset_index(drop=True)
    
    # Convert to list of dicts
    personas = final_df.to_dict(orient='records')
    
    # Save to JSON
    output_path = r'd:\뉴프로젝트\투어리즘인사이트\홈페이지_리뉴얼\Web\src\data\personas_sample.json'
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(personas, f, ensure_ascii=False, indent=2)
    
    print(f"Successfully saved {len(personas)} personas to {output_path}")

if __name__ == "__main__":
    process_personas()
