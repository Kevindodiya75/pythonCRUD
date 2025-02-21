from django.shortcuts import render
from .models import Student
from django.contrib import messages

def index(request):
    allStudents = Student.objects.all()

    if request.method == "POST":
        if "add" in request.POST:  
            name = request.POST.get("name")
            email = request.POST.get("email")
            Student.objects.create(
                name=name,
                email=email 
            )
            messages.success(request, "Student added successfully")

    context = {"allStudents": allStudents}
    return render(request, "index.html", context=context)
