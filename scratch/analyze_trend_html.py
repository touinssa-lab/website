import os
from bs4 import BeautifulSoup
import json

def extract_trends(file_path):
    if not os.path.exists(file_path):
        return None
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    soup = BeautifulSoup(content, 'html.parser')
    
    results = {
        'top_queries': [],
        'rising_queries': []
    }
    
    # Looking for table rows or specific structures in Google Trends HTML
    # Usually they are in divs with class or inside specific labels
    # Let's look for text and its siblings
    
    # Try finding by text "상위" and "급상승"
    labels = soup.find_all(text=lambda t: "상위" in t or "급상승" in t)
    
    # This might be tricky because the HTML structure of Trends is complex (React/Angular based)
    # Often the data is in a JS variable.
    
    # Let's try to find all text items that look like keywords
    # A keyword usually has a rank number or is in a list item.
    
    # Fallback: Extract from the 1. 관광 ... 2. ... pattern if visible
    # Or look for widgets.
    
    # Actually, I'll just print a chunk of the file to see the structure
    return content[:10000]

# Testing with Web file
web_path = r"D:\뉴프로젝트\투어리즘인사이트\홈페이지_리뉴얼\Trend_source\2026_05_05_Tourism_Web.html"
with open(web_path, 'r', encoding='utf-8') as f:
    html = f.read()

# Google Trends data is often in window.AF_initDataCallback or similar
# Let's look for keywords in the text
import re

def parse_trends_html(html):
    # Find patterns like 1. [Keyword]
    # Or looking for the specific div structure
    # In the screenshot, keywords are in a list.
    
    # Let's search for "상위 검색어" and see what follows
    # Actually, the user's screenshot shows the keywords in a table-like view.
    
    # Let's use a regex to find the keywords from the initData
    # Keywords are often quoted strings
    
    keywords = []
    # Search for common tourism keywords in Korea to find where they are
    # e.g. "관광 버스", "서울 관광 코스"
    
    # Just list all <li> or <div> contents that might be keywords
    # Or better, look for the text in the soup
    soup = BeautifulSoup(html, 'html.parser')
    
    # Try to find the tables
    # "상위 검색어" is likely in a <div> header
    
    data = {"top": [], "rising": []}
    
    # Finding elements that contain "상위 검색어"
    top_header = soup.find(text=re.compile("상위 검색어"))
    if top_header:
        # Look for following list items
        parent = top_header.find_parent('div')
        if parent:
            items = parent.find_all(text=re.compile(r"^\s*\d+\s*$")) # Ranks
            # This is hard. Let's just find all text that follows ranks.
    
    return "HTML length: " + str(len(html))

# I will just use a more direct approach: find all text that looks like a search term list
# Search terms usually appear together in the data.

print(parse_trends_html(html))
