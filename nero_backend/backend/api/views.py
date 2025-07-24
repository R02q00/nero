from .serializers import RegisterSerializer
from .serializers import UserProfileSerializer

from django.contrib.auth.models import User
from django.contrib.auth import get_user_model

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics, permissions
from rest_framework import status

from social_django.utils import psa
import requests

class UsersView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer


class UserProfileView(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserProfileSerializer

    def get_object(self):
        return self.request.user
    

class GoogleAuth(APIView):
    @psa()
    def post(self, request):
        if 'access_token' not in request.data:
            return Response(
                {'error': 'Access token is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        access_token = request.data['access_token']

        try:
            user_info = requests.get('https://www.googleapis.com/oauth2/v3/userinfo', params={'access_token': access_token},
                timeout=10
            ).json()

            if 'error' in user_info:
                return Response(
                    {'error': 'Invalid Google token', 'details': user_info['error']},
                    status=status.HTTP_401_UNAUTHORIZED
                )

            User = get_user_model()
            email = user_info.get('email')
            
            if not email:
                return Response(
                    {'error': 'Email is required from Google'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            user, created = User.objects.get_or_create(
                email=email,
                defaults={
                    'username': email.split('@')[0],
                    'first_name': user_info.get('given_name', ''),
                    'last_name': user_info.get('family_name', ''),
                    'is_active': True
                }
            )
            refresh = RefreshToken.for_user(user)

            return Response({
                'access': str(refresh.access_token),
                'refresh': str(refresh),
                'user': {
                    'id': user.id,
                    'email': user.email,
                    'first_name': user.first_name,
                    'last_name': user.last_name,
                    'is_new': created
                }
            })

        except requests.Timeout:
            return Response(
                {'error': 'Google API timeout'},
                status=status.HTTP_504_GATEWAY_TIMEOUT
            )
        except Exception as e:
            return Response(
                {'error': 'Internal server error', 'details': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )