from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.app.data.database import get_db
from backend.app.application.schemas.user_schema import RoleCreate
from backend.app.application.services.role_service import create_role as svc_create_role, get_roles as svc_get_roles

role_router = APIRouter(prefix="/roles", tags=["Roles"])

@role_router.post("/")
def create_role(role: RoleCreate, db: Session = Depends(get_db)):
    return svc_create_role(role, db)


@role_router.get("/")
def get_roles(db: Session = Depends(get_db)):
    return svc_get_roles(db)
