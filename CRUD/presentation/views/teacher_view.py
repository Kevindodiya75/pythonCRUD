import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from CRUD.domain.usecases.teacher_usecase import (
    list_all_teachers_usecase,
    get_teacher_usecase,
    create_teacher_usecase,
    update_teacher_usecase,
    delete_teacher_usecase
)


@csrf_exempt
def get_all_teachers_api(request):
    if request.method == 'GET':
        try:
            teachers = list_all_teachers_usecase()
            data = [
                {
                    "id": teacher.id,
                    "name": teacher.name,
                    "email": teacher.email,
                    "subject": teacher.subject,
                    "created_by": teacher.created_by
                }
                for teacher in teachers
            ]
            return JsonResponse({"teachers": data}, status=200)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
    else:
        return JsonResponse({"error": "GET method required."}, status=405)


@csrf_exempt
def get_teacher_api(request, teacher_id):
    if request.method == 'GET':
        try:
            teacher = get_teacher_usecase(teacher_id)
            data = {
                "id": teacher.id,
                "name": teacher.name,
                "email": teacher.email,
                "subject": teacher.subject,
                "created_by": teacher.created_by
            }
            return JsonResponse(data, status=200)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=404)
    else:
        return JsonResponse({"error": "GET method required."}, status=405)


@csrf_exempt
def add_teacher_api(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            name = data.get("name")
            email = data.get("email")
            subject = data.get("subject")
            created_by = data.get("created_by")
            if not (name and email and subject and created_by):
                return JsonResponse({"error": "Missing required fields."}, status=400)
            teacher = create_teacher_usecase(name, email, subject, created_by)
            response_data = {
                "id": teacher.id,
                "name": teacher.name,
                "email": teacher.email,
                "subject": teacher.subject,
                "created_by": teacher.created_by
            }
            return JsonResponse(response_data, status=201)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
    else:
        return JsonResponse({"error": "POST method required."}, status=405)


@csrf_exempt
def update_teacher_api(request, teacher_id):
    if request.method == 'PUT':
        try:
            data = json.loads(request.body)
            name = data.get("name")
            email = data.get("email")
            subject = data.get("subject")
            teacher = update_teacher_usecase(teacher_id, name, email, subject)
            response_data = {
                "id": teacher.id,
                "name": teacher.name,
                "email": teacher.email,
                "subject": teacher.subject,
                "created_by": teacher.created_by
            }
            return JsonResponse(response_data, status=200)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
    else:
        return JsonResponse({"error": "PUT method required."}, status=405)


@csrf_exempt
def delete_teacher_api(request, teacher_id):
    if request.method == 'DELETE':
        try:
            delete_teacher_usecase(teacher_id)
            return JsonResponse({"message": "Teacher deleted successfully"}, status=200)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
    else:
        return JsonResponse({"error": "DELETE method required."}, status=405)
