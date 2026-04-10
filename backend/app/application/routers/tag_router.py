from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.app.data.database import get_db
from backend.app.data.models.tag_platform_model import Tag
from backend.app.application.schemas.game_schema import GameTagCreate

router = APIRouter(prefix="/tag", tags=["Tag"])


@router.post("/")
def create_tag(body: GameTagCreate, db: Session = Depends(get_db)):
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


@router.delete("/{remove_id}")
def delete_tag(remove_id: int, db: Session = Depends(get_db)):
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


@router.get("/")
def get_focus(db: Session = Depends(get_db)):
    tags = db.query(Tag).all()

    if not tags:
        return []

    response = [{"id": t.id, "name": t.name} for t in tags]

    return response
