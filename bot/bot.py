"""Telegram bot 메인 엔트리.

Phase 2 MVP: 대화형 /add 흐름 + /refresh 명령.
Phase 3에서 자연어 파싱(Claude API)을 add_text_handler에 추가 예정.
"""
import logging

from telegram import InlineKeyboardButton, InlineKeyboardMarkup, Update
from telegram.constants import ParseMode
from telegram.ext import (
    Application,
    CallbackQueryHandler,
    CommandHandler,
    ContextTypes,
    ConversationHandler,
    MessageHandler,
    filters,
)

import config
from auth import owner_only
from notion_api import create_project_page
from vercel import trigger_deploy

logging.basicConfig(
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    level=logging.INFO,
)
logger = logging.getLogger(__name__)
logging.getLogger("httpx").setLevel(logging.WARNING)

# ─────────────────────────────────────────────
# Conversation States
# ─────────────────────────────────────────────
(TITLE, SUMMARY, DESCRIPTION, SKILLS, CATEGORY, VISIBILITY, CONFIRM) = range(7)

SKIP_TOKENS = {"skip", "스킵", "/skip", "-", "건너뛰기"}


def _is_skip(text: str) -> bool:
    return text.strip().lower() in SKIP_TOKENS


# ─────────────────────────────────────────────
# 기본 명령
# ─────────────────────────────────────────────
@owner_only
async def cmd_start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    await update.message.reply_text(
        "안녕하세요! 포트폴리오 자동화 봇이에요.\n\n"
        "사용 가능한 명령:\n"
        "  /add — 새 프로젝트 추가 (대화형)\n"
        "  /refresh — Notion 직접 수정 후 사이트만 다시 빌드\n"
        "  /cancel — 진행 중인 대화 취소\n"
        "  /help — 도움말"
    )


@owner_only
async def cmd_help(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    await cmd_start(update, context)


@owner_only
async def cmd_refresh(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    msg = await update.message.reply_text("Vercel 빌드 트리거 중…")
    ok = await trigger_deploy()
    if ok:
        await msg.edit_text("✅ 빌드 트리거 완료. 1~2분 후 사이트 반영됩니다.")
    else:
        await msg.edit_text("❌ Vercel 호출 실패. 로그를 확인하세요.")


# ─────────────────────────────────────────────
# /add 대화형 흐름
# ─────────────────────────────────────────────
@owner_only
async def add_start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    context.user_data.clear()
    await update.message.reply_text(
        "✏️ 새 프로젝트 추가를 시작합니다.\n언제든 /cancel 로 취소할 수 있어요.\n\n"
        "1/6 — 프로젝트 *제목*을 입력해주세요.",
        parse_mode=ParseMode.MARKDOWN,
    )
    return TITLE


async def add_title(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    title = update.message.text.strip()
    if not title:
        await update.message.reply_text("제목은 비울 수 없어요. 다시 입력해주세요.")
        return TITLE
    context.user_data["title"] = title
    await update.message.reply_text(
        "2/6 — 한 줄 *요약*을 입력해주세요. (건너뛰려면 'skip')",
        parse_mode=ParseMode.MARKDOWN,
    )
    return SUMMARY


async def add_summary(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    text = update.message.text.strip()
    context.user_data["summary"] = "" if _is_skip(text) else text
    await update.message.reply_text(
        "3/6 — *상세 설명*을 입력해주세요. (건너뛰려면 'skip')",
        parse_mode=ParseMode.MARKDOWN,
    )
    return DESCRIPTION


async def add_description(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    text = update.message.text.strip()
    context.user_data["description"] = "" if _is_skip(text) else text
    await update.message.reply_text(
        "4/6 — *사용 기술*을 콤마로 구분해 입력해주세요.\n"
        "예: `Python, FastAPI, LangGraph`\n(건너뛰려면 'skip')",
        parse_mode=ParseMode.MARKDOWN,
    )
    return SKILLS


async def add_skills(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    text = update.message.text.strip()
    if _is_skip(text):
        context.user_data["skills"] = []
    else:
        context.user_data["skills"] = [s.strip() for s in text.split(",") if s.strip()]

    keyboard = InlineKeyboardMarkup(
        [
            [
                InlineKeyboardButton("🏢 Work (사내)", callback_data="cat:Work"),
                InlineKeyboardButton("🧪 Side (사이드/팀)", callback_data="cat:Side"),
            ]
        ]
    )
    await update.message.reply_text("5/6 — *카테고리*를 선택해주세요.", parse_mode=ParseMode.MARKDOWN, reply_markup=keyboard)
    return CATEGORY


async def add_category(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    query = update.callback_query
    await query.answer()
    _, value = query.data.split(":", 1)
    context.user_data["category"] = value

    keyboard = InlineKeyboardMarkup(
        [
            [
                InlineKeyboardButton("🌐 Public", callback_data="vis:public"),
                InlineKeyboardButton("🔒 Internal", callback_data="vis:internal"),
                InlineKeyboardButton("🙈 Private", callback_data="vis:private"),
            ]
        ]
    )
    await query.edit_message_text(
        f"카테고리: *{value}*\n\n6/6 — *공개 범위*를 선택해주세요.\n"
        "• Public: 누구나 볼 수 있음\n"
        "• Internal: 사내 프로젝트 — 사이트에 표시되지만 모든 외부 URL은 자동 마스킹\n"
        "• Private: Notion에만 기록, 사이트에 노출 안 함",
        parse_mode=ParseMode.MARKDOWN,
        reply_markup=keyboard,
    )
    return VISIBILITY


async def add_visibility(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    query = update.callback_query
    await query.answer()
    _, value = query.data.split(":", 1)
    context.user_data["visibility"] = value

    data = context.user_data
    summary_line = data["summary"] if data["summary"] else "_(없음)_"
    desc_line = data["description"] if data["description"] else "_(없음)_"
    skills_line = ", ".join(data["skills"]) if data["skills"] else "_(없음)_"

    preview = (
        "📋 *미리보기*\n\n"
        f"*제목*: {data['title']}\n"
        f"*요약*: {summary_line}\n"
        f"*설명*: {desc_line}\n"
        f"*기술*: {skills_line}\n"
        f"*카테고리*: {data['category']}\n"
        f"*공개*: {data['visibility']}\n"
    )
    keyboard = InlineKeyboardMarkup(
        [
            [
                InlineKeyboardButton("✅ 추가하기", callback_data="confirm:yes"),
                InlineKeyboardButton("❌ 취소", callback_data="confirm:no"),
            ]
        ]
    )
    await query.edit_message_text(preview, parse_mode=ParseMode.MARKDOWN, reply_markup=keyboard)
    return CONFIRM


async def add_confirm(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    query = update.callback_query
    await query.answer()
    _, decision = query.data.split(":", 1)

    if decision == "no":
        context.user_data.clear()
        await query.edit_message_text("취소했습니다.")
        return ConversationHandler.END

    data = dict(context.user_data)
    await query.edit_message_text("📝 Notion에 추가하는 중…")

    try:
        page = create_project_page(data)
    except Exception as err:
        logger.exception("Notion 적재 실패: %s", err)
        await query.edit_message_text(f"❌ Notion 추가 실패: `{err}`", parse_mode=ParseMode.MARKDOWN)
        context.user_data.clear()
        return ConversationHandler.END

    page_url = page.get("url", "")
    await query.edit_message_text(
        f"✅ Notion 추가 완료!\n\n"
        f"🔗 [노션 페이지 열기]({page_url})\n\n"
        f"⏳ Vercel 빌드 트리거 중…",
        parse_mode=ParseMode.MARKDOWN,
    )

    ok = await trigger_deploy()
    if ok:
        await query.message.reply_text("🚀 사이트 빌드 시작. 1~2분 후 반영됩니다.")
    else:
        await query.message.reply_text(
            "⚠️ Notion에는 추가됐지만 Vercel 빌드 호출 실패. /refresh 로 재시도해주세요."
        )

    context.user_data.clear()
    return ConversationHandler.END


@owner_only
async def cmd_cancel(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    context.user_data.clear()
    await update.message.reply_text("취소했습니다.")
    return ConversationHandler.END


# ─────────────────────────────────────────────
# 진입점
# ─────────────────────────────────────────────
async def post_init(app: Application) -> None:
    me = await app.bot.get_me()
    logger.info("Bot started: @%s (owner=%s)", me.username, config.TELEGRAM_OWNER_USER_ID)


def main() -> None:
    config.validate()

    app = Application.builder().token(config.TELEGRAM_BOT_TOKEN).post_init(post_init).build()

    add_conv = ConversationHandler(
        entry_points=[CommandHandler("add", add_start)],
        states={
            TITLE: [MessageHandler(filters.TEXT & ~filters.COMMAND, add_title)],
            SUMMARY: [MessageHandler(filters.TEXT & ~filters.COMMAND, add_summary)],
            DESCRIPTION: [MessageHandler(filters.TEXT & ~filters.COMMAND, add_description)],
            SKILLS: [MessageHandler(filters.TEXT & ~filters.COMMAND, add_skills)],
            CATEGORY: [CallbackQueryHandler(add_category, pattern=r"^cat:")],
            VISIBILITY: [CallbackQueryHandler(add_visibility, pattern=r"^vis:")],
            CONFIRM: [CallbackQueryHandler(add_confirm, pattern=r"^confirm:")],
        },
        fallbacks=[CommandHandler("cancel", cmd_cancel)],
        per_message=False,
    )

    app.add_handler(add_conv)
    app.add_handler(CommandHandler("start", cmd_start))
    app.add_handler(CommandHandler("help", cmd_help))
    app.add_handler(CommandHandler("refresh", cmd_refresh))

    logger.info("Polling 시작…")
    app.run_polling(drop_pending_updates=True)


if __name__ == "__main__":
    main()
