from django.shortcuts import get_object_or_404,get_list_or_404
from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import Outcome
from .serializers import OutcomeSerializer,OutcomeDetailSerializer

# Create your views here.
@api_view(['GET'])
def outcome(request):
    if request.method == 'GET':
        outcomes = Outcome.objects.all().order_by('-pk')
        serializer = OutcomeSerializer(outcomes, many=True)
        return Response(serializer.data)

@api_view(['GET'])
def outcome_detail(request,pk):
    if request.method == 'GET':
        outcome = get_object_or_404(Outcome,pk=pk)
        serializer = OutcomeDetailSerializer(outcome)
        return Response(serializer.data)
