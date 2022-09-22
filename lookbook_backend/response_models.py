from typing import List
from pydantic.main import BaseModel


class res_tags_name(BaseModel):
    tag_name : List[str] = None


class get_predict_age(BaseModel):
    predict_age : list = None

class res_imgs(BaseModel):
    imgs : List[str] = None