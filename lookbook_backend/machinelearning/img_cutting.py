from importlib.metadata import files
import multiprocessing
from PIL import Image
from matplotlib import pyplot as plt
import json
import cv2
from multiprocessing import Process, Queue
import os

BASE_LABEL_URL = "D:/K-Fashion/Validation/mylabelingdata"
BASE_IMG_URL = "D:/K-Fashion/Validation/myorigindata"


def img_cut(*title):
    # title = "캐주얼"
    title = ''.join(title)
    filenames = os.listdir(BASE_LABEL_URL + f"/{title}")

    for filename in filenames :
        subdic = BASE_LABEL_URL + f"/{title}/{filename}"
        imgnames = os.listdir(subdic)

        for image in imgnames:
            with open(subdic+f'/{image}', 'r', encoding='utf-8') as f:
                json_object = json.load(f)
            test = json_object["데이터셋 정보"]['데이터셋 상세설명']['렉트좌표']
            ract_x = []
            ract_y = []
            ract_xrang = []
            # x좌표중에서 최소값 최대값을 구해야함
            for key in test:
                for key2 in test[key]:
                    # print(key2)
                    for key3 in key2:
                        if key3 == 'X좌표':
                            ract_x.append(key2[key3])
                        elif key3 == 'Y좌표':
                            ract_y.append(key2[key3])
                        elif key3 == '가로':
                            ract_xrang.append(key2[key3])
            if not ract_x:
                continue
            # 최댓값 뽑아내기
            x = min(ract_x)
            y = min(ract_y)
            x_leng = max(ract_xrang)
            # print(x, y, x_leng)
            img = Image.open(
                BASE_IMG_URL+f"/{title}/{filename}/{image.split('.')[0]}.jpg")
            # print(img.size)
            area = (x, y, x+x_leng, 1049)
            img_crop = img.crop(area)
            area = (1, 1, 1049, 1049)
            img_crop = img_crop.crop(area)
            # plt.imshow(img_crop)
            # plt.show()
            try :
                if not os.path.exists(f"D:/K-Fashion/CuttingImg/{title}/{filename}"):
                    os.makedirs(f"D:/K-Fashion/CuttingImg/{title}/{filename}")
                    
                img_crop.save(f"D:/K-Fashion/CuttingImg/{title}/{filename}/{image.split('.')[0]}.jpg", 'JPEG')
            except OSError:
                print("ERROR: 디렉토리 생성에 실패했습니다.")
            print("이미지 생성 완료")

if __name__ == '__main__':
    folder_list : list = os.listdir(BASE_IMG_URL)
    procs : list = []

    for folder in folder_list:
        p = multiprocessing.Process(target=img_cut, args=(folder))
        p.start()
        procs.append(p)

    for p in procs:
        p.join()
