from os import path as op
import os
import secrets
from sys import path as sp
from typing import List

sp.append(op.dirname(op.dirname(__file__)))

from fastapi import UploadFile,File,APIRouter
from fastapi.responses import FileResponse
from utils.date_utils import  D
from machinelearning import face_recognize

IMG_DIR = "./lookbook_backend/machinelearning/img/"

router = APIRouter()

# @router.get("/tags")
