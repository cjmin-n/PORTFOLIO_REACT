import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { observeFadeIn } from "../../utils/fadeInOnScroll";
import { ProjectCard } from "../projects/ProjectCard";
import WorkList from "../projects/WorkList";
import projectsData from "../../data/projects.generated.json";

const PER_GROUP_LIMIT = 4;

const GROUPS = [
    { key: "Work", label: "At Work", subtitle: "사내 프로젝트" },
    { key: "Side", label: "Side & Team", subtitle: "팀 / 개인 프로젝트" },
];

const Projects = () => {
    useEffect(() => {
        observeFadeIn();
    }, []);

    const grouped = useMemo(() => {
        return GROUPS.map((g) => {
            const all = projectsData.filter((p) => p.category === g.key);
            return { ...g, items: all.slice(0, PER_GROUP_LIMIT), totalCount: all.length };
        });
    }, []);

    return (
        <>
            <section className="section section-projects" id="projects">
                <div className="inner">
                    <h4 className="en sub-tit fade-in">SomeThings I've Built</h4>

                    {grouped.map((group) => (
                        <div key={group.key} className="project-group fade-in mt-12">
                            <div className="flex justify-between items-baseline mb-6">
                                <div>
                                    <h5 className="en text-2xl font-bold">{group.label}</h5>
                                    <p className="text-sm opacity-60">{group.subtitle}</p>
                                </div>
                                {group.totalCount > PER_GROUP_LIMIT && (
                                    <Link
                                        to="/projects"
                                        className="en text-sm underline opacity-70 hover:opacity-100"
                                    >
                                        View All ({group.totalCount}) →
                                    </Link>
                                )}
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
            <WorkList />
        </>
    );
};

export default Projects;
