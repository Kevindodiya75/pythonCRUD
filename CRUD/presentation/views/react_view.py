from django.shortcuts import render

def react_app_view(request):
    return render(request, "react_app_index.html")
