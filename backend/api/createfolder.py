import os
from .google_drive_service import create_google_drive_service

"""

OBJETIVO: Crear carpeta usando la cuenta de servicio.
La carpeta se ubicara en la seccion de drive "Compartidos conmigo"

"""


# Objetivo: Crear una carpeta en Google Drive
def create_folder(folder_name):
    service = create_google_drive_service()

    # Metadatos para la nueva carpeta
    file_metadata = {
        "name": folder_name,
        "mimeType": "application/vnd.google-apps.folder",
    }

    # Crear la carpeta en Google Drive
    folder = service.files().create(body=file_metadata, fields="id").execute()
    folder_id = folder.get("id")

    # Compartir con una cuenta de Google específica
    user_permission = {
        "type": "user",
        "role": "writer",
        "emailAddress": "pingesoproyecto9@gmail.com",
    }
    # IMPORTANTE: 'role': 'organizer' da todos los permisos pero es solo para team drives
    # para nuestra cuenta de prueba solo se puede usar writer

    service.permissions().create(
        fileId=folder_id, body=user_permission, fields="id"
    ).execute()

    return folder_id
