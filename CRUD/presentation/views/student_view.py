# CRUD/api/views/student_views.py
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from CRUD.domain.usecases.student_usecase import (
    list_students_usecase,
    get_student_usecase,
    create_student_usecase,
    update_student_usecase,
    delete_student_usecase
)

@csrf_exempt
def get_all_students_api(request):
    """
    GET /api/students/getall/?user_id=<id>&query=<optional search query>
    """
    if request.method == 'GET':
        user_id = request.GET.get("user_id")
        if not user_id:
            return JsonResponse({"error": "user_id query parameter required."}, status=400)
        try:
            # Optionally, you can also implement search logic here.
            students = list_students_usecase(user_id)
            data = [
                {
                    "id": student.id,
                    "name": student.name,
                    "email": student.email,
                    "course": student.course.coursename if student.course else None,
                }
                for student in students
            ]
            return JsonResponse({"students": data}, status=200)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
    else:
        return JsonResponse({"error": "GET method required."}, status=405)

@csrf_exempt
def get_student_api(request, student_id):
    """
    GET /api/students/get/<student_id>/
    """
    if request.method == 'GET':
        try:
            student = get_student_usecase(student_id)
            data = {
                "id": student.id,
                "name": student.name,
                "email": student.email,
                "course": student.course.coursename if student.course else None,
            }
            return JsonResponse(data, status=200)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=404)
    else:
        return JsonResponse({"error": "GET method required."}, status=405)

@csrf_exempt
def add_student_api(request):
    """
    POST /api/students/add/
    Expects JSON payload with keys: name, email, course, created_by.
    """
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            name = data.get("name")
            email = data.get("email")
            course_id = data.get("course")
            created_by = data.get("created_by")
            if not (name and email and course_id and created_by):
                return JsonResponse({"error": "Missing required fields."}, status=400)
            student = create_student_usecase(name, email, course_id, created_by)
            response_data = {
                "id": student.id,
                "name": student.name,
                "email": student.email,
                "course": student.course.coursename if student.course else None,
            }
            return JsonResponse(response_data, status=201)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
    else:
        return JsonResponse({"error": "POST method required."}, status=405)

@csrf_exempt
def update_student_api(request, student_id):
    """
    PUT /api/students/update/<student_id>/
    Expects JSON payload with keys: name, email, course.
    """
    if request.method == 'PUT':
        try:
            data = json.loads(request.body)
            name = data.get("name")
            email = data.get("email")
            course_id = data.get("course")
            student = update_student_usecase(student_id, name, email, course_id)
            response_data = {
                "id": student.id,
                "name": student.name,
                "email": student.email,
                "course": student.course.coursename if student.course else None,
            }
            return JsonResponse(response_data, status=200)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
    else:
        return JsonResponse({"error": "PUT method required."}, status=405)

@csrf_exempt
def delete_student_api(request, student_id):
    """
    DELETE /api/students/delete/<student_id>/
    """
    if request.method == 'DELETE':
        try:
            delete_student_usecase(student_id)
            return JsonResponse({"message": "Student deleted successfully"}, status=200)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
    else:
        return JsonResponse({"error": "DELETE method required."}, status=405)
