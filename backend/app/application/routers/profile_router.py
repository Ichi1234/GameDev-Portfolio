from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.app.data.database import get_db
from backend.app.data.models.profile_model import OwnerProfile, OwnerFocus, OwnerSkill
from backend.app.application.schemas.user_schema import RoleCreate

router = APIRouter(prefix="/profiles", tags=["Profiles"])

# @router.post("/")
# def create_role(role: RoleCreate, db: Session = Depends(get_db)):
#     new_role = Role(name=role.name)

#     db.add(new_role)
#     db.commit()
#     db.refresh(new_role)

#     return new_role


@router.get("/")
def get_profile(db: Session = Depends(get_db)):
    profile = db.query(OwnerProfile).first()
    skills = db.query(OwnerSkill).all()
    focuses = db.query(OwnerFocus).all()

    if not profile:
        return {"error": "No profile found"}

    return {
        "id": profile.id,
        "portfolio_title": profile.portfolio_title,
        "main_quote": profile.main_quote,
        "sub_quote": profile.sub_quote,
        "introduction": profile.introduction,
        "github_link": profile.github_link,
        "core_skills": [s.skill for s in skills],
        "current_focus": [f.focus for f in focuses],
    }