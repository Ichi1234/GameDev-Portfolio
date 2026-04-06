from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.app.data.database import get_db
from backend.app.data.models.tag_platform_model import Platform
from backend.app.application.schemas.game_schema import GamePlatformCreate

router = APIRouter(prefix="/platform", tags=["Platform"])


@router.post("/")
def create_tag(body: GamePlatformCreate, db: Session = Depends(get_db)):
    tag = Platform(
        name = body.name
    )

    db.add(tag)
    db.commit()
    db.refresh(tag)

    return {
        "id": tag.id,
        "name" : tag.skill,
    }


@router.delete("/")
def delete_tag(remove_id: int, db: Session = Depends(get_db)):
    tag = db.query(Platform).filter(Platform.id == remove_id).first()

    if not tag:
        return {"error": "Skill not found"}

    response = {
        "id": tag.id,
        "name": tag.focus
    }

    db.delete(tag)
    db.commit()

    return response
