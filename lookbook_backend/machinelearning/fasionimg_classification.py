import numpy as np
from PIL import Image
import matplotlib.pyplot as plt
import re

imgArray = np.load('street4.npy',allow_pickle=True)
print(imgArray[1].shape)

imgArray_2d = imgArray[0].reshape(1201*800,-1)
print(imgArray_2d.shape)

plt.imshow(imgArray[2],cmap=plt.get_cmap('gray'))
plt.show()