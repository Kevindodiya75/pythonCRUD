import CRUD.data.repositories.teacher_repository as teacher_repo

def get_all_teachers(created_by):
    return teacher_repo.get_all_teachers(created_by)

def get_all_teachers_all():
    return teacher_repo.get_all_teachers_all()

def get_teacher_by_id(teacher_id):
    return teacher_repo.get_teacher_by_id(teacher_id)

def create_teacher(name, email, subject, created_by):
    return teacher_repo.create_teacher(name, email, subject, created_by)

def update_teacher(teacher_id, name, email, subject):
    return teacher_repo.update_teacher(teacher_id, name, email, subject)

def delete_teacher(teacher_id):
    return teacher_repo.delete_teacher(teacher_id)

