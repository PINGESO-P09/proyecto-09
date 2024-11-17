from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db.models.signals import post_save
from django.dispatch import receiver


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


class SocioManager(BaseUserManager):
    # Obtener todos los usuarios socios (get all)
    def get_queryset(self, *args, **kwargs):
        results = super().get_queryset(*args, **kwargs)
        return results.filter(role=User.Role.SOCIO)


class Socio(User):
    roleBase = User.Role.SOCIO

    socio = SocioManager()

    # Se indica que es una subclase de User
    class Meta:
        proxy = True

    # Funcion de prueba (luego será borrada)
    def welcome(self):
        return "Bienvenido, socio!"


class SocioProfile(models.Model):
    # Si el usuario en User es eliminado, el perfil de socio también será eliminado
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    socio_id = models.IntegerField(null=True, blank=True)


@receiver(post_save, sender=Socio)
def create_partner_profile(sender, instance, created, **kwargs):
    if created and instance.role == "SOCIO":
        SocioProfile.objects.create(user=instance)


class ArquitectoManager(BaseUserManager):
    # Obtener todos los usuarios arquitectos (get all)
    def get_queryset(self, *args, **kwargs):
        results = super().get_queryset(*args, **kwargs)
        return results.filter(role=User.Role.ARQUITECTO)


class Arquitecto(User):
    roleBase = User.Role.ARQUITECTO

    arquitecto = ArquitectoManager()

    class Meta:
        proxy = True

    def welcome(self):
        return "Bienvenido, arquitecto!"


class ArquitectoProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    arquitecto_id = models.IntegerField(null=True, blank=True)


@receiver(post_save, sender=Arquitecto)
def create_architect_profile(sender, instance, created, **kwargs):
    if created and instance.role == "ARQUITECTO":
        ArquitectoProfile.objects.create(user=instance)