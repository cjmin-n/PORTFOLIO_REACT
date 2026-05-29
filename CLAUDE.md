# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

Jeongmin Choi 개인 포트폴리오 사이트 (React 18). 웹퍼블리셔 → AI 풀스택 개발자 전환 narrative를 담고 있어, 데이터 소스가 **두 시기로 분리되어 있다**:

- **현재(사내·사이드 프로젝트)**: Notion Database가 Single Source of Truth. 빌드 타임에 자동 fetch.
- **과거(웹퍼블리셔 시절)**: `src/components/projects/projectList.json`에 정적으로 남김. 더 이상 추가 안 됨.

배포는 Vercel. README에는 netlify.app 도메인이 적혀 있으나 실제로는 Vercel에서 서비스 중.

## 명령어

```bash
npm start        # fetch:notion 자동 실행 → react-scripts start (dev server)
npm run build    # fetch:notion 자동 실행 → react-scripts build
npm run fetch:notion  # 노션에서 데이터만 다시 받아오기 (수동 갱신용)
npm test         # CRA 기본 테스트 (현재 작성된 테스트 없음)
```

`start`와 `build`는 항상 `fetch:notion`이 먼저 돌도록 chain 되어 있다. 노션 데이터 변경 후 사이트에 반영하려면 다시 빌드/스타트하거나 `npm run fetch:notion`만 별도 실행.

## 핵심 아키텍처: Notion → React 빌드 타임 동기화

```
Notion Projects DB → scripts/fetch-notion.js → src/data/projects.generated.json → React import
```

### `scripts/fetch-notion.js` 동작 세부

1. `.env.local` 또는 process.env에서 `NOTION_API_TOKEN`, `NOTION_PROJECTS_DB_ID` 로드 (dotenv는 try/catch — Vercel에선 환경변수가 직접 주입되므로 누락돼도 OK).
2. **DB ID 정규화**: `Projects-36e4cda2029380f1...` 같은 URL slug 형태나 32자리 hex도 모두 받아 표준 UUID(8-4-4-4-12)로 변환.
3. **Inline database 자동 탐지**: 처음 `databases.retrieve`를 시도하고, "is a page, not a database" 에러가 나면 그 페이지의 `child_database` 블록을 찾아 실제 DB ID를 알아냄. → user는 노션 페이지 URL 그대로 환경변수에 넣어도 됨.
4. **Notion SDK v5 주의**: v5에서 `databases.query`는 제거됨. 대신 `databases.retrieve`로 `data_sources[0].id`를 받아 `dataSources.query` 호출.
5. **Visibility 마스킹**: `visibility === 'private'`은 결과에서 제외, `internal`은 모든 URL 필드를 빈 문자열로 마스킹(NDA 보호).
6. **정렬**: `is_featured=true` 우선 → `date_completed desc`.
7. **Fallback**: API 실패 시 기존 `projects.generated.json` 있으면 유지, 없으면 빈 배열 `[]` 작성. **빌드는 절대 깨뜨리지 않음.**

### Notion DB 스키마

필드명은 fetch 스크립트가 정확히 이 이름으로 읽으므로 **반드시 일치**해야 한다:
`Title, Summary, Description, Skills, Category, Visibility, Is_Featured, Company, Thumbnail, URL_Demo, URL_GitHub, URL_Video, Date_Started, Date_Completed`

(Notion DB row 자체가 노션 페이지이므로 별도 `URL_Notion` 필드는 두지 않음. `Created`는 노션 system property로 유지.)

- `Category`: `Work` (사내) / `Side` (학원·팀·개인)
- `Visibility`: `public` / `internal` / `private`
- `Thumbnail`은 **Text 타입** (Files & media 아님). 값으로 `/images/prj-rezoom.jpg` 같은 정적 경로를 입력. 노션의 Files & media URL은 1시간마다 만료되어 부적합.

## 라우팅 구조

`src/App.js`에 React Router DOM v6 기반 라우트 정의:

- `/` — 메인 (`pages/Main.js`). Visual / About / Experience / Projects / Contact 섹션 + WorkList(Show More 토글)
- `/projects` — 사내+사이드 전체 보기 (`pages/Projects.js`). Notion 데이터 기반.
- `/archive` — 웹퍼블리셔 30+건 연도별 그룹 (`pages/Archive.js`). `projectList.json` 기반.

`Layout.js`의 모바일 메뉴는 `/about`, `/projects`, `/contact` 같은 path를 사용하지만 실제 라우트는 `/`와 `/projects`/`/archive`만 등록되어 있다 — `/about`, `/contact`는 메인 페이지 내 앵커여야 하는데 path로 잘못 적힌 상태. 수정 시 의도를 확인할 것.

## 컴포넌트 흐름

- **`components/projects/ProjectCard.js`**: Notion 데이터 카드 컴포넌트. 핵심 분기 셋:
  - `visibility === 'internal'` → URL 버튼 영역 통째로 숨김 + "🔒 사내 프로젝트" 배지
  - `is_featured === true` → "⭐ Featured" 배지
  - `thumbnail`이 빈 값 → 그라데이션 + 타이포 fallback 카드 동적 렌더 (이미지 파일 없이도 일관된 시각 처리. NDA 프로젝트의 표준 처리법)
- **`components/main/Projects.js`**: 메인의 Projects 섹션. `projects.generated.json`을 Category로 그룹핑("At Work"/"Side & Team"), 그룹별 상위 4개만 노출 + "View All →" 링크.
- **`components/projects/WorkList.js`**: 메인 페이지 하단의 웹퍼블리셔 작업 6개 + Show More 토글. Archive 페이지로 가는 `view the archive` 링크.

## 스타일 시스템

3중 스택을 혼용:
- **TailwindCSS + DaisyUI** (utility-first, 신규 컴포넌트에 우선 사용). `tailwind.config.js`에서 light/dark 두 테마 정의.
- **SCSS** (`src/Style.scss`, `_Common.scss`): 기존 layout/카드 디자인. `.section`, `.inner`, `.projects`, `.img-wrap`, `.txt-wrap` 등 클래스.
- **컴포넌트 단위 CSS** (`Layout.css` 등): 일부 분리.

다크모드는 `App.js`의 `isdark` state + `localStorage` + `document.documentElement.setAttribute("data-theme", ...)`로 동작. 새 컴포넌트 만들 때 라이트/다크 둘 다 색상이 적절한지 확인 필요.

## 애니메이션 패턴

두 라이브러리 혼용:
- **GSAP** — Layout/Visual의 초기 등장 애니메이션 (헤더, 비주얼 타이핑 효과). `App.js`에서 `useGSAP` + `TextPlugin` 등록.
- **Framer Motion** — 리스트 hover, Archive 카드 transition.
- **`utils/fadeInOnScroll.js`** — IntersectionObserver + GSAP 조합. `.fade-in` 클래스 붙은 요소에 자동 적용. 신규 섹션 추가 시 `useEffect(() => observeFadeIn(), [])` 호출 패턴 따를 것.

## Telegram Bot (`bot/`)

PORTFOLIO_REACT 하위 폴더 `bot/`은 별개 Python 프로세스로 동작하는 텔레그램 봇이다. 동일한 `.env.local`을 부모 디렉토리에서 읽어 NOTION 인증 정보를 공유.

- `bot/bot.py` — `python-telegram-bot` v21 기반. ConversationHandler로 `/add` 6단계 대화형 흐름 운영.
- `bot/notion_api.py` — fetch-notion.js와 동일한 inline DB 자동 탐지 + UUID 정규화 로직 (페이지 생성은 v5의 `data_source_id` parent 사용).
- `bot/auth.py` — `owner_only` 데코레이터로 본인 외 메시지 조용히 drop.
- `bot/vercel.py` — `httpx.AsyncClient`로 Deploy Hook 호출.
- 운영: 로컬은 `python bot.py`, 배포는 Oracle Cloud에 systemd 서비스.
- 봇은 Notion에 **쓰기만** 함. 읽기는 빌드 타임에 fetch-notion.js가 담당.

## 환경 변수 (`.env.local`)

```
NOTION_API_TOKEN=secret_xxxxxxxxxxxxxxx
NOTION_PROJECTS_DB_ID=...  # URL slug, 32-char hex, 또는 UUID 모두 OK (코드가 normalize)
```

`.env.local`은 `.gitignore`되어 있음. `src/data/projects.generated.json`도 `.gitignore` (빌드 산출물).

## 데이터 추가 워크플로우

**신규 사내·사이드 프로젝트**: 노션 Projects DB에 새 row 추가 → 다음 빌드/`npm run fetch:notion`에 자동 반영.

**썸네일 이미지**: `/public/images/`에 파일 추가 → 노션 Thumbnail 필드에 `/images/파일명.jpg` 텍스트 입력. 안 넣으면 자동으로 fallback 카드 렌더링.

**웹퍼블리싱 historical 데이터**: 더 이상 추가 안 됨. 만약 추가가 필요하면 `src/components/projects/projectList.json` 직접 편집.

## 알려진 함정

- **Notion DB가 inline 형태인 경우**: 페이지 ID와 데이터베이스 ID가 다름. 코드가 자동 탐지하지만, 권한 부여 시 "Connections"에 Integration을 페이지가 아니라 **데이터베이스에 직접** 추가하는 게 더 안전함.
- **`Layout.js`의 left/right-container hardcoded 링크**: `https://github.com/cjmin-n`, `velog.io/@cjmin-n` 등은 정적. 노션 자동화 대상 아님.
- **모바일 메뉴 navigation 링크**: 위에 언급한 라우트 불일치 (`/about`, `/contact`)는 의도 확인 후 수정.
- **CRA + Tailwind v3**: PostCSS 설정은 CRA 기본을 그대로 사용 (별도 `postcss.config.js` 없음). Tailwind 클래스가 안 적용되면 `tailwind.config.js`의 `content` 경로 확인.
