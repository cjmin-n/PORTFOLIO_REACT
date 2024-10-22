import ScrollDown from "../ScrollDown";

const Visual = () => {
    return (
        <section id="visual">
            <div className="txt-wrap">
                <div className="txt-box"></div>
                <p>
                    <span className="serif">is a </span>
                    <span className="serif">Full Stack</span>
                    <span>Developer</span>
                </p>
            </div>
            <div className="btn-wrap">
                <a href="#projects">See my work</a>
                <a href="#contact">Get in touch</a>
            </div>
            <ScrollDown/>
        </section>
    );
    
}

export default Visual;