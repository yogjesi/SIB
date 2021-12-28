from django.urls import path
from . import views
urlpatterns = [
    # 전체 Freeboards 조회,및 생성
    path('',views.board_list_create),
    # 상세 게시글 조회, 수정, 삭제
    path('<int:board_pk>/',views.board_detail_update_delete),
    # 전체 Freeboard 댓글 조회 및 생성
    path('<int:board_pk>/comments/',views.comment_list_create),
    # 상세 Freeboard 수정 및 삭제
    path('comments/<int:comment_pk>/',views.comment_update_delete),
    # Freeboard 검색
    path('search/', views.search),
    # 성경 구절 전송
    path('bibles/',views.bibles),
]
