from os import path as op
from sys import path as sp

sp.append(op.dirname(op.dirname(__file__)))

import time
import re

import sqlalchemy.exc

from starlette.requests import Request
from starlette.responses import JSONResponse

from utils.date_utils import D
from utils.logger import api_logger
from common.consts import EXCEPT_PATH_LIST, EXCEPT_PATH_REGEX
from common import config
from errors import exceptions as ex
from database.schema import db


async def access_control(request: Request, call_next):
    request.state.req_time = D.datetime()
    request.state.start = time.time()
    #에러 로깅 변수
    request.state.inspect = None
    request.state.user = None
    request.state.service = None

    ip = request.headers[
        "x-forwarded-for"] if "x-forwarded-for" in request.headers.keys(
        ) else request.client.host
    request.state.ip = ip.split(",")[0] if "," in ip else ip
    headers = request.headers
    cookies = request.cookies

    url = request.url.path

    #url 패턴 체크
    if await url_pattern_check(url,
                               EXCEPT_PATH_REGEX) or url in EXCEPT_PATH_LIST:
        response = await call_next(request)
        if url != '/':
            await api_logger(request=request, response=response)
        return response

    try:

        response = await call_next(request)
        await api_logger(request=request, response=response)
    except Exception as e:
        error = await exception_handler(e)
        error_dict = dict(status=error.status_code,
                          msg=error.msg,
                          detail=error.detail,
                          code=error.code)
        response = JSONResponse(status_code=error.status_code,
                                content=error_dict)
        await api_logger(request=request, error=error)
    return response


async def url_pattern_check(path, pattern):
    result = re.match(pattern, path)
    if result:
        return True
    return False


async def exception_handler(error: Exception):
    if isinstance(error, sqlalchemy.exc.OperationalError):
        error = ex.SqlFailureEx(ex=error)
    if not isinstance(error, ex.APIException):
        error = ex.APIException(ex=error, detail=str(error))
    return error

