from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .createfolder import create_folder


@csrf_exempt  # Se desactivar CSRF para facilitar la prueba, aunque esto no es seguro para producción
def create_drive_folder(request):
    if request.method == "POST":
        # Obtener el nombre de la carpeta de la solicitud
        data = json.loads(request.body.decode("utf-8"))
        folder_name = data.get("folder_name", "Nueva Carpeta")

        # Crear la carpeta en Google Drive
        try:
            folder_id = create_folder(folder_name)
            return JsonResponse(
                {"folder_id": folder_id, "message": "Folder created successfully"}
            )
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    return JsonResponse({"error": "Invalid request method"}, status=400)
