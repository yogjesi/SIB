from django.db.models import fields
from rest_framework import serializers
from .models import Outcome
from django.contrib.auth import get_user_model

class OutcomeSerializer(serializers.ModelSerializer):
    class UserSerializer(serializers.ModelSerializer):
        class Meta:
            model = get_user_model()
            fields = ('id','fullname','username',)
            
    user= UserSerializer(read_only=True)
    class Meta:
        model = Outcome
        fields = ('id','content','created_at','user','state',)

class OutcomeDetailSerializer(serializers.ModelSerializer):
    class UserSerializer(serializers.ModelSerializer):
        class Meta:
            model = get_user_model()
            fields = ('id','fullname','username',)
            
    user= UserSerializer(read_only=True)
    class Meta:
        model = Outcome
        fields = '__all__'