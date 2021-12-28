from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    fullname = models.TextField()
    email = models.EmailField()
    # 회원: 0, 승인회원:1, 회계: 2, 회장: 3    	
    authority = models.IntegerField(default=0)
    introduce = models.TextField()