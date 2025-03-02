from dataclasses import dataclass

@dataclass
class AuthEntity:
    id: int
    email: str
    password: str  
    userrole: str
    username: str  
