import numpy as np
from PIL import Image
import matplotlib.pyplot as plt

img : Image = Image.open("D:/K-Fashion/Validation/myorigindata/casual/street/390.jpg")
imgArray : np.ndarray = np.array(img)
imgArray_2d = imgArray.reshape(-1,800*800)

plt.imshow(imgArray,cmap='gist_rainbow_r')
plt.show()