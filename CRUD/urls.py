from django.contrib import admin
from django.urls import path, include
from CRUD.presentation.views.student_view import index
from CRUD.presentation.views.course_view import course_index  # Ensure this file exists

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', index, name='index'),
    path('courses/', course_index, name='course'),  # URL name set to 'course'
    path('__reload__/', include('django_browser_reload.urls')),
]
