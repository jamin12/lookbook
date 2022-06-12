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
from models import get_tags_name

IMG_DIR = "./lookbook_backend/machinelearning/img/"

router = APIRouter()

@router.get("/tags",response_model=List[get_tags_name])
async def get_tages(session : Session = Depends(db.session)):
    return ["test1","test2","test3","test4"]
