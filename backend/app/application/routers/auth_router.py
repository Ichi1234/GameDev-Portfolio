from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from backend.app.data.database import get_db
from backend.app.data.models.user_model import User
from backend.app.application.security import verify_google_token, create_access_token

auth_router = APIRouter(prefix="/auth", tags=["Auth"])


@auth_router.post("/google")
def google_auth(body: dict, db: Session = Depends(get_db)):
    token = body.get("token")
    if not token:
        raise HTTPException(status_code=400, detail="token required")

    user_info = verify_google_token(token)

    email = user_info.get("email")
    google_id = user_info.get("sub")

    if not email:
        raise HTTPException(status_code=400, detail="google token missing email")

    user = db.query(User).filter(User.email == email).first()

    if not user:
        user = User(
            email=email,
            google_id=google_id,
            username=user_info.get("name"),
        )
        db.add(user)
        db.commit()
        db.refresh(user)

    access_token = create_access_token({
        "user_id": user.id,
        "email": user.email,
    })

    return {"access_token": access_token}
