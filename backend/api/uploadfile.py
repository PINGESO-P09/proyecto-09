import os
from googleapiclient.http import MediaFileUpload
from googleapiclient.discovery import build
from google.oauth2.service_account import Credentials

"""
OBJETIVO: Subir un archivo a Google Drive usando la cuenta de servicio.
(Utiliza credential.json)
"""

# Se define la ruta a las credenciales
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CREDENTIALS_FILE = os.path.join(BASE_DIR, "credentials", "credential.json")


# Objetivo: Establece la configuración de autenticación de la cuenta de servicio
def create_google_drive_service():
    # Se define los alcances necesarios (scopes)
    SCOPES = ["https://www.googleapis.com/auth/drive"]

    # Se configuran las credenciales
    creds = Credentials.from_service_account_file(CREDENTIALS_FILE, scopes=SCOPES)
    service = build("drive", "v3", credentials=creds)
    return service


# Objetivo: Subir un archivo a Google Drive
def upload_file(file_path, folder_id=None):
    service = create_google_drive_service()

    # Metadatos para el archivo a subir
    file_metadata = {
        "name": os.path.basename(file_path),  # Nombre del archivo
        "parents": (
            [folder_id] if folder_id else []
        ),  # Carpeta destino (si se proporciona)
    }

    # Cargar el archivo a Google Drive
    media = MediaFileUpload(file_path, resumable=True)
    file = (
        service.files()
        .create(body=file_metadata, media_body=media, fields="id")
        .execute()
    )

    file_id = file.get("id")

    # Compartir con una cuenta de Google específica
    user_permission = {
        "type": "user",
        "role": "writer",
        "emailAddress": "pingesoproyecto9@gmail.com",
    }
    # IMPORTANTE: 'role': 'organizer' da todos los permisos pero es solo para team drives
    # para nuestra cuenta de prueba solo se puede usar writer

    service.permissions().create(
        fileId=file_id, body=user_permission, fields="id"
    ).execute()

    return file_id
