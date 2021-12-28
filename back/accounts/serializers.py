from rest_framework import serializers
from django.contrib.auth import get_user_model


class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('id','fullname','username','introduce','email','is_superuser','is_active','authority')

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = get_user_model()
        fields = ('fullname','username','introduce','email','password',)