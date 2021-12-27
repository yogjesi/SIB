
from datetime import datetime
from django.db import models
from django.db.models import fields
from rest_framework import serializers
from .models import Income, Outcome, Outcomecomment
from django.contrib.auth import get_user_model


# book을 사용하는 페이지 : 
# 1. 수입 입력 페이지
# 2. 요금 청구 게시판
# 3. 장부 확인 페이지


# 1. 수입 입력 페이지
# 1-1. 수입 목록 조회
class IncomeListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Income
        fields = ('id', 'category', 'title', 'money', 'datetime',)


# 1-2. 수입 디테일 페이지에서 쓰면 되는 거!
class IncomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Income
        fields = '__all__'



# 2. 요금 청구 게시판
# 2-1. 목록 조회
class OutcomeSerializer(serializers.ModelSerializer):
    class UserSerializer(serializers.ModelSerializer):
        class Meta:
            model = get_user_model()
            fields = ('id','fullname','username',)
            
    user = UserSerializer(read_only=True)
    class Meta:
        model = Outcome
        fields = ('id','title','created_at','user','state',)


# 2-2. 요금 청구 디테일 페이지
class OutcomeDetailSerializer(serializers.ModelSerializer):
    class UserSerializer(serializers.ModelSerializer):
        class Meta:
            model = get_user_model()
            fields = ('id','fullname','username',)
            
    user= UserSerializer(read_only=True)
    class Meta:
        model = Outcome
        fields = '__all__'

# 2-3. 요금 청구 디테일 페이지 > 댓글용 시리얼라이저
class OutcomeCommentSerializer(serializers.ModelSerializer):
    class UserSerializer(serializers.ModelSerializer):
        class Meta:
            model = get_user_model()
            fields = ('id','fullname','username',)
            
    user = UserSerializer(read_only=True)
    class Meta:
        model = Outcomecomment
        fields = '__all__'


# 3. 장부 확인 페이지
# 3-1. 장부 확인 페이지용 수입
class BookIncomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Income
        fields = ('id', 'category', 'title', 'money', 'datetime',)

# 3-2. 장부 확인 페이지용 지출
class BookOutcomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Outcome
        fields = ('id', 'category', 'title', 'money', 'datetime',)


# 시도하고 실패한 것들...ㅠㅠ
# class BookSerializer(serializers.ModelSerializer):
#     class BookIncomeSerializer(serializers.ModelSerializer):
#         class Meta:
#             model = Income
#             fields = ('id', 'category', 'title', 'money', 'datetime',)
#     income = BookIncomeSerializer(read_only=True)
#     class BookOutcomeSerializer(serializers.ModelSerializer):
#         class Meta:
#             model = Outcome
#             fields = ('id', 'category', 'title', 'money', 'datetime',)
#     outcome = BookOutcomeSerializer(read_only=True)
#     class Meta:
#         model = Income, Outcome
#         fields = ('income','outcome',)

# 테스트용
# class BookListSerializer(serializers.ModelSerializer):
#     title = serializers.CharField(max_length=100)
#     category = serializers.CharField(max_length=100)
#     money = serializers.DecimalField(max_digits=10, decimal_places=0)
#     datetime = serializers.DateTimeField()
#     class Meta:
#         model = Income, Outcome
#         fields = ('title','category','money','datetime')

