from os import path as op
import os
from random import randrange
import secrets
from sys import path as sp
from typing import List

sp.append(op.dirname(op.dirname(__file__)))

from fastapi import Request, UploadFile,File,APIRouter
from fastapi.responses import FileResponse,JSONResponse
from utils.date_utils import  D
from machinelearning import face_recognize
from utils.weather import weather
from PIL import Image
import response_models as res_m
import request_models as req_m

IMG_DIR = "./lookbook_backend/machinelearning/img/"

router = APIRouter()

@router.post("/uploadimg")
async def uploadImg(in_files: List[UploadFile] = File(...)):
    file_urls = ''
    for file in in_files:
        currentTime = D.datetime().strftime("%Y%res_m%d%H%M%S")
        saved_file_name = ''.join([currentTime,secrets.token_hex(16),".jpg"])
        file_location = os.path.join(IMG_DIR,saved_file_name)
        with open(file_location,"wb+") as f:
            f.write(file.file.read())
        file_urls = saved_file_name
    predict_value = await face_recognize.getPredict(file_urls)
    result : dict = {"predict img" : predict_value}
    return result

@router.post("/result",response_class=FileResponse)
async def resultPage(request: Request,style_info : req_m.req_result_info):
    season : str = ""
    temp : str = weather.get_temperature()
    if float(temp) > 5 and float(temp) < 20:
        season = "봄/가을"
    elif float(temp) >= 20 and float(temp) < 30:
        season = "여름"
    elif float(temp) < 5:
        season = "겨울"
    img_list = os.listdir(IMG_DIR)
    return ''.join([IMG_DIR,img_list[randrange(0,len(img_list))]])