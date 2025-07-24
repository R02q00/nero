from django.urls import path
from .views import UsersView, GoogleAuth, UserProfileView

urlpatterns = [
    path('users/register', UsersView.as_view(), name='register'),
    path('user/profile', UserProfileView.as_view(), name='user-profile'),
    path('auth/google/', GoogleAuth.as_view(), name='google-auth'),
]
