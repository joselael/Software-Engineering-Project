from django.conf.urls import url
from . import views

urlpatterns = [
    # for example.com/
    url(r'^$', include('main.urls')),
    # for example.com/login
    url(r'^/login/', views.login, name='login'),
    url(r'^/signup/', views.signup, name='signup'),
]
