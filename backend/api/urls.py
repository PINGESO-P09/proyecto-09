from django.urls import path
from . import views

urlpatterns = [
    path("create-folder/", views.create_drive_folder, name="create_drive_folder"),
]
