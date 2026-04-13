from sqlalchemy.orm import Session
from backend.app.data.models.tag_platform_model import Tag

def create_tag(body, db: Session, _user=None):
    tag = Tag(
        name = body.name
    )

    db.add(tag)
    db.commit()
    db.refresh(tag)

    return {
        "id": tag.id,
        "name" : tag.name,
    }


def delete_tag(remove_id: int, db: Session, _user=None):
    tag = db.query(Tag).filter(Tag.id == remove_id).first()

    if not tag:
        return {"error": "Skill not found"}

    response = {
        "id": tag.id,
        "name": tag.name
    }

    db.delete(tag)
    db.commit()

    return response


def get_tag(db: Session):
    tags = db.query(Tag).all()

    if not tags:
        return []

    response = [{"id": t.id, "name": t.name} for t in tags]

    return response
