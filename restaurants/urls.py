from django.urls import path
from . import views

app_name = "restaurant"

urlpatterns = [
    path('', views.all_restaurants, name="all_restaurants"),
    path('import/', views.import_restaurants, name="import_restaurants"),
    path('<int:id>/', views.single_restaurant, name="single_restaurant"),
    path('update/<int:restaurant_id>/<int:user_id>/', views.update_restaurant,name="update_restaurant")
]