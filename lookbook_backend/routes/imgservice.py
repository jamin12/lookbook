from os import path as op
import os
import secrets
from sys import path as sp
from typing import List

sp.append(op.dirname(op.dirname(__file__)))

from fastapi import UploadFile,File,APIRouter
from fastapi.responses import FileResponse,JSONResponse
from utils.date_utils import  D
from machinelearning import face_recognize
from utils import imgtobytes
from PIL import Image

IMG_DIR = "./lookbook_backend/machinelearning/img/"

router = APIRouter()

@router.post("/uploadimg")
async def uploadImg(in_files: List[UploadFile] = File(...)):
    file_urls = ''
    for file in in_files:
        currentTime = D.datetime().strftime("%Y%m%d%H%M%S")
        saved_file_name = ''.join([currentTime,secrets.token_hex(16),".jpg"])
        file_location = os.path.join(IMG_DIR,saved_file_name)
        with open(file_location,"wb+") as f:
            f.write(file.file.read())
        file_urls = saved_file_name
    predict_value = await face_recognize.getPredict(file_urls)
    result : dict = {"predict img" : predict_value}
    return result

@router.get("/results")
async def resultPage():
    img_list = []
    for i in range(1,3):
        img_url = IMG_DIR + f'test{i}.jpg'
        img = Image.open(img_url)
        # img.show('img',img)
        img_converted = await imgtobytes.from_image_to_bytes(img)
        img_list.append(img_converted)
    print(img_list)
    return JSONResponse(img_list)
