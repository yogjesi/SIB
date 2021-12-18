from django.db import models
from django.conf import settings
from datetime import date

def boards_image_path(instance,filename):
    d = date.fromordinal(730920)
    return f'boards/images/{d.strftime("%yy%m%d")}/{instance.user.pk}/{filename}'

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
    



