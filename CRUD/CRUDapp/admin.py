# CRUDapp/admin.py
from django.contrib import admin
from CRUDapp.data.model.models import Student

@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ["id", "name", "email"]
