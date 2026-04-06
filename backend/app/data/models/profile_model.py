from sqlalchemy import Column, Integer, String
from backend.app.data.database import Base


class OwnerProfile(Base):
    __tablename__ = "profiles"
    
    id = Column(Integer, primary_key=True, index=True)
    portfolio_title = Column(String)
    main_quote = Column(String)
    sub_quote = Column(String)
    introduction = Column(String)
    github_link = Column(String)


class OwnerSkill(Base):
    __tablename__ = "skills"

    id = Column(Integer, primary_key=True, index=True)
    skill = Column(String)
    description = Column(String)


class OwnerFocus(Base):
    __tablename__ = "focuses"

    id = Column(Integer, primary_key=True, index=True)
    focus = Column(String)