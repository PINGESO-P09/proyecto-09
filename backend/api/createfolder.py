import os
from googleapiclient.discovery import build
from google.oauth2.service_account import Credentials

"""

OBJETIVO: Crear carpeta usando la cuenta de servicio.
La carpeta se ubicara en la seccion de drive "Compartidos conmigo"
(Utiliza credential.json)

"""

# Se define la ruta a las credenciales
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CREDENTIALS_FILE = os.path.join(BASE_DIR, 'credentials', 'credential.json')

# Objetivo: Establece la configuracion de autenticación de la cuenta de servicio
def create_google_drive_service():
    # Se define los alcances necesarios (scopes)
    SCOPES = ['https://www.googleapis.com/auth/drive']
    
    # Se configuran las credenciales
    creds = Credentials.from_service_account_file(CREDENTIALS_FILE, scopes=SCOPES)
    service = build('drive', 'v3', credentials=creds)
    return service

# Objetivo: Crear una carpeta en Google Drive
def create_folder(folder_name):
    service = create_google_drive_service()
    
    # Metadatos para la nueva carpeta
    file_metadata = {
        'name': folder_name,
        'mimeType': 'application/vnd.google-apps.folder'
    }

    # Crear la carpeta en Google Drive
    folder = service.files().create(body=file_metadata, fields='id').execute()
    folder_id = folder.get('id')

    # Compartir con una cuenta de Google específica
    user_permission = {
        'type': 'user',
        'role': 'writer',
        'emailAddress': "pingesoproyecto9@gmail.com"
    }
    # IMPORTANTE: 'role': 'organizer' da todos los permisos pero es solo para team drives
    # para nuestra cuenta de prueba solo se puede usar writer

    service.permissions().create(
        fileId=folder_id,
        body=user_permission,
        fields='id'
    ).execute()

    return folder_id