from django.urls import path
from . import views

urlpatterns = [
    path('outcome/',views.outcome),
    path('outcome/<int:pk>',views.outcome_detail),
]
