"""봇 owner 검증.

본인 외 user가 메시지를 보내도 조용히 무시 (응답 없음 = 봇 존재 자체를 노출하지 않음).
"""
import logging
from functools import wraps

from telegram import Update
from telegram.ext import ContextTypes

from config import TELEGRAM_OWNER_USER_ID

logger = logging.getLogger(__name__)


def owner_only(handler):
    """Telegram handler 데코레이터. owner가 아닌 사용자의 호출은 drop."""

    @wraps(handler)
    async def wrapper(update: Update, context: ContextTypes.DEFAULT_TYPE, *args, **kwargs):
        user = update.effective_user
        if not user or user.id != TELEGRAM_OWNER_USER_ID:
            logger.warning(
                "Unauthorized access blocked: user_id=%s, username=%s",
                user.id if user else None,
                user.username if user else None,
            )
            return  # 조용히 drop
        return await handler(update, context, *args, **kwargs)

    return wrapper
