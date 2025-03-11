import json
from django.http import JsonResponse, HttpResponseNotAllowed
from django.views.decorators.csrf import csrf_exempt
from CRUD.domain.usecases.course_usecase import (
    create_course_usecase,
    update_course_usecase,
    delete_course_usecase,
    get_course_usecase,
    list_courses_usecase
)

@csrf_exempt
def add_course_api(request):
    if request.method == "POST":
        try:
            body = json.loads(request.body)
            coursename = body.get("coursename")
            if not coursename:
                return JsonResponse({"error": "Course name is required."}, status=400)
            course = create_course_usecase(coursename)
            return JsonResponse({"id": course.id, "coursename": course.coursename}, status=201)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    return HttpResponseNotAllowed(["POST"])

def get_course_api(request, course_id):
    if request.method == "GET":
        try:
            course = get_course_usecase(course_id)
            return JsonResponse({"id": course.id, "coursename": course.coursename}, status=200)
        except Exception:
            return JsonResponse({"error": "Course not found."}, status=404)
    return HttpResponseNotAllowed(["GET"])

def list_courses_api(request):
    if request.method == "GET":
        try:
            courses = list_courses_usecase()
            data = [{"id": course.id, "coursename": course.coursename} for course in courses]
            return JsonResponse(data, safe=False, status=200)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    return HttpResponseNotAllowed(["GET"])

@csrf_exempt
def update_course_api(request, course_id):
    if request.method in ["PUT", "PATCH"]:
        try:
            body = json.loads(request.body)
            coursename = body.get("coursename")
            if not coursename:
                return JsonResponse({"error": "Course name is required."}, status=400)
            course = update_course_usecase(course_id, coursename)
            return JsonResponse({"id": course.id, "coursename": course.coursename}, status=200)
        except Exception:
            return JsonResponse({"error": "Course not found or update failed."}, status=404)
    return HttpResponseNotAllowed(["PUT", "PATCH"])

@csrf_exempt
def delete_course_api(request, course_id):
    if request.method == "DELETE":
        try:
            delete_course_usecase(course_id)
            return JsonResponse({"message": "Course deleted successfully."}, status=200)
        except Exception:
            return JsonResponse({"error": "Course not found."}, status=404)
    return HttpResponseNotAllowed(["DELETE"])
