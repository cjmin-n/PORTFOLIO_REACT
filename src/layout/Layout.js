import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import './Layout.css';
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { SiVelog } from "react-icons/si";
import { FaInstagram } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";
import { BsArrowUpShort } from "react-icons/bs";

const Layout = ({ isdark, setIsdark, darkMode, setDarkMode }) => {
    const headerRef = useRef(null);
    const visualRef = useRef(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [startTyping, setStartTyping] = useState(false); // 추가

    useEffect(() => {

        const tl = gsap.timeline();

        // Header 내부 요소 순차 애니메이션
        tl.from(headerRef.current.querySelector(".logo"), { 
            opacity: 0, 
            y: -20, 
            duration: 0.5, 
            ease: "power3.out" 
        })
        .from(headerRef.current.querySelectorAll("nav ul li"), { 
            opacity: 0, 
            y: -10, 
            duration: 0.4, 
            stagger: 0.2, // 하나씩 순서대로 등장
            ease: "power3.out" 
        }, "-=0.2")
        .from(headerRef.current.querySelector("#btn-control"), { 
            opacity: 0, 
            y: -10,
            duration: 0.5, 
            ease: "power3.out" 
        })
        .fromTo(headerRef.current.querySelector(".mobile-menu"), { 
            opacity: 0, 
            
            duration: 0.5, 
            ease: "power3.out" 
        }, { 
            opacity: 1, 
            
        });

        // Visual 내부 요소 순차 애니메이션
        tl.from(visualRef.current.querySelectorAll(".txt-wrap div"), {
            opacity: 0,
            y: 20,
            duration: 0.5,
            stagger: 0.2, // 순차적 등장
            ease: "power3.out"
        }, "+=0.2");
        tl.from(".left-container, .right-container", {
            opacity: 0,
            duration: 0.5,
            ease: "power3.out"
        })
        .add(() => {
            setStartTyping(true); // 타이핑 시작!
        });

    }, []);

    useEffect(() => {
        // 모바일 메뉴가 열려있을 때 스크롤 방지
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [mobileMenuOpen]);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    return (
        <div>
            <Header isdark={isdark} setIsdark={setIsdark} darkMode={darkMode} setDarkMode={setDarkMode}  ref={headerRef}/>
            <Outlet context={{ visualRef, startTyping }} />
            <div className="left-container left-12 bottom-0 flex flex-col items-center">
                <ul>
                    <li>
                        <Link to={"https://github.com/cjmin-n"} target="_blank">
                            <FiGithub/>
                        </Link>
                    </li>
                    <li>
                        <Link to={"https://www.instagram.com/cjmin_n"} target="_blank">
                            <FaInstagram/>
                        </Link>
                    </li>
                    <li>
                        <Link to={"https://velog.io/@cjmin-n"} target="_blank">
                            <SiVelog />
                        </Link>
                    </li>
                </ul>
                <span className="line"></span>
            </div>
            <div className="right-container right-12 bottom-0 flex flex-col items-center">
                <a href="mailto:mymemose93@gmail.com" className="en">mymemose93@gmail.com</a>
                <span className="line"></span>
            </div>
            <div className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`} onClick={toggleMobileMenu}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div className={`mobile-nav ${mobileMenuOpen ? 'active' : ''}`}>
                <div className="nav-content">
                    <ul className="menu">
                        <li><Link to="/" onClick={closeMobileMenu}>HOME</Link></li>
                        <li><Link to="/about" onClick={closeMobileMenu}>ABOUT</Link></li>
                        <li><Link to="/projects" onClick={closeMobileMenu}>PROJECTS</Link></li>
                        <li><Link to="/contact" onClick={closeMobileMenu}>CONTACT</Link></li>
                    </ul>
                    <div className="mobile-bottom">
                        <div className="social-links">
                            <a href="https://github.com/cjmin-n" target="_blank" rel="noopener noreferrer">
                                <FiGithub />
                            </a>
                            <a href="https://velog.io/@cjmin" target="_blank" rel="noopener noreferrer">
                                <SiVelog />
                            </a>
                            <a href="https://www.instagram.com/cjmin_n/" target="_blank" rel="noopener noreferrer">
                                <FaInstagram />
                            </a>
                        </div>
                        <div className="email">
                            <a href="mailto:cjmin0523@gmail.com">cjmin0523@gmail.com</a>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Layout;