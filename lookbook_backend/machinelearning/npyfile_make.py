from asyncio import sleep
from typing import List
import numpy as np
from PIL import Image
import os
import multiprocessing

from pip import main

PATH_DIR : str = "D:/K-Fashion/Validation/myorigindata/casual/street"
IMG_LIST : list = os.listdir(PATH_DIR)


def saveNpy(startidx:int, endidx:int):
    img_array : List[np.ndarray] = []
    for idx,img in enumerate(IMG_LIST[startidx:endidx],start=startidx):
        img : Image = Image.open(f"D:/K-Fashion/Validation/myorigindata/casual/street/{img}")
        img_resize = img.resize((800,1201))
        print(idx)
        img_array.append(np.array(img_resize))
    np.save(f"./street{idx}.npy", img_array)


    
if __name__ == '__main__':
    # saveNpy(0, 5)
    procs : list = []
    img_data_len = len(IMG_LIST)//100
    # print(img_data_len)
    for j in range(99):
        for i in range(j,j+2):
            print(i*img_data_len)
            print(i*img_data_len+img_data_len)
            p = multiprocessing.Process(target=saveNpy, args=(i*img_data_len,i*img_data_len+img_data_len,))
            p.start()
            procs.append(p)
            
        for p in procs:
            p.join()
            
# print(img_array)


# print(img_array)
# print("-"*100)
# data = np.load("fruits_300.npy",allow_pickle=True)
# print(data)
