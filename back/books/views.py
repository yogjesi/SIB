from django.shortcuts import get_object_or_404,get_list_or_404
from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import Outcome
from .serializers import OutcomeSerializer,OutcomeDetailSerializer

# Create your views here.
@api_view(['GET','POST'])
def outcome(request):
    if request.method == 'GET':
        outcomes = Outcome.objects.all().order_by('-pk')
        serializer = OutcomeSerializer(outcomes, many=True)
        return Response(serializer.data)

     # 길드 생성
    elif request.method == 'POST':
        serializer = OutcomeDetailSerializer(data=request.data)
        print(serializer)
        if serializer.is_valid(raise_exception=True):
            outcome = serializer.save(user=request.user)       
            outcome.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)
    

@api_view(['GET','PUT'])
def outcome_detail(request,pk):
    outcome = get_object_or_404(Outcome,pk=pk)
        
    if request.method == 'GET':
        serializer = OutcomeDetailSerializer(outcome)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = OutcomeDetailSerializer(outcome, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)

@api_view(['PUT'])
def change_state(request,pk):

    if request.method == 'PUT':
        outcome = get_object_or_404(Outcome,pk=pk)
        statenum = request.data.get('state')
        outcome.state = statenum
        outcome.save()
        serializer = OutcomeDetailSerializer(outcome)
        return Response(serializer.data)
