from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import os

from backend.app.data.database import get_db
from backend.app.data.models.user_model import User, Role
from backend.app.application.security import verify_google_token, create_access_token

auth_router = APIRouter(prefix="/auth", tags=["Auth"])


@auth_router.post("/google")
def google_auth(body: dict, db: Session = Depends(get_db)):
    token = body.get("token")
    role_name = body.get("role")
    if not token:
        raise HTTPException(status_code=400, detail="token required")

    user_info = verify_google_token(token)

    email = user_info.get("email")
    google_id = user_info.get("sub")

    main_email = os.getenv("MAIN_EMAIL")
    if main_email and email and email.lower() == main_email.lower():
        role_name = "developer"

    if not email:
        raise HTTPException(status_code=400, detail="google token missing email")

    user = db.query(User).filter(User.email == email).first()

    if not user:
        user = User(
            email=email,
            google_id=google_id,
            username=user_info.get("name"),
        )
        if role_name:
            role_obj = db.query(Role).filter(Role.name == role_name).first()
            if not role_obj:
                role_obj = Role(name=role_name)
                db.add(role_obj)
                db.commit()
                db.refresh(role_obj)
            user.role_id = role_obj.id
        db.add(user)
        db.commit()
        db.refresh(user)
    else:
        if role_name and not user.role_id:
            role_obj = db.query(Role).filter(Role.name == role_name).first()
            if not role_obj:
                role_obj = Role(name=role_name)
                db.add(role_obj)
                db.commit()
                db.refresh(role_obj)
            user.role_id = role_obj.id
            db.add(user)
            db.commit()
            db.refresh(user)

        role_obj = None
        if user.role_id:
            role_obj = db.query(Role).filter(Role.id == user.role_id).first()
        if not role_obj:
            default_role = 'visitor'
            role_obj = db.query(Role).filter(Role.name == default_role).first()
            if not role_obj:
                role_obj = Role(name=default_role)
                db.add(role_obj)
                db.commit()
                db.refresh(role_obj)
            user.role_id = role_obj.id
            db.add(user)
            db.commit()
            db.refresh(user)

    role_obj = db.query(Role).filter(Role.id == user.role_id).first() if user.role_id else None
    if not role_obj:
        default_role = 'visitor'
        role_obj = db.query(Role).filter(Role.name == default_role).first()
        if not role_obj:
            role_obj = Role(name=default_role)
            db.add(role_obj)
            db.commit()
            db.refresh(role_obj)
        user.role_id = role_obj.id
        db.add(user)
        db.commit()
        db.refresh(user)

    access_token = create_access_token({
        "user_id": user.id,
        "email": user.email,
        "role": role_obj.name if role_obj else None,
    })

    return {
        "access_token": access_token,
        "role": role_obj.name if role_obj else None,
        "user": {
            "id": user.id,
            "email": user.email,
            "username": user.username,
        },
    }
