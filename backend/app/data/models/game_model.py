from sqlalchemy import Column, Integer, String, Date
from backend.app.data.database import Base


class Game(Base):
    __tablename__ = "games"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    description = Column(String)
    download_link = Column(String)
    cover_img_path = Column(String)
    type = Column(String)
    start_date = Column(Date)
    release_date = Column(Date)
    repository_link = Column(String)


class GameTag(Base):
    __tablename__ = "game_tags"

    game_id = Column(Integer, primary_key=True)
    tag_id = Column(Integer, primary_key=True)


class GamePlatform(Base):
    __tablename__ = "game_platforms"

    game_id = Column(Integer, primary_key=True)
    platform_id = Column(Integer, primary_key=True)


class GamePhoto(Base):
    __tablename__ = "game_photos"

    id = Column(Integer, primary_key=True, index=True)
    game_id = Column(Integer)
    file_path = Column(String)


class GameVideo(Base):
    __tablename__ = "game_videos"

    id = Column(Integer, primary_key=True, index=True)
    game_id = Column(Integer)
    file_path = Column(String)   


class GameChangelog(Base):
    __tablename__ = "game_changelogs"

    id = Column(Integer, primary_key=True, index=True)
    game_id = Column(Integer)
    version = Column(String)
    description = Column(String)
    date = Column(Date)


class GameFollow(Base):
    __tablename__ = "game_follows"

    game_id = Column(Integer, primary_key=True)
    user_id = Column(Integer, primary_key=True)