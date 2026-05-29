"""Vercel Deploy Hook 트리거."""
import logging

import httpx

from config import VERCEL_DEPLOY_HOOK_URL

logger = logging.getLogger(__name__)


async def trigger_deploy() -> bool:
    """Vercel 빌드를 트리거한다. 성공 시 True."""
    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            resp = await client.post(VERCEL_DEPLOY_HOOK_URL)
            resp.raise_for_status()
        logger.info("Vercel deploy hook 호출 성공")
        return True
    except Exception as err:
        logger.exception("Vercel deploy hook 호출 실패: %s", err)
        return False
