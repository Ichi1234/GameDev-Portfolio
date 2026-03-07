from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.infrastructure.database import get_db
from app.domain.models.role_model import Role
from app.presentation.schemas.role_schema import RoleCreate 

router = APIRouter(prefix="/roles", tags=["Roles"])

@router.post("/")
def create_role(role: RoleCreate, db: Session = Depends(get_db)):
    new_role = Role(name=role.name)

    db.add(new_role)
    db.commit()
    db.refresh(new_role)

    return new_role


@router.get("/")
def get_roles(db: Session = Depends(get_db)):
    users = db.query(Role).all()
    return users