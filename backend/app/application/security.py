from jose import jwt
from datetime import datetime, timedelta

SECRET_KEY = "yes-this-is-secret"
ALGORITHM = "HS256"

def create_access_token(data: dict, expires_delta: int = 60):
    to_encode = data.copy()
    expire = datetime.timezone.utc() + timedelta(minutes=expires_delta)
    
    to_encode.update({"exp": expire})
    
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
