from django.db import models
from django.conf import settings

# Create your models here.
class Board(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    title = models.TextField()
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    image = models.ImageField(blank=True,upload_to='')
    video = models.TextField(blank=True)

class Comment(models.Model):
     user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
     content  = models.TextField()
     boards = models.ForeignKey(Board,on_delete=models.CASCADE)
     parent_comment = models.ForeignKey('self', on_delete=models.CASCADE, null=True)
     



