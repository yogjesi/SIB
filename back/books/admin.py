from django.contrib import admin
from .models import Income, Outcome,Outcomecomment

# Register your models here.

admin.site.register(Income)
admin.site.register(Outcome)
admin.site.register(Outcomecomment)