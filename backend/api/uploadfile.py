import os
from googleapiclient.http import MediaFileUpload, MediaIoBaseUpload
from .google_drive_service import create_google_drive_service
import io


"""
OBJETIVO: Subir un archivo a Google Drive usando la cuenta de servicio.
(Utiliza credential.json)
"""


# Objetivo: Subir un archivo a Google Drive

def upload_file(file, folder_id=None):
    service = create_google_drive_service()

    # Metadatos para el archivo a subir
    file_metadata = {
        "name": file.name,  # Nombre del archivo
        "parents": (
            [folder_id] if folder_id else []
        ),  # Carpeta destino (si se proporciona)
    }

    # Convertir el archivo a un formato que Google Drive pueda manejar
    media = MediaIoBaseUpload(io.BytesIO(file.read()), mimetype=file.content_type, resumable=True)

    # Cargar el archivo a Google Drive
    uploaded_file = (
        service.files()
        .create(body=file_metadata, media_body=media, fields="id")
        .execute()
    )

    file_id = uploaded_file.get("id")

    # Compartir con una cuenta de Google específica
    user_permission = {
        "type": "user",
        "role": "writer",
        "emailAddress": "pingesoproyecto9@gmail.com",
    }

    service.permissions().create(
        fileId=file_id, body=user_permission, fields="id"
    ).execute()

    return file_id
