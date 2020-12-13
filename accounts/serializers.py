from .models import *
from rest_framework import serializers


# Registration Serializer
class RegistrationSerializer(serializers.ModelSerializer):  
    class Meta:
        model = User
        fields = ['email', 'username', 'password']
        extra_kwargs = {
            "password": {'write_only': True}
        }
    
    def save(self):
        user = User(
            email = self.validated_data['email'],
            username = self.validated_data['username'],  
        )

        password = self.validated_data['password']

        user.set_password(password)

        user.save()

        return user


# User Serializer
class UserSerializer(serializers.ModelSerializer): 
    class Meta:
        model = User
        exclude = ['is_superuser', 'is_staff', 'is_active', 'groups', 'user_permissions', 'last_login', 'password']

# Profile Serializer
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['profile_pic']

