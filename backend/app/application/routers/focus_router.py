from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.app.data.database import get_db
from backend.app.application.schemas.profile_schema import FocusCreate
from backend.app.application.security import require_role
from backend.app.application.services.focus_service import create_focus as svc_create_focus, delete_focus as svc_delete_focus, get_focus as svc_get_focus

router = APIRouter(prefix="/focus", tags=["Focus"])


@router.post("/")
def create_focus(body: FocusCreate, db: Session = Depends(get_db), _user=Depends(require_role('developer'))):
    return svc_create_focus(body, db, _user)


@router.delete("/{remove_id}")
def delete_focus(remove_id: int, db: Session = Depends(get_db), _user=Depends(require_role('developer'))):
    return svc_delete_focus(remove_id, db, _user)


@router.get("/")
def get_focus(db: Session = Depends(get_db)):
    return svc_get_focus(db)
