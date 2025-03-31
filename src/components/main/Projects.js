import { useEffect, useState } from "react";
import Work from "../projects/List";
import { FiGithub } from "react-icons/fi";
import { RiShareBoxLine } from "react-icons/ri";
import { observeFadeIn } from "../../utils/fadeInOnScroll";

const Projects = () => {

    const [isShow, setIsShow] = useState(false);
    const onClickHandler = () => {
        setIsShow(e=>!e);
    }

    useEffect(() => {
        observeFadeIn();
    }, []);

    return (<> < section className = "section section-projects" id = "projects" > <div className="inner">
        <h4 className="en sub-tit fade-in">SomeThings I've Built</h4>
        <ul className="projects">
            <li className="fade-in">
                <div className="img-wrap">
                    <img src="/images/prj-locat.jpg" alt=""/>
                </div>
                <div className="txt-wrap">
                    <h6 className="en">Featured Project</h6>
                    <h5 className="title">LocaT</h5>
                    <p className="desc">로컬과 소통하는 여행 일정 관리 앱</p>
                    <div className="desc-wrap">
                        {/* <p>LocaT은 
                            <strong> 여행자와 현지인을 연결</strong>하여 신뢰할 수 있는 여행 정보를 제공하는
                            <strong> 일정 관리 서비스</strong>입니다. 사용자는 여행 계획을 세우고 일정 공유, 실시간 편집, 체크리스트, 가계부 기능을 활용할 수 있습니다.
                            &nbsp;<strong>현지인의 첨삭 기능을 통해 맞춤형 추천</strong>을 받을 수 있으며, WebSocket을 이용한 실시간 채팅도 지원됩니다.
                            Flutter와 Spring Boot 기반으로 개발되었고, 향후 웹 연동, iOS 앱 출시, 리워드 시스템 및 글로벌 확장을 계획하고 있습니다.</p> */}
                            <p>
                            <strong>담당 기능</strong><br/>
                            - 일정 등록 및 편집 기능 개발 <br/>
                            - 카카오톡 공유 기능 구현 (Kakao Message API) <br/>
                            - Google Map API 기반 지도 기능 구현 <br/>
                            - 앱 및 웹 서비스 전반 디자인 주도
                            <br/>
                            <strong>문제해결</strong><br/>
                            - 현지인 인증 문제: GPS 기반 위치 인증 도입 후 인증 기간을 설정해 신뢰성 확보 <br/>
                            - 팀 간 협업: 기술 스택 다양성 문제를 플로우차트 설계로 해결, 명확한 가이드 제공 <br/>  
                            - Google API 지역 제한: 지역 필터링 로직 추가로 지역별 검색 
                            </p>
                    </div>
                    <div className="skills">
                        <span className="en">Flutter React GoogleAPI KakaoAPI Springboot MySQL Docker Jenkins</span>
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
                                    <li><a href="https://drive.google.com/file/d/1YJUUypbOnqaG28xjEetUflbR4NHA5OPq/view?usp=sharing" target="_blank">Mobile</a></li>
                                    <li><a href="https://beforeitcools.netlify.app/" target="_blank">PC(소개페이지)</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </li>
            <li className="fade-in">
                <div className="img-wrap">
                    <img src="/images/prj-climon.jpg" alt=""/>
                </div>
                <div className="txt-wrap">
                    <h6 className="en">Featured Project</h6>
                    <h5 className="title">CLI'MON</h5>
                    <p className="desc">클라이머들을 위한 클라이밍 커뮤니티</p>
                    <div className="desc-wrap">
                        {/* <p>CLI'MON은 <strong>회원 관리, 사용자 간 소통, 크루 활동, 일정 공유</strong> 등 다양한 기능을 갖춘 클라이밍 커뮤니티 사이트 입니다. 
                        사용자는 마이페이지를 통해 정보를 관리하고, 크루 시스템을 활용해 팀을 구성하고 활동할 수 있습니다.  직관적인 UI와 깔끔한 디자인으로, 누구나 쉽게 사용할 수 있는 편리한 경험을 목표로 하고 있습니다.</p> */}
                        <p>
                            <strong>담당기능</strong><br/>
                        - 회원가입 및 로그인 기능 구현 (Spring Security)<br/>
                        - 카카오 로그인 API 연동<br/>
                        - 마이페이지 기능 개발<br/>
                        <strong>문제 해결</strong><br/>
                        - 배포가 되지 않는 문제 발생<br/>
                        원인: Tymeleaf로 인해 '/' 중복 문제로 http 통신 오류 발생  
                        → 해결 : 전체 경로 점검 및 수정 후 재배포 성공 
                        </p>
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
                                <a href="https://drive.google.com/file/d/1WaK-hEjcFB000c10bAG7EKcIbullHmUQ/view?usp=sharing" target="_blank">
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