import os
import html
import smtplib
from email.mime.text import MIMEText
from dotenv import load_dotenv
from pathlib import Path

base = Path(__file__).resolve().parents[2]
dotenv_path = base / ".env"
if dotenv_path.exists():
    load_dotenv(dotenv_path)
else:
    load_dotenv()


def send_email(subject: str, body: str, sender_email: str | None = None) -> tuple[bool, str | None]:
    """Send an email using configured environment variables.

    Returns a tuple (success: bool, detail: Optional[str]). On success detail is None.
    """
    EMAIL_HOST = os.getenv("EMAIL_HOST")
    EMAIL_PORT = int(os.getenv("EMAIL_PORT")) if os.getenv("EMAIL_PORT") else 587
    EMAIL_USER = os.getenv("MAIN_EMAIL")
    EMAIL_PASS = os.getenv("EMAIL_SYSTEM_PASSWORD")

    recipients_raw = os.getenv("JOB_CONTACT_EMAIL_RECIPIENTS") or ""
    recipients = [r.strip() for r in recipients_raw.split(",") if r.strip()]
    if not recipients:
        return False, "JOB_CONTACT_EMAIL_RECIPIENTS not configured"

    if not EMAIL_HOST:
        return False, "EMAIL_HOST not configured"
    if not EMAIL_USER:
        return False, "MAIN_EMAIL (EMAIL user) not configured"


    safe_subject = html.escape(subject)
    safe_body = html.escape(body)

    full_body = f"""
        <h1>{safe_subject}</h1>
        <p>{safe_body}</p>
    """
    msg = MIMEText(full_body, "html")

    msg["Subject"] = f"JOB CONTACT FROM PORTFOLIO : {sender_email}"

    msg["From"] = EMAIL_USER

    msg["Reply-To"] = sender_email

    msg["To"] = ", ".join(recipients)

    try:
        if EMAIL_PORT == 465:
            with smtplib.SMTP_SSL(EMAIL_HOST, EMAIL_PORT) as server:
                if EMAIL_PASS:
                    server.login(EMAIL_USER, EMAIL_PASS)
                server.sendmail(EMAIL_USER, recipients, msg.as_string())
        else:
            with smtplib.SMTP(EMAIL_HOST, EMAIL_PORT) as server:
                server.ehlo()
                server.starttls()
                server.ehlo()
                if EMAIL_PASS:
                    server.login(EMAIL_USER, EMAIL_PASS)
                server.sendmail(EMAIL_USER, recipients, msg.as_string())
        return True, None
    except Exception as exc:
        return False, str(exc)
