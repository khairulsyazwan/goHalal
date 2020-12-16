from .models import *
from rest_framework import serializers
from accounts.models import User
from accounts.serializers import *
import math

# Review Serializer
class ReviewSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = Review
        fields = '__all__'
    



