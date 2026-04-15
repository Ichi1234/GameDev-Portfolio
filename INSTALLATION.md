# Installation Guide

This repository supports two ways to run the project:

- Standard (local development): run backend and frontend locally.
- Docker (recommended for reproducible environments): run both services with Docker Compose.

Before you start: create `.env` files for both services (see examples in `backend/sameple-env.txt` and `frontend/sameple-env.txt`).

---

## 1) Standard local development

Prerequisites:
- Python 3.11+
- Node.js >= 20.9.0

Backend (FastAPI)

```bash
cd backend
python -m venv venv
```

## Activate Environment
```bash
# Mac / Linux
source venv/bin/activate
```
```bash
# Windows PowerShell
./venv./Scripts./Activate.ps1
```

## Install Dependency
pip install -r requirements.txt

## Go to Project Root then run the backend
```bash
uvicorn backend.main:app --reload
```

Backend will be available at `http://localhost:8000`.

Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev
```

Frontend will be available at `http://localhost:3000`.


---

## 2) Docker Compose (recommended)

Prerequisites:
- Docker Engine and Docker Compose (v2)

Setup:

1. Create `.env` files for both services:
_ID`.

2. Build and start containers (compose reads per-service `env_file` entries):

```bash
docker compose --env-file ./frontend/.env up --build -d
```

Stopping and cleanup:

```bash
docker compose down
```

