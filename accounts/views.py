from django.shortcuts import render
from django.contrib import messages
from django.contrib.auth import logout
from rest_framework.response import Response
from rest_framework import status, generics, permissions
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token
from django.views.decorators.csrf import csrf_exempt
from .models import *
from .serializers import *


# === Authentication ===
@api_view(['POST',])
def sign_up(request):
    if request.method == 'POST':
        serializer = RegistrationSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.save()
            return Response({"user": serializer.data, "token": Token.objects.get(user=user).key}, status=status.HTTP_201_CREATED)
        else:
            return Response({"errors": serializer._errors}, status=status.HTTP_400_BAD_REQUEST)
@csrf_exempt 
@api_view(['POST',])
def sign_out(request):
    try:
        request.user.auth_token.delete()
    except request.user:
        return Response({"errors": "User not found"}, status=status.HTTP_400_BAD_REQUEST)

    logout(request)

    return Response({"success": "Successfully logged out."}, status=status.HTTP_200_OK)
