from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
import json
from .createfolder import create_folder
from .uploadfile import upload_file

@csrf_exempt
@api_view(['POST'])
def login_or_register(request):
    """
    Vista que permite iniciar sesión o registrar un usuario.
    Si el usuario existe, intenta iniciar sesión. 
    Si el usuario no existe, lo registra y luego inicia sesión automáticamente.
    """
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')

    # Autenticación de usuario existente
    user = authenticate(username=username, password=password)
    if user:
        # Generar tokens JWT si el usuario ya existe
        refresh = RefreshToken.for_user(user)
        return Response({
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "message": "Inicio de sesión exitoso"
        }, status=status.HTTP_200_OK)

    # Si el usuario no existe, crearlo
    if not User.objects.filter(username=username).exists():
        user = User.objects.create(
            username=username,
            email=email,
            password=password  # La contraseña se debe cifrar automáticamente con un middleware
        )
        user.set_password(password)  # Encripta la contraseña
        user.save()
        refresh = RefreshToken.for_user(user)
        return Response({
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "message": "Registro y autenticación exitosos"
        }, status=status.HTTP_201_CREATED)

    return Response({"error": "Credenciales incorrectas o el usuario ya existe"},
                    status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
@api_view(['POST'])
def create_drive_folder(request):
    """
    Vista para crear una carpeta en Google Drive.
    """
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

@api_view(['POST'])
@method_decorator(csrf_exempt, name="dispatch")
class UploadDriveFile(APIView):
    """
    Clase para manejar la subida de archivos a Google Drive.
    """
    def post(self, request):
        file = request.FILES.get("file")  # Recibe el archivo desde el formulario
        folder_id = request.data.get("folder_id", None)  # Opcional: ID de la carpeta de Google Drive

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