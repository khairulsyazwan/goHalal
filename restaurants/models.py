from django.db import models
from cloudinary.models import CloudinaryField

# Restaurant listing model
class Restaurant(models.Model):
    class Cuisine(models.TextChoices):

        European = 'European'
        American = 'American'
        Asian = 'Asian'
        Bakery_and_cakes = 'Bakery & Cakes'
        Beverages = 'Beverages'
        Chinese = 'Chinese'
        Desserts = 'Desserts'
        Fast_food = 'Fast Food'
        Fusion = 'Fusion'
        Indian = 'Indian'
        Indonesian = 'Indonesian'
        International = 'International'
        Italian = 'Italian'
        Japanese = 'Japanese'
        Korean = 'Korean'
        Malay = 'Malay'
        Mediterranean = 'Mediterranean'
        Peranakan = 'Peranakan'
        Pizza = 'Pizza'
        Seafood = 'Seafood'
        Thai = 'Thai'
        Western = 'Western'

    name = models.CharField(max_length=60)
    address = models.CharField(max_length=255)
    cuisine = models.CharField(max_length=50, choices=Cuisine.choices, default='Malay')
    picture = CloudinaryField('image', default="https://s3.amazonaws.com/vulture-food-photos/defaultvulture.png")
    average_rating = models.FloatField(default=0, null=True)
    is_registered = models.BooleanField(default=False, null=True)
    max_pax_reservations = models.IntegerField(default=5, null=True)
    capacity = models.IntegerField(default=50, null=True)
    lat = models.FloatField()
    lng = models.FloatField()
    restaurant_id = models.IntegerField(null=True)

    def __str__(self):
        return self.name


    




