import os
import shutil

from pathlib import Path
from typing import Optional, List
from fastapi import APIRouter, Depends, UploadFile, File
from sqlalchemy.orm import Session
from backend.app.data.database import get_db
from backend.app.data.models.game_model import Game, GameTag, GamePlatform, GameChangelog, GamePhoto, GameVideo
from backend.app.data.models.tag_platform_model import Tag, Platform
from backend.app.application.schemas.game_schema import GameCreate


STORAGE_BASE = Path(__file__).resolve().parents[4] / "backend" / "storage" / "games"

router = APIRouter(prefix="/games", tags=["Games"])

@router.get("/")
def get_game(db: Session = Depends(get_db)):
    games = db.query(Game).all()

    if not games:
        return {"error": "No games found"}

    result = []
    for g in games:
        tag_links = db.query(GameTag).filter(GameTag.game_id == g.id).all()
        tags = []
        for tl in tag_links:
            tag = db.query(Tag).filter(Tag.id == tl.tag_id).first()
            if tag:
                tags.append(tag.name)

        plat_links = db.query(GamePlatform).filter(GamePlatform.game_id == g.id).all()
        platforms = []
        for pl in plat_links:
            platform = db.query(Platform).filter(Platform.id == pl.platform_id).first()
            if platform:
                platforms.append(platform.name)

        photos = [p.file_path for p in db.query(GamePhoto).filter(GamePhoto.game_id == g.id).all()]
        videos = [v.file_path for v in db.query(GameVideo).filter(GameVideo.game_id == g.id).all()]
        changelogs = [
            {
                "id": c.id,
                "version": c.version,
                "description": c.description,
                "date": c.date.isoformat() if c.date else None,
            }
            for c in db.query(GameChangelog).filter(GameChangelog.game_id == g.id).all()
        ]

        result.append(
            {
                "id": g.id,
                "title": g.title,
                "description": g.description,
                "download_path": g.download_path,
                "cover_img_path": g.cover_img_path,
                "start_date": g.start_date.isoformat() if g.start_date else None,
                "release_date": g.release_date.isoformat() if g.release_date else None,
                "repository_link": g.repository_link,
                "status": g.status,
                "type": g.type,
                "tags": tags,
                "platforms": platforms,
                "photos": photos,
                "videos": videos,
                "changelogs": changelogs,
            }
        )

    return result



@router.post("/")
def create_game(
    body: GameCreate,
    game_file: Optional[UploadFile] = File(None),
    cover_img: Optional[UploadFile] = File(None),
    photos: List[UploadFile] = File(default=[]),
    videos: List[UploadFile] = File(default=[]),
    db: Session = Depends(get_db),
):
    game = Game(
        title=body.title,
        description=body.description,
        download_path=None,
        cover_img_path=None,
        type=body.type,
        start_date=body.start_date,
        release_date=body.release_date,
        repository_link=body.repository_link,
        status=body.status,
    )

    db.add(game)
    db.commit()
    db.refresh(game)

    safe_name = body.title.replace(" ", "_").lower()
    target_dir = STORAGE_BASE / safe_name
    os.makedirs(target_dir, exist_ok=True)

    def _save_upload_file(upload: UploadFile) -> Optional[str]:
        if not upload:
            return None
        dest = target_dir / upload.filename
        try:
            with open(dest, "wb") as out:
                shutil.copyfileobj(upload.file, out)
            return f"/storage/games/{safe_name}/{upload.filename}"
        except Exception:
            return None

    if game_file:
        saved_game = _save_upload_file(game_file)
        if saved_game:
            game.download_path = saved_game
            db.commit()
            db.refresh(game)

    for name in body.tags or []:
        tag = db.query(Tag).filter(Tag.name == name).first()
        if not tag:
            tag = Tag(name=name)
            db.add(tag)
            db.commit()
            db.refresh(tag)

        gt = GameTag(game_id=game.id, tag_id=tag.id)
        db.add(gt)

    for name in body.platforms or []:
        plat = db.query(Platform).filter(Platform.name == name).first()
        if not plat:
            plat = Platform(name=name)
            db.add(plat)
            db.commit()
            db.refresh(plat)

        gp = GamePlatform(game_id=game.id, platform_id=plat.id)
        db.add(gp)

    if cover_img:
        saved_cover = _save_upload_file(cover_img)
        if saved_cover:
            game.cover_img_path = saved_cover
            db.commit()
            db.refresh(game)

    for file in photos or []:
        saved = _save_upload_file(file)
        if saved:
            db.add(GamePhoto(game_id=game.id, file_path=saved))

    for file in videos or []:
        saved = _save_upload_file(file)
        if saved:
            db.add(GameVideo(game_id=game.id, file_path=saved))

    for c in body.changelogs or []:
        changelog = GameChangelog(
            game_id=game.id,
            version=c.version,
            description=c.description,
            date=c.date,
        )
        db.add(changelog)

    db.commit()

    return {"id": game.id}


