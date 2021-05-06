from django.contrib import admin

# Register your models here.

from django.contrib.auth.admin import UserAdmin

from .models import NewUserModel

admin.site.register(NewUserModel)

admin.site.site_header = "Welcome to Userhandler Project"
admin.site.site_title = "Login Handler"
admin.site.index_title = "Developed by Mohit Satija"