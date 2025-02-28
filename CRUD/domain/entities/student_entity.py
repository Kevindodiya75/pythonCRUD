from dataclasses import dataclass
from typing import Optional
from CRUD.data.models.course_model import course_model

@dataclass
class StudentEntity:
    id: int = None
    name: str = ""
    email: str = ""
    course: Optional[course_model] = None
