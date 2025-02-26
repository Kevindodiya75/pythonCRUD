from django.contrib import admin
from django.urls import path, include
from CRUD.presentation.views.student_view import index


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', index, name='index'),
    path('__reload__/', include('django_browser_reload.urls')),

]
