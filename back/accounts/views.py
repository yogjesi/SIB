from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model

from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework import status
from rest_framework.permissions import AllowAny



from .serializers import UserInfoSerializer,UserSerializer
from rest_framework_jwt.views import obtain_jwt_token

#회원가입을 위한 것
@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        user = serializer.save()
        # 비밀번호는 set_password를 통해 집어넣어주어야한다.(암호화를 위해서)
        user.set_password(request.data.get('password'))
        # 비활성화 및 일반회원 등록 후 save
        user.is_active = 0
        user.authority = 1
        user.save()
        return Response(serializer.data,status=status.HTTP_201_CREATED)

# 2.로그인 유효성 검사: 로그인이 유효한지 검색하기 위한 view, 이를 통과하면 token 을 얻는 url 로 연결할 것
@api_view(['POST'])
# 아직 토큰을 얻지 못했으므로 AllowAny 로 설정해준다.
@permission_classes([AllowAny])
def login(request):
    # 1. Client 에서 온 데이터를 받기
    username = request.data.get('username')
    password = request.data.get('password')
    # 1-1. 데이터 입력이 이루어지지 않았다면, 빈칸이라고 alert 를 보내자.
    if not username:
        return Response({'Success':False,'error':'아이디를 입력해주세요.'},status=status.HTTP_200_OK)
    # 1-2. 데이터베이스에 없는 아이디를 입력했다면,
    if not get_user_model().objects.filter(username=username):
        return Response({'Success':False,'error':'존재하지 않은 아이디입니다.'},status=status.HTTP_200_OK)
    # 1-3. 비밀번호가 빈칸이면 알려주자
    if not password:
        return Response({'Success':False,'error':'비밀번호를 입력해주세요'},status=status.HTTP_200_OK)    
    # 1-4. 아이디를 검색했으니, 그 아이디를 가져와서, password check를 해주자.
    user = get_user_model().objects.get(username=username)
    if not user.check_password(password):
        return Response({'Success':False,'error':'비밀번호가 일치하지 않습니다.'},status=status.HTTP_200_OK)
    # 2. 유효성 검사를 통과했으므로, True를 반환해주어 토큰을 얻자.
    return Response({'Success':True,'is_active':user.is_active},status=status.HTTP_200_OK)

@api_view(['GET'])
def userinfo(request):
    if request.method == 'GET':
        user = get_user_model().objects.get(id=request.user.id)
        serializer = UserInfoSerializer(user)
        return Response(serializer.data)

# 회원가입할 때, 유저 아이디와 이메일 중복 확인을 위한 것
@api_view(['GET'])
@permission_classes([AllowAny])
def userlist(request):
    if request.method == 'GET' :
        # 인증된 회원만이 회원 목록에 들어갈 수 있다 + 회원 가입을 위해 권한을 잠시해제, 유저목록을 불러와 아이디, 이메일 중복 확인을 한다.
        # and (request.user.authority in [3,5] or request.user.is_superuser)
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

@api_view(['DELETE'])
def userdelete(request,user_pk):
    user = get_object_or_404(get_user_model(),pk=user_pk)
    if request.method =='DELETE':
        user.delete()
        data = {
            'delete': f'데이터 {user_pk}번이 삭제되없습니다.',
        }
        return Response(data,status=status.HTTP_204_NO_CONTENT)