# Portfolio Bot

텔레그램으로 새 프로젝트를 입력하면 Notion DB에 적재하고 Vercel 빌드를 트리거하는 봇.

## 사전 준비 (PORTFOLIO_REACT/.env.local)

`.env.example` 참고. 봇 전용으로 필요한 값:
- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_OWNER_USER_ID`
- `VERCEL_DEPLOY_HOOK_URL`

`NOTION_API_TOKEN`, `NOTION_PROJECTS_DB_ID`는 fetch-notion.js와 공유.

## 로컬 실행

```bash
cd bot
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python bot.py
```

성공 시 로그:
```
Bot started: @your_bot_username (owner=123456789)
Polling 시작…
```

이 상태에서 텔레그램에서 본인 봇에 `/start` → `/add` 입력하면 동작.

## 명령어

- `/add` — 대화형으로 새 프로젝트 추가 (6단계)
- `/refresh` — Notion 직접 수정 후 사이트만 다시 빌드
- `/cancel` — 진행 중인 /add 흐름 취소
- `/help` — 명령 목록

## Oracle Cloud 배포 (systemd)

Phase 2D에서 설정. `systemd/portfolio-bot.service` 참고.

## 파일 구조

```
bot/
├── bot.py          # 메인 (Telegram handlers + ConversationHandler)
├── config.py       # .env.local 로딩 + 검증
├── auth.py         # owner_only 데코레이터
├── notion_api.py   # Notion 페이지 생성 (v5 SDK 대응)
├── vercel.py       # Deploy hook 트리거
├── requirements.txt
├── .gitignore
└── README.md
```

## 보안

- `auth.py`의 `owner_only` 데코레이터로 본인 외 메시지는 조용히 drop (응답 자체를 안 함)
- 토큰/키는 모두 `.env.local`에 보관, git 추적 안 됨
