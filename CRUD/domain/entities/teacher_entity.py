from dataclasses import dataclass
from typing import Optional

@dataclass
class TeacherEntity:
    id: int = None
    name: str = ""
    email: str = ""
    subject: str = ""
    created_by: Optional[int] = None  # Storing the user ID who created the teacher record
