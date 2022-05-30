import requests
from date_utils import D
import datetime

current_time : datetime = D.datetime(9)
current_time_str : str = current_time.strftime("%Y%m%d%H%M%S")
cdate = current_time_str[:8]
chour = current_time_str[8:12]
url = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst'
params ={'serviceKey' : 'ttElJ0wCcvqA9Jswa44qTqo9vTPOICxYtWBnKjo3wKA5JYES6eBJOVcFI662inzQe6KFga/DJ5TlFXJDTHL7AQ==', 
         'pageNo' : '1', 
         'numOfRows' : '1000', 
         'dataType' : 'JSON', 
         'base_date' : cdate, 
         'base_time' : chour, 
         'nx' : '60', 
         'ny' : '126' }

res = requests.get(url, params=params)
print(res.json()["response"]["body"])