from sqlalchemy.orm import Session
from backend.app.data.models.tag_platform_model import Platform

def create_platform(body, db: Session, _user=None):
    tag = Platform(
        name = body.name
    )

    db.add(tag)
    db.commit()
    db.refresh(tag)

    return {
        "id": tag.id,
        "name" : tag.name,
    }


def delete_platform(remove_id: int, db: Session, _user=None):
    tag = db.query(Platform).filter(Platform.id == remove_id).first()

    if not tag:
        return {"error": "Skill not found"}

    response = {
        "id": tag.id,
        "name": tag.name
    }

    db.delete(tag)
    db.commit()

    return response


def get_platform(db: Session):
    platforms = db.query(Platform).all()

    if not platforms:
        return []

    response = [{"id": p.id, "name": p.name} for p in platforms]

    return response
