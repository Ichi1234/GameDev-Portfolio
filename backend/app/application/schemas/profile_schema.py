from pydantic import BaseModel

class ProfileCreate(BaseModel):
    name : str
    main_quote : str
    sub_quote : str
    introduction : str
    github_link : str

class SkillCreate(BaseModel):
    name : str
    description : str

class FocusCreate(BaseModel):
    name : str