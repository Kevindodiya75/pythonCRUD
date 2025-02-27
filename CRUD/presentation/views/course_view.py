from django.shortcuts import render, redirect
from django.contrib import messages
from CRUD.domain.usecases.course_usecase import (
    create_course_usecase,
    update_course_usecase,
    delete_course_usecase,
    list_courses_usecase
)
from CRUD.data.models.course_model import course_model  

def course_index(request):
    if request.method == 'POST':
        if 'create' in request.POST:
            coursename = request.POST.get('coursename')
            if coursename:
                create_course_usecase(coursename)
                messages.success(request, 'Course added successfully.')
            else:
                messages.error(request, 'Course name is required.')
            return redirect('course')
        elif 'update' in request.POST:
            course_id = request.POST.get('id')
            coursename = request.POST.get('coursename')
            try:
                update_course_usecase(course_id, coursename)
                messages.success(request, 'Course updated successfully.')
            except course_model.DoesNotExist:
                messages.error(request, 'Course not found.')
            return redirect('course')
        elif 'delete' in request.POST:
            course_id = request.POST.get('id')
            try:
                delete_course_usecase(course_id)
                messages.success(request, 'Course deleted successfully.')
            except course_model.DoesNotExist:
                messages.error(request, 'Course not found.')
            return redirect('course')
        elif 'search' in request.POST:
            query = request.POST.get('query', '')
            courses = course_model.objects.filter(coursename__icontains=query)
            context = {'courses': courses, 'search_query': query}
            return render(request, 'course.html', context)

    courses = list_courses_usecase()
    context = {'courses': courses, 'search_query': ''}
    return render(request, 'course.html', context)
