import re

file_path = r'd:\뉴프로젝트\투어리즘인사이트\홈페이지_리뉴얼\Web\src\pages\AITravelGuide.tsx'

with open(file_path, 'r', encoding='utf-8', errors='replace') as f:
    content = f.read()

# Define the pattern to catch the entire broken section
# From "영양사" entry to the start of "날씨가 좋은" entry
pattern = re.compile(r'("영양사": \{.*?\},\s+).*?("날씨가 좋은 날에는)', re.DOTALL)

replacement_block = r'''\1  "대학생": { ko: "대학생", en: "University Student", zh: "大学生", ja: "大学生" },
  "평소에는 동네 친구들과 관악산 둘레길을 걸으며 밀린 이야기를 나눕니다. 잠들기 전 스마트폰으로 최신 건강 정보 영상을 보며 복부 비만을 해결할 방법을 찾기도 합니다.": {
    ko: "평소에는 동네 친구들과 관악산 둘레길을 걸으며 밀린 이야기를 나눕니다. 잠들기 전 스마트폰으로 최신 건강 정보 영상을 보며 복부 비만을 해결할 방법을 찾기도 합니다.",
    en: "Usually, I walk along the Gwanaksan Trail with my neighbors and catch up on stories. Before going to sleep, I watch health tip videos on my smartphone to find ways to solve abdominal obesity.",
    zh: "平时和邻居朋友一起走冠岳山步道，分享近况。睡觉前用手机看最新的健康信息视频，寻找解决腹部肥胖的方法。",
    ja: "普段は近所の友達と冠岳山のトレイルを歩きながら積もる話をします。寝る前にスマートフォンで最新の健康情報の動画を見ながら、お腹の脂肪を解消する方法を探したりもします。"
  },
  "주말이면 아내와 함께 안양천변을 천천히 걷고": { 
    ko: "주말이면 아내와 함께 안양천변을 천천히 걷고", 
    en: "Walking slowly along Anyangcheon with my wife on weekends", 
    zh: "周末和妻子一起在安养川边慢慢散步", 
    ja: "週末は妻と一緒に安養川沿いをゆっくり歩く" 
  },
  \2'''

new_content = pattern.sub(replacement_block, content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_content)
