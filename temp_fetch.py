import requests
from bs4 import BeautifulSoup
import json

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
t_url = 'https://search.naver.com/search.naver?where=news&query=관광|여행|항공|호텔&pd=4'
a_url = 'https://search.naver.com/search.naver?where=news&query=AI|인공지능|데이터&pd=4'

def get_news(url):
    res = requests.get(url, headers=headers)
    soup = BeautifulSoup(res.text, 'html.parser')
    articles = []
    for el in soup.select('.news_area')[:6]:
        a = el.select_one('.news_tit')
        articles.append({'title': a.text, 'url': a['href']})
    return articles

res = {'tourism': get_news(t_url), 'ai': get_news(a_url)}
with open('temp_news.json', 'w', encoding='utf-8') as f:
    json.dump(res, f, ensure_ascii=False, indent=2)
print('Done!')
