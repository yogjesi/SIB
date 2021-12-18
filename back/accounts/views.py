from rest_framework import status
# from .serializers import UserSerializer

from django.shortcuts import get_list_or_404, get_object_or_404
from django.contrib.auth import get_user_model


from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status

from .models import User


@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request):
    username = request.data.get('username')
    try:
        user = get_user_model().objects.get(username=username)
        return Response({'err':'이미 등록된 username입니다.'})
    except:
        data = request.data
        user = User.objects.create(first_name=data['first_name'], last_name=data['last_name'], 
        password=data['password'], username=data['username'], email=data['email'], fullname=data['fullname'])
        user.set_password(request.data.get('password'))
        user.is_active = 0
        user.authority = 1
        user.save()
        return Response({'msg':'success'}, status=status.HTTP_201_CREATED)