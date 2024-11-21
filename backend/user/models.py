from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model

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
        super().save(*args, **kwargs)

class SocioManager(BaseUserManager):
    def get_queryset(self, *args, **kwargs):
        return super().get_queryset(*args, **kwargs).filter(role=User.Role.SOCIO)

class Socio(User):
    roleBase = User.Role.SOCIO
    socio = SocioManager()

    class Meta:
        proxy = True

    def welcome(self):
        return "Bienvenido, socio!"

class SocioProfile(models.Model):
    user = models.OneToOneField(get_user_model(), on_delete=models.CASCADE)
    socio_id = models.IntegerField(null=True, blank=True)

@receiver(post_save, sender=Socio)
def crear_socio_profile(sender, instance, created, **kwargs):
    if created:
        SocioProfile.objects.create(user=instance)

class ArquitectoManager(BaseUserManager):
    def get_queryset(self, *args, **kwargs):
        return super().get_queryset(*args, **kwargs).filter(role=User.Role.ARQUITECTO)

class Arquitecto(User):
    roleBase = User.Role.ARQUITECTO
    arquitecto = ArquitectoManager()

    class Meta:
        proxy = True

    def welcome(self):
        return "Bienvenido, arquitecto!"

class ArquitectoProfile(models.Model):
    user = models.OneToOneField(get_user_model(), on_delete=models.CASCADE)
    arquitecto_id = models.IntegerField(null=True, blank=True)

@receiver(post_save, sender=Arquitecto)
def crear_arquitecto_profile(sender, instance, created, **kwargs):
    if created:
        ArquitectoProfile.objects.create(user=instance)