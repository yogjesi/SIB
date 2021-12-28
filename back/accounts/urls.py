from django.urls import path
from . import views

from rest_framework_jwt.views import obtain_jwt_token

urlpatterns = [
    # 회원가입
    path('signup/',views.signup),
    # 로그인
    path('login/',views.login),
    # jwt 유효토큰
    path('api-token-auth/',obtain_jwt_token),
    # 유저 정보 조회
    path('userinfo/',views.userinfo),
    # 유저 목록 조회
    path('userlist/',views.userlist),
    # 유저 검색
    path('usersearch/',views.usersearch),
    # 매니저 확인
    path('confirm/',views.confirm),
    # 회계 변경
    path('changeaccountant/',views.changeaccountant),
    # 임시 회계 취소
    path('cancelaccountant/',views.cancelaccountant),
    # 회장 변경
    path('changemanager/',views.changemanager),
    # 임시 회장 취소
    path('cancelmanager/',views.cancelmanager),
    # 승인 대기 유저 목록 조회
    path('userwaitlist/',views.userwaitlist),
    # 승인 수락 및 거부
    path('userwait/<int:user_pk>/',views.userapprove),
    # 유저 계정 삭제,
    path('userdelete/<int:user_pk>/',views.userdelete),
]

