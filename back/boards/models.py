from django.db import models
from django.conf import settings
from datetime import datetime

def boards_image_path(instance,filename):
    d = datetime.now()
    return f'boards/images/{instance.user.pk}/{d.year}/{d.month}{d.day}_{filename}'

class Board(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    title = models.TextField()
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    image = models.ImageField(null=True,blank=True,upload_to=boards_image_path)
    video = models.TextField(blank=True)
    hits = models.PositiveBigIntegerField(default=0)
    

class Comment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    content  = models.TextField()
    boards = models.ForeignKey(Board,on_delete=models.CASCADE,related_name='comments')
    

class Bible(models.Model):
    index = models.CharField(max_length=10)
    content = models.TextField()
    

