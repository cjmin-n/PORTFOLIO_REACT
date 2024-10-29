import About from "../components/main/About";
import Contact from "../components/main/Contact";
import Projects from "../components/main/Projects";
import Skills from "../components/main/Skills";
import Visual from "../components/main/Visual";

const Main = () => {

    return (
        <main>
            <Visual />
            <About />
            <Skills />
            <Projects />
            <Contact />
        </main>
    );
}

export default Main;