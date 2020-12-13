from django.shortcuts import render
from .resources import RestaurantResource
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from tablib import Dataset
from .models import *
from os import path
import csv

@api_view(['POST',])
def import_restaurants(request):
    if request.method == 'POST':
        restaurant_resource = RestaurantResource()
        dataset = Dataset()
        file_path = path.relpath("Resources/restaurants.csv")
        with open(file_path) as csv_file:
            imported_data = dataset.load(csv_file.read())
            result = restaurant_resource.import_data(dataset, dry_run=True)

            if not result.has_errors():
                restaurant_resource.import_data(dataset, dry_run=False)
    
    return Response({"Successfully imported csv file"}, status=status.HTTP_201_CREATED) 





def all_restaurants(request):
    pass
