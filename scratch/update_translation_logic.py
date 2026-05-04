import re

file_path = r'd:\뉴프로젝트\투어리즘인사이트\홈페이지_리뉴얼\Web\src\pages\AITravelGuide.tsx'

with open(file_path, 'r', encoding='utf-8', errors='replace') as f:
    content = f.read()

# Replace the manual dictionary and translateContent function
new_logic = r'''const translateContent = (text: string, lang: Language) => {
  if (!text) return "";
  if (lang === 'ko') return text;
  
  // Handle composite strings like "충청북-제천시"
  if (text.includes('-')) {
    return text.split('-').map(part => {
      const trimmed = part.trim();
      return (personaTranslations as any)[trimmed]?.[lang] || trimmed;
    }).join(' ');
  }

  return (personaTranslations as any)[text]?.[lang] || text;
};'''

# Find the block starting from personaContentTranslations up to the end of translateContent
start_marker = 'const personaContentTranslations: Record<string, any> = {'
end_marker = 'return personaContentTranslations[text]?.[lang] || text;\n};'

start_idx = content.find(start_marker)
end_idx = content.find(end_marker) + len(end_marker)

if start_idx != -1 and end_idx != -1:
    content = content[:start_idx] + new_logic + content[end_idx:]

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
