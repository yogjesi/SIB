from django.urls import path
from . import views

urlpatterns = [
    # 요금청구 글 전체 조회
    path('outcome/',views.outcome),
    # 요금 청구 글 단일 상세 조회 및 수정, 삭제
    path('outcome/<int:pk>/',views.outcome_detail),
    # change_state : 요금 청구 승인 상태 변경
    path('outcome/change_state/<int:pk>/',views.change_state),
    # outcome_comment : 특정 요금 청구글의 댓글 전체 조회
    path('outcome/<int:pk>/outcome_comment/',views.outcome_comment),
    # outcome_comment_update_delete : 특정 요금 청구글의 특정 댓글 수정 및 삭제
    path('outcome/<int:comment_pk>/outcome_comment_update_delete/',views.outcome_comment_update_delete),
    
]
