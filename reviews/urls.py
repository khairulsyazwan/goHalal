from django.urls import path
from . import views

app_name = "review"

urlpatterns = [
    path('post/<int:user_id>/<int:restaurant_id>', views.post_review, name="post_review"),
]
