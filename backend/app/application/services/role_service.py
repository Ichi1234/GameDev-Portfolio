from sqlalchemy.orm import Session
from backend.app.data.models.user_model import Role

def create_role(role, db: Session):
    new_role = Role(name=role.name)

    db.add(new_role)
    db.commit()
    db.refresh(new_role)

    return new_role


def get_roles(db: Session):
    users = db.query(Role).all()
    return users
