from CRUD.data.model.models import Student

def get_all_students():
    return Student.objects.all()

def get_student_by_id(student_id):
    return Student.objects.get(id=student_id)

def create_student(name, email):
    return Student.objects.create(name=name, email=email)

def update_student(student_id, name, email):
    student = Student.objects.get(id=student_id)
    student.name = name
    student.email = email
    student.save()
    return student

def delete_student(student_id):
    student = Student.objects.get(id=student_id)
    student.delete()
