from os import path as op
from sys import path as sp
sp.append(op.dirname(op.dirname(__file__)))
import requests
from utils.date_utils import D
import datetime



class weather:
    current_time : datetime = D.datetime(9)
    current_time_str : str = current_time.strftime("%Y%m%d%H%M%S")
    cdate : str = current_time_str[:8]
    chour : str = current_time_str[8:12]
    url : str = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst'
    params : dict = {'serviceKey' : 'ttElJ0wCcvqA9Jswa44qTqo9vTPOICxYtWBnKjo3wKA5JYES6eBJOVcFI662inzQe6KFga/DJ5TlFXJDTHL7AQ==', 
            'pageNo' : '1', 
            'numOfRows' : '1000', 
            'dataType' : 'JSON', 
            'base_date' : cdate, 
            'base_time' : chour, 
            'nx' : '60',
            'ny' : '127' }

    def __init__(self):
        ...
    
    @classmethod
    def get_temperature(cls):
        res = requests.get(cls.url, params=cls.params)
        res.raise_for_status()
        # print(res.text)
        return res.json()["response"]["body"]["items"]["item"][3]["obsrValue"]



if __name__ == '__main__':
    weather1 = weather.get_temperature()
    weather2 = weather()
    print(weather2.test_method())
    print(weather1)
    # print(weather1.get_temperature())
    