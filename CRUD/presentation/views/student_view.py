from django.shortcuts import render, redirect
from django.contrib import messages
from CRUD.domain.usecases.student_usecase import (
    create_student_usecase,
    update_student_usecase,
    delete_student_usecase,
    list_students_usecase
)
from CRUD.data.models.student_model import student_model 
from CRUD.domain.usecases.course_usecase import list_courses_usecase 

def index(request):
    user_id = request.session.get("user_id")
    if not user_id:
        messages.error(request, "You must be logged in to view this page.")
        return redirect("login")

    if request.method == 'POST':
        if 'create' in request.POST:
            name = request.POST.get('name')
            email = request.POST.get('email')
            course_id = request.POST.get('course')
            if name and email and course_id:
                create_student_usecase(name, email, course_id, user_id)
                messages.success(request, 'Student added successfully.')
            else:
                messages.error(request, 'All fields are required.')
            return redirect('index')
        
        elif 'update' in request.POST:
            student_id = request.POST.get('id')
            name = request.POST.get('name')
            email = request.POST.get('email')
            course_id = request.POST.get('course')
            try:
                update_student_usecase(student_id, name, email, course_id)
                messages.success(request, 'Student updated successfully.')
            except student_model.DoesNotExist:
                messages.error(request, 'Student not found.')
            return redirect('index')
        
        elif 'delete' in request.POST:
            student_id = request.POST.get('id')
            try:
                delete_student_usecase(student_id)
                messages.success(request, 'Student deleted successfully.')
            except student_model.DoesNotExist:
                messages.error(request, 'Student not found.')
            return redirect('index')
        
        elif 'search' in request.POST:
            query = request.POST.get('query', '')
            students = student_model.objects.filter(created_by=user_id, name__icontains=query)
            context = {
                'students': students,
                'search_query': query,
            }
            return render(request, 'index.html', context)
    
    students = list_students_usecase(user_id)
    courses = list_courses_usecase()

    context = {
        'students': students,
        'courses': courses,
        'search_query': '',
    }
    return render(request, 'index.html', context)
