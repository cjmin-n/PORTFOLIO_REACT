import { observeFadeIn } from "../../utils/fadeInOnScroll";
import { useEffect } from "react";

const About = () => {
    useEffect(() => {
        observeFadeIn();
    }, []);
    return (
        <section id="about" className="section section-about">
            <div className="inner flex justify-between items-center">
                <div className="coder_wrap fade-in">
                    <div className="top">
                        <span></span><span></span><span></span>
                    </div>
                    <div className="bottom">
                        <p>
                            <span className="pink">const </span>
                            <span className="white">coder </span>
                            <span className="pink">= </span>
                            <span className="white">&#123;</span>
                        </p>
                        <p>
                            <span className="tab-space"></span>
                            <span className="white">"name": "</span>
                            <span className="yellow">Jeongmin Choi</span>
                            <span className="white">",</span>
                        </p>
                        <p>
                            <span className="tab-space"></span>
                            <span className="white">"experience": &#123;</span>
                        </p>
                        <p>
                            <span className="tab-space"></span>
                            <span className="tab-space"></span>
                            <span className="white">"design": "</span>
                            <span className="green">3+ years</span>
                            <span className="white">",</span>
                        </p>
                        <p>
                            <span className="tab-space"></span>
                            <span className="tab-space"></span>
                            <span className="white">"publishing": "</span>
                            <span className="green">3+ years</span>
                            <span className="white">",</span>
                        </p>
                        <p>
                            <span className="tab-space"></span>
                            <span className="tab-space"></span>
                            <span className="white">"development": "</span>
                            <span className="green">Full-stack Developer</span>
                            <span className="white">"</span>
                        </p>
                        <p>
                            <span className="tab-space"></span>
                            <span className="white">&#125;,</span>
                        </p>
                        <p>
                            <span className="tab-space"></span>
                            <span className="white">"skills": &#123;</span>
                        </p>
                        <p>
                            <span className="tab-space"></span><span className="tab-space"></span>
                            <span className="white">"frontEnd": &#91;"</span>
                            <span className="yellow">React</span>
                            <span className="white">", "</span>
                            <span className="yellow">Flutter</span>
                            <span className="white">", "</span>
                            <span className="yellow">HTML</span>
                            <span className="white">",</span>
                        </p>
                        <p>
                            <span className="tab-space"></span><span className="tab-space"></span>
                            <span className="tab-space"></span><span className="tab-space"></span>
                            <span className="white">"</span>
                            <span className="yellow">CSS (SCSS, TailwindCSS)</span>
                            <span className="white">"&#93;,</span>
                        </p>
                        <p>
                            <span className="tab-space"></span><span className="tab-space"></span>
                            <span className="white">"backEnd": &#91;"</span>
                            <span className="yellow">Spring Boot</span>
                            <span className="white">", "</span>
                            <span className="yellow">MySQL</span>
                            <span className="white">"&#93;,</span>
                        </p>
                        <p>
                            <span className="tab-space"></span><span className="tab-space"></span>
                            <span className="white">"devOps": &#91;"</span>
                            <span className="yellow">Git</span>
                            <span className="white">", "</span>
                            <span className="yellow">CI/CD</span>
                            <span className="white">", "</span>
                            <span className="yellow">Docker</span>
                            <span className="white">"&#93;,</span>
                        </p>
                        <p>
                            <span className="tab-space"></span>
                            <span className="white">&#125;,</span>
                        </p>
                        <p>
                            <span className="tab-space"></span>
                            <span className="white">hardWorker: </span>
                            <span className="orange">true</span>
                            <span className="white">,</span>
                        </p>
                        <p>
                            <span className="tab-space"></span>
                            <span className="white">quickLearner: </span>
                            <span className="orange">true</span>
                            <span className="white">,</span>
                        </p>
                        <p>
                            <span className="tab-space"></span>
                            <span className="white">problemSolver: </span>
                            <span className="orange">true</span>
                            <span className="white">,</span>
                        </p>
                        <p>
                            <span className="tab-space"></span>
                            <span className="green">hireable</span>
                            <span className="white">: </span>
                            <span className="orange">function</span>
                            <span className="white">() &#123;</span>
                        </p>
                        <p>
                            <span className="tab-space"></span><span className="tab-space"></span>
                            <span className="orange">return</span>
                            <span className="white"> &#40;</span>
                        </p>
                        <p>
                            <span className="tab-space"></span><span className="tab-space"></span><span className="tab-space"></span>
                            <span className="blue">this.</span>
                            <span className="white">hardWorker &&</span>
                        </p>
                        <p>
                            <span className="tab-space"></span><span className="tab-space"></span><span className="tab-space"></span>
                            <span className="blue">this.</span>
                            <span className="white">problemSolver &&</span>
                        </p>
                        <p>
                            <span className="tab-space"></span><span className="tab-space"></span><span className="tab-space"></span>
                            <span className="blue">Object.keys(this.skills)</span>
                            <span className="white">.length &lt;= 3</span>
                        </p>
                        <p>
                            <span className="tab-space"></span><span className="tab-space"></span>
                            <span className="white">&#41;;</span>
                        </p>
                        <p>
                            <span className="tab-space"></span>
                            <span className="white">&#125;</span>
                        </p>
                        <p>
                            <span className="white">&#125;;</span>
                        </p>
                    </div>
                </div>
                <div className="txt-wrap fade-in">
                    <h4 className="en sub-tit">About me</h4>
                    <h3>사용자의 입장에서<br/>문제를 해결하는 개발자</h3>
                    <ul>
                        <li>
                            <span>▹ </span> UI/UX를 고려한 사용자 중심의 개발을 지향하며, 
                            <strong>프론트엔드부터 LLM기반 AI 엔지니어링까지</strong> 폭넓은 경험을 보유하고 있습니다.
                        </li>
                        <li>
                            <span>▹ </span> React와 Flutter를 활용한 프론트엔드, Spring Boot 기반의 백엔드를 구축하며, 
                            <strong>클린 코드와 성능 최적화를 중요하게 생각합니다.</strong>
                        </li>
                        <li>
                            <span>▹ </span> 빠르게 변화하는 기술 트렌드에 발맞춰 학습하며, <strong>문제를 해결하는 과정에서 
                            성장하는 것을 즐깁니다.</strong>
                        </li>
                        <li>
                            <span>▹ </span> 더 좋은 사용자 경험을 만들기 위해 끊임없이 고민하며, <strong>협업을 통해 
                            최고의 결과를 만들어내는 개발자가 되고자 합니다.</strong> 🚀
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
    
}

export default About;