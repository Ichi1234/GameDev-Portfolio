from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.app.data.database import get_db
from backend.app.data.models.profile_model import OwnerFocus
from backend.app.application.schemas.profile_schema import FocusCreate

router = APIRouter(prefix="/focus", tags=["Focus"])


@router.post("/")
def create_focus(body: FocusCreate, db: Session = Depends(get_db)):
    focus = OwnerFocus(
        focus = body.name
    )

    db.add(focus)
    db.commit()
    db.refresh(focus)

    return {
        "id": focus.id,
        "name" : focus.focus
    }


@router.delete("/{remove_id}")
def delete_focus(remove_id: int, db: Session = Depends(get_db)):
    focus = db.query(OwnerFocus).filter(OwnerFocus.id == remove_id).first()

    if not focus:
        return {"error": "Focus not found"}

    response = {
        "id": focus.id,
        "name": focus.focus
    }

    db.delete(focus)
    db.commit()

    return response


@router.get("/")
def get_focus(db: Session = Depends(get_db)):
    focuses = db.query(OwnerFocus).all()

    if not focuses:
        return []

    response = [{"id": f.id, "name": f.focus} for f in focuses]

    return response
