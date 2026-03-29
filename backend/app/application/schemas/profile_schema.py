from pydantic import BaseModel

class ProfileCreate(BaseModel):
    portfolio_title : str
    main_quote : str
    sub_quote : str
    introduction : str
    github_link : str
    core_skills : list[dict]  
    current_focus : list[dict]
    