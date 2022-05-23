from pip import main
import requests
from bs4 import BeautifulSoup
import re

#requests로 접속하는 방법
def into_request(url):
    #유저 에이전트
    headers = {'User-Agent':"user agent"}
    # 사이트 url에 접속 후 Beautifulsoup 객체에 lxml로 저장
    res = requests.get(url,headers = headers)
    res.raise_for_status() # 위에 코드가 이상이 있을 경우 아래 코드 실행 안됨
    soup = BeautifulSoup(res.text,"lxml")
    return soup

if __name__ == '__main__':
    for _ in range(1):
        url = f'https://www.musinsa.com/app/codimap/lists?style_type=&tag_no=&brand=&display_cnt=60&list_kind=big&sort=view_cnt&page={_}'
        soup = into_request(url)
        style_list = soup.find_all("li",attrs={"class": "style-list-item"})
        for style in style_list:
            print(style.find("strong")["onclick"])
        # codimap_url : str = f"https://www.musinsa.com/app/codimap/views/{}?style_type=&tag_noprint=&brand=&display_cnt=60&list_kind=big&sort=view_cnt&page=1"
    