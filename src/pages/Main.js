import About from "../components/main/About";
import Contact from "../components/main/Contact";
import Projects from "../components/main/Projects";
import Skill from "../components/main/Skill";
import Visual from "../components/main/Visual";

const Main = () => {

    return (
        <main>
            <Visual />
            <About />
            <Skill />
            <Projects />
            <Contact />
        </main>
    );
}

export default Main;