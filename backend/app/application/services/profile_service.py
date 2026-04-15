from sqlalchemy.orm import Session
from backend.app.data.models.profile_model import OwnerProfile, OwnerFocus, OwnerSkill

def create_profile(body, db: Session, _user=None):
    profile = OwnerProfile(
        name=body.name,
        hero_title=body.hero_title,
        main_quote=body.main_quote,
        sub_quote=body.sub_quote,
        introduction=body.introduction,
        github_link=body.github_link,
    )

    db.add(profile)
    db.commit()
    db.refresh(profile)

    return {
        "name": profile.name,
        "hero_title": profile.hero_title,
        "main_quote": profile.main_quote,
        "sub_quote": profile.sub_quote,
        "introduction": profile.introduction,
        "github_link": profile.github_link,
    }


def change_profile(body, db: Session, _user=None):
    profile = db.query(OwnerProfile).first()

    if not profile:
        return {"error": "Profile not found"}

    profile.name = body.name
    profile.hero_title = body.hero_title
    profile.main_quote = body.main_quote
    profile.sub_quote = body.sub_quote
    profile.introduction = body.introduction
    profile.github_link = body.github_link

    db.commit()
    db.refresh(profile)

    return {
        "name": profile.name,
        "hero_title": profile.hero_title,
        "main_quote": profile.main_quote,
        "sub_quote": profile.sub_quote,
        "introduction": profile.introduction,
        "github_link": profile.github_link,
    }


def get_profile(db: Session):
    profile = db.query(OwnerProfile).first()
    skills = db.query(OwnerSkill).all()
    focuses = db.query(OwnerFocus).all()

    if not profile:
        return {"error": "No profile found"}

    return {
        "name": profile.name,
        "hero_title": profile.hero_title,
        "main_quote": profile.main_quote,
        "sub_quote": profile.sub_quote,
        "introduction": profile.introduction,
        "github_link": profile.github_link,
        "core_skills": [{"id": s.id, "name": s.skill, "description": s.description} for s in skills],
        "current_focus": [{"id": f.id, "name": f.focus} for f in focuses],
    }
