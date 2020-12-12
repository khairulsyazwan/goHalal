from django.urls import path
from . import views

app_name = "restaurant"

urlpatterns = [
    path('', views.all_restaurants, name="all_restaurants"),
]