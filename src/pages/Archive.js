import { useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { RiShareBoxLine, RiNotionLine } from "react-icons/ri";
import projectList from "../components/projects/projectList.json";

const yearFromDate = (date) => {
    const m = (date || "").match(/\b(20\d{2})\b/);
    return m ? m[1] : "Unknown";
};

const groupByYear = (items) => {
    const map = new Map();
    for (const item of items) {
        const year = yearFromDate(item.date);
        if (!map.has(year)) map.set(year, []);
        map.get(year).push(item);
    }
    return Array.from(map.entries()).sort(([a], [b]) => b.localeCompare(a));
};

const FolderIcon = () => (
    <svg width="40" height="32" viewBox="0 0 63 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M1.0315 6.25084V6.25C1.0315 3.36577 3.3863 1 6.3 1H24.7881L30.7957 6.95992L31.0881 7.25H31.5H56.7C59.6202 7.25 62 9.62228 62 12.5V43.75C62 46.6277 59.6202 49 56.7 49H6.3C3.37989 49 1.00022 46.6279 1 43.7504C1 43.7503 1 43.7501 1 43.75L1.0315 6.25084Z"
            stroke="currentColor"
            strokeWidth="2"
        />
    </svg>
);

const Archive = () => {
    const grouped = useMemo(() => groupByYear(projectList), []);

    return (
        <section className="section section-archive" style={{ padding: "120px 0 80px" }}>
            <div className="inner">
                <div className="mb-12">
                    <Link to="/" className="en text-sm opacity-60 hover:opacity-100">
                        ← Back to Home
                    </Link>
                    <h1 className="en text-4xl md:text-6xl font-bold mt-4">Archive</h1>
                    <p className="opacity-60 mt-2">웹퍼블리셔로 일하던 시절의 작업물 (2021–2024) · 총 {projectList.length}건</p>
                </div>

                {grouped.map(([year, items]) => (
                    <div key={year} className="mb-16">
                        <div className="flex items-baseline gap-4 mb-6 border-b border-current/20 pb-2">
                            <h2 className="en text-3xl font-bold">{year}</h2>
                            <span className="text-sm opacity-60">{items.length}건</span>
                        </div>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {items.map((p, idx) => (
                                <motion.li
                                    key={`${year}-${idx}-${p.title}`}
                                    whileHover={{ y: -4, transition: { type: "spring", stiffness: 200, damping: 12 } }}
                                    className="border border-current/20 rounded-lg p-5 flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="flex justify-between items-center mb-4 opacity-80">
                                            <FolderIcon />
                                            <ul className="flex items-center gap-3">
                                                {p.detail && (
                                                    <li>
                                                        <a
                                                            href={p.detail}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            title="Notion 상세"
                                                        >
                                                            <RiNotionLine className="w-6 h-6" />
                                                        </a>
                                                    </li>
                                                )}
                                                {p.link && (
                                                    <li>
                                                        <a
                                                            href={p.link}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            title="사이트 바로가기"
                                                        >
                                                            <RiShareBoxLine className="w-5 h-5" />
                                                        </a>
                                                    </li>
                                                )}
                                            </ul>
                                        </div>
                                        <p className="font-bold text-lg leading-snug">{p.title}</p>
                                        <p className="en text-xs opacity-50 mt-1">{p.date}</p>
                                        <p className="text-sm opacity-80 mt-3">{p.contents}</p>
                                    </div>
                                    <p className="en text-xs opacity-60 mt-4 break-words">{p.skill}</p>
                                </motion.li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Archive;
