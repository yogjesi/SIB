from django.db import models
from django.conf import settings

# Create your models here.
class Income(models.Model):
    category = models.CharField(max_length=100)
    title = models.CharField(max_length=100)
    content = models.TextField()
    money = models.DecimalField(max_digits=10,decimal_places=0)
    created_at = models.DateTimeField(auto_now_add=True)
    datetime = models.DateTimeField()

class Outcome(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    category = models.CharField(max_length=100)
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    datetime = models.DateTimeField()
    state = models.IntegerField()
    money = models.DecimalField(max_digits=10,decimal_places=0)
    alarm = models.BooleanField()
    receipt = models.ImageField(upload_to='outcome')

class Outcomecomment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    content = models.TextField()
    outcome = models.ForeignKey(Outcome,on_delete=models.CASCADE)
