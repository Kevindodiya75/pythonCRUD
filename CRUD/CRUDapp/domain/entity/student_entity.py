# CRUDapp/domain/student_entity.py

class StudentEntity:
    def __init__(self, id=None, name="", email=""):
        self.id = id
        self.name = name
        self.email = email

    def __str__(self):
        return f"{self.id} - {self.name}"
