import re

file_path = r'd:\뉴프로젝트\투어리즘인사이트\홈페이지_리뉴얼\Web\src\pages\AITravelGuide.tsx'

with open(file_path, 'r', encoding='utf-8', errors='replace') as f:
    content = f.read()

# Fix introText in handleProvinceSelect
pattern_intro = re.compile(r'const introText = \{.*?\};', re.DOTALL)
replacement_intro = r'''const introText = {
      ko: `저는 ${translateContent(randomPersona.district, 'ko').replace('-', ' ')}에 살고 있는 ${translateContent(randomPersona.occupation, 'ko')}입니다. 우리 동네에 대해 궁금한 거 있으면 뭐든 물어보세요!`,
      en: `I am a ${translateContent(randomPersona.occupation, 'en')} living in ${translateContent(randomPersona.district, 'en').replace('-', ' ')}. Ask me anything about our neighborhood!`,
      zh: `我是住在 ${translateContent(randomPersona.district, 'zh').replace('-', ' ')} 的一名 ${translateContent(randomPersona.occupation, 'zh')}。如果您对我们这里有什么好奇的，尽管问我！`,
      ja: `私は ${translateContent(randomPersona.district, 'ja').replace('-', ' ')} に住んでいる ${translateContent(randomPersona.occupation, 'ja')} です。私たちの街について気になることがあれば、何でも聞いてください！`
    };'''

content = pattern_intro.sub(replacement_intro, content)

# Also ensure sidebar rendering uses translateContent (already checked it does, but just in case)
# Wait, I already saw it uses translateContent for sidebar occupation and hobbies.

# Let's add more common translations to personaContentTranslations
# I'll search for "상품 기획자" and add it if not already there.
if '"상품 기획자"' not in content:
    content = content.replace('"영양사": { ko: "영양사", en: "Nutritionist", zh: "营养师", ja: "管理栄養士" },', 
                              '"영양사": { ko: "영양사", en: "Nutritionist", zh: "营养师", ja: "管理栄養士" },\n  "상품 기획자": { ko: "상품 기획자", en: "Product Planner", zh: "产品策划师", ja: "商品企画者" },')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
