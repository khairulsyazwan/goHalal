from django.urls import path
from . import views

app_name = "review"

urlpatterns = [
    path('post/<int:user_id>/<int:restaurant_id>/', views.post_review, name="post_review"),
    path('<int:restaurant_id>/', views.get_reviews, name="get_reviews"),
    path('edit/<int:review_id>/', views.edit_review, name="edit_review"),
    path('delete/<int:review_id>/', views.delete_review, name="delete_review")
]
