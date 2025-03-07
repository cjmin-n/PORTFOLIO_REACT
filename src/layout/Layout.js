import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import './Layout.css';
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SiVelog } from "react-icons/si";
import { FaInstagram } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";

const Layout = ({ isdark, setIsdark, darkMode, setDarkMode }) => {
    const headerRef = useRef(null);
    const visualRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline();

        // Header 내부 요소 순차 애니메이션
        tl.from(headerRef.current.querySelector(".logo"), { 
            opacity: 0, 
            y: -20, 
            duration: 0.6, 
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
            scale: 0.8, 
            duration: 0.6, 
            ease: "power3.out" 
        }, "-=0.4");

        // Visual 내부 요소 순차 애니메이션
        tl.from(visualRef.current.querySelectorAll(".txt-wrap div"), {
            opacity: 0,
            y: 20,
            duration: 0.8,
            stagger: 0.2, // 순차적 등장
            ease: "power3.out"
        }, "+=0.3");
       
        tl.from(".left-container, .right-container", {
            opacity: 0,
            duration: 0.6,
            ease: "power3.out"
        })

    }, []);

    return (
        <div>
            <Header isdark={isdark} setIsdark={setIsdark} darkMode={darkMode} setDarkMode={setDarkMode}  ref={headerRef}/>
            <Outlet context={{ visualRef }} />
            <div className="left-container fixed left-12 bottom-0 flex flex-col items-center">
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
            <div className="right-container fixed right-12 bottom-0 flex flex-col items-center">
                <a href="mailto:mymemose93@gmail.com" className="en">mymemose93@gmail.com</a>
                <span className="line"></span>
            </div>
            <Footer/>
        </div>
    )
}

export default Layout;