# file: backend/urls.py

from django.conf.urls import url, include
from django.contrib import admin

urlpatterns = [
    #API URL
    url(r'^admin/', admin.site.urls),
    url(r'^api/', include('api.urls', namespace='api', app_name='api')),
]
