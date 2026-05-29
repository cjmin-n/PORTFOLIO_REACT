"""환경 변수 로딩 및 검증.

bot/ 폴더의 부모 디렉토리(PORTFOLIO_REACT)에 있는 .env.local을 읽는다.
Oracle Cloud 등 운영 환경에서는 systemd EnvironmentFile 또는 export로 주입되어도 동작.
"""
import os
import re
from pathlib import Path

from dotenv import load_dotenv

PROJECT_ROOT = Path(__file__).resolve().parent.parent
ENV_PATH = PROJECT_ROOT / ".env.local"

# 로컬 개발용. systemd 환경에선 EnvironmentFile로 주입되어 .env.local이 없어도 OK.
if ENV_PATH.exists():
    load_dotenv(dotenv_path=ENV_PATH)


def _normalize_notion_id(raw: str | None) -> str | None:
    """URL slug, 32-char hex, UUID 형태 모두 받아 표준 UUID로 변환.
    fetch-notion.js의 normalizeNotionId와 동일 동작.
    """
    if not raw:
        return raw
    match = re.search(r"[0-9a-f]{32}", raw.lower())
    if not match:
        return raw
    h = match.group()
    return f"{h[:8]}-{h[8:12]}-{h[12:16]}-{h[16:20]}-{h[20:]}"


TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
TELEGRAM_OWNER_USER_ID_RAW = os.getenv("TELEGRAM_OWNER_USER_ID", "0")
TELEGRAM_OWNER_USER_ID = int(TELEGRAM_OWNER_USER_ID_RAW) if TELEGRAM_OWNER_USER_ID_RAW.isdigit() else 0

NOTION_API_TOKEN = os.getenv("NOTION_API_TOKEN")
NOTION_PROJECTS_DB_ID = _normalize_notion_id(os.getenv("NOTION_PROJECTS_DB_ID"))

VERCEL_DEPLOY_HOOK_URL = os.getenv("VERCEL_DEPLOY_HOOK_URL")


def validate() -> None:
    """필수 환경 변수가 모두 채워졌는지 확인. 누락 시 예외."""
    required = {
        "TELEGRAM_BOT_TOKEN": TELEGRAM_BOT_TOKEN,
        "TELEGRAM_OWNER_USER_ID": TELEGRAM_OWNER_USER_ID,
        "NOTION_API_TOKEN": NOTION_API_TOKEN,
        "NOTION_PROJECTS_DB_ID": NOTION_PROJECTS_DB_ID,
        "VERCEL_DEPLOY_HOOK_URL": VERCEL_DEPLOY_HOOK_URL,
    }
    missing = [k for k, v in required.items() if not v]
    if missing:
        raise EnvironmentError(
            f"필수 환경변수 누락: {missing}. .env.local 또는 systemd EnvironmentFile을 확인하세요."
        )
