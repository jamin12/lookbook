from dataclasses import dataclass
from os import path, environ
import socket

base_dir = path.dirname(path.dirname(path.dirname(path.abspath(__file__))))
ipaddr = list(socket.gethostbyname(socket.gethostname()))
while True:
    if ipaddr[-1] == '.':
        break
    ipaddr.pop()
@dataclass
class Config:
    """
    기본 Configuration
    """
    BASE_DIR = base_dir
    DB_POOL_RECYCLE: int = 900
    DB_ECHO: bool = True
    TEST_MODE: bool = False
    DEBUG = False


@dataclass
class LocalConfig(Config):
    """
    개발 모드
    """
    DB_URL: str = f"mysql+pymysql://root:wzqxec951@127.0.0.1:3306/lookbook?charset=utf8mb4"
    
    TRUSTED_HOSTS = ["*"]
    ALLOW_SITE = ["*"]  
    DEBUG = True


@dataclass
class ProdConfig(Config):
    """
    사용자 모드
    """
    DB_URL: str = "mysql+pymysql://root:1234@%:3306/wavelog?charset=utf8mb4"
    TRUSTED_HOSTS = ["*"]
    ALLOW_SITE = ["*"]


@dataclass
class TestConfig(Config):
    """
    테스트 모드
    """
    DB_URL: str = "mysql+pymysql://root:1234@%:3306/wavelog?charset=utf8mb4"
    TRUSTED_HOSTS = ["*"]
    ALLOW_SITE = ["*"]
    TEST_MODE: bool = True
    DEBUG = True


def conf():
    """
    환경 불러오기
    :return:
    """
    config = dict(prod=ProdConfig, local=LocalConfig, test=TestConfig)
    return config[environ.get("API_ENV", "local")]()