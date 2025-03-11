from CRUD.domain.entities.teacher_entity import TeacherEntity
from CRUD.domain.repositories.teacher_repository import (
    create_teacher,
    update_teacher,
    delete_teacher,
    get_all_teachers_all,
    get_teacher_by_id,
)

def list_all_teachers_usecase():
    teachers = get_all_teachers_all()
    return [
        TeacherEntity(
            id=t.id,
            name=t.name,
            email=t.email,
            subject=t.subject,
            created_by=t.created_by_id
        )
        for t in teachers
    ]

def get_teacher_usecase(teacher_id):
    teacher = get_teacher_by_id(teacher_id)
    return TeacherEntity(
        id=teacher.id,
        name=teacher.name,
        email=teacher.email,
        subject=teacher.subject,
        created_by=teacher.created_by_id
    )

def create_teacher_usecase(name, email, subject, created_by):
    teacher = create_teacher(name, email, subject, created_by)
    return TeacherEntity(
        id=teacher.id,
        name=teacher.name,
        email=teacher.email,
        subject=teacher.subject,
        created_by=teacher.created_by_id
    )

def update_teacher_usecase(teacher_id, name, email, subject):
    teacher = update_teacher(teacher_id, name, email, subject)
    return TeacherEntity(
        id=teacher.id,
        name=teacher.name,
        email=teacher.email,
        subject=teacher.subject,
        created_by=teacher.created_by_id
    )

def delete_teacher_usecase(teacher_id):
    delete_teacher(teacher_id)
    return True
