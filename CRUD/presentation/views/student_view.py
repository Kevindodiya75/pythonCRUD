from django.shortcuts import render, redirect
from django.contrib import messages
from CRUD.domain.usecases.student_usecase import (
    create_student_usecase,
    update_student_usecase,
    delete_student_usecase,
    list_students_usecase
)
from CRUD.data.models.student_model import student_model  # For catching DoesNotExist exceptions
from CRUD.domain.usecases.course_usecase import list_courses_usecase 


def index(request):
    if request.method == 'POST':
        if 'create' in request.POST:
            name = request.POST.get('name')
            email = request.POST.get('email')
            if name and email:
                create_student_usecase(name, email)
                messages.success(request, 'Student added successfully.')
            else:
                messages.error(request, 'Both name and email are required.')
            return redirect('index')
        
        elif 'update' in request.POST:
            student_id = request.POST.get('id')
            name = request.POST.get('name')
            email = request.POST.get('email')
            try:
                update_student_usecase(student_id, name, email)
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
            students = student_model.objects.filter(name__icontains=query)
            context = {
                'students': students,
                'search_query': query,
            }
            return render(request, 'index.html', context)
    
    students = list_students_usecase()
    courses = list_courses_usecase()
    
    context = {
        'students': students,
        'courses': courses,
        'search_query': '',
    }
    return render(request, 'index.html', context)
