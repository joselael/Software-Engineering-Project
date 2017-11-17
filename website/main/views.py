from django.shortcuts import get_object_or_404, render
from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.

def home(request):
    return render(request, 'main/landing.html')

def login(request):
    return render(request, 'main/login.html')

def signup(request):
    return render(request, 'main/signup.html')
