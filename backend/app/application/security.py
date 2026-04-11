from jose import jwt, JWTError
from datetime import datetime, timedelta
import os
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
from pathlib import Path


def _load_dotenv_if_needed():
    env_google = os.getenv("GOOGLE_CLIENT_ID")
    if env_google and env_google != "your-client-id":
        return

    base = Path(__file__).resolve().parents[2]  # backend/
    dotenv = base / ".env"
    if not dotenv.exists():
        return

    try:
        for line in dotenv.read_text(encoding='utf-8').splitlines():
            line = line.strip()
            if not line or line.startswith('#'):
                continue
            if '=' not in line:
                continue
            k, v = line.split('=', 1)
            k = k.strip()
            v = v.strip().strip('"').strip("'")
            if k and v:
                os.environ.setdefault(k, v)
    except Exception:
        pass


_load_dotenv_if_needed()

SECRET_KEY = os.getenv("SECRET_KEY", "yes-this-is-secret")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID", "your-client-id")

security = HTTPBearer()


def create_access_token(data: dict, expires_minutes: int = 60):
    """Create a JWT access token with an expiration time (minutes)."""
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=expires_minutes)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def verify_google_token(token: str):
    """Verify a Google ID token and return the token info or raise HTTPException."""
    try:
        idinfo = id_token.verify_oauth2_token(token, google_requests.Request(), GOOGLE_CLIENT_ID)
        return idinfo
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=f"Invalid Google token: {e}")


def get_current_user(token=Depends(security)):
    """FastAPI dependency that decodes a Bearer JWT and returns the payload."""
    try:
        payload = jwt.decode(token.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")


def require_role(role_name: str):
    """Return a dependency that ensures the current user has the given role."""
    def _require(payload=Depends(get_current_user)):
        user_role = payload.get("role") if isinstance(payload, dict) else None
        if not user_role or user_role != role_name:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Insufficient privileges")
        return payload
    return _require
