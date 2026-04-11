from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base


DATABASE_URL = "sqlite:///./app.db"

engine = create_engine(
    DATABASE_URL, connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def seed_default_roles():
    """Ensure default roles exist in the database: visitor, recruiter, developer."""
    from backend.app.data.models.user_model import Role

    db = SessionLocal()
    try:
        for name in ("visitor", "recruiter", "developer"):
            exists = db.query(Role).filter(Role.name == name).first()
            if not exists:
                r = Role(name=name)
                db.add(r)
        db.commit()
    finally:
        db.close()
        