from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel

from backend.app.application.services.email_service import send_email
from backend.app.application.security import get_current_user


router = APIRouter()


class EmailRequest(BaseModel):
    subject: str
    message: str


@router.post("/send-email")
def send_email_api(data: EmailRequest, payload=Depends(get_current_user)):
    sender_email = None
    if isinstance(payload, dict):
        sender_email = payload.get("email")
        user_role = payload.get("role")
    else:
        user_role = None
    if not sender_email:
        raise HTTPException(status_code=401, detail="Authenticated user email not found in token")

    if user_role != "recruiter":
        raise HTTPException(status_code=403, detail="Only users with recruiter role can send job contact messages")

    ok, detail = send_email(data.subject, data.message, sender_email)
    if not ok:
        raise HTTPException(status_code=500, detail=f"Failed to send email: {detail or 'unknown error'}")
    return {"message": "Emails sent successfully"}
