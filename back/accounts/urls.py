from django.urls import path
from . import views

from rest_framework_jwt.views import obtain_jwt_token

urlpatterns = [
    # jwt 유효토큰
    path('api-token-auth/',obtain_jwt_token),
]

