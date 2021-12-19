from django.shortcuts import get_object_or_404, render
from django.contrib.auth import get_user_model

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status


from .serializers import UserInfoSerializer


@api_view(['GET'])
def userinfo(request):
    if request.method == 'GET':
        user = get_user_model().objects.get(id=request.user.id)
        serializer = UserInfoSerializer(user)
        return Response(serializer.data)

@api_view(['GET'])
def userlist(request):
    if request.method == 'GET' and (request.user.authority in [3,5] or request.user.is_superuser):
        # 인증된 회원만이 회원 목록에 들어갈 수 있다.
        users = get_user_model().objects.filter(is_active=1)
        serializer =UserInfoSerializer(users,many=True)
        return Response(serializer.data)

@api_view(['POST'])
def usersearch(request):
    if request.method == 'POST' and (request.user.authority in [3,5] or request.user.is_superuser):
        searchType = request.data['searchType']
        searched = request.data['keyword']
        # 제목 및 내용 및 작성자 검색
        if searchType =='아이디':
            users = get_user_model().objects.filter(username__contains=searched)
        elif searchType =='이름':
            users = get_user_model().objects.filter(fullname__contains=searched)

        serializers = UserInfoSerializer(users, many=True)
        return Response(serializers.data)

@api_view(['POST'])
def confirm(request):
    manager = get_user_model().objects.get(authority=3)
    confirm_name = request.data.get('username')
    confirm_pass = request.data.get('password')
    if manager.username!=confirm_name:
        return Response('회장님 아이디가 틀렸습니다.',status=status.HTTP_400_BAD_REQUEST)
    if not manager.check_password(confirm_pass):
        return Response('회장님 비밀번호가 틀렸습니다.',status=status.HTTP_400_BAD_REQUEST)
    return Response({'Success':True},status=status.HTTP_200_OK)

@api_view(['POST'])
def changeaccountant(request):
    currentAccountant = request.data.get('current')
    futureAccountant = request.data.get('future')
    fa = get_user_model().objects.get(pk=futureAccountant['id'])
    fa.authority = 2
    fa.save()
    ca = get_user_model().objects.get(pk=currentAccountant['id'])
    ca.authority = 4
    ca.save()
    return Response({'Success':True},status=status.HTTP_200_OK)

@api_view(['POST'])
def cancelaccountant(request):
    cancelAccountant = request.data.get('cancel')
    ca = get_user_model().objects.get(pk=cancelAccountant['id'])
    ca.authority = 1
    ca.save()
    return Response({'Success':True},status=status.HTTP_200_OK)

@api_view(['POST'])
def changemanager(request):
    currentManager = request.data.get('current')
    futureManager = request.data.get('future')
    fa = get_user_model().objects.get(pk=futureManager['id'])
    fa.authority = 3
    fa.save()
    ca = get_user_model().objects.get(pk=currentManager['id'])
    ca.authority = 5
    ca.save()
    return Response({'Success':True},status=status.HTTP_200_OK)

@api_view(['POST'])
def cancelmanager(request):
    cancelManager = request.data.get('cancel')
    ca = get_user_model().objects.get(pk=cancelManager['id'])
    ca.authority = 1
    ca.save()
    return Response({'Success':True},status=status.HTTP_200_OK)

@api_view(['GET'])
def userwaitlist(request):
    if request.method == 'GET' and (request.user.authority in [3,5] or request.user.is_superuser):
        users = get_user_model().objects.filter(is_active=0,authority=1)
        serializer = UserInfoSerializer(users,many=True)
        return Response(serializer.data)

@api_view(['PUT','DELETE'])
def userapprove(request,user_pk):
    user = get_object_or_404(get_user_model(),pk=user_pk)
    if request.method == 'PUT' and (request.user.authority in [3,5] or request.user.is_superuser):
        user.is_active = 1
        user.save()
        return Response({'Success':True},status=status.HTTP_200_OK)
    elif request.method == 'DELETE' and (request.user.authority in [3,5] or request.user.is_superuser):
        user.delete()
        data = {
            'delete': f'데이터 {user_pk}번이 삭제되없습니다.',
        }
        return Response(data,status=status.HTTP_204_NO_CONTENT)