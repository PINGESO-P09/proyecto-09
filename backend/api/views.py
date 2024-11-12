from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.views import APIView
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
import json
from .createfolder import create_folder
from .uploadfile import upload_file
from rest_framework import status



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


@method_decorator(csrf_exempt, name='dispatch')
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

        # Guardar temporalmente el archivo
        file_path = f"/tmp/{file.name}"
        with open(file_path, "wb") as f:
            for chunk in file.chunks():
                f.write(chunk)

        try:
            # Subir el archivo a Google Drive
            file_id = upload_file(file_path, folder_id)
            return Response(
                {"message": "Archivo subido exitosamente", "file_id": file_id},
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
