from django.contrib import admin
from django.urls import path
from CRUD.presentation.views.student_views import index


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', index, name='index'),
]
