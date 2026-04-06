from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.app.data.database import get_db
from backend.app.data.models.profile_model import OwnerSkill
from backend.app.application.schemas.profile_schema import SkillCreate

router = APIRouter(prefix="/skill", tags=["Skill"])


@router.post("/")
def create_skill(body: SkillCreate, db: Session = Depends(get_db)):
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


@router.delete("/")
def delete_skill(remove_id: int, db: Session = Depends(get_db)):
    skill = db.query(OwnerSkill).filter(OwnerSkill.id == remove_id).first()

    if not skill:
        return {"error": "Skill not found"}

    response = {
        "id": skill.id,
        "name": skill.focus
    }

    db.delete(skill)
    db.commit()

    return response
