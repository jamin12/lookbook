from os import path as op
from sys import path as sp

sp.append(op.dirname(op.dirname(__file__)))


import cv2
import asyncio
from errors import exceptions as ex

async def traningModel():
    
    # 얼굴 탐지 모델 가중치
    cascade_filename = './lookbook_backend/machinelearning/weightedvalue/haarcascade_frontalface_default.xml'
    # 모델 불러오기
    cascade = cv2.CascadeClassifier(cascade_filename)


    MODEL_MEAN_VALUES = (78.4263377603, 87.7689143744, 114.895847746)

    age_net = cv2.dnn.readNetFromCaffe(
        './lookbook_backend/machinelearning/weightedvalue/deploy_age.prototxt',
        './lookbook_backend/machinelearning/weightedvalue/age_net.caffemodel')

    gender_net = cv2.dnn.readNetFromCaffe(
        './lookbook_backend/machinelearning/weightedvalue/deploy_gender.prototxt',
        './lookbook_backend/machinelearning/weightedvalue/gender_net.caffemodel')

    age_list = ['(???1)','(???2)','(???3)','(19 ~ 24)',
                '(25 ~ 32)','(35 ~ 40)','(???4)','(???5)']
    gender_list = ['Male', 'Female']
    
    return {"cascade": cascade,"age_net": age_net,"gender_net": gender_net,"MODEL_MEAN_VALUES": MODEL_MEAN_VALUES,"age_list": age_list,"gender_list": gender_list}

# 사진 검출기
async def imgDetector(img,
                models:dict):
    
    return_value:str = ''
    # 영상 압축
    img = cv2.resize(img,dsize=None,fx=0.5,fy=0.5,interpolation=cv2.INTER_LINEAR)

    # 그레이 스케일 변환
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY) 
    # cascade 얼굴 탐지 알고리즘 
    results = models["cascade"].detectMultiScale(gray,            # 입력 이미지
                                       scaleFactor= 1.1,# 이미지 피라미드 스케일 factor
                                       minNeighbors=5,  # 인접 객체 최소 거리 픽셀
                                       minSize=(20,20)  # 탐지 객체 최소 크기
                                       )        

    for box in results:

        x, y, w, h = box
        face = img[int(y):int(y+h),int(x):int(x+h)].copy()
        blob = cv2.dnn.blobFromImage(face, 1, (227, 227), models["MODEL_MEAN_VALUES"], swapRB=False)
        
        # gender detection
        models["gender_net"].setInput(blob)
        gender_preds = models["gender_net"].forward()
        gender = gender_preds.argmax()
        # Predict age
        models["age_net"].setInput(blob)
        age_preds = models["age_net"].forward()
        age = age_preds.argmax()
        info = models["gender_list"][gender] +' '+ models["age_list"][age]
        cv2.rectangle(img, (x,y), (x+w, y+h), (255,255,255), thickness=2)
        cv2.putText(img,info,(x,y-15),0, 0.5, (0, 255, 0), 1)
        return_value += info
    return return_value



async def getPredict(imgurl : str) -> list:
    # 이미지 파일
    img = cv2.imread(f'./lookbook_backend/machinelearning/img/{imgurl}')
    if img is None :
        raise ex.APIException(msg="이미지 파일이 없습니다.")
    # 사진 탐지기
    predict_value = await asyncio.gather(imgDetector(img,await traningModel()))
    if predict_value is None or predict_value == ['']:
        raise Exception("예상 값이 없거나 잘못 되었습니다.")
    return predict_value


