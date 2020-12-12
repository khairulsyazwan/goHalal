from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from . import views

app_name = "account"

urlpatterns = [
    path('signup/', views.sign_up, name="register"),
    path('signin/', obtain_auth_token, name="login"),
    path('logout/', views.sign_out, name="logout")
]
