import os
import django

# Configurar el entorno de Django para que el script funcione
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "settings")
django.setup()

from user.models import User, Socio, Arquitecto

# Crear superusuario
def create_superuser():
    superuser_data = {
        "username": "admin",
        "password": "admin1234",
        "email": "admin@example.com",
        "first_name": "Super",
        "last_name": "Admin",
    }

    if not User.objects.filter(username=superuser_data["username"]).exists():
        User.objects.create_superuser(
            username=superuser_data["username"],
            password=superuser_data["password"],
            email=superuser_data["email"],
            first_name=superuser_data["first_name"],
            last_name=superuser_data["last_name"],
        )
        print(f"Superusuario '{superuser_data['username']}' creado.")
    else:
        print(f"Superusuario '{superuser_data['username']}' ya existe.")

# Crear socios
def create_socios():
    socios = [
        {"username": "socio1", "password": "socio1234", "email": "socio1@example.com", "first_name": "Socio", "last_name": "Uno"},
        {"username": "socio2", "password": "socio1234", "email": "socio2@example.com", "first_name": "Socio", "last_name": "Dos"},
        {"username": "socio3", "password": "socio1234", "email": "socio3@example.com", "first_name": "Socio", "last_name": "Tres"},
    ]

    for socio_data in socios:
        if not Socio.objects.filter(username=socio_data["username"]).exists():
            socio = Socio.objects.create_user(
                username=socio_data["username"],
                password=socio_data["password"],
                email=socio_data["email"],
                first_name=socio_data["first_name"],
                last_name=socio_data["last_name"],
            )
            print(f"Socio '{socio_data['username']}' creado.")
        else:
            print(f"Socio '{socio_data['username']}' ya existe.")

# Crear arquitectos
def create_arquitectos():
    arquitectos = [
        {"username": "arquitecto1", "password": "arquitecto1234", "email": "arquitecto1@example.com", "first_name": "Arquitecto", "last_name": "Uno"},
        {"username": "arquitecto2", "password": "arquitecto1234", "email": "arquitecto2@example.com", "first_name": "Arquitecto", "last_name": "Dos"},
        {"username": "arquitecto3", "password": "arquitecto1234", "email": "arquitecto3@example.com", "first_name": "Arquitecto", "last_name": "Tres"},
    ]

    for arquitecto_data in arquitectos:
        if not Arquitecto.objects.filter(username=arquitecto_data["username"]).exists():
            arquitecto = Arquitecto.objects.create_user(
                username=arquitecto_data["username"],
                password=arquitecto_data["password"],
                email=arquitecto_data["email"],
                first_name=arquitecto_data["first_name"],
                last_name=arquitecto_data["last_name"],
            )
            print(f"Arquitecto '{arquitecto_data['username']}' creado.")
        else:
            print(f"Arquitecto '{arquitecto_data['username']}' ya existe.")

# Ejecutar las funciones
if __name__ == "__main__":
    create_superuser()
    create_socios()
    create_arquitectos()
