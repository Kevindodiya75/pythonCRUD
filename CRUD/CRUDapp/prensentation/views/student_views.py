from django.shortcuts import render
from django.contrib import messages
from CRUDapp.data.repositories.student_repository import DjangoStudentRepository
from CRUDapp.domain.entity.student_entity import StudentEntity

# Create an instance of the repository.
repo = DjangoStudentRepository()

def index(request):
    search_query = ""
    
    if request.method == "POST":
        if "create" in request.POST:
            name = request.POST.get("name")
            email = request.POST.get("email")
            student = StudentEntity(name=name, email=email)
            repo.add(student)
            messages.success(request, "Student added successfully")
        elif "update" in request.POST:
            student_id = int(request.POST.get("id"))
            name = request.POST.get("name")
            email = request.POST.get("email")
            student = StudentEntity(id=student_id, name=name, email=email)
            repo.update(student)
            messages.success(request, "Student updated successfully")
        elif "delete" in request.POST:
            student_id = int(request.POST.get("id"))
            repo.delete(student_id)
            messages.success(request, "Student deleted successfully")
        elif "search" in request.POST:
            search_query = request.POST.get("query")
            students = repo.list(search_query)
            return render(request, "index.html", {"students": students, "search_query": search_query})
    
    students = repo.list()  # List all students if no search query provided.
    return render(request, "index.html", {"students": students, "search_query": search_query})
