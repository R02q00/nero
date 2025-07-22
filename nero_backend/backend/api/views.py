from rest_framework import generics
from .serializers import RegisterSerializer
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from social_django.utils import psa
import requests

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

class GoogleAuth(APIView):
    @psa()
    def post(self, request):
        access_token = request.data.get('access_token')
        
        try:
            # Vérifier le token avec Google
            user_info = requests.get(
                'https://www.googleapis.com/oauth2/v3/userinfo',
                params={'access_token': access_token}
            ).json()
            
            if 'error' in user_info:
                return Response({'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)
            
            # Créer ou récupérer l'utilisateur
            from django.contrib.auth import get_user_model
            User = get_user_model()
            
            user, created = User.objects.get_or_create(
                email=user_info['email'],
                defaults={
                    'username': user_info.get('email', '').split('@')[0],
                    'first_name': user_info.get('given_name', ''),
                    'last_name': user_info.get('family_name', ''),
                }
            )
            
            # Générer un token JWT pour l'utilisateur
            from rest_framework_simplejwt.tokens import RefreshToken
            refresh = RefreshToken.for_user(user)
            
            return Response({
                'token': str(refresh.access_token),
                'user': {
                    'email': user.email,
                    'first_name': user.first_name,
                    'last_name': user.last_name,
                }
            })
            
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)