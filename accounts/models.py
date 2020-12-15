from django.db import models
from django.contrib.auth.models import AbstractUser
from cloudinary.models import CloudinaryField
from restaurants.models import *
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

# User model 
class User(AbstractUser):
    class Meta:
        db_table = 'auth_user'

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    profile_pic = CloudinaryField('image', default="https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg")
    favourites = models.ManyToManyField(Restaurant, related_name="users", blank=True)

    def __str__(self):
        return self.user.username
    
# create User Profile when User is being created
def create_user_profile(sender, instance, created, **kwargs):  
    if created:  
       profile, created = UserProfile.objects.get_or_create(user=instance)  

post_save.connect(create_user_profile, sender=User) 

# gives a token every time a user is registered
@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)
        print(Token.key)