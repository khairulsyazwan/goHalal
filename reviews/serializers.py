from .models import *
from accounts.models import User
from accounts.serializers import *
from rest_framework import serializers


# Review Serializer
class ReviewSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = Review
        fields = '__all__'
    