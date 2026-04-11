from jose import jwt, JWTError
from datetime import datetime, timedelta
import os
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests

SECRET_KEY = os.getenv("SECRET_KEY", "yes-this-is-secret")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID", "your-client-id")

security = HTTPBearer()


def create_access_token(data: dict, expires_minutes: int = 60):
    """Create a JWT access token with an expiration time (minutes)."""
    to_encode = data.copy()
    expire = datetime.now(datetime.timezone.utc)() + timedelta(minutes=expires_minutes)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def verify_google_token(token: str):
    """Verify a Google ID token and return the token info or raise HTTPException."""
    try:
        idinfo = id_token.verify_oauth2_token(token, google_requests.Request(), GOOGLE_CLIENT_ID)
        return idinfo
    except Exception:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid Google token")


def get_current_user(token=Depends(security)):
    """FastAPI dependency that decodes a Bearer JWT and returns the payload."""
    try:
        payload = jwt.decode(token.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
