from django.urls import path
from . import views

app_name = "restaurant"

urlpatterns = [
    path('import/', views.import_restaurants, name="import_restaurants"),
    path('', views.all_restaurants, name="all_restaurants"),
]