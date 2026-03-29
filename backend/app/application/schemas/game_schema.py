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
    download_path: Optional[str] = None
    cover_img_path: Optional[str] = None
    start_date: Optional[datetime.date] = None
    release_date: Optional[datetime.date] = None
    repository_link: Optional[str] = None
    status: Optional[str] = None
    type: Optional[str] = None
    tags: List[str] = []
    platforms: List[str] = []
    photos: List[str] = []
    videos: List[str] = []
    changelogs: List[ChangelogItem] = []
