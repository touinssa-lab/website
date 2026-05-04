import json

# Comprehensive mapping for occupations
occupations_map = {
    "가스 생산기 조작원": {"en": "Gas Production Plant Operator", "zh": "气体生产设备操作员", "ja": "ガス生産機操作員"},
    "간호조무사": {"en": "Nursing Assistant", "zh": "助理护士", "ja": "看護助手"},
    "강구조물 건립원": {"en": "Steel Structure Erector", "zh": "钢结构安装工", "ja": "鋼構造物建設員"},
    "개인 생활 서비스 종사원": {"en": "Personal Service Worker", "zh": "个人生活服务人员", "ja": "個人生活サービス従事者"},
    "건물 경비원": {"en": "Building Security Guard", "zh": "大厦保安", "ja": "建物警備員"},
    "건물 전기 및 전자설비 조작원": {"en": "Building Electric/Electronic Equipment Operator", "zh": "建筑电气电子设备操作员", "ja": "建物電気・電子設備操作員"},
    "건물 청소원": {"en": "Building Cleaner", "zh": "大厦清洁工", "ja": "建物清掃員"},
    "건축가": {"en": "Architect", "zh": "建筑师", "ja": "建築家"},
    "건축감리 기술자": {"en": "Construction Supervisor", "zh": "建筑监理工程师", "ja": "建築監理技術者"},
    "경리 사무원": {"en": "Accounting Clerk", "zh": "会计员", "ja": "経理事務員"},
    "경영 기획 사무원": {"en": "Management Planning Clerk", "zh": "经营规划员", "ja": "経営企画事務員"},
    "경영 컨설턴트": {"en": "Management Consultant", "zh": "经营顾问", "ja": "経営コンサルタント"},
    "공공행정 사무원": {"en": "Public Administration Clerk", "zh": "公共行政事务员", "ja": "公共行政事務員"},
    "관광버스 운전원": {"en": "Tour Bus Driver", "zh": "观光巴士司机", "ja": "観光バス運転手"},
    "관리 비서": {"en": "Administrative Secretary", "zh": "行政秘书", "ja": "管理秘書"},
    "관세행정 사무원": {"en": "Customs Clerk", "zh": "海关事务员", "ja": "関税行政事務員"},
    "교사 교육 보조원": {"en": "Teaching Assistant", "zh": "教师教育辅助人员", "ja": "教員教育補助員"},
    "교육 및 훈련 사무원": {"en": "Education and Training Clerk", "zh": "教育培训事务员", "ja": "教育・訓練事務員"},
    "교통 계획 및 설계가": {"en": "Traffic Planner/Designer", "zh": "交通规划与设计员", "ja": "交通計画・設計者"},
    "구급 요원": {"en": "Emergency Personnel", "zh": "急救人员", "ja": "救급要員"},
    "국가행정 사무원": {"en": "National Administration Clerk", "zh": "国家行政事务员", "ja": "国家行政事務員"},
    "기장군": {"en": "Gijang-gun", "zh": "机张郡", "ja": "機張郡"},
    "데이터 분석가": {"en": "Data Analyst", "zh": "数据分析师", "ja": "データ分析家"},
    "마케팅 전문가": {"en": "Marketing Specialist", "zh": "营销专家", "ja": "マーケティング専門家"},
    "매장 계산원": {"en": "Cashier", "zh": "收银员", "ja": "レジ係"},
    "모바일 애플리케이션 프로그래머": {"en": "Mobile App Programmer", "zh": "移动应用程序员", "ja": "モバイルアプリプログラマー"},
    "무역 사무원": {"en": "Trade Clerk", "zh": "贸易事务员", "ja": "貿易事務員"},
    "무직": {"en": "Unemployed", "zh": "待业", "ja": "無職"},
    "변호사": {"en": "Lawyer", "zh": "律师", "ja": "弁護士"},
    "보육교사": {"en": "Childcare Teacher", "zh": "保育员", "ja": "保育士"},
    "보험 사무원": {"en": "Insurance Clerk", "zh": "保险事务员", "ja": "保険事務員"},
    "상품 기획자": {"en": "Product Planner", "zh": "产品策划师", "ja": "商品企画者"},
    "세무사": {"en": "Tax Accountant", "zh": "税务师", "ja": "税理士"},
    "소규모 상점 경영자": {"en": "Small Business Owner", "zh": "小商店店主", "ja": "小規模商店経営者"},
    "시설 경비원": {"en": "Security Guard", "zh": "保安", "ja": "警備員"},
    "약사": {"en": "Pharmacist", "zh": "药剂师", "ja": "薬剤師"},
    "영업 관리 사무원": {"en": "Sales Management Clerk", "zh": "销售管理事务员", "ja": "営業管理事務員"},
    "온라인 쇼핑 판매원": {"en": "Online Shopping Seller", "zh": "网店销售员", "ja": "オンラインショッピング販売員"},
    "웹 운영자": {"en": "Web Operator", "zh": "网站运营人员", "ja": "ウェブ運営者"},
    "유치원 교사": {"en": "Kindergarten Teacher", "zh": "幼儿园教师", "ja": "幼稚園教諭"},
    "육군 장교": {"en": "Army Officer", "zh": "陆军军官", "ja": "陸軍将校"},
    "음료 서비스 종사원": {"en": "Beverage Service Worker", "zh": "饮品服务人员", "ja": "飲料サービス従事者"},
    "음식 서비스 종사원": {"en": "Food Service Worker", "zh": "餐饮服务人员", "ja": "飲食サービス従事者"},
    "일반 간호사": {"en": "Nurse", "zh": "普通护士", "ja": "一般看護師"},
    "일반영양사": {"en": "Nutritionist", "zh": "营养师", "ja": "一般管理栄養士"},
    "일식 조리사": {"en": "Japanese Cuisine Chef", "zh": "日餐厨师", "ja": "日本料理調理師"},
    "자동차 경정비원": {"en": "Car Maintenance Worker", "zh": "汽车维修工", "ja": "自動車軽整備員"},
    "전화 상담원": {"en": "Call Center Agent", "zh": "客服专员", "ja": "電話相談員"},
    "제빵사 및 제과원": {"en": "Baker and Confectioner", "zh": "面包师和西点师", "ja": "製パン・製菓員"},
    "조경감리 기술자": {"en": "Landscape Supervisor", "zh": "景观监理工程师", "ja": "造園監理技術者"},
    "지방행정 사무원": {"en": "Local Administration Clerk", "zh": "地方行政事务员", "ja": "地方行政事務員"},
    "초등학교 교사": {"en": "Elementary School Teacher", "zh": "小学教师", "ja": "小学校教諭"},
    "총무 사무원": {"en": "General Affairs Clerk", "zh": "总务事务员", "ja": "総務事務員"},
    "한식 조리사": {"en": "Korean Cuisine Chef", "zh": "韩餐厨师", "ja": "韓国料理調理師"},
    "회계 사무원": {"en": "Accounting Clerk", "zh": "会计事务员", "ja": "会計事務員"},
    "대학생": {"en": "University Student", "zh": "大学生", "ja": "大学生"},
    "주부": {"en": "Homemaker", "zh": "家庭主妇", "ja": "主婦"},
    "식품학 연구원": {"en": "Food Science Researcher", "zh": "食品科学研究员", "ja": "食品学研究員"},
    "치과위생사": {"en": "Dental Hygienist", "zh": "牙科卫生员", "ja": "歯科衛生士"},
    "사회 교사": {"en": "Social Studies Teacher", "zh": "社会老师", "ja": "社会科教師"},
    "보험 관리자": {"en": "Insurance Manager", "zh": "保险经理", "ja": "保険管理者"},
    "부동산 감정 전문가": {"en": "Real Estate Appraiser", "zh": "房地产估价师", "ja": "不動産鑑定専門家"},
    "택시 운전원": {"en": "Taxi Driver", "zh": "出租车司机", "ja": "タクシー運転手"},
    "헤드헌터": {"en": "Headhunter", "zh": "猎头", "ja": "ヘッドハンター"},
}

# Districts mapping (subset)
districts_map = {
    "강남구": {"en": "Gangnam-gu", "zh": "江南区", "ja": "江南区"},
    "강서구": {"en": "Gangseo-gu", "zh": "江西区", "ja": "江西区"},
    "해운대구": {"en": "Haeundae-gu", "zh": "海云台区", "ja": "海雲台区"},
    "용인시": {"en": "Yongin-si", "zh": "龙仁市", "ja": "龍仁市"},
    "처인구": {"en": "Cheoin-gu", "zh": "处仁区", "ja": "処仁区"},
    "수지구": {"en": "Suji-gu", "zh": "水枝区", "ja": "水枝区"},
    "분당구": {"en": "Bundang-gu", "zh": "盆唐区", "ja": "盆唐区"},
    "제주": {"en": "Jeju", "zh": "济州", "ja": "済州"},
    "서귀포시": {"en": "Seogwipo-si", "zh": "西归浦市", "ja": "西帰浦市"},
    "경주시": {"en": "Gyeongju-si", "zh": "庆州市", "ja": "慶州市"},
    "강릉시": {"en": "Gangneung-si", "zh": "江陵市", "ja": "江陵市"},
}

# Sex mapping
sex_map = {
    "여자": {"en": "Female", "zh": "女", "ja": "女性"},
    "남자": {"en": "Male", "zh": "男", "ja": "男性"},
}

# Combine all into one translation map for the frontend
final_map = {}
for k, v in occupations_map.items(): final_map[k] = v
for k, v in districts_map.items(): final_map[k] = v
for k, v in sex_map.items(): final_map[k] = v

with open(r'd:\뉴프로젝트\투어리즘인사이트\홈페이지_리뉴얼\Web\src\data\persona_translations.json', 'w', encoding='utf-8') as f:
    json.dump(final_map, f, ensure_ascii=False, indent=2)

print("Created persona_translations.json")
