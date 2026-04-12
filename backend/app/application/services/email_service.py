import os
import html
import smtplib
from email.mime.text import MIMEText
from dotenv import load_dotenv
from pathlib import Path
from backend.app.data.models.game_model import GameFollow, Game
from backend.app.data.models.user_model import User


base = Path(__file__).resolve().parents[2]
dotenv_path = base / ".env"
if dotenv_path.exists():
    load_dotenv(dotenv_path)
else:
    load_dotenv()


def send_email(
    subject: str,
    body: str,
    sender_email: str | None = None,
    recipients_override: list[str] | None = None,
    html_body: str | None = None,
) -> tuple[bool, str | None]:
    """Send an email using configured environment variables.

    - If `recipients_override` is provided it will be used instead of the
      `JOB_CONTACT_EMAIL_RECIPIENTS` environment variable.
    - If `html_body` is provided it will be used as the email HTML payload
      verbatim. Otherwise the `subject` and `body` are escaped and wrapped.

    Returns a tuple (success: bool, detail: Optional[str]). On success detail is None.
    """
    EMAIL_HOST = os.getenv("EMAIL_HOST")
    EMAIL_PORT = int(os.getenv("EMAIL_PORT")) if os.getenv("EMAIL_PORT") else 587
    EMAIL_USER = os.getenv("MAIN_EMAIL")
    EMAIL_PASS = os.getenv("EMAIL_SYSTEM_PASSWORD")

    if recipients_override:
        recipients = [r for r in recipients_override if r]
    else:
        recipients_raw = os.getenv("JOB_CONTACT_EMAIL_RECIPIENTS") or ""
        recipients = [r.strip() for r in recipients_raw.split(",") if r.strip()]

    if not recipients:
        return False, "JOB_CONTACT_EMAIL_RECIPIENTS not configured"

    if not EMAIL_HOST:
        return False, "EMAIL_HOST not configured"
    if not EMAIL_USER:
        return False, "MAIN_EMAIL (EMAIL user) not configured"

    if html_body:
        msg = MIMEText(html_body, "html")
    else:
        safe_subject = html.escape(subject)
        safe_body = html.escape(body)
        full_body = f"<h1>{safe_subject}</h1><p>{safe_body}</p>"
        msg = MIMEText(full_body, "html")

    msg["Subject"] = subject

    msg["From"] = EMAIL_USER
    if sender_email:
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


def send_game_update_to_subscribers(game_id: int, changelog_description: str, db) -> tuple[bool, str | None]:
    """Query subscribers for `game_id` using the provided DB session and send them the changelog_description."""
    try:
        subs = db.query(GameFollow).filter(GameFollow.game_id == int(game_id)).all()
        if not subs:
            return True, None

        game = db.query(Game).filter(Game.id == int(game_id)).first()
        game_title = game.title if game and getattr(game, "title", None) else f"Game {game_id}"

        failures: list[str] = []

        for s in subs:
            user = db.query(User).filter(User.id == int(s.user_id)).first()
            if not user or not user.email:
                continue

            username_display = html.escape(user.username or user.email or "Fellow human")
            subject = f"{game_title} got a new update!!"
            full_body = f"""
            <h2>Greeting {username_display}!!</h2>
            <p>My game {html.escape(game_title)} got a new update!!!</p>
            <p>This is the detail: {html.escape(changelog_description)}</p>
            """

            ok, detail = send_email(subject, changelog_description, sender_email=None, recipients_override=[user.email], html_body=full_body)
            if not ok:
                failures.append(f"{user.email}: {detail}")

        if failures:
            return False, "; ".join(failures)
        return True, None
    except Exception as exc:
        return False, str(exc)


def send_job_contact(sender_email: str | None, subject: str, body: str) -> tuple[bool, str | None]:
    """Convenience wrapper for job-contact emails.

    Formats the subject to include the sender and uses the default env recipients.
    """
    job_subject = f"JOB CONTACT FROM PORTFOLIO : {sender_email}"
    safe_subject = html.escape(subject or "")
    safe_body = html.escape(body or "")
    safe_sender = html.escape(sender_email or "")

    html_body = f"""
    <h1>{safe_subject}</h1>
    <p>{safe_body}</p>
    <hr />
    <p>Contact sender: {safe_sender}</p>
    """

    return send_email(job_subject, body, sender_email=sender_email, html_body=html_body)
    