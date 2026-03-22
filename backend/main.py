from fastapi import FastAPI
from backend.app.data.database import engine, Base
from backend.app.application.routers import test_router, user_router

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.include_router(user_router.role_router)
app.include_router(test_router.router)