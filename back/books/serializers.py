from django.db import models
from rest_framework import serializers
from .models import Income, Outcome, Outcomecomment
from django.contrib.auth import get_user_model


# book을 사용하는 페이지 : 
# 1. 수입 입력 페이지
# 2. 요금 청구 게시판
# 3. 장부 확인 페이지



# 1-1. 수입 목록 조회
class IncomeListSerializer(serializers.ModelSerializer):
    # class UserSerializer(serializers.ModelSerializer):
    #     class Meta:
    #         model = get_user_model()
    #         fields = ('id', 'username', 'fullname',)
    # user = UserSerializer(read_only=True)
    class Meta:
        model = Income
        fields = ('id', 'category', 'title', 'money', 'datetime',)


# 1-2. 수입 디테일 페이지에서 쓰면 되는 거!
class IncomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Income
        fields = '__all__'



# # 2-1. 요금 청구 게시판 목록 조회할 때 쓰면 되는 거
# class OutcomeListSerializer(serializers.ModelSerializer):
#     class UserSerializer(serializers.ModelSerializer):
#         class Meta:
#             model = get_user_model()
#             fields = ('id','username','fullname',)
#     user = UserSerializer(read_only=True)
#     class Meta:
#         model = Outcome
#         fields = ('id', 'category', 'title', 'datetime', 'user', 'state')


# # 2-2. 요금 청구 디테일 페이지에서 쓰면 되는 거
# class OutcomeSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Outcome
#         fields = '__all__'


# # 2-3. 요금 청구 디테일 페이지 안에서 댓글 달 때
# class OutcomeCommentSerialzer(serializers.ModelSerializer):
#     class UserSerializer(serializers.ModelSerializer):
#         class Meta:
#             model = get_user_model()
#             fields = ('id', 'fullname', 'username',)
#     user = UserSerializer(read_only=True)
#     class Meta:
#         model = Outcomecomment
#         fields = '__all__'
#         read_only_fields = ('outcome',)


# # 3. 장부 확인 페이지에서 쓰라고 만든 거
# # 일단은 지출 위주로 올리고 인컴에서 필요한 거 가져오는...?후..
# class BookSerializer(serializers.ModelSerializer):
#     class IncomeSerializer(serializers.ModelSerializer):
#         class Meta:
#             model = Income
#             fields = '__all__'
#     income = IncomeSerializer(read_only=True)
#     # class OutcomeSerializer(serializers.ModelSerializer):
#     #     class Meta:
#     #         models = Outcome
#     #         fields = '__all__'
#     # outcome = OutcomeSerializer(read_only=True)
#     class Meta:
#         model = Outcome
#         fields = ('income',)

