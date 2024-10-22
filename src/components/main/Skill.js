const Skill = () => {
    return (
        <section id="skill">
            <div className="title-wrap">
                <h2 className="title">Skill</h2>
                <div>
                    <p>FrontEnd&nbsp;/&nbsp;BackEnd</p>
                </div>
            </div>
            <div className="skill-wrap">
                <ul>
                    <li>
                        <div className="serif">
                            <span>HTML</span>
                            <span>CSS</span>
                            <span>React</span>
                            <span>Vercel</span>
                            <span>Flutter</span>
                        </div>
                        <p>Front End</p>
                    </li>
                    <li>
                        <div className="serif">
                            <span>JAVA</span>
                            <span>Spring JPA</span>
                            <span>Servlet</span>
                        </div>
                        <p>Back End</p>
                    </li>
                    <li>
                        <div className="serif">
                            <span>MySQL</span>
                        </div>
                        <p>DB</p>
                    </li>
                    <li>
                        <div className="serif">
                            <span>AWS</span>
                            <span>Docker</span>
                            <span>Jenkins</span>
                        </div>
                        <p>CI / CD</p>
                    </li>
                </ul>
            </div>
        </section>
    );
    
}

export default Skill;