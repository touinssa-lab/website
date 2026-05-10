import urllib.request
import os

images = [
    ("article_1.jpg", "https://imgnews.pstatic.net/image/469/2026/05/10/0000929880_001_20260510150201234.jpg"),
    ("article_2.jpg", "https://imgnews.pstatic.net/image/081/2026/05/10/0003714521_001_20260510150345678.jpg"),
    ("article_3.jpg", "https://imgnews.pstatic.net/image/001/2026/05/10/AKR20260510025800064_01_i_20260510150412345.jpg"),
    ("article_4.jpg", "https://imgnews.pstatic.net/image/003/2026/05/10/NWS20260510_0001234567_001_20260510150445678.jpg"),
    ("article_5.jpg", "https://imgnews.pstatic.net/image/421/2026/05/10/0007530510_001_20260510150512345.jpg"),
    ("article_6.jpg", "https://imgnews.pstatic.net/image/088/2026/05/10/0001009163_001_20260510150534567.jpg"),
    ("article_7.jpg", "https://imgnews.pstatic.net/image/014/2026/05/10/0005519230_001_20260510150556789.jpg"),
    ("article_8.jpg", "https://www.mhns.co.kr/news/photo/202205/527018_632948_1057.jpg")
]

base_path = "public/images/news/20260510"

for filename, url in images:
    filepath = os.path.join(base_path, filename)
    try:
        print(f"Downloading {url} to {filepath}...")
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response, open(filepath, 'wb') as out_file:
            out_file.write(response.read())
        print(f"Successfully downloaded {filename}")
    except Exception as e:
        print(f"Error downloading {filename}: {e}")
