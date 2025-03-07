import About from "../components/main/About";
import Contact from "../components/main/Contact";
import Experience from "../components/main/Experience";
import Projects from "../components/main/Projects";
import Visual from "../components/main/Visual";
import './Main.css';

const Main = () => {

    return (
        <main>
            <Visual />
            <About />
            <Experience />
            <Projects />
            <Contact />
        </main>
    );
}

export default Main;