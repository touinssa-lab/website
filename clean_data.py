import json
import re

with open('src/data/naverNewsData.ts', 'r', encoding='utf-8') as f:
    content = f.read()

start_token = "naverNewsData: NaverNewsItem[] = "
start_idx = content.find(start_token) + len(start_token)
end_idx = content.rfind(']') + 1
json_str = content[start_idx:end_idx]

articles = json.loads(json_str)

for article in articles:
    # Remove [기], [승], [전], [결]
    text = article['excerpt']
    text = re.sub(r'\[(기|승|전|결)\]\s*', '', text)
    # Remove line breaks
    text = text.replace('\n', ' ')
    article['excerpt'] = text

ts_content = content[:start_idx] + json.dumps(articles, ensure_ascii=False, indent=2) + content[end_idx:]

with open('src/data/naverNewsData.ts', 'w', encoding='utf-8') as f:
    f.write(ts_content)

print("Data cleaned.")
