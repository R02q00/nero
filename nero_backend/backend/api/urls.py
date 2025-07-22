from django.urls import path
from .views import RegisterView, GoogleAuth

urlpatterns = [
    path('register', RegisterView.as_view(), name='register'),
     path('api/auth/google/', GoogleAuth.as_view(), name='google-auth'),
]
