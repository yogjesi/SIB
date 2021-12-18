from django.contrib import admin
from django.urls import path,include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/',include('accounts.urls')),
    path('boards/',include('boards.urls')),
    path('books/',include('books.urls')),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# 업로드 된 파일의 URL == settings.MEDIA_URL
# 위 URL 을 통해 참조하는 파일의 실제 위치 == settings.MEDIA_ROOT
