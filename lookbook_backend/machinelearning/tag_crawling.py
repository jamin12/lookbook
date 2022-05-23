from pip import main
import requests
from bs4 import BeautifulSoup, ResultSet


#requests로 접속하는 방법
def into_request(url):
    #유저 에이전트
    headers = {'User-Agent':"user agent"}
    # 사이트 url에 접속 후 Beautifulsoup 객체에 lxml로 저장
    res = requests.get(url,headers = headers)
    res.raise_for_status() # 위에 코드가 이상이 있을 경우 아래 코드 실행 안됨
    soup : BeautifulSoup = BeautifulSoup(res.text,"lxml")
    return soup

if __name__ == '__main__':
    tags : list = []
    for _ in range(10):
        # 무신사 사이트 코디맵 접속
        url : str = f'https://www.musinsa.com/app/codimap/lists?style_type=&tag_no=&brand=&display_cnt=60&list_kind=big&sort=view_cnt&page={_}'
        codi_soup : BeautifulSoup = into_request(url)
        style_list : list = codi_soup.find_all("li",attrs={"class": "style-list-item"})
        # 상세 코디 접속
        for style in style_list:
            view_url : str = style.find("strong")["onclick"]
            sub_str : list = [pos for pos, char in enumerate(view_url) if char == "'"]
            view_url = view_url[sub_str[0] + 1:sub_str[1]]
            codimap_url : str = f"https://www.musinsa.com/app/codimap/views/{view_url}?style_type=&tag_noprint=&brand=&display_cnt=60&list_kind=big&sort=view_cnt&page=1"
            codi_datail_soup : BeautifulSoup = into_request(codimap_url)
            codi_tags : ResultSet = codi_datail_soup.find_all("div",attrs={"class": "ui-tag-list"})
            for codi_tag in codi_tags:
                if codi_tag.get_text() in tags:
                    continue
                tags.append(codi_tag.get_text())
    with open("tags.txt","w") as f:
        for tag in tags:
            f.write(tag)