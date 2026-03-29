from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.app.data.database import get_db
from backend.app.data.models.profile_model import OwnerProfile, OwnerFocus, OwnerSkill
from backend.app.application.schemas.profile_schema import ProfileCreate

router = APIRouter(prefix="/profiles", tags=["Profiles"])


@router.post("/")
def create_profile(body: ProfileCreate, db: Session = Depends(get_db)):
    profile = OwnerProfile(
        portfolio_title=body.portfolio_title,
        main_quote=body.main_quote,
        sub_quote=body.sub_quote,
        introduction=body.introduction,
        github_link=body.github_link,
    )

    db.add(profile)
    db.commit()
    db.refresh(profile)

    created_skills = []
    if body.core_skills:
        for s in body.core_skills:
            skill = OwnerSkill(skill=s)
            db.add(skill)
            created_skills.append(s)

    created_focuses = []
    if body.current_focus:
        for f in body.current_focus:
            focus = OwnerFocus(focus=f)
            db.add(focus)
            created_focuses.append(focus)

    if created_skills or created_focuses:
        db.commit()

    return {
        "portfolio_title": profile.portfolio_title,
        "main_quote": profile.main_quote,
        "sub_quote": profile.sub_quote,
        "introduction": profile.introduction,
        "github_link": profile.github_link,
        "core_skills": created_skills,
        "current_focus": created_focuses,
    }


@router.get("/")
def get_profile(db: Session = Depends(get_db)):
    profile = db.query(OwnerProfile).first()
    skills = db.query(OwnerSkill).all()
    focuses = db.query(OwnerFocus).all()

    if not profile:
        return {"error": "No profile found"}

    return {
        "portfolio_title": profile.portfolio_title,
        "main_quote": profile.main_quote,
        "sub_quote": profile.sub_quote,
        "introduction": profile.introduction,
        "github_link": profile.github_link,
        "core_skills": [{s.skill, s.description} for s in skills],
        "current_focus": [f.focus for f in focuses],
    }
