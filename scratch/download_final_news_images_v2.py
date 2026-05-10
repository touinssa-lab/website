import urllib.request
import os

images = [
    ("article_1.jpg", "https://imgnews.pstatic.net/image/469/2026/05/10/0000929880_001_20260510142101345.jpg"),
    ("article_2.jpg", "https://imgnews.pstatic.net/image/016/2026/05/10/20260510000001_0.jpg"),
    ("article_3.jpg", "https://imgnews.pstatic.net/image/001/2026/05/10/AKR20260510025800064_01_i_20260510110005.jpg"),
    ("article_4.jpg", "https://imgnews.pstatic.net/image/138/2026/05/10/0002227353_001_20260510160000.jpg"),
    ("article_5.jpg", "https://imgnews.pstatic.net/image/422/2026/05/10/0000863245_001_20260510150000.jpg"),
    ("article_6.jpg", "https://imgnews.pstatic.net/image/008/2026/05/10/0005355263_001_20260510140000.jpg"),
    ("article_7.jpg", "https://imgnews.pstatic.net/image/003/2026/05/10/0013935636_001_20260510143000.jpg"),
    ("article_8.jpg", "https://imgnews.pstatic.net/image/092/2026/05/10/0002422024_001_20260510154301645.jpg")
]

base_path = "public/images/news/20260510"
if not os.path.exists(base_path):
    os.makedirs(base_path)

for filename, url in images:
    filepath = os.path.join(base_path, filename)
    try:
        print(f"Downloading {url} to {filepath}...")
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Referer': 'https://news.naver.com/'
        }
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as response, open(filepath, 'wb') as out_file:
            out_file.write(response.read())
        print(f"Successfully downloaded {filename}")
    except Exception as e:
        print(f"Error downloading {filename}: {e}")
