# CRUD/urls.py

from django.contrib import admin
from django.urls import path,include
from CRUD.presentation.views.auth_view import login_view, register_view
from CRUD.presentation.views.student_view import index  # Your existing view after login
from CRUD.presentation.views.course_view import course_index  # Your existing course view

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', login_view, name='login'),  # Login page as the first page
    path('register/', register_view, name='register'),
    path('index/', index, name='index'),
    path('courses/', course_index, name='course'),
    path('__reload__/', include('django_browser_reload.urls')),

]
