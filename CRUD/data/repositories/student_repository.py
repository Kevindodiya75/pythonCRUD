from CRUD.data.models.student_model import student_model

def get_all_students():
    return student_model.objects.all()

def get_student_by_id(student_id):
    return student_model.objects.get(id=student_id)

def create_student(name, email):
    return student_model.objects.create(name=name, email=email)

def update_student(student_id, name, email, coursename):
    student = student_model.objects.get(id=student_id)
    student.name = name
    student.email = email
    # student.coursename = coursename
    student.save()
    return student


def delete_student(student_id):
    student = student_model.objects.get(id=student_id)
    student.delete()  # Call delete on the instance, not the class
