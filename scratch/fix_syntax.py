import os

file_path = r'd:\뉴프로젝트\투어리즘인사이트\홈페이지_리뉴얼\Web\src\pages\AITravelGuide.tsx'

with open(file_path, 'r', encoding='utf-8', errors='replace') as f:
    content = f.read()

# The broken part identified from previous analysis
target = '''  "대학생": { ko: "대  "평소에는 동네 친구들과 관악산 둘레길을 걸으며 밀린 이야기를 나눕니다. 잠들기 전 스마트폰으로 최신 건강 정보 영상을 보며 복부 비만을 해결할 방법을 찾기도 합니다.": {
    ko: "평소에는 동네 친구들과 관악산 둘레길을 걸으며 밀린 이야기를 나눕니다. 잠들기 전 스마트폰으로 최신 건강 정보 영상을 보며 복부 비만을 해결할 방법을 찾기도 합니다.",
    en: "Usually, I walk along the Gwanaksan Trail with my neighbors and catch up on stories. Before going to sleep, I watch health tip videos on my smartphone to find ways to solve abdominal obesity.",
    zh: "平时和邻居朋友一起走冠岳山步道，分享近况。睡觉前用手机看最新的健康信息视频，寻找解决腹부肥胖的方法。",
    ja: "普段は近所の友達と冠岳山のトレイルを歩きながら積もる話をします.寝る前にスマートフォンで最新의 건강 정보 영상을 보며 복부 비만을 해결할 방법을 찾기도 합니다."
  }
 안양천변을 천천히 걷고": { 
    ko: "주말이면 아내와 함께 안양천변을 천천히 걷고",'''

# Note: The 'ja' translation in the target above has some Korean remnants which I'll use to match exactly what's in the file (if my previous Python read was accurate).
# Actually, the Python output had '' characters where it couldn't decode.
# Let's try a more flexible match or use the line numbers if possible.

# Wait, I'll use a simpler approach. I'll search for the "대학생" line and replace it along with the following block.

# Looking at the python output again:
# "대학생": { ko: "대  "평소에는 ...

replacement = '''  "대학생": { ko: "대학생", en: "University Student", zh: "大学生", ja: "大学生" },
  "평소에는 동네 친구들과 관악산 둘레길을 걸으며 밀린 이야기를 나눕니다. 잠들기 전 스마트폰으로 최신 건강 정보 영상을 보며 복부 비만을 해결할 방법을 찾기도 합니다.": {
    ko: "평소에는 동네 친구들과 관악산 둘레길을 걸으며 밀린 이야기를 나눕니다. 잠들기 전 스마트폰으로 최신 건강 정보 영상을 보며 복부 비만을 해결할 방법을 찾기도 합니다.",
    en: "Usually, I walk along the Gwanaksan Trail with my neighbors and catch up on stories. Before going to sleep, I watch health tip videos on my smartphone to find ways to solve abdominal obesity.",
    zh: "平时和邻居朋友一起走冠岳山步道，分享近况。睡觉前用手机看最新的健康信息视频，寻找解决腹部肥胖的方法。",
    ja: "普段は近所の友達と冠岳山のトレイルを歩きながら積もる話をします。寝る前にスマートフォンで最新の健康情報の動画を見ながら、お腹の脂肪を解消する方法を探したりも합니다。"
  },
  "주말이면 아내와 함께 안양천변을 천천히 걷고": { 
    ko: "주말이면 아내와 함께 안양천변을 천천히 걷고",'''

# I'll use a regex to be more flexible with potential hidden characters
import re

# Finding the section between "영양사" and the next valid key
# pattern = re.compile(r'\"영양사\": \{.*?\},\s+\"대학생\": \{ ko: \"대 .*?\}[\s\?]+안양천변을', re.DOTALL)
# Actually, I'll just look for the specific broken line.

# Let's try to match the broken part exactly as identified in previous steps.
# I'll use the lines I got from the last successful python read.

with open(file_path, 'r', encoding='utf-8', errors='replace') as f:
    lines = f.readlines()

# Line 201 (index 200) was the "대학생" line.
# Let's verify and replace.
fixed_lines = []
for i, line in enumerate(lines):
    if i == 200 and '"대학생":' in line:
        fixed_lines.append('  "대학생": { ko: "대학생", en: "University Student", zh: "大学生", ja: "大学生" },\n')
        fixed_lines.append('  "평소에는 동네 친구들과 관악산 둘레길을 걸으며 밀린 이야기를 나눕니다. 잠들기 전 스마트폰으로 최신 건강 정보 영상을 보며 복부 비만을 해결할 방법을 찾기도 합니다.": {\n')
    elif i == 206 and '안양천변을' in line:
        fixed_lines.append('  "주말이면 아내와 함께 안양천변을 천천히 걷고": { \n')
    else:
        fixed_lines.append(line)

# Since I used errors='replace', some characters might have changed to .
# To avoid corrupting the WHOLE file, I should only write if I have a clean read.
# Let's try reading again with cp949 just to be sure if some parts are cp949.
# Actually, if I use errors='replace' and then write back, I might lose data.

# Better: use binary read/write for the replacement if possible.

with open(file_path, 'rb') as f:
    data = f.read()

# I'll search for the byte sequence for '"대학생": { ko: "대  "'
# "대학생" in UTF-8: b'\xeb\x8c\x80\xed\x95\x99\xec\x83\x9d'
# "대  " in UTF-8: b'\xeb\x8c\x80  '

target_bytes = b'"\xeb\x8c\x80\xed\x95\x99\xec\x83\x9d": { ko: "\xeb\x8c\x80  "'
# Wait, let's just use the string and encode it to utf-8.

target_str = '  "대학생": { ko: "대  "'
replacement_str = '  "대학생": { ko: "대학생", en: "University Student", zh: "大学生", ja: "大学生" },\n  "평소에는 동네 친구들과 관악산 둘레길을 걸으며 밀린 이야기를 나눕니다. 잠들기 전 스마트폰으로 최신 건강 정보 영상을 보며 복부 비만을 해결할 방법을 찾기도 합니다.": {'

data = data.replace(target_str.encode('utf-8'), replacement_str.encode('utf-8'))

# Also fix the weird character before "안양천변을"
# It was likely a comma or something.
# Looking at the python output:
# }
#  안양천변을 ...
# In bytes it might be } followed by some garbage.

data = re.sub(b'\}\s+[\x80-\xff]*\s+\xec\x95\x88\xec\x96\x91\xec\xb2\x9c\xeb\xb3\x80\xec\x9d\x84', 
              b'},\n  "\xec\xa3\xbc\xeb\xa7\x90\xec\x9d\xb4\xeb\xa9\xb4 \xec\x95\x84\xeb\x82\xb4\xec\x99\x80 \xed\x95\xbc\xea\xbb\x98 \xec\x95\x88\xec\x96\x91\xec\xb2\x9c\xeb\xb3\x80\xec\x9d\x84', 
              data)

with open(file_path, 'wb') as f:
    f.write(data)
