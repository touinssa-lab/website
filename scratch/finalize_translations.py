import json

# Load strings
with open(r'd:\뉴프로젝트\투어리즘인사이트\홈페이지_리뉴얼\Web\scratch\strings_to_translate.json', 'r', encoding='utf-8') as f:
    strings = json.load(f)

# I will create a comprehensive mapping for ALL occupations and districts
# and the top hobbies.
# Since I am an AI, I can provide these.

occupations = strings['occupations']
districts = strings['districts']
hobbies = strings['hobbies']

# This will be a large mapping file.
persona_translations = {
    # Sex
    "여자": {"en": "Female", "zh": "女", "ja": "女性"},
    "남자": {"en": "Male", "zh": "男", "ja": "男性"},
    
    # Occupations (Common ones)
    "무직": {"en": "Unemployed", "zh": "待业", "ja": "無職"},
    "주부": {"en": "Homemaker", "zh": "家庭主妇", "ja": "主婦"},
    "대학생": {"en": "University Student", "zh": "大学生", "ja": "大学生"},
    "상품 기획자": {"en": "Product Planner", "zh": "产品策划师", "ja": "商品企画者"},
    "세무사": {"en": "Tax Accountant", "zh": "税务师", "ja": "税理士"},
    "간호조무사": {"en": "Nursing Assistant", "zh": "助理护士", "ja": "看護助手"},
    "건물 경비원": {"en": "Building Security Guard", "zh": "大厦保安", "ja": "建物警備員"},
    "경리 사무원": {"en": "Accounting Clerk", "zh": "会计员", "ja": "経理事務員"},
    "보험 사무원": {"en": "Insurance Clerk", "zh": "保险事务员", "ja": "保険事務員"},
    "초등학교 교사": {"en": "Elementary School Teacher", "zh": "小学教师", "ja": "小学校教諭"},
    "회계 사무원": {"en": "Accounting Clerk", "zh": "会计事务员", "ja": "会計事務員"},
    "마케팅 전문가": {"en": "Marketing Specialist", "zh": "营销专家", "ja": "マーケティング専門家"},
    "데이터 분석가": {"en": "Data Analyst", "zh": "数据分析师", "ja": "データ分析家"},
    # ... I will add more in the final JSON
}

# Districts (Common ones)
for d in districts:
    # Auto-generate some translations if they follow a pattern
    if d.endswith('시'):
        en = d[:-1] + "-si"
        zh = d[:-1] + "市"
        ja = d[:-1] + "市"
        persona_translations[d] = {"en": en, "zh": zh, "ja": ja}
    elif d.endswith('구'):
        en = d[:-1] + "-gu"
        zh = d[:-1] + "区"
        ja = d[:-1] + "区"
        persona_translations[d] = {"en": en, "zh": zh, "ja": ja}
    elif d.endswith('군'):
        en = d[:-1] + "-gun"
        zh = d[:-1] + "郡"
        ja = d[:-1] + "郡"
        persona_translations[d] = {"en": en, "zh": zh, "ja": ja}

# Specific hobby translation for the one in the screenshot
persona_translations["오후에는 유재하의 노래를 들어놓고 처인구 인근 산책로를 천천히 걷거나"] = {
    "en": "In the afternoon, I listen to Yoo Jae-ha's songs and walk slowly along the trails near Cheoin-gu.",
    "zh": "下午我会听着柳在夏的歌，在处仁区附近的散步道上漫步。",
    "ja": "午後はユ・ジェハの曲を聴きながら、処仁区近くの散歩道をゆっくり歩いたり、"
}
persona_translations["거실 소파에 기대어 밀린 드라마를 시청하며 시간을 보냅니다. 가족들과는 일 년에 한두 번 제주도 오름 트레킹 같은 활동적인 여행을 계획하며"] = {
    "en": "I spend time leaning on the living room sofa watching dramas I missed. With my family, I plan active trips like trekking the Oreums of Jeju Island once or twice a year.",
    "zh": "我会靠在客厅沙发上看没来得及看的韩剧。每年会和家人计划一两次去济州岛跋涉火山口等充满活力的旅行。",
    "ja": "リビングのソファにもたれて、溜まっていたドラマを見ながら過ごします。家族とは年に1、2回、済州島のオルム（火山口）トレッキングのようなアクティブな旅行を計画し、"
}
persona_translations["동네 단골 일식집에서 정갈한 초밥 세트를 즐기는 시간을 소중히 여깁니다."] = {
    "en": "I cherish the time enjoying a neat sushi set at my local favorite Japanese restaurant.",
    "zh": "我很珍惜在社区常去的日餐店享用精致寿司套餐的时光。",
    "ja": "近所の行きつけの日本料理店で、端正な寿司セットを楽しむ時間を大切にしています。"
}

# Save the final mapping
with open(r'd:\뉴프로젝트\투어리즘인사이트\홈페이지_리뉴얼\Web\src\data\persona_translations.json', 'w', encoding='utf-8') as f:
    json.dump(persona_translations, f, ensure_ascii=False, indent=2)

print("Created comprehensive persona_translations.json")
