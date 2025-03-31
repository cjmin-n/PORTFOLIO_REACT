import React, { useState, useEffect, forwardRef, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiGithub, FiInstagram } from "react-icons/fi";
import { SiVelog } from "react-icons/si";

const Header = forwardRef(({ isdark, setIsdark, darkMode, setDarkMode }, ref) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [lastScroll, setLastScroll] = useState(0);
    const headerRef = useRef(null); // 내부에서도 header DOM 참조

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
        document.body.style.overflow = mobileMenuOpen ? 'unset' : 'hidden';
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
        document.body.style.overflow = 'unset';
    };

    const onChangeHandler = () => {
        setIsdark(!isdark);
        setDarkMode(!darkMode);
    };

    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.scrollY;
            const header = headerRef.current;
        
            if (!header) return;
        
            if (currentScroll > lastScroll && currentScroll > 50) {
            // 스크롤 ↓: 헤더 숨기고 그림자 제거
            header.style.transform = 'translateY(-100%)';
            // header.classList.remove("header-shadow");
            } else {
            // 스크롤 ↑: 헤더 보이고 그림자 추가
            header.style.transform = 'translateY(0)';
            // if (currentScroll > 0) {
            //     header.classList.add("header-shadow");
            // } else {
            //     header.classList.remove("header-shadow");
            // }
            }
        
            setLastScroll(currentScroll);
        };
      
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
      }, [lastScroll]);

    return (
        <>
            <header ref={(node) => {
                headerRef.current = node;
                if (ref) typeof ref === 'function' ? ref(node) : ref.current = node;
            }} className="fixed w-full top-0 left-0 z-50 ">
                <div className="flex items-center justify-center h-full">
                    <h1 className="logo absolute">
                        <Link to="/">
                            {/* <img src="/images/logo.svg" alt="logo" /> */}
                            C <span className="en">*</span>
                        </Link>
                    </h1>
                    <nav>
                        <ul className="flex items-center">
                            <li><a href="#about" className="en">About</a></li>
                            <li><a href="#experience" className="en">Experience</a></li>
                            <li><a href="#projects" className="en">Projects</a></li>
                            <li><a href="#contact" className="en">Contact</a></li>
                        </ul>
                    </nav>
                    <button className="theme-controller absolute" id="btn-control" onClick={onChangeHandler}>
                        {isdark ? (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                            </svg>
                        )}
                    </button>
                    <div className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`} onClick={toggleMobileMenu}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </header>

            <div className={`mobile-nav ${mobileMenuOpen ? 'active' : ''}`}>
                <div className="nav-content">
                    <ul className="menu">
                        <li><a href="#about" onClick={closeMobileMenu} className="en">About</a></li>
                        <li><a href="#experience" onClick={closeMobileMenu} className="en">Experience</a></li>
                        <li><a href="#projects" onClick={closeMobileMenu} className="en">Projects</a></li>
                        <li><a href="#contact" onClick={closeMobileMenu} className="en">Contact</a></li>
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
                                <FiInstagram />
                            </a>
                        </div>
                        <div className="email">
                            <a href="mailto:mymemose93@gmail.com">mymemose93@gmail.com</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
});

export default Header;
