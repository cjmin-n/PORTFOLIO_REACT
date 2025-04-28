import { useEffect } from "react";
import { observeFadeIn } from "../../utils/fadeInOnScroll";
import { ProjectCard } from "../projects/ProjectCard";
import WorkList from "../projects/WorkList";
import featuredProjectList from "../projects/featuredProjectList.json";

const Projects = () => {

    useEffect(() => {
        observeFadeIn();
    }, []);

    

    return (
        <> 
            <section className="section section-projects" id="projects" > 
                <div className="inner">
                    <h4 className="en sub-tit fade-in">SomeThings I've Built</h4>
                    <ul className="projects">
                        {featuredProjectList.map((project, idx) => (
                            <ProjectCard key={idx} title={project.title} summary={project.summary} description={project.description} skills={project.skills} notion={project.notion} github={project.github} thumbnail={project.thumbnail} url={project.url}/>
                        ))}
                    </ul>
                </div> 
            </section>
            <WorkList/> 
        </>
    );
};

export default Projects;