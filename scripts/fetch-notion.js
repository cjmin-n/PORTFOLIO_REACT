const fs = require("fs");
const path = require("path");

try {
    require("dotenv").config({ path: path.join(__dirname, "..", ".env.local") });
} catch (e) {
    // dotenv가 없거나 .env.local이 없어도 OK (Vercel 등에서는 환경변수가 직접 주입됨)
}

const { Client } = require("@notionhq/client");

const TOKEN = process.env.NOTION_API_TOKEN;
const DB_ID = normalizeNotionId(process.env.NOTION_PROJECTS_DB_ID);

// Notion URL은 "Projects-36e4cda2029380f1acabf73595ed4d02" 같은 slug+id 형태.
// API는 dashes 포함된 UUID(8-4-4-4-12)만 받음. 둘 다 받아서 정규 UUID로 변환.
function normalizeNotionId(raw) {
    if (!raw) return raw;
    const match = raw.match(/[0-9a-f]{32}/i);
    if (!match) return raw;
    const hex = match[0];
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}
const OUTPUT = path.join(__dirname, "..", "src", "data", "projects.generated.json");

const getTitle = (p) => p?.title?.[0]?.plain_text ?? "";
const getText = (p) => p?.rich_text?.map((t) => t.plain_text).join("") ?? "";
const getSelect = (p) => p?.select?.name ?? null;
const getMultiSelect = (p) => p?.multi_select?.map((s) => s.name) ?? [];
const getCheckbox = (p) => p?.checkbox ?? false;
const getUrl = (p) => p?.url ?? "";
const getDate = (p) => p?.date?.start ?? null;

async function resolveDatabaseId(notion, providedId) {
    // 1) 그대로 database로 시도
    try {
        await notion.databases.retrieve({ database_id: providedId });
        return providedId;
    } catch (err) {
        // inline database인 경우 페이지 ID가 들어옴 → 페이지의 child 블록 중 데이터베이스 찾기
        if (err.code === "validation_error" && /is a page/.test(err.message || "")) {
            const children = await notion.blocks.children.list({ block_id: providedId });
            const dbBlock = children.results.find((b) => b.type === "child_database");
            if (!dbBlock) {
                throw new Error(`페이지 안에 데이터베이스 블록을 찾을 수 없음 (page: ${providedId}).`);
            }
            console.log(`ℹ️  Inline database 자동 탐지: ${dbBlock.id}`);
            return dbBlock.id;
        }
        throw err;
    }
}

async function fetchAllPages(notion, databaseId) {
    // SDK v5에서 databases.query 제거됨. database를 retrieve해 data_source id를 얻은 뒤 dataSources.query 호출.
    const resolvedId = await resolveDatabaseId(notion, databaseId);
    const db = await notion.databases.retrieve({ database_id: resolvedId });
    const dataSourceId = db.data_sources?.[0]?.id;
    if (!dataSourceId) {
        throw new Error("Database에 data_source가 없음. DB ID 또는 Integration 연결을 확인하세요.");
    }

    const pages = [];
    let cursor;
    do {
        const resp = await notion.dataSources.query({
            data_source_id: dataSourceId,
            start_cursor: cursor,
            page_size: 100,
        });
        pages.push(...resp.results);
        cursor = resp.has_more ? resp.next_cursor : undefined;
    } while (cursor);
    return pages;
}

function mapPage(page) {
    const props = page.properties;
    const visibility = getSelect(props.Visibility);
    const isInternal = visibility === "internal";

    return {
        id: page.id,
        title: getTitle(props.Title),
        summary: getText(props.Summary),
        description: getText(props.Description),
        skills: getMultiSelect(props.Skills),
        category: getSelect(props.Category),
        visibility,
        is_featured: getCheckbox(props.Is_Featured),
        company: getText(props.Company),
        thumbnail: getText(props.Thumbnail),
        url_demo: isInternal ? "" : getUrl(props.URL_Demo),
        url_github: isInternal ? "" : getUrl(props.URL_GitHub),
        url_video: isInternal ? "" : getUrl(props.URL_Video),
        date_started: getDate(props.Date_Started),
        date_completed: getDate(props.Date_Completed),
    };
}

function sortProjects(projects) {
    return projects.sort((a, b) => {
        if (a.is_featured !== b.is_featured) return a.is_featured ? -1 : 1;
        return (b.date_completed ?? "").localeCompare(a.date_completed ?? "");
    });
}

function writeOutput(projects) {
    fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
    fs.writeFileSync(OUTPUT, JSON.stringify(projects, null, 2) + "\n");
}

function fallbackOnFailure() {
    if (fs.existsSync(OUTPUT)) {
        console.warn("⚠️  기존 projects.generated.json 유지 (빌드는 계속 진행).");
        return;
    }
    writeOutput([]);
    console.warn("⚠️  빈 배열로 fallback. 빌드는 계속 진행.");
}

async function main() {
    if (!TOKEN || !DB_ID) {
        console.error("❌ NOTION_API_TOKEN 또는 NOTION_PROJECTS_DB_ID 누락 (.env.local 또는 Vercel 환경변수 확인).");
        fallbackOnFailure();
        return;
    }

    const notion = new Client({ auth: TOKEN });

    try {
        const pages = await fetchAllPages(notion, DB_ID);
        const projects = sortProjects(
            pages.map(mapPage).filter((p) => p.visibility !== "private")
        );
        writeOutput(projects);
        console.log(`✓ ${projects.length} projects → ${path.relative(process.cwd(), OUTPUT)}`);
    } catch (err) {
        console.error("❌ fetch-notion 실패:", err.message);
        fallbackOnFailure();
    }
}

main();
