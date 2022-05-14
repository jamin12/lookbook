from os import path as op
from sys import path as sp

sp.append(op.dirname(op.dirname(__file__)))
import uvicorn
from starlette.middleware.cors import CORSMiddleware
from starlette.middleware.base import BaseHTTPMiddleware
from dataclasses import asdict
from fastapi import FastAPI


from common.config import conf
from database.conn import db, Base
from middlewares.token_validator import access_control
from middlewares.trusted_hosts import TrustedHostMiddleware


def create_app():
    """
    앱 합수 실행
    :return:
    """
    c = conf()
    app = FastAPI()
    ## 타입 어노테이션을 지정해야 asdict에 데이터가 들어감...(신기)
    conf_dict = asdict(c)
    db.init_app(app, **conf_dict)

    #테이블 생성
    """
    TODO 임시로 넣은것 더 효율적인 방법 찾아서 다른 곳에다가 넣겠음ㅎ 
    """
    Base.metadata.create_all(db.engine)
    # Base.metadata.drop_all(db.engine)

    # 미들웨어 정의
    app.add_middleware(middleware_class=BaseHTTPMiddleware,
                       dispatch=access_control)
    app.add_middleware(
        CORSMiddleware,
        allow_origins=conf().ALLOW_SITE,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    app.add_middleware(TrustedHostMiddleware,
                       allowed_hosts=conf().TRUSTED_HOSTS,
                       except_path=["/health"])
    return app


app = create_app()

if __name__ == '__main__':
    uvicorn.run("main:app", host='0.0.0.0', port=8080, reload=True)
    