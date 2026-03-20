from fastapi import FastAPI
from backend.app.data.models.database import engine, Base
from backend.app.application.routers import role_router

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.include_router(role_router.router)