from CRUD.domain.repositories.student_repository import (
    create_student,
    update_student,
    delete_student,
    get_all_students,
    get_student_by_id,
)
from CRUD.domain.entities.student_entity import StudentEntity


def create_student_usecase(name, email, course_id, created_by):
    student = create_student(name, email, course_id, created_by)
    return StudentEntity(
        id=student.id, name=student.name, email=student.email, course=student.course
    )


def update_student_usecase(student_id, name, email, course_id):
    student = update_student(student_id, name, email, course_id)
    return StudentEntity(
        id=student.id, name=student.name, email=student.email, course=student.course
    )


def delete_student_usecase(student_id):
    delete_student(student_id)
    return True


def list_students_usecase(created_by):
    students = get_all_students(created_by)
    return [
        StudentEntity(
            id=student.id, name=student.name, email=student.email, course=student.course
        )
        for student in students
    ]


def get_student_usecase(student_id):
    student = get_student_by_id(student_id)
    return StudentEntity(
        id=student.id, name=student.name, email=student.email, course=student.course
    )
