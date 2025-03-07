import { useOutletContext } from "react-router-dom";

const Visual = () => {

    const { visualRef } = useOutletContext();

    return (
        <section ref={visualRef} className="section section-visual h-screen">
            <div className="inner flex flex-row h-full items-center">
                <div className="txt-wrap">
                    <div>
                        <p className="en">Hi I'm a</p>
                    </div>
                    <div className="change-wrap">
                        <p>Full-Stack_</p>
                    </div>
                    <div>
                        <p>Developer.</p>
                    </div>
                    <div className="btn-wrap flex gap-5">
                        <a href="#projects" className="btn"><span>See my work</span></a>
                        <a href="#contact" className="btn"><span>Get in touch</span></a>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Visual;