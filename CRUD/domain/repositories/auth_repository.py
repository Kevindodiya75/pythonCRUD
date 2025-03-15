import CRUD.data.repositories.auth_repository as auth_repo


def create_user(email, username, password, userrole):
    return auth_repo.create_user(email, username, password, userrole)


def get_user_by_email(email):
    return auth_repo.get_user_by_email(email)


def update_user(user_id, email, password, userrole):
    return auth_repo.update_user(user_id, email, password, userrole)


def delete_user(user_id):
    return auth_repo.delete_user(user_id)
