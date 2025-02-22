# CRUDapp/urls.py
from django.urls import path
from CRUDapp.prensentation.views.student_views import index  # Import from presentation folder

urlpatterns = [
    path("", index, name="index"),
]
