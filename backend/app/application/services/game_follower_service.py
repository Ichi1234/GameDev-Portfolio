from sqlalchemy.orm import Session
from backend.app.data.models.game_model import GameFollow

def subscribe_game(body, db: Session, _user=None):

    user_id = int(_user.get("user_id"))

    existing = db.query(GameFollow).filter(GameFollow.game_id == body.game_id, GameFollow.user_id == user_id).first()
    if existing:
        return {"game_id": existing.game_id, "user_id": existing.user_id}

    subscribe = GameFollow(game_id=body.game_id, user_id=user_id)
    db.add(subscribe)
    db.commit()
    db.refresh(subscribe)

    return {"game_id": subscribe.game_id, "user_id": subscribe.user_id}


def unsubscribe_game(game_id: int, db: Session, _user=None):
    user_id = int(_user.get("user_id"))

    if not user_id:
        return {"error": "User not authenticated"}

    unsub = db.query(GameFollow).filter(GameFollow.game_id == game_id, GameFollow.user_id == int(user_id)).first()

    if not unsub:
        return {"error": "Subscribed data not found"}

    response = {"game_id": unsub.game_id, "user_id": unsub.user_id}

    db.delete(unsub)
    db.commit()

    return response
