from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    fullname = models.TextField()
    email = models.EmailField()
    # 회원: 0, 회계: 1, 회장: 2    	
    authority = models.IntegerField()
