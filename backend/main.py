from pathlib import Path
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

from backend.app.data.database import engine, Base
from backend.app.application.routers import test_router, user_router, profile_router, tag_router, platform_router, game_router, skill_router, focus_router, auth_router

app = FastAPI()


allowed_origins = [
	"http://localhost:3000",
	"http://127.0.0.1:3000",
]

app.add_middleware(
	CORSMiddleware,
	allow_origins=allowed_origins,
	allow_credentials=True,
	allow_methods=["*"],
	allow_headers=["*"],
)

storage_dir = Path(__file__).resolve().parent / "storage"
if storage_dir.exists():
	app.mount("/storage", StaticFiles(directory=str(storage_dir)), name="storage")

Base.metadata.create_all(bind=engine)

app.include_router(user_router.role_router)
app.include_router(test_router.router)
app.include_router(profile_router.router)
app.include_router(game_router.router)

app.include_router(tag_router.router)
app.include_router(platform_router.router)
app.include_router(skill_router.router)
app.include_router(focus_router.router)
app.include_router(auth_router.auth_router)