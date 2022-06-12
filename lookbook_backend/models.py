from typing import List
from pydantic.main import BaseModel


class get_tags_name(BaseModel):
    tag_name : List[str] = None


class get_predict_age(BaseModel):
    predict_age : list = None

class get_imgs(BaseModel):
    imgs : List[str] = None