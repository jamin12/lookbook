from asyncio import sleep
from typing import List
import numpy as np
from PIL import Image
import os

path_dir : str = "D:/K-Fashion/Validation/myorigindata/casual/street"
img_list : list = os.listdir(path_dir)

img_array : List[np.ndarray] = []
for img in img_list:
    img : Image = Image.open(f"D:/K-Fashion/Validation/myorigindata/casual/street/{img}")
    img_array.append(np.array(img))

# print(img_array)
np.save("./street.npy", img_array)

# print(img_array)
# print("-"*100)
# data = np.load("fruits_300.npy",allow_pickle=True)
# print(data)
