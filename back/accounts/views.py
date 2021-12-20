from rest_framework import status
# from .serializers import UserSerializer

from django.shortcuts import get_list_or_404, get_object_or_404,render,redirect,HttpResponse
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import check_password
from django.contrib import auth

from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status

from .models import User

# 새로 추가하는 메소드
from django.contrib.sites.shortcuts import get_current_site
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_encode,urlsafe_base64_decode
from django.utils.encoding import force_bytes
from django.core.mail import EmailMessage
from .tokens import account_activation_token
from django.utils.encoding import force_bytes, force_text

@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request):
    if request.method == "POST":
        # username = request.POST.get('username')
        # try:
        #     user = get_user_model().objects.get(username=username)
        #     return Response({'err':'이미 등록된 username입니다.'})
        # except:
        #     data = request.data
        #     user = User.objects.create(
        #         first_name=data['first_name'], 
        #         last_name=data['last_name'], 
        #         password=data['password'], 
        #         username=data['username'], 
        #         email=data['email'], 
        #         fullname=data['fullname']
        #     )
        #     user.set_password(request.data.get('password'))
        #     print(request.data)

        user = User.objects.create(
            username=request.POST.get("username"),
            fullname = request.POST.get("fullname"),
            password=request.POST.get("password"), 
            email=request.POST.get("email")
        )
        user.set_password=request.POST.get("password"),
        user.is_active = False
        user.save()

        current_site = get_current_site(request) 
        # localhost:8000
        message = render_to_string('account/user_activate_email.html',                         {
            'user': user,
            'domain': current_site.domain,
            'uid': urlsafe_base64_encode(force_bytes(user.pk)).encode().decode(),
            'token': account_activation_token.make_token(user),
        })

        mail_subject = "[SOT] 회원가입 인증 메일입니다."
        user_email = user.email
        email = EmailMessage(mail_subject, message, to=[user_email])
        email.send()
        return HttpResponse(
            '<div style="font-size: 40px; width: 100%; height:100%; display:flex; text-align:center; '
            'justify-content: center; align-items: center;">'
            '입력하신 이메일<span>로 인증 링크가 전송되었습니다.</span>'
            '</div>'
        )
    return Response({'Success':'send email'},status=status.HTTP_201_CREATED)
    # return Response({'Fail':'Wrong password'},status=status.HTTP_401_UNAUTHORIZED)

def activate(request, uid64, token):

    uid = force_text(urlsafe_base64_decode(uid64))
    user = User.objects.get(pk=uid)

    if user is not None and account_activation_token.check_token(user, token):
        user.is_active = True
        user.save()
        auth.login(request, user)
        return redirect('account:home')
    else:
        return HttpResponse('비정상적인 접근입니다.')

# @api_view(['POST'])
# @permission_classes([AllowAny])
# def signup(request):
#     username = request.data.get('username')
#     try:
#         user = get_user_model().objects.get(username=username)
#         return Response({'err':'이미 등록된 username입니다.'})
#     except:
#         data = request.data
#         user = User.objects.create(first_name=data['first_name'], last_name=data['last_name'], 
#         password=data['password'], username=data['username'], email=data['email'], fullname=data['fullname'])
#         user.set_password(request.data.get('password'))
#         user.is_active = 0
#         user.authority = 1
#         user.save()
#         return Response({'msg':'success'}, status=status.HTTP_201_CREATED)