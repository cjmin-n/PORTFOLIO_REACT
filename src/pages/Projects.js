import { useMemo } from "react";
import { Link } from "react-router-dom";
import { ProjectCard } from "../components/projects/ProjectCard";
import projectsData from "../data/projects.generated.json";

const GROUPS = [
    { key: "Work", label: "At Work", subtitle: "사내 프로젝트" },
    { key: "Side", label: "Side & Team", subtitle: "팀 / 개인 프로젝트" },
];

const Projects = () => {
    const grouped = useMemo(
        () =>
            GROUPS.map((g) => ({
                ...g,
                items: projectsData.filter((p) => p.category === g.key),
            })),
        []
    );

    return (
        <section className="section section-all-projects" style={{ padding: "120px 0 80px" }}>
            <div className="inner">
                <div className="mb-12">
                    <Link to="/" className="en text-sm opacity-60 hover:opacity-100">
                        ← Back to Home
                    </Link>
                    <h1 className="en text-4xl md:text-6xl font-bold mt-4">All Projects</h1>
                    <p className="opacity-60 mt-2">사내·팀·사이드 프로젝트 전체</p>
                </div>

                {grouped.map((group) => (
                    <div key={group.key} className="project-group mb-16">
                        <div className="mb-6">
                            <h2 className="en text-2xl font-bold">{group.label}</h2>
                            <p className="text-sm opacity-60">
                                {group.subtitle} · {group.items.length}건
                            </p>
                        </div>
                        {group.items.length > 0 ? (
                            <ul className="projects">
                                {group.items.map((p) => (
                                    <ProjectCard key={p.id} {...p} />
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm opacity-50">아직 등록된 프로젝트가 없어요.</p>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Projects;
