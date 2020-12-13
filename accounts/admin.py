from django.contrib import admin
from .models import *

class UserAdmin(admin.ModelAdmin):
    list_display = ("id", "username", "email")

admin.site.register(UserProfile)
admin.site.register(User, UserAdmin)
