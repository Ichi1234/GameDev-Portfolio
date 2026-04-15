from sqlalchemy.orm import Session
from backend.app.data.models.profile_model import OwnerFocus

def create_focus(body, db: Session, _user=None):
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


def delete_focus(remove_id: int, db: Session, _user=None):
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


def get_focus(db: Session):
    focuses = db.query(OwnerFocus).all()

    if not focuses:
        return []

    response = [{"id": f.id, "name": f.focus} for f in focuses]

    return response
