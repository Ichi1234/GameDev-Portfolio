from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.app.data.database import get_db
from backend.app.data.models.user_model import Role
from backend.app.application.schemas.user_schema import RoleCreate

role_router = APIRouter(prefix="/roles", tags=["Roles"])

@role_router.post("/")
def create_role(role: RoleCreate, db: Session = Depends(get_db)):
    new_role = Role(name=role.name)

    db.add(new_role)
    db.commit()
    db.refresh(new_role)

    return new_role


@role_router.get("/")
def get_roles(db: Session = Depends(get_db)):
    users = db.query(Role).all()
    return users