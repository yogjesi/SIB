from http.client import ImproperConnectionState
from django.shortcuts import render, get_list_or_404, get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import serializers, status
from .models import Income, Outcome, Outcomecomment
from .serializers import (
    IncomeListSerializer, 
    IncomeSerializer,
    OutcomeSerializer,OutcomeDetailSerializer,OutcomeCommentSerializer
    )

# Create your views here.

# 이거 어떻게 데이터를 가져와야 할 지 그림 좀 그려봐야겠다.
# 1-1
@api_view(['GET', 'POST'])
def income(request):
    if request.method == 'GET':
        incomes = Income.objects.all()
        serializer = IncomeListSerializer(incomes, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = IncomeSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

# 1-2
@api_view(['GET', 'PUT', 'DELETE'])
def income_detail(request, income_pk):
    income = get_object_or_404(Income, pk=income_pk)
    if request.method == 'GET':
        serializer = IncomeSerializer(income)
        return Response(serializer.data)
    if request.method == 'PUT':
        serializer = IncomeSerializer(income, data = request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
    elif request.method == 'DELETE':
        income.delete()
        return Response({'id': income_pk}, status=status.HTTP_204_NO_CONTENT)


# 2-1
# @api_view(['GET', 'POST'])
# def outcome(request):
#     pass


# @api_view(['GET', 'PUT', 'DELETE'])
# def outcome_detail(request, outcome_pk):
#     pass


# def outcome_state(request, outcome_pk):
#     pass


# def outcome_comment(request, outcome_pk):
#     pass


# def outcome_comment_update(request, outcome_pk, comment_pk):
    # pass


# # 3. 장부 확인 페이지 조회
# @api_view(['GET', 'POST'])
# def show(request):
#     incomes = Income.objects.all()
#     income_serializer = BookSerializer(incomes, many=True)
#     # outcomes = Outcome.objects.all()
#     # outcome_serializer = BookSerializer(outcomes, many=True)
#     return Response(income_serializer, status=status.HTTP_200_OK)


# 수진님 코드
# Create your views here.
@api_view(['GET','POST'])
def outcome(request):
    # 요금청구 전체 조회
    if request.method == 'GET':
        outcomes = Outcome.objects.all().order_by('-pk')
        serializer = OutcomeSerializer(outcomes, many=True)
        return Response(serializer.data)

    # 요금청구 생성
    elif request.method == 'POST':
        serializer = OutcomeDetailSerializer(data=request.data)
        print(serializer)
        if serializer.is_valid(raise_exception=True):
            outcome = serializer.save(user=request.user)       
            outcome.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)
    

@api_view(['GET','PUT','DELETE'])
def outcome_detail(request,pk):
    # outcome = get_object_or_404(Outcome,pk=pk)
    outcome = Outcome.objects.get(pk=pk)

    # 요금청구 상세 조회
    if request.method == 'GET':
        serializer = OutcomeDetailSerializer(outcome)
        return Response(serializer.data)

    # 요금청구 수정
    
    elif request.method == 'PUT':
        serializer = OutcomeDetailSerializer(outcome, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
            
    # 요금 청구 삭제
    elif request.method == 'DELETE':
        outcome.delete()
        return Response({ 'delete': f'요금청구 글 {pk}번이 삭제되었습니다.'}, status=status.HTTP_204_NO_CONTENT)

@api_view(['PUT'])
def change_state(request,pk):
    # 요금청구 승인상태 수정
    if request.method == 'PUT':
        outcome = get_object_or_404(Outcome,pk=pk)
        statenum = request.data.get('state')
        outcome.state = statenum
        outcome.save()
        serializer = OutcomeDetailSerializer(outcome)
        return Response(serializer.data)


@api_view(['GET','POST'])
def outcome_comment(request,pk):
    # 요금청구 댓글 전체 조회
    if request.method == 'GET':
        outcome_comments = Outcomecomment.objects.filter(outcome=pk).order_by('-pk')
        serializer = OutcomeCommentSerializer(outcome_comments, many=True)
        return Response(serializer.data)

    # 요금청구 댓글 생성
    elif request.method == 'POST':
        outcome = get_object_or_404(Outcome,pk=pk)
        outcome_comment = Outcomecomment.objects.create(user=request.user,outcome=outcome,content=request.data['content'])

        serializer = OutcomeCommentSerializer(outcome_comment)
        return Response(serializer.data,status=status.HTTP_201_CREATED)


@api_view(['GET','PUT','DELETE'])
def outcome_comment_update_delete(request,comment_pk):
    outcome_comment = get_object_or_404(Outcomecomment,pk=comment_pk)
    # 해당 길드에서 해당 글을 해당 유저가 쓴 글인가
    if request.method == 'GET':
        if outcome_comment.user == request.user:
        # if GuildArticle.objects.filter(pk=article_pk,guild_id=guild_pk).exists():
            return Response({'isMine':True})
        else:
            return Response({'isMine':False})

    # 요금청구 댓글 수정
    elif request.method == 'PUT':
        outcome_comment.content = request.data['content']
        outcome_comment.save()
        serializer = OutcomeCommentSerializer(outcome_comment)
        return Response(serializer.data)

    # 요금청구 댓글 삭제
    elif request.method == 'DELETE':
        outcome_comment.delete()
        return Response({ 'delete': f'댓글 {comment_pk}번이 삭제되었습니다.'}, status=status.HTTP_204_NO_CONTENT)

        # return Response({ 'delete': f'댓글 {comment_pk}번이 삭제되었습니다.'},status=status.HTTP_204_NO_CONTENT)

