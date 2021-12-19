from django.contrib import admin
from .models import Board,Comment


class BoardAdmin(admin.ModelAdmin):
    list_display = ('pk','title','content','created_at','updated_at')



admin.site.register(Board,BoardAdmin)
admin.site.register(Comment)