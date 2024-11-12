from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import LogoutView
from .views import UserCreateView

urlpatterns = [
    # Ruta -> Crear usuario
    path("create/", UserCreateView.as_view(), name="user_create"),
    # Ruta -> Obtener token (inicio sesion)
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    # Ruta -> Refrescar token
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    # Ruta -> Cerrar sesion
    path("logout/", LogoutView.as_view(), name="logout"),
]
