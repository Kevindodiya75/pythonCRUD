from CRUD.data.models.student_model import student_model

def get_all_students():
    return student_model.objects.all()

def get_student_by_id(student_id):
    return student_model.objects.get(id=student_id)

def create_student(name, email):
    return student_model.objects.create(name=name, email=email)

def update_student(student_id, name, email):
    student = student_model.objects.get(id=student_id)
    student_model.name = name
    student_model.email = email
    student_model.save()
    return student

def delete_student(student_id):
    student = student_model.objects.get(id=student_id)
    student_model.delete()
