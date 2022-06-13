from typing import List
from pydantic.main import BaseModel


class req_result_info(BaseModel):
    tag_title : str = None
    tag_subtitle : str = None
    