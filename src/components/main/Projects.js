import { useState } from "react";
import Work from "../projects/List";
import { FiGithub } from "react-icons/fi";
import { RiShareBoxLine } from "react-icons/ri";


const Projects = () => {

    const [isShow, setIsShow] = useState(false);
    const onClickHandler = () => {
        setIsShow(e=>!e);
    }

    return (<> < section className = "section section-projects" id = "projects" > <div className="inner">
        <h4 className="en sub-tit">SomeThings I've Built</h4>
        <ul className="projects">
            <li>
                <div className="img-wrap">
                    <img src="" alt=""/>
                </div>
                <div className="txt-wrap">
                    <h6 className="en">Featured Project</h6>
                    <h5 className="title">LocaT</h5>
                    <p className="desc">로컬과 소통하는 여행 일정 관리 앱</p>
                    <div className="desc-wrap">
                        <p>LocaT은 
                            <strong> 여행자와 현지인을 연결</strong>하여 신뢰할 수 있는 여행 정보를 제공하는
                            <strong> 일정 관리 서비스</strong>입니다. 사용자는 여행 계획을 세우고 일정 공유, 실시간 편집, 체크리스트, 가계부 기능을 활용할 수 있습니다.
                            &nbsp;<strong>현지인의 첨삭 기능을 통해 맞춤형 추천</strong>을 받을 수 있으며, WebSocket을 이용한 실시간 채팅도 지원됩니다.
                            Flutter와 Spring Boot 기반으로 개발되었고, 향후 웹 연동, iOS 앱 출시, 리워드 시스템 및 글로벌 확장을 계획하고 있습니다.</p>
                    </div>
                    <div className="skills">
                        <span className="en">Flutter React GoogleAPI KakaoAPI Springboot Docker Jenkins</span>
                    </div>
                    <div className="link-wrap">
                        <ul className="flex">
                            <li>
                                <a href="https://github.com/beforeitcools/flutter-locatrip.git" target="_blank">
                                    <FiGithub className="w-6 h-6" />
                                </a>
                            </li>
                            <li>
                                <button type="button" onClick={onClickHandler}>
                                    <RiShareBoxLine className="w-6 h-6" />
                                </button>
                                <ul className={isShow? "active" : ""}>
                                    <li><a href="" target="_blank">Mobile</a></li>
                                    <li><a href="https://beforeitcools.netlify.app/" target="_blank">PC(소개페이지)</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </li>
            <li>
                <div className="img-wrap">
                    <img src="" alt=""/>
                </div>
                <div className="txt-wrap">
                    <h6 className="en">Featured Project</h6>
                    <h5 className="title">CLI'MON</h5>
                    <p className="desc">클라이머들을 위한 클라이밍 커뮤니티</p>
                    <div className="desc-wrap">
                        <p>CLI'MON은 <strong>회원 관리, 사용자 간 소통, 크루 활동, 일정 공유</strong> 등 다양한 기능을 갖춘 클라이밍 커뮤니티 사이트 입니다. 
                        사용자는 마이페이지를 통해 정보를 관리하고, 크루 시스템을 활용해 팀을 구성하고 활동할 수 있습니다.  직관적인 UI와 깔끔한 디자인으로, 누구나 쉽게 사용할 수 있는 편리한 경험을 목표로 하고 있습니다.</p>
                    </div>
                    <div className="skills">
                        <span className="en">KakaoAPI Springboot SpringSecurity MySql</span>
                    </div>
                    <div className="link-wrap">
                        <ul className="flex">
                            <li>
                                <a href="https://github.com/the-most-perfect-3T/climb-on.git" target="_blank">
                                    <FiGithub className="w-6 h-6" />
                                </a>
                            </li>
                            <li>
                                <a href="" target="_blank">
                                    <RiShareBoxLine className="w-6 h-6" />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </li>
        </ul>
    </div> 
    </section>
    <Work/> 
  </>
);
};

export default Projects;