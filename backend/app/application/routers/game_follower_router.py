from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.app.data.database import get_db
from backend.app.application.schemas.game_schema import GameFollowCreate
from backend.app.application.security import require_role
from backend.app.application.services.game_follower_service import subscribe_game as svc_subscribe_game, unsubscribe_game as svc_unsubscribe_game

router = APIRouter(prefix="/follow", tags=["Follow"])


@router.post("/")
def subscribe_game(body: GameFollowCreate, db: Session = Depends(get_db), _user=Depends(require_role('visitor'))):
    return svc_subscribe_game(body, db, _user)


@router.delete("/")
def unsubscribe_game(game_id: int, db: Session = Depends(get_db), _user=Depends(require_role('visitor'))):
    return svc_unsubscribe_game(game_id, db, _user)
