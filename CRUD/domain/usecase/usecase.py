from CRUD.data.repositories.repositories import (
    create_student,
    update_student,
    delete_student,
    get_all_students,
    get_student_by_id
)
from CRUD.domain.entity import StudentEntity

def create_student_usecase(name, email):
    student = create_student(name, email)
    return StudentEntity(id=student.id, name=student.name, email=student.email)

def update_student_usecase(student_id, name, email):
    student = update_student(student_id, name, email)
    return StudentEntity(id=student.id, name=student.name, email=student.email)

def delete_student_usecase(student_id):
    delete_student(student_id)
    return True

def list_students_usecase():
    students = get_all_students()
    return [StudentEntity(id=student.id, name=student.name, email=student.email) for student in students]

def get_student_usecase(student_id):
    student = get_student_by_id(student_id)
    return StudentEntity(id=student.id, name=student.name, email=student.email)
