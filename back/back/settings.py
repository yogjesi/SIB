from pathlib import Path
import datetime

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-t#2f0k+0n_fwrn+*e21nma#(-)w_-%j@3)tdh8o5nbct49)fx1'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []

# Application definition
# 반드시 생성(python manage.py startapp) 이후 등록해야한다.
INSTALLED_APPS = [
    # Local apps 우리가 설치한거
    'accounts', # 회원가입, 로그인, 관리자페이지 정보 json
    'books', # income, outcome, 장부 조회 정보 json
    'boards', # 자유게시판 json - 수현꺼 내꼬..My 프레셔스...

    # # Third party apps
    # 'allauth',
    # 'allauth.account',
    # 'allauth.socialaccount',
    # # 구글을 위한 allauth
    # 'allauth.socialaccount.providers.google',
    # # 깃헙을 위한 allauth
    # 'allauth.socialaccount.providers.github',
    'bootstrap5', # bootstrap 적용을 위한 app, 참고사이트: https://django-bootstrap-v5.readthedocs.io/en/latest/
    'django_extensions', # shell_plus 사용을 위한 app
    'imagekit', # 이미지 크기 변경을 위한 쟝고 라이브러리
    'rest_framework',# JSON 으로 데이터 사용하기 위한 라이브러리
    'corsheaders', # CORS 설정을 통해 교차 출저 리소스 공유를 하기 위해서
    'six',    # email 인증
    # Django apps
    'django.contrib.admin',
    # 인증 프레임 워크의 핵심, 기본 모델 포함
    'django.contrib.auth',
    # 사용자가 생성한 모델과 권한 연결 가능하게 함
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sites',
]

# HTTP 요청과 응답 처리 중간에서 작동하는 시스템(Hooks)
# Django는 요청이 들어오면, 미들웨어를 거쳐 URL에 등록되어 있는 VIEW 로 연결해준다.
# HTTP 응답 역시 미들웨어를 거쳐서 내보낸다.
# 데이터 관리, 애플리케이션 서비스, 메시징, 인증 및 API 관리를 담당 한다.
MIDDLEWARE = [
    # corsheaders를 위한 미들웨어
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    # 요청 전반에 걸쳐 세션을 관리
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    # 세션을 사용하여 사용자를 요청과 연결
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# 1. 특정 Origin 만 선택적 허용
# CORS_ALLOWED_ORIGINS = [

# ]

# 2. 모든 Origin 허용
CORS_ALLOW_ALL_ORIGINS = True

ROOT_URLCONF = 'back.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        # base.html 의 위치를 지정함, VUe 사용시 사용 하지 않는다. -> template 역할을 vue가 담당하므로,
        'DIRS': [BASE_DIR/'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                 # `allauth` needs this from django
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'back.wsgi.application'


# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# Password validation
# https://docs.djangoproject.com/en/3.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
# https://docs.djangoproject.com/en/3.2/topics/i18n/

# http://www.i18nguy.com/unicode/language-identifiers.html (국가별 언어 코드 확인)
LANGUAGE_CODE = 'ko-kr'
# https://en.wikipedia.org/wiki/List_of_tz_database_time_zones (국가별 시간 코드 확인)
TIME_ZONE = 'Asia/Seoul'
# Django 의 번역 시스템 활성화 여부
USE_I18N = True
# Django 데이터의 지역화 형식 활성화 여부 , True 일 경우 locale의 형식을 사용하여 숫자와 날짜 표시
USE_L10N = True
# datatimes 가 기본 시간대를 인식하는지 여부 지정, True일 경우 내부적으로 인식된 날짜/ 시간을 사용한다.
USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.2/howto/static-files/

STATIC_URL = '/static/'

# Default primary key field type
# https://docs.djangoproject.com/en/3.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# #Django allauth를 위한 필요 1.
# AUTHENTICATION_BACKENDS = [
#     # Needed to login by username in Django admin, regardless of `allauth`
#     'django.contrib.auth.backends.ModelBackend',
#     # `allauth` specific authentication methods, such as login by e-mail
#     'allauth.account.auth_backends.AuthenticationBackend',
# ]

# STATIC_ROOT 에 정적 파일을 수집
STATIC_ROOT = BASE_DIR/'staticfiles'
# 정적 파일을 참조 할 때 사용할 URL
STATIC_URL = '/static/'
# 추가적인 정적 파일 경로 목록을 정의하는 리스트
STATICFILES_DIRS = [
    BASE_DIR/'static'
]
# 사용자가 업로드 한 파일들을 보관할 디렉토리의 절대 경로, 파일을 저장 X
MEIDA_ROOT = BASE_DIR/'media'
# MEIA_ROOT 에서 제공되는 미디어를 처리하는 URL, STATIC 과 MEDIA는 반드시 다른 경로
MEDIA_URL = '/media/'

# Custon User 모델 정의하기, 모델 위치 변경
AUTH_USER_MODEL = 'accounts.User'

# DRF의 각 view 함수에 대한 default 권한 및 인증 설정
# 회원 인증 여부와 JWT 토큰 인증에 관한 설정
REST_FRAMEWORK = {
    # 함수 시작 시 확인되는 기본 권한을 결정하는 권한 클래스의 목록
    'DEFAULT_PERMISSION_CLASSES': (
        # 인증되지 않은 사용자에 대한 권한 거부, 인증되면 권한 허용
        # 등록된 사용자만 API에 엑세스할 수 있도록 하는 경우에 적합함.
        'rest_framework.permissions.IsAuthenticated',
    ),
    # request.user 속성에 엑세스할 때 사용되는 기본 인증 사용자 집합을 결정
    'DEFAULT_AUTHENTICATION_CLASSES': (
        # 토큰 기반 중 JWT 를 활용하여 JWT 자체를 검증, JWT 유효 여부만 파악한다.
        'rest_framework_jwt.authentication.JSONWebTokenAuthentication',
    ),
}

# 토큰 만료기간 변경
JWT_AUTH ={
    # Token 의 만료기간을 기본 5분에서 6시간으로 연장
    'JWT_EXPIRATION_DELTA': datetime.timedelta(hours=6),
}
#allauh를 위한 거 
SITE_ID = 1


#### email auth #### 

EMAIL_HOST = 'smtp.gmail.com'
# 메일을 호스트하는 서버
EMAIL_PORT = '587'
# gmail과의 통신하는 포트
EMAIL_HOST_USER = 'sibtest438@gmail.com'
# 발신할 이메일
EMAIL_HOST_PASSWORD = 'ssafytest'
# 발신할 메일의 비밀번호
EMAIL_USE_TLS = True
# TLS 보안 방법
DEFAULT_FROM_EMAIL = EMAIL_HOST_USER
# 사이트와 관련한 자동응답을 받을 이메일 주소,'webmaster@localhost'