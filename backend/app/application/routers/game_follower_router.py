from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.app.data.database import get_db
from backend.app.data.models.game_model import GameFollow
from backend.app.application.schemas.game_schema import GameFollowCreate
from backend.app.application.security import require_role

router = APIRouter(prefix="/follow", tags=["Follow"])


@router.post("/")
def subscribe_game(body: GameFollowCreate, db: Session = Depends(get_db), _user=Depends(require_role('visitor'))):
    subscribe = GameFollow(
        game_id = body.game_id,
        user_id = body.user_id
    )

    db.add(subscribe)
    db.commit()
    db.refresh(subscribe)

    return {
        "game_id": subscribe.game_id,
        "user_id" : subscribe.user_id
    }


@router.delete("/")
def unsubscribe_game(game_id: int, user_id: int, db: Session = Depends(get_db), _user=Depends(require_role('visitor'))):
    unsub = db.query(GameFollow).filter(GameFollow.game_id == game_id and GameFollow.user_id == user_id).first()

    if not unsub:
        return {"error": "Subscribed data not found"}

    response = {
        "game_id": unsub.game_id,
        "user_id": unsub.user_id
    }

    db.delete(unsub)
    db.commit()

    return response

@router.get("/")
def get_all_subscriber(game_id: int, db: Session = Depends(get_db)):
    subscriber = db.query(GameFollow).filter(GameFollow.game_id == game_id).all()

    if not subscriber:
        return []

    return subscriber
