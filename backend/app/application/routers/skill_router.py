from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.app.data.database import get_db
from backend.app.application.schemas.profile_schema import SkillCreate
from backend.app.application.security import require_role
from backend.app.application.services.skill_service import create_skill as svc_create_skill, delete_skill as svc_delete_skill, get_skill as svc_get_skill

router = APIRouter(prefix="/skill", tags=["Skill"])


@router.post("/")
def create_skill(body: SkillCreate, db: Session = Depends(get_db), _user=Depends(require_role('developer'))):
    return svc_create_skill(body, db, _user)


@router.delete("/{remove_id}")
def delete_skill(remove_id: int, db: Session = Depends(get_db), _user=Depends(require_role('developer'))):
    return svc_delete_skill(remove_id, db, _user)


@router.get("/")
def get_skill(db: Session = Depends(get_db)):
    return svc_get_skill(db)
