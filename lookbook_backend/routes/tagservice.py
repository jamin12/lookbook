from os import path as op
import os
import secrets
from sys import path as sp
from typing import List

sp.append(op.dirname(op.dirname(__file__)))

from fastapi import Depends, UploadFile,File,APIRouter
from fastapi.responses import FileResponse
from utils.date_utils import  D
from machinelearning import face_recognize
from sqlalchemy.orm import Session
from database.conn import db
from response_models import res_tags_name
from database.schema import Category

router = APIRouter()

@router.get("/tags/{parents_id}",response_model=res_tags_name)
async def get_tages(parents_id:str,session : Session = Depends(db.session)):
    category_name = Category.filter(parents_id = parents_id).all()
    results : dict = {"tag_name" : [i.category_name for i in category_name]}
    return results
