from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.app.data.database import get_db
from backend.app.application.schemas.game_schema import GamePlatformCreate
from backend.app.application.security import require_role
from backend.app.application.services.platform_service import create_platform as svc_create_platform, delete_platform as svc_delete_platform, get_platform as svc_get_platform

router = APIRouter(prefix="/platform", tags=["Platform"])


@router.post("/")
def create_platform(body: GamePlatformCreate, db: Session = Depends(get_db), _user=Depends(require_role('developer'))):
    return svc_create_platform(body, db, _user)


@router.delete("/{remove_id}")
def delete_platform(remove_id: int, db: Session = Depends(get_db), _user=Depends(require_role('developer'))):
    return svc_delete_platform(remove_id, db, _user)


@router.get("/")
def get_platform(db: Session = Depends(get_db)):
    return svc_get_platform(db)
