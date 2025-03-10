# CRUD/api/views/auth_api.py
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from CRUD.domain.usecases.auth_usecase import login_user, register_user

@csrf_exempt
def login_api(request):
  
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            email = data.get("email")
            password = data.get("password")
            user = login_user(email, password)
            # Return key user details
            response_data = {
                "id": user.id,
                "email": user.email,
                "username": user.username,
                "userrole": user.userrole,
            }
            return JsonResponse(response_data, status=200)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
    return JsonResponse({"error": "Only POST method allowed"}, status=405)


@csrf_exempt
def register_api(request):
   
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            email = data.get("email")
            username = data.get("username")
            role = data.get("role")
            password = data.get("password")
            user = register_user(email, username, password, role)
            response_data = {
                "id": user.id,
                "email": user.email,
                "username": user.username,
                "userrole": user.userrole,
            }
            return JsonResponse(response_data, status=201)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
    return JsonResponse({"error": "Only POST method allowed"}, status=405)
