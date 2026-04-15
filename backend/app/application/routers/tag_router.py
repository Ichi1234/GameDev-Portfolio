from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.app.data.database import get_db
from backend.app.application.schemas.game_schema import GameTagCreate
from backend.app.application.security import require_role
from backend.app.application.services.tag_service import create_tag as svc_create_tag, delete_tag as svc_delete_tag, get_tag as svc_get_tag

router = APIRouter(prefix="/tag", tags=["Tag"])


@router.post("/")
def create_tag(body: GameTagCreate, db: Session = Depends(get_db), _user=Depends(require_role('developer'))):
    return svc_create_tag(body, db, _user)


@router.delete("/{remove_id}")
def delete_tag(remove_id: int, db: Session = Depends(get_db), _user=Depends(require_role('developer'))):
    return svc_delete_tag(remove_id, db, _user)


@router.get("/")
def get_tag(db: Session = Depends(get_db)):
    return svc_get_tag(db)
