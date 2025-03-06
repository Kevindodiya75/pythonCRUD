from django.shortcuts import render, redirect
from django.contrib import messages
from CRUD.domain.usecases.teacher_usecase import (
    create_teacher_usecase,
    update_teacher_usecase,
    delete_teacher_usecase,
    list_teachers_usecase
)
from CRUD.data.models.teacher_model import teacher_model

def teacher_index(request):
    userrole = request.session.get("userrole")
    user_id = request.session.get("user_id")
    if not user_id:
        messages.error(request, "You must be logged in to view this page.")
        return redirect("login")

    if request.method == "POST":
        # Allow search for everyone
        if "search" in request.POST:
            query = request.POST.get("query", "")
            teachers = teacher_model.objects.filter(name__icontains=query, created_by_id=user_id)
            context = {
                "teachers": teachers,
                "search_query": query,
            }
            return render(request, "teacher.html", context)

        # For create, update, or delete, only allow if userrole is "teacher"
        if userrole != "teacher":
            messages.error(request, "You are not authorized to modify teacher data.")
            return redirect("teacher_index")

        if "create" in request.POST:
            name = request.POST.get("name")
            email = request.POST.get("email")
            subject = request.POST.get("subject")
            if name and email and subject:
                create_teacher_usecase(name, email, subject, user_id)
                messages.success(request, "Teacher added successfully.")
            else:
                messages.error(request, "All fields are required.")
            return redirect("teacher_index")
        elif "update" in request.POST:
            teacher_id = request.POST.get("id")
            name = request.POST.get("name")
            email = request.POST.get("email")
            subject = request.POST.get("subject")
            try:
                update_teacher_usecase(teacher_id, name, email, subject)
                messages.success(request, "Teacher updated successfully.")
            except teacher_model.DoesNotExist:
                messages.error(request, "Teacher not found.")
            return redirect("teacher_index")
        elif "delete" in request.POST:
            teacher_id = request.POST.get("id")
            try:
                delete_teacher_usecase(teacher_id)
                messages.success(request, "Teacher deleted successfully.")
            except teacher_model.DoesNotExist:
                messages.error(request, "Teacher not found.")
            return redirect("teacher_index")

    teachers = list_teachers_usecase(user_id)
    context = {"teachers": teachers, "search_query": ""}
    return render(request, "teacher.html", context)
