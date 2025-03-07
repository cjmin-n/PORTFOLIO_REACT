import { forwardRef } from "react";
import { Link } from "react-router-dom";

const Header = forwardRef(({ isdark, setIsdark, darkMode, setDarkMode }, ref) => {  
    const onChangeHandler = () => {
        setIsdark(!isdark);
        setDarkMode(!darkMode);
    }

    return (
        <header ref={ref} className="fixed w-full">
            <div className="flex items-center justify-center h-full">
                <h1 className="logo absolute">
                    <Link to={"/"}> 
                        <img src="/images/logo.svg" alt="logo" />
                    </Link>
                </h1>
                <nav>
                    <ul className="flex items-center">
                        <li><a href ="#about" className="en">About</a></li>
                        <li><a href ="#experience" className="en">Experience</a></li>
                        <li><a href ="#projects" className="en">Projects</a></li>
                        <li><a href ="#contact" className="en">Contact</a></li>
                    </ul>
                </nav>
                <input type="checkbox" checked={isdark} onChange={onChangeHandler} value="synthwave" className="toggle theme-controller absolute" id="btn-control"/>
            </div>
        </header>
    )

});

export default Header;