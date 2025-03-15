from CRUD.data.models.teacher_model import teacher_model


def get_all_teachers_all():
    return teacher_model.objects.all()


def get_all_teachers(created_by):
    return teacher_model.objects.filter(created_by_id=created_by)


def get_teacher_by_id(teacher_id):
    return teacher_model.objects.get(id=teacher_id)


def create_teacher(name, email, subject, created_by):
    if teacher_model.objects.exists():
        last_teacher = teacher_model.objects.all().order_by("-id").first()
        new_id = last_teacher.id + 1
    else:
        new_id = 1
    return teacher_model.objects.create(
        id=new_id, name=name, email=email, subject=subject, created_by_id=created_by
    )


def update_teacher(teacher_id, name, email, subject):
    teacher = teacher_model.objects.get(id=teacher_id)
    teacher.name = name
    teacher.email = email
    teacher.subject = subject
    teacher.save()
    return teacher


def delete_teacher(teacher_id):
    teacher = teacher_model.objects.get(id=teacher_id)
    teacher.delete()
