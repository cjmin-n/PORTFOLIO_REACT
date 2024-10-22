import ScrollDown from "../ScrollDown";

const About = () => {
    return (
        <section id="about">
            <div className="first">
                <div>
                    <span className="serif">Hi, there! I'm Jeongmin Choi.</span>
                </div>
                <div>
                    <span className="serif">Becoming a </span>
                    <span>Full stack developer</span>
                </div>
                <div>
                    <span className="serif">at a publisher.</span>
                </div>
                <ScrollDown/>
            </div>
            <div className="second">
                <div>
                    <span className="bold">안녕하세요! </span>
                    <span>풀스택 개발자로 성장중인 최정민입니다.</span>
                </div>
                <div>
                    <span>UI/UX를 중시하는 프론트엔드 경험을 살려,</span>
                </div>
                <div>
                    <span>백엔드에서도 효율적인 설계와 개발을 통해</span>
                </div>
                <div>
                    <span>종합적인 문제해결을 목표로 하고 있습니다.</span>
                    <span className="bold">감사합니다 :&#41;</span>
                </div>
                <ScrollDown/>
            </div>
        </section>
    );
    
}

export default About;