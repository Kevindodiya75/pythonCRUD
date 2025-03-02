
from CRUD.domain.repositories.auth_repository import (
    get_user_by_email,
    create_user,
    update_user,
    delete_user,
)
from CRUD.domain.entities.auth_entity import AuthEntity
from django.contrib.auth.hashers import check_password

def register_user(email, username, password, userrole):
    if get_user_by_email(email):
        raise Exception("User with this email already exists.")
    user = create_user(email, username, password, userrole)  # Make sure username is passed here
    return AuthEntity(
        id=user.id, 
        email=user.email, 
        username=user.username,  
        password=user.password, 
        userrole=user.userrole
    )

def login_user(email, password):
    user = get_user_by_email(email)
    if user and check_password(password, user.password):
        return AuthEntity(
            id=user.id,
            email=user.email,
            username=user.username,  # Pass the username here
            password=user.password,
            userrole=user.userrole
        )
    else:
        raise Exception("Invalid credentials.")


def update_user_usecase(user_id, email, password, userrole):
    
    user = update_user(user_id, email, password, userrole)
    return AuthEntity(id=user.id, email=user.email, password=user.password, userrole=user.userrole)

def delete_user_usecase(user_id):
    
    delete_user(user_id)
    return True
