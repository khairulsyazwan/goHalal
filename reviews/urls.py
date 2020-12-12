from django.urls import path
from . import views

app_name = "review"

urlpatterns = [
    path('all/<int:id>', views.all_reviews, name="all_reviews"),
]
