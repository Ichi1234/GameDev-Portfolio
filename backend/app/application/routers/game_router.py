import os
import shutil
import json

from pathlib import Path
from typing import Optional, List
from fastapi import APIRouter, Depends, UploadFile, File, Form
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
    body: str = Form(...),
    game_file: Optional[UploadFile] = File(None),
    cover_img: Optional[UploadFile] = File(None),
    photos: List[UploadFile] = File(default=[]),
    videos: List[UploadFile] = File(default=[]),
    db: Session = Depends(get_db),
):
    try:
        body_data = json.loads(body)
    except Exception:
        body_data = {}

    body = GameCreate.parse_obj(body_data)

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


@router.delete("/{remove_id}")
def delete_game(remove_id: int, db: Session = Depends(get_db)):
    game = db.query(Game).filter(Game.id == remove_id).first()

    if not game:
        return {"error": "Game not found"}

    response = {"id": game.id, "name": game.title}

    def _resolve(path_str: Optional[str]) -> Optional[Path]:
        if not path_str:
            return None
        rel = path_str.replace("/storage/games/", "").lstrip("/")
        return STORAGE_BASE / rel

    try:
        cover_path = _resolve(game.cover_img_path)
        if cover_path and cover_path.exists():
            cover_path.unlink()
    except Exception:
        pass

    try:
        download_path = _resolve(game.download_path)
        if download_path and download_path.exists():
            download_path.unlink()
    except Exception:
        pass

    photos = db.query(GamePhoto).filter(GamePhoto.game_id == game.id).all()
    for p in photos:
        try:
            p_path = _resolve(p.file_path)
            if p_path and p_path.exists():
                p_path.unlink()
        except Exception:
            pass
        try:
            db.delete(p)
        except Exception:
            pass

    videos = db.query(GameVideo).filter(GameVideo.game_id == game.id).all()
    for v in videos:
        try:
            v_path = _resolve(v.file_path)
            if v_path and v_path.exists():
                v_path.unlink()
        except Exception:
            pass
        try:
            db.delete(v)
        except Exception:
            pass

    changelogs = db.query(GameChangelog).filter(GameChangelog.game_id == game.id).all()
    for c in changelogs:
        try:
            db.delete(c)
        except Exception:
            pass

    tag_links = db.query(GameTag).filter(GameTag.game_id == game.id).all()
    for tl in tag_links:
        try:
            db.delete(tl)
        except Exception:
            pass

    plat_links = db.query(GamePlatform).filter(GamePlatform.game_id == game.id).all()
    for pl in plat_links:
        try:
            db.delete(pl)
        except Exception:
            pass

    safe_name = None
    candidates = [game.cover_img_path, game.download_path]
    candidates += [p.file_path for p in photos]
    candidates += [v.file_path for v in videos]
    for c in candidates:
        if c:
            rel = c.replace("/storage/games/", "").lstrip("/")
            parts = rel.split("/", 1)
            if parts:
                safe_name = parts[0]
                break

    if safe_name:
        try:
            dir_path = STORAGE_BASE / safe_name
            if dir_path.exists():
                shutil.rmtree(dir_path)
        except Exception:
            pass

    db.delete(game)
    db.commit()

    return response
    

@router.put("/{game_id}")
def update_game(
    game_id: int,
    body: str = Form(...),
    game_file: Optional[UploadFile] = File(None),
    cover_img: Optional[UploadFile] = File(None),
    photos: List[UploadFile] = File(default=[]),
    videos: List[UploadFile] = File(default=[]),
    photos_to_delete: Optional[str] = Form(None),
    videos_to_delete: Optional[str] = Form(None),
    db: Session = Depends(get_db),
):
    try:
        body_data = json.loads(body)
    except Exception:
        body_data = {}

    body = GameCreate.parse_obj(body_data)

    game = db.query(Game).filter(Game.id == game_id).first()
    game = db.query(Game).filter(Game.id == game_id).first()
    if not game:
        return {"error": "Game not found"}

    old_title = game.title or ""

    game.title = body.title
    game.description = body.description
    game.type = body.type
    game.start_date = body.start_date
    game.release_date = body.release_date
    game.repository_link = body.repository_link
    game.status = body.status

    new_title = body.title or ""
    old_safe = old_title.replace(" ", "_").lower() if old_title else None
    new_safe = new_title.replace(" ", "_").lower()

    def _replace_storage_path(path: Optional[str], old: str, new: str) -> Optional[str]:
        if not path:
            return None
        return path.replace(f"/storage/games/{old}/", f"/storage/games/{new}/")

    if old_title and old_title != new_title:
        game.download_path = _replace_storage_path(game.download_path, old_safe, new_safe)
        game.cover_img_path = _replace_storage_path(game.cover_img_path, old_safe, new_safe)

        photos = db.query(GamePhoto).filter(GamePhoto.game_id == game.id).all()
        for p in photos:
            p.file_path = _replace_storage_path(p.file_path, old_safe, new_safe)

        videos = db.query(GameVideo).filter(GameVideo.game_id == game.id).all()
        for v in videos:
            v.file_path = _replace_storage_path(v.file_path, old_safe, new_safe)

        db.commit()
        db.refresh(game)

        old_dir = STORAGE_BASE / old_safe
        new_dir = STORAGE_BASE / new_safe
        try:
            if old_dir.exists():
                os.makedirs(new_dir.parent, exist_ok=True)
                try:
                    shutil.move(str(old_dir), str(new_dir))
                except Exception:
                    # fallback: move contents into new_dir
                    os.makedirs(new_dir, exist_ok=True)
                    for item in old_dir.iterdir():
                        shutil.move(str(item), str(new_dir))
                    try:
                        old_dir.rmdir()
                    except Exception:
                        pass
        except Exception:
            pass

    safe_name = new_safe
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

    def _resolve(path_str: Optional[str]) -> Optional[Path]:
        if not path_str:
            return None
        rel = path_str.replace("/storage/games/", "").lstrip("/")
        return STORAGE_BASE / rel

    if photos_to_delete:
        for item in photos_to_delete.split(","):
            name = item.strip()
            if not name:
                continue
            for p in db.query(GamePhoto).filter(GamePhoto.game_id == game.id).all():
                try:
                    if p.file_path == name or p.file_path.endswith(f"/{name}") or p.file_path.endswith(name):
                        p_path = _resolve(p.file_path)
                        if p_path and p_path.exists():
                            p_path.unlink()
                        db.delete(p)
                except Exception:
                    pass

    if videos_to_delete:
        for item in videos_to_delete.split(","):
            name = item.strip()
            if not name:
                continue
            for v in db.query(GameVideo).filter(GameVideo.game_id == game.id).all():
                try:
                    if v.file_path == name or v.file_path.endswith(f"/{name}") or v.file_path.endswith(name):
                        v_path = _resolve(v.file_path)
                        if v_path and v_path.exists():
                            v_path.unlink()
                        db.delete(v)
                except Exception:
                    pass

    if game_file:
        if game.download_path:
            try:
                rel = game.download_path.replace("/storage/games/", "")
                old_path = STORAGE_BASE / rel
                if old_path.exists():
                    old_path.unlink()
            except Exception:
                pass

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
        if game.cover_img_path:
            try:
                rel = game.cover_img_path.replace("/storage/games/", "")
                old_cover = STORAGE_BASE / rel
                if old_cover.exists():
                    old_cover.unlink()
            except Exception:
                pass

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
