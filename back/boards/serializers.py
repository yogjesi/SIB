from rest_framework import serializers
from .models import Bible, Board,Comment
from django.contrib.auth import get_user_model


class BoardListSerializer(serializers.ModelSerializer):
    class UserSerializer(serializers.ModelSerializer):
        class Meta:
            model = get_user_model()
            fields = ('id','fullname','username',)
    user= UserSerializer(read_only=True)
    class Meta:
        model = Board
        fields = ('id','title','created_at','user','hits')


class BoardSerializer(serializers.ModelSerializer):
    class UserSerializer(serializers.ModelSerializer):
        class Meta:
            model = get_user_model()
            fields = ('id','fullname','username',)
    user= UserSerializer(read_only=True)
    class Meta:
        model = Board
        fields = '__all__'

class CommentSerializer(serializers.ModelSerializer):
    class UserSerializer(serializers.ModelSerializer):
        class Meta:
            model = get_user_model()
            fields = ('id','fullname','username',)
    user= UserSerializer(read_only=True)
    class Meta:
        model = Comment
        fields = '__all__'
        read_only_fields = ('boards',)

class BibleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bible
        fields = '__all__'