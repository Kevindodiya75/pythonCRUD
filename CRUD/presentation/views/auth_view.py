from django.shortcuts import render, redirect
from django.contrib import messages
from CRUD.domain.usecases.auth_usecase import login_user, register_user

def login_view(request):
    if request.method == "POST":
        email = request.POST.get("email")
        password = request.POST.get("password")
        try:
            user = login_user(email, password)
            request.session["user_id"] = user.id
            request.session["email"] = user.email
            request.session["username"] = user.username  
            request.session["userrole"] = user.userrole  
            messages.success(request, "Login successful.")
            return redirect("index")
        except Exception as e:
            # Clear any existing session data on login failure
            request.session.flush()
            messages.error(request, str(e))  # Display the error message
            return render(request, "login.html")
    # GET request: simply render the login page
    return render(request, "login.html")


def register_view(request):
    if request.method == "POST":
        email = request.POST.get("email")
        username = request.POST.get("username") 
        role = request.POST.get("role")          
        password1 = request.POST.get("password1")
        password2 = request.POST.get("password2")
        if password1 != password2:
            messages.error(request, "Passwords do not match.")
            return render(request, "register.html")
        try:
            register_user(email, username, password1, role) 
            messages.success(request, "Registration successful. Please log in.")
            return redirect("login")
        except Exception as e:
            messages.error(request, str(e))
            return render(request, "register.html")
    return render(request, "register.html")

    

def logout_view(request):
    request.session.flush()  # Clear the session data
    messages.success(request, "You have been logged out.")
    return redirect("login")
