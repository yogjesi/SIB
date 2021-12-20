from django.urls import path
from . import views

app_name = "books"
urlpatterns = [
    # 1. 수입에 관하여
    # 1-1. 수입 목록 띄우는 페이지 / 수입 입력까지
    path('income/', views.income),
    # 1-2. 수입 디테일 페이지 보기 / 수정 / 삭제까지
    path('income/<int:income_pk>/', views.income_detail),


    # # 2. 요금 청구에 관하여
    # # 2-1. 요금 청구 목록 띄우는 페이지 / 청구서 작성까지
    # path('outcome/', views.outcome),
    # # 2-2. 요금 청구 디테일 페이지 보기 / 수정 / 삭제까지
    # path('outcome/<int:outcome_pk>/', views.outcome_detail),
    # # 2-3. 요금 청구 삭제 가능한지?
    # path('outcome/<int:outcome_pk>/state', views.outcome_state),
    # # 2-4. 요금 청구 글에 대한 댓글 보기 / 작성
    # path('outcome/<int:outcome_pk>/comments/', views.outcome_comment),
    # # 2-5. 요금 청구 글에 대한 댓그 수정 / 삭제
    # path('outcome/<int:outcome_pk>/comments/<int:comment_pk>/', views.outcome_comment_update),


    # 3. 장부 확인에 관하여
    # 3-1. 장부 페이지 보여주기
    # path('show/', views.show),
]
