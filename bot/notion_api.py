"""Notion API 래퍼.

fetch-notion.js와 동일하게:
- DB ID 정규화 + inline database 자동 탐지
- SDK v5 변경(databases.query 제거, dataSources.query 도입)에 대응

봇은 페이지 '생성'만 한다. 읽기는 React 빌드 타임에 fetch-notion.js가 담당.
"""
import logging

from notion_client import APIResponseError, Client

from config import NOTION_API_TOKEN, NOTION_PROJECTS_DB_ID

logger = logging.getLogger(__name__)

_notion = Client(auth=NOTION_API_TOKEN)

# 캐시: 한 번 resolve한 data_source_id를 재사용 (봇 프로세스 lifetime 동안)
_resolved_database_id: str | None = None
_resolved_data_source_id: str | None = None


def _resolve_database_id(provided_id: str) -> str:
    """제공된 ID가 page id(inline DB)면 자식 블록에서 실제 database id를 찾는다."""
    try:
        _notion.databases.retrieve(database_id=provided_id)
        return provided_id
    except APIResponseError as err:
        message = str(err)
        if "is a page" in message:
            children = _notion.blocks.children.list(block_id=provided_id)
            for block in children.get("results", []):
                if block.get("type") == "child_database":
                    logger.info("Inline database 자동 탐지: %s", block["id"])
                    return block["id"]
            raise RuntimeError(
                f"페이지 안에 데이터베이스 블록을 찾을 수 없음 (page: {provided_id})."
            ) from err
        raise


def _get_data_source_id() -> str:
    """data_source_id를 캐시 또는 신규 조회로 얻는다."""
    global _resolved_database_id, _resolved_data_source_id
    if _resolved_data_source_id:
        return _resolved_data_source_id

    db_id = _resolve_database_id(NOTION_PROJECTS_DB_ID)
    db = _notion.databases.retrieve(database_id=db_id)
    sources = db.get("data_sources") or []
    if not sources:
        raise RuntimeError("Database에 data_source가 없음.")

    _resolved_database_id = db_id
    _resolved_data_source_id = sources[0]["id"]
    return _resolved_data_source_id


def _rich_text(content: str) -> list:
    return [{"type": "text", "text": {"content": content}}] if content else []


def create_project_page(data: dict) -> dict:
    """프로젝트 정보로 Notion DB에 페이지를 생성한다.

    data 키: title (필수), summary, description, skills (list[str]),
             category ('Work'|'Side'), visibility ('public'|'internal'|'private'),
             is_featured (bool), company, thumbnail,
             url_demo, url_github, url_video

    Returns: 생성된 Notion page object (id, url 등 포함)
    """
    if not data.get("title"):
        raise ValueError("title은 필수 항목입니다.")

    properties = {
        "Title": {"title": [{"text": {"content": data["title"]}}]},
        "Category": {"select": {"name": data.get("category", "Side")}},
        "Visibility": {"select": {"name": data.get("visibility", "public")}},
        "Is_Featured": {"checkbox": bool(data.get("is_featured", False))},
    }

    if data.get("summary"):
        properties["Summary"] = {"rich_text": _rich_text(data["summary"])}
    if data.get("description"):
        properties["Description"] = {"rich_text": _rich_text(data["description"])}
    if data.get("skills"):
        properties["Skills"] = {"multi_select": [{"name": s} for s in data["skills"]]}
    if data.get("company"):
        properties["Company"] = {"rich_text": _rich_text(data["company"])}
    if data.get("thumbnail"):
        properties["Thumbnail"] = {"rich_text": _rich_text(data["thumbnail"])}
    if data.get("url_demo"):
        properties["URL_Demo"] = {"url": data["url_demo"]}
    if data.get("url_github"):
        properties["URL_GitHub"] = {"url": data["url_github"]}
    if data.get("url_video"):
        properties["URL_Video"] = {"url": data["url_video"]}

    # Notion API v5: parent는 data_source_id 사용
    data_source_id = _get_data_source_id()
    parent = {"type": "data_source_id", "data_source_id": data_source_id}

    page = _notion.pages.create(parent=parent, properties=properties)
    logger.info("Notion 페이지 생성: %s", page.get("url"))
    return page
