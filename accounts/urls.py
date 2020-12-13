from django.urls import path
from .views import CustomAuthToken
from . import views


app_name = "account"

urlpatterns = [
    path('signup/', views.sign_up, name="register"),
    path('signin/', CustomAuthToken.as_view(), name="login"),
    path('logout/', views.sign_out, name="logout"),
    path('get-user/<int:id>', views.get_user, name="get_user"),
    path('update-user/<int:id>', views.update_user, name="update_user"),
    path('upload-image/<int:id>', views.upload_image, name="upload_image"),
]


