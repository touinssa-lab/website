import os

with open('src/data/aiHotKeywords.ts', 'r', encoding='utf-8') as f:
    content = f.read()

insight = content[content.find('export interface KeywordInsight'):]

with open('new_data.txt', 'r', encoding='utf-8') as f:
    new_data = f.read()

with open('src/data/aiHotKeywords.ts', 'w', encoding='utf-8') as f:
    f.write(new_data + '\n' + insight)
