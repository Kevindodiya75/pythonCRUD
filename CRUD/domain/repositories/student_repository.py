# CRUD/domain/repositories/student_repository.py

import CRUD.data.repositories.student_repository as student_repo

def get_all_students():
    return student_repo.get_all_students()

def get_student_by_id(student_id):
    return student_repo.get_student_by_id(student_id)

def create_student(name, email):
    return student_repo.create_student(name, email)

def update_student(student_id, name, email):
    return student_repo.update_student(student_id, name, email)

def delete_student(student_id):
    return student_repo.delete_student(student_id)
