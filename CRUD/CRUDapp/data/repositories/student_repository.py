from abc import ABC, abstractmethod
from CRUDapp.data.model.models import Student
from CRUDapp.domain.entity.student_entity import StudentEntity

class IStudentRepository(ABC):
    @abstractmethod
    def add(self, student: StudentEntity) -> int:
        pass

    @abstractmethod
    def update(self, student: StudentEntity) -> None:
        pass

    @abstractmethod
    def delete(self, student_id: int) -> None:
        pass

    @abstractmethod
    def get(self, student_id: int) -> StudentEntity:
        pass

    @abstractmethod
    def list(self, query: str = None) -> list:
        pass

class DjangoStudentRepository(IStudentRepository):
    def add(self, student: StudentEntity) -> int:
        new_student = Student(name=student.name, email=student.email)
        new_student.save()
        return new_student.id

    def update(self, student: StudentEntity) -> None:
        try:
            stu = Student.objects.get(id=student.id)
            stu.name = student.name
            stu.email = student.email
            stu.save()
        except Student.DoesNotExist:
            raise Exception("Student not found")

    def delete(self, student_id: int) -> None:
        try:
            student = Student.objects.get(id=student_id)
            student.delete()
        except Student.DoesNotExist:
            raise Exception("Student not found")

    def get(self, student_id: int) -> StudentEntity:
        try:
            student = Student.objects.get(id=student_id)
            return StudentEntity(id=student.id, name=student.name, email=student.email)
        except Student.DoesNotExist:
            raise Exception("Student not found")

    def list(self, query: str = None) -> list:
        qs = Student.objects.all()
        if query:
            qs = qs.filter(name__icontains=query) | qs.filter(email__icontains=query)
        return [StudentEntity(id=s.id, name=s.name, email=s.email) for s in qs]
