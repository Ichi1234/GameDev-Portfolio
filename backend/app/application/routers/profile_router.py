from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.app.data.database import get_db
from backend.app.data.models.profile_model import OwnerProfile, OwnerFocus, OwnerSkill
from backend.app.application.schemas.profile_schema import ProfileCreate
from backend.app.application.security import require_role

router = APIRouter(prefix="/profiles", tags=["Profiles"])


@router.post("/")
def create_profile(body: ProfileCreate, db: Session = Depends(get_db), _user=Depends(require_role('developer'))):
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

    return {
        "portfolio_title": profile.portfolio_title,
        "main_quote": profile.main_quote,
        "sub_quote": profile.sub_quote,
        "introduction": profile.introduction,
        "github_link": profile.github_link,
    }

@router.put("/")
def change_profile(body: ProfileCreate, db: Session = Depends(get_db), _user=Depends(require_role('developer'))):
    profile = db.query(OwnerProfile).first()

    if not profile:
        return {"error": "Profile not found"}

    profile.portfolio_title = body.portfolio_title
    profile.main_quote = body.main_quote
    profile.sub_quote = body.sub_quote
    profile.introduction = body.introduction
    profile.github_link = body.github_link

    db.commit()
    db.refresh(profile)

    return {
        "portfolio_title": profile.portfolio_title,
        "main_quote": profile.main_quote,
        "sub_quote": profile.sub_quote,
        "introduction": profile.introduction,
        "github_link": profile.github_link,
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
        "core_skills": [{"id": s.id, "name": s.skill, "description": s.description} for s in skills],
        "current_focus": [{"id": f.id, "name": f.focus} for f in focuses],
    }
