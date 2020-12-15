from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from django.views.decorators.csrf import csrf_exempt
from .models import *
from accounts.models import *
from restaurants.models import *
from .serializers import *



#=== Reviews ===

# Post Review
@csrf_exempt
@api_view(['POST',])
@permission_classes([IsAuthenticated])
def post_review(request, user_id, restaurant_id):
    try:
        user = User.objects.get(pk=user_id)
    except User.DoesNotExist:
        return Response({"user not found"}, status=status.HTTP_404_NOT_FOUND)

    try:
        restaurant = Restaurant.objects.get(pk=restaurant_id)
    except Restaurant.DoesNotExist:
        return Response({"restaurant not found"}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'POST':
        serializer = ReviewSerializer(data=request.data)

        if serializer.is_valid():

            review = serializer.save()
            Review.calculate_average_rating(review)

            user.reviews.add(review)
            restaurant.reviews.add(review)

            serializer.save()

            return Response({"review": serializer.data}, status=status.HTTP_201_CREATED)
        else:
            return Response({"errors": serializer._errors}, status=status.HTTP_400_BAD_REQUEST)

# Get Reviews
@api_view(['GET',])
def get_reviews(request, restaurant_id):
    try: 
        reviews = Review.objects.filter(restaurant_id=restaurant_id)
    except Review.DoesNotExist:
        return Response({"No reviews yet"}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = ReviewSerializer(reviews, many=True)

    return Response({"reviews": serializer.data}, status=status.HTTP_200_OK)

# Update Review
@csrf_exempt
@api_view(['PUT',])
@permission_classes([IsAuthenticated])
def edit_review(request, review_id):

    try:
        review = Review.objects.get(pk=review_id)
    except Restaurant.DoesNotExist:
        return Response({"review not found"}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = ReviewSerializer(instance=review, data=request.data)

        if serializer.is_valid():

            review = serializer.save()
            Review.calculate_average_rating(review)

            serializer.save()

            return Response({"review": serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({"errors": serializer._errors}, status=status.HTTP_400_BAD_REQUEST)

# Delete Review
@csrf_exempt
@api_view(['DELETE',])
@permission_classes([IsAuthenticated])
def delete_review(request, review_id):

    try:
        review = Review.objects.get(pk=review_id)
    except Restaurant.DoesNotExist:
        return Response({"review not found"}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'DELETE':
        review.delete()

        return Response({"Deleted review successfully"}, status=status.HTTP_204_NO_CONTENT)
    else:
        return Response(review.errors, status=status.HTTP_400_BAD_REQUEST)
