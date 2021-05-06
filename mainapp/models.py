from django.db import models

# Create your models here.

from django.contrib.auth.models import User

class NewUserModel(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE,primary_key=True)
    phoneno = models.CharField(max_length=10,null=True)