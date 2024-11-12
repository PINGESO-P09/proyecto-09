import os
from googleapiclient.discovery import build
from google.oauth2.service_account import Credentials

"""
OBJETIVO: Establece la configuración de autenticación de la cuenta de servicio
(Utiliza credential.json establevida en el archivo .env)
"""


def create_google_drive_service():
    SCOPES = ["https://www.googleapis.com/auth/drive"]
    CREDENTIALS_FILE = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")

    creds = Credentials.from_service_account_file(CREDENTIALS_FILE, scopes=SCOPES)
    service = build("drive", "v3", credentials=creds)
    return service
