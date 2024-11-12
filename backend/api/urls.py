from django.urls import path
from . import views
from .views import upload_file_drive

urlpatterns = [
    path("create-folder/", views.create_drive_folder, name="create_folder"),
    path("upload-file/", upload_file_drive.as_view(), name="upload_file"),
]
