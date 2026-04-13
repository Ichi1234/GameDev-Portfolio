from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.app.data.database import get_db
from backend.app.application.schemas.profile_schema import ProfileCreate
from backend.app.application.security import require_role
from backend.app.application.services.profile_service import create_profile as svc_create_profile, change_profile as svc_change_profile, get_profile as svc_get_profile

router = APIRouter(prefix="/profiles", tags=["Profiles"])


@router.post("/")
def create_profile(body: ProfileCreate, db: Session = Depends(get_db), _user=Depends(require_role('developer'))):
    return svc_create_profile(body, db, _user)

@router.put("/")
def change_profile(body: ProfileCreate, db: Session = Depends(get_db), _user=Depends(require_role('developer'))):
    return svc_change_profile(body, db, _user)


@router.get("/")
def get_profile(db: Session = Depends(get_db)):
    return svc_get_profile(db)
