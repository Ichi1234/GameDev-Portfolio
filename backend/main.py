from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

from backend.app.data.database import engine, Base
from backend.app.application.routers import test_router, user_router

app = FastAPI()

app.mount("/storage", StaticFiles(directory="storage"), name="storage")


Base.metadata.create_all(bind=engine)

app.include_router(user_router.role_router)
app.include_router(test_router.router)