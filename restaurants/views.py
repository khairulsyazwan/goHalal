from django.shortcuts import render
from .resources import RestaurantResource
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from tablib import Dataset
from .models import *
from .serializers import *
from os import path
import csv

# === Import ===

#import all restaurants from csv file to database
@api_view(['POST',])
def import_restaurants(request):
    if request.method == 'POST':
        Restaurant.objects.all().delete()
        restaurant_resource = RestaurantResource()
        dataset = Dataset(headers=['name', 'address', 'cuisine', 'picture', 'lat', 'lng'])
        file_path = path.relpath("Resources/restaurants.csv")
        with open(file_path) as csv_file:
            imported_data = dataset.load(csv_file.read())
            result = restaurant_resource.import_data(dataset, dry_run=True)
            
            if not result.has_errors():
                restaurant_resource.import_data(dataset, dry_run=False)
    
    return Response({"Successfully imported csv file"}, status=status.HTTP_201_CREATED) 


# === Restaurants ===

# Get all Restaurants
@api_view(['GET',])
def all_restaurants(request):
    try:
        restaurants = Restaurant.objects.all()
        
    except Restaurant.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    restaurant_serializer = RestaurantSerializer(restaurants, many=True)

    return Response({"restaurants": restaurant_serializer.data}, status=status.HTTP_200_OK) 

# Get single Restaurant
@api_view(['GET',])
def single_restaurant(request, id):
    try:
        restaurant = Restaurant.objects.get(restaurant_id=id)
    except Restaurant.DoesNotExist:
        return Response({"Restaurant does not exist"}, status=status.HTTP_404_NOT_FOUND)

    restaurant_serializer = RestaurantSerializer(restaurant)

    return Response({"restaurant": restaurant_serializer.data}, status=status.HTTP_200_OK) 
