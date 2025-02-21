from django.shortcuts import render, get_object_or_404
from django.db.models import Q  # Import for search
from .models import Student
from django.contrib import messages

def index(request):
    students = Student.objects.all()
    search_query = ""
    
    if request.method == "POST": 
        if "create" in request.POST:
            name = request.POST.get("name")
            email = request.POST.get("email")
            Student.objects.create(name=name, email=email)
            messages.success(request, "Student added successfully")
    
        elif "update" in request.POST:
            id = request.POST.get("id")
            name = request.POST.get("name")
            email = request.POST.get("email")
            try:
                student = Student.objects.get(id=id)
                student.name = name
                student.email = email
                student.save()
                messages.success(request, "Student updated successfully")
            except Student.DoesNotExist:
                messages.error(request, "Student not found.")
    
        elif "delete" in request.POST:
            id = request.POST.get("id")
            try:
                student = Student.objects.get(id=id)
                student.delete()
                messages.success(request, "Student deleted successfully")
            except Student.DoesNotExist:
                messages.error(request, "Student not found.")
        
        elif "search" in request.POST:
            search_query = request.POST.get("query")
            students = Student.objects.filter(Q(name__icontains=search_query) | Q(email__icontains=search_query))

    context = {"students": students, "search_query": search_query}
    return render(request, "index.html", context)
