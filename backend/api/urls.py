from django.urls import path
from . import views
from .views import login_or_register

urlpatterns = [
    path("create-folder/", views.create_drive_folder, name="create_folder"),
    path("upload-file/", views.upload_drive_files, name="upload_file"),
    path("auth/", login_or_register, name="login_or_register"),  # Nueva ruta para login o registro
]
