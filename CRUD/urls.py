from django.contrib import admin
from django.urls import path,include
from CRUD.presentation.views.react_view import react_app_view

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', react_app_view, name='index'),  # Use name 'index'
    path('app/', react_app_view, name='react_app'),
    path('__reload__/', include('django_browser_reload.urls')),
]

