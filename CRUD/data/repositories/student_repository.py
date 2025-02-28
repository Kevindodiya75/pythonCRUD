from CRUD.data.models.student_model import student_model
from CRUD.data.models.course_model import course_model

def get_all_students():
    return student_model.objects.all()

def get_student_by_id(student_id):
    return student_model.objects.get(id=student_id)

def create_student(name, email, course_id):
    course = course_model.objects.get(id=course_id)
    
    if student_model.objects.exists():
        last_student = student_model.objects.all().order_by('-id').first()
        new_id = last_student.id + 1
    else:
        new_id = 1  
    
    return student_model.objects.create(id=new_id, name=name, email=email, course=course)

def update_student(student_id, name, email, course_id):
    student = student_model.objects.get(id=student_id)
    student.name = name
    student.email = email
    student.course = course_model.objects.get(id=course_id)
    student.save()
    return student

def delete_student(student_id):
    student = student_model.objects.get(id=student_id)
    student.delete()
