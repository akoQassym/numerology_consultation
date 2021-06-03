from django.contrib import admin
from django.urls import path
from .views import ( 
    registration_view,
    check_credentials_view,
    update_user_info,
    update_avatar,
    update_password
)

from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('register', registration_view, name="register"),
    path('login', obtain_auth_token, name="login"),
    path('backgroundcheck', check_credentials_view, name="check"),
    path('update-profile', update_user_info, name="update profile"),
    path('update-avatar', update_avatar, name="update avatar"),
    path('update-password', update_password, name="update password")
]

