from fastapi import APIRouter

router = APIRouter(prefix="/tests", tags=["Test"])

@router.get("/")
def get_tests():
    return {"message": "Hello HUMANNN"}