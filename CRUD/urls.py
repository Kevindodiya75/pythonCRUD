from django.contrib import admin
from django.urls import path, include
from CRUD.presentation.views.auth_view import login_api, register_api
from CRUD.presentation.views.student_view import (
    get_all_students_api,
    get_student_api,
    add_student_api,
    update_student_api,
    delete_student_api,
)
from CRUD.presentation.views.course_view import (
    add_course_api,
    get_course_api,
    list_courses_api,
    update_course_api,
    delete_course_api
)

urlpatterns = [
    path('admin/', admin.site.urls),
    # API endpoints for authentication:
    path('api/auth/login/', login_api, name="api_login"),
    path('api/auth/register/', register_api, name="api_register"),
    # API endpoints for Student:
    path('api/students/getall/', get_all_students_api, name="api_students_getall"),
    path('api/students/add/', add_student_api, name="api_student_add"),
    path('api/students/get/<int:student_id>/', get_student_api, name="api_student_get"),
    path('api/students/update/<int:student_id>/', update_student_api, name="api_student_update"),
    path('api/students/delete/<int:student_id>/', delete_student_api, name="api_student_delete"),
    # API endpoints for courses:
    path('api/courses/getall/', list_courses_api, name='list_courses_api'),
    path('api/courses/add/', add_course_api, name='add_course_api'),
    path('api/courses/<int:course_id>/', get_course_api, name='get_course_api'),
    path('api/courses/update/<int:course_id>/', update_course_api, name='update_course_api'),
    path('api/courses/delete/<int:course_id>/', delete_course_api, name='delete_course_api'),
    
    path('__reload__/', include('django_browser_reload.urls')),
]
