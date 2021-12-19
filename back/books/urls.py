from django.urls import path
from . import views

urlpatterns = [
    path('outcome/',views.outcome),
    path('outcome/<int:pk>',views.outcome_detail),
    # change_state
    path('outcome/change_state/<int:pk>',views.change_state),

]
