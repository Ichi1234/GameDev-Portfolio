from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import os

from backend.app.data.database import get_db
from backend.app.application.security import get_current_user
from backend.app.application.services.auth_service import google_auth as svc_google_auth, me as svc_me

auth_router = APIRouter(prefix="/auth", tags=["Auth"])


@auth_router.post("/google")
def google_auth(body: dict, db: Session = Depends(get_db)):
    return svc_google_auth(body, db)



@auth_router.get("/me")
def me(payload=Depends(get_current_user), db: Session = Depends(get_db)):
    return svc_me(payload, db)
