import os
import shutil
import json

from typing import Optional, List
from fastapi import APIRouter, Depends, UploadFile, File, Form
from sqlalchemy.orm import Session
from backend.app.data.database import get_db
from backend.app.application.security import require_role
from backend.app.application.services.game_service import get_game as svc_get_game, create_game as svc_create_game, delete_game as svc_delete_game, update_game as svc_update_game

router = APIRouter(prefix="/games", tags=["Games"])


@router.get("/")
def get_game(db: Session = Depends(get_db)):
    return svc_get_game(db)


@router.post("/")
def create_game(
    body: str = Form(...),
    cover_img: Optional[UploadFile] = File(None),
    photos: List[UploadFile] = File(default=[]),
    videos: List[UploadFile] = File(default=[]),
    db: Session = Depends(get_db),
    _user=Depends(require_role('developer')),
):
    return svc_create_game(body, cover_img, photos, videos, db, _user)


@router.delete("/{remove_id}")
def delete_game(remove_id: int, db: Session = Depends(get_db), _user=Depends(require_role('developer'))):
    return svc_delete_game(remove_id, db, _user)
    

@router.put("/{game_id}")
def update_game(
    game_id: int,
    body: str = Form(...),
    cover_img: Optional[UploadFile] = File(None),
    photos: List[UploadFile] = File(default=[]),
    videos: List[UploadFile] = File(default=[]),
    photos_to_delete: Optional[str] = Form(None),
    videos_to_delete: Optional[str] = Form(None),
    db: Session = Depends(get_db),
    _user=Depends(require_role('developer')),
):
    return svc_update_game(game_id, body, cover_img, photos, videos, photos_to_delete, videos_to_delete, db, _user)
