from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.app.data.database import get_db
from backend.app.data.models.profile_model import OwnerSkill
from backend.app.application.schemas.profile_schema import SkillCreate
from backend.app.application.security import require_role

router = APIRouter(prefix="/skill", tags=["Skill"])


@router.post("/")
def create_skill(body: SkillCreate, db: Session = Depends(get_db), _user=Depends(require_role('developer'))):
    skill = OwnerSkill(
        skill = body.name,
        description = body.description
    )

    db.add(skill)
    db.commit()
    db.refresh(skill)

    return {
        "id": skill.id,
        "name" : skill.skill,
        "description" : skill.description
    }


@router.delete("/{remove_id}")
def delete_skill(remove_id: int, db: Session = Depends(get_db), _user=Depends(require_role('developer'))):
    skill = db.query(OwnerSkill).filter(OwnerSkill.id == remove_id).first()

    if not skill:
        return {"error": "Skill not found"}

    response = {
        "id": skill.id,
        "name": skill.skill
    }

    db.delete(skill)
    db.commit()

    return response


@router.get("/")
def get_skill(db: Session = Depends(get_db)):
    skills = db.query(OwnerSkill).all()

    if not skills:
        return []

    response = [{"id": s.id, "name": s.skill, "description": s.description} for s in skills]

    return response
