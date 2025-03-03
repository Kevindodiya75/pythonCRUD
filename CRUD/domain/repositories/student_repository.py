import CRUD.data.repositories.student_repository as student_repo


def get_all_students(created_by):
    return student_repo.get_all_students(created_by)


def get_student_by_id(student_id):
    return student_repo.get_student_by_id(student_id)

def create_student(name, email, course_id, created_by):
    return student_repo.create_student(name, email, course_id, created_by)

def update_student(student_id, name, email, course_id):
    return student_repo.update_student(student_id, name, email, course_id)

def delete_student(student_id):
    return student_repo.delete_student(student_id)
