import json
import tempfile
import os
from .createfolder import create_folder
from .uploadfile import upload_file
from rest_framework import status
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.views import APIView
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from googleapiclient.errors import HttpError

@csrf_exempt  # Se desactiva CSRF para facilitar la prueba, aunque esto no es seguro para producción
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
        except HttpError as e:
            return JsonResponse({"error": f"Google API error: {e}"}, status=500)
        except Exception as e:
            return JsonResponse({"error": f"Unexpected error: {e}"}, status=500)
    return JsonResponse({"error": "Invalid request method"}, status=400)


@method_decorator(csrf_exempt, name="dispatch")
class upload_file_drive(APIView):
    def post(self, request):
        file = request.FILES.get("file")  # Recibe el archivo desde el formulario
        folder_id = request.data.get(
            "folder_id", None
        )  # Opcional: ID de la carpeta de Google Drive

        if not file:
            return Response(
                {"error": "No se proporcionó ningún archivo"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Guardar temporalmente el archivo de manera segura
        try:
            with tempfile.NamedTemporaryFile(delete=False) as temp_file:
                for chunk in file.chunks():
                    temp_file.write(chunk)
                temp_file_path = temp_file.name

            # Subir el archivo a Google Drive
            file_id = upload_file(temp_file_path, folder_id)
            return Response(
                {"message": "Archivo subido exitosamente", "file_id": file_id},
                status=status.HTTP_200_OK,
            )
        except HttpError as exp:
            return Response(
                {"error": f"Google API error: {exp}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
        except Exception as exp:
            return Response(
                {"error": f"Unexpected error: {exp}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
        finally:
            # Asegurarse de que el archivo temporal se elimine después de su uso
            if os.path.exists(temp_file_path):
                os.remove(temp_file_path)