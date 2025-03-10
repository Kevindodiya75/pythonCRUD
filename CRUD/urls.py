from django.contrib import admin
from django.urls import path, include
from CRUD.presentation.views.auth_view import login_api, register_api



urlpatterns = [
    path('admin/', admin.site.urls),
    # API endpoints for authentication:
    path('api/auth/login/', login_api, name="api_login"),
    path('api/auth/register/', register_api, name="api_register"),
    # Optionally include other URL patterns:
    path('__reload__/', include('django_browser_reload.urls')),
]

