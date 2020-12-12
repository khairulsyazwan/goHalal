from django.db import models
from django.contrib.auth.models import AbstractUser
from cloudinary.models import CloudinaryField

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
    profile_pic = CloudinaryField('image')
    # reviews = models.ManyToManyField()
    # favourites = models.ManyToManyField()

# gives a token every time a user is registered
@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)