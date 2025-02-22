from CRUDapp.data.repositories.student_repository import DjangoStudentRepository
from CRUDapp.domain.entity.student_entity import StudentEntity

repo = DjangoStudentRepository()

def create_student(name: str, email: str) -> int:
    student = StudentEntity(name=name, email=email)
    return repo.add(student)

def update_student(student_id: int, name: str, email: str) -> None:
    student = StudentEntity(id=student_id, name=name, email=email)
    repo.update(student)

def delete_student(student_id: int) -> None:
    repo.delete(student_id)

def search_students(query: str = None) -> list:
    return repo.list(query)
