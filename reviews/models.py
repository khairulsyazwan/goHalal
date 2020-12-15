from django.db import models
from cloudinary.models import CloudinaryField
from restaurants.models import Restaurant
from accounts.models import User
import math


class Review(models.Model):
    photo = CloudinaryField('review_image', default='https://s3.amazonaws.com/vulture-food-photos/defaultvulture.png')
    review_title = models.CharField(null=True, max_length=50)
    review_body = models.TextField()
    taste_rating = models.IntegerField(default=1)
    service_rating = models.IntegerField(default=1)
    cleanliness_rating = models.IntegerField(default=1)
    average_rating = models.IntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    restaurant = models.ForeignKey(Restaurant, null=True, on_delete=models.CASCADE, related_name="reviews", blank=True)
    user = models.ForeignKey(User, null=True, on_delete=models.CASCADE, related_name="reviews", blank=True)

    def __str__(self):
        return self.review_title
    
    def calculate_average_rating(self):
        self.average_rating = math.floor((self.taste_rating + self.service_rating + self.cleanliness_rating)/3)
        return self.average_rating

    
    

    




