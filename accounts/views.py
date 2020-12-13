from django.shortcuts import render
from django.contrib import messages
from django.contrib.auth import logout, login
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from django.views.decorators.csrf import csrf_exempt
from .models import *
from .serializers import *


# === Authentication ===

# Register
@api_view(['POST',])
def sign_up(request):
    if request.method == 'POST':
        serializer = RegistrationSerializer(data=request.data)

        if serializer.is_valid():

            user = serializer.save()

            login(request, user)

            return Response({"user": serializer.data, "token": Token.objects.get(user=user).key}, status=status.HTTP_201_CREATED)
        else:
            return Response({"errors": serializer._errors}, status=status.HTTP_400_BAD_REQUEST)

# Logout
@csrf_exempt 
@api_view(['POST',])
def sign_out(request):

    request.user.auth_token.delete()
    logout(request)

    return Response({"success": "Successfully logged out."}, status=status.HTTP_200_OK)

# custom class to return user_id and token when logged in
class CustomAuthToken(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk
        })


# === Users ===

# Get User
@api_view(['GET',])
def get_user(request, id):
    try:
        user = User.objects.get(pk=id)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    user_serializer = UserSerializer(user)
    profile_serializer = ProfileSerializer(user.profile)

    return Response({"user": user_serializer.data, "profile": profile_serializer.data}, status=status.HTTP_200_OK)

# Update User
@csrf_exempt
@api_view(['PUT',])
@permission_classes([IsAuthenticated])
def update_user(request, id):
    try:
        user = User.objects.get(pk=id)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'PUT':
        user_serializer = UserSerializer(instance=user, data=request.data)

        if user_serializer.is_valid():
            user_serializer.save()
            return Response(user_serializer.data, status=status.HTTP_202_ACCEPTED)
        else:
            return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)