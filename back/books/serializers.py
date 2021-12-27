
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
        fields = ('id', 'category', 'title', 'in_money', 'datetime',)


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
        fields = ('datetime', 'category', 'title', 'in_money',)

# 3-2. 장부 확인 페이지용 지출
class BookOutcomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Outcome
        fields = ('datetime', 'category', 'title', 'out_money',)



