import ScrollDown from "../ScrollDown";
import FrontProjects from "../projects/FrontProjects";
import BackProjects from "../projects/BackProjects";
import { useState } from "react";

const Projects = () => {
    const [show, setShow] = useState(true);

    const onClickHandler = e => {

        setShow(!show);

        let $btnProjects = document.querySelectorAll('#projects .title-wrap .btn-wrap button');

        if(show===true){
            // back
            $btnProjects.forEach(el=>{el.classList.remove("active")});
            e.target.classList.add("active");
            
        }else {
            // front
            $btnProjects.forEach(el=>{el.classList.remove("active")});
            e.target.classList.add("active");
            
        }
    }

    return (
        <section id="projects">
            <div className="title-wrap">
                <h2 className="title">Projects</h2>
                <div className="btn-wrap">
                    <button className="active" onClick={onClickHandler}>Front Projects</button>
                    <button onClick={onClickHandler}>Back Projects</button>
                </div>
                <ScrollDown/>
            </div>
            {
                show ? <FrontProjects /> : <BackProjects />
            }
            
            
            {/* <div className="project-list">
                <ul>
                    <li>

                    </li>
                </ul>
            </div> */}
        </section>
    );
    
}

export default Projects;