from sqlalchemy import Column, Integer, String
from backend.app.data.models.database import Base

class Role(Base):
    __tablename__ = "roles"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
