from CRUD.data.models.auth_model import auth_model
from django.contrib.auth.hashers import make_password, check_password


def create_user(email, username, password, userrole):
    hashed_password = make_password(password)
    if auth_model.objects.exists():
        last_user = auth_model.objects.all().order_by("-id").first()
        new_id = last_user.id + 1
    else:
        new_id = 1

    user = auth_model.objects.create(
        id=new_id,
        email=email,
        username=username,
        password=hashed_password,
        userrole=userrole,
    )
    return user


def get_user_by_email(email):
    try:
        return auth_model.objects.get(email=email)
    except auth_model.DoesNotExist:
        return None


def update_user(user_id, email, password, userrole):
    user = auth_model.objects.get(id=user_id)
    user.email = email
    if password:
        user.password = make_password(password)
    user.userrole = userrole
    user.save()
    return user


def delete_user(user_id):
    user = auth_model.objects.get(id=user_id)
    user.delete()
