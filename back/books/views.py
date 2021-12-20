from http.client import ImproperConnectionState
from django.shortcuts import render, get_list_or_404, get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .models import Income, Outcome, Outcomecomment
from .serializers import (
    IncomeListSerializer, 
    IncomeSerializer,
    BookSerializer
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