from sqlalchemy import Column, Integer, String, ForeignKey
from backend.app.data.database import Base


class Role(Base):
    __tablename__ = "roles"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)


class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    
    email = Column(String, unique=True, index=True, nullable=False)

    username = Column(String, nullable=True)
    
    google_id = Column(String, unique=True, nullable=True)
    
    role_id = Column(Integer, ForeignKey("roles.id"))
    
