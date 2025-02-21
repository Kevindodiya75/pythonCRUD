from django.contrib import admin
from .models import Student

@admin.register(Student)
class studentAdmin(admin.ModelAdmin):
    list_display = ["id","name","email"]

# Register your models here.
