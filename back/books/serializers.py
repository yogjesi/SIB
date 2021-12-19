from django.db.models import fields
from rest_framework import serializers
from .models import Outcome,Outcomecomment
from django.contrib.auth import get_user_model

class OutcomeSerializer(serializers.ModelSerializer):
    class UserSerializer(serializers.ModelSerializer):
        class Meta:
            model = get_user_model()
            fields = ('id','fullname','username',)
            
    user= UserSerializer(read_only=True)
    class Meta:
        model = Outcome
        fields = ('id','title','created_at','user','state',)

class OutcomeDetailSerializer(serializers.ModelSerializer):
    class UserSerializer(serializers.ModelSerializer):
        class Meta:
            model = get_user_model()
            fields = ('id','fullname','username',)
            
    user= UserSerializer(read_only=True)
    class Meta:
        model = Outcome
        fields = '__all__'

class OutcomeCommentSerializer(serializers.ModelSerializer):
    class UserSerializer(serializers.ModelSerializer):
        class Meta:
            model = get_user_model()
            fields = ('id','fullname','username',)
            
    user= UserSerializer(read_only=True)
    class Meta:
        model = Outcomecomment
        fields = '__all__'