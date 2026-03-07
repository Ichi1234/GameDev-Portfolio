from fastapi import FastAPI
from app.infrastructure.database import engine, Base
from app.presentation.routers import role_router

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.include_router(role_router.router)