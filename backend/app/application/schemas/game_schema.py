from pydantic import BaseModel
import datetime

from typing import List, Optional

class ChangelogItem(BaseModel):
    version: str
    description: str
    date: Optional[datetime.date] = None


class GameCreate(BaseModel):
    title: str
    description: str
    game_file: Optional[str] = None
    cover_img: Optional[str] = None
    start_date: Optional[datetime.date] = None
    release_date: Optional[datetime.date] = None
    repository_link: Optional[str] = None
    type: Optional[str] = None
    tags: List[str] = []
    platforms: List[str] = []
    photos: List[str] = []
    videos: List[str] = []
    changelogs: List[ChangelogItem] = []


class GameTagCreate(BaseModel):
    name : str


class GamePlatformCreate(BaseModel):
    name : str
