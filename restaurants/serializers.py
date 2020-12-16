from .models import *
from rest_framework import serializers


# Restaurant Serializer
class RestaurantSerializer(serializers.ModelSerializer):
    # owners = ProfileSerializer(read_only=True)
    class Meta:
        model = Restaurant
        fields = '__all__'
        
