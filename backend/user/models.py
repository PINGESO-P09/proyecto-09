from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    class Role(models.TextChoices):
        ADMIN = "ADMIN", "admin"
        SOCIO = "SOCIO", "socio"
        ARQUITECTO = "ARQUITECTO", "arquitecto"

    roleBase = Role.ADMIN

    role = models.CharField(max_length=50, choices=Role.choices)

    def save(self, *args, **kwargs):
        if not self.pk: 
            self.role = self.roleBase
            return super().save(*args, **kwargs)