from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import LogoutView

urlpatterns = [
    # Obtener token (inicio sesion)
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # Refrescar token
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # Cerrar sesion
    path('logout/', LogoutView.as_view(), name='logout'),
]