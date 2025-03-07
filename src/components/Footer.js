
import { LuArrowUp } from "react-icons/lu";

import { Link } from "react-router-dom";

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
    })};

    return (
        <>  
           <button type="button" className="btn-top inner fixed bottom-0 left-1/2 flex justify-end" onClick={scrollToTop}>
            
                <div className="btn-top-inner absolute flex items-center justify-center flex-col">
                    <LuArrowUp />
                    <span>TOP</span>
                </div>
                
            </button>
            <footer>
                <small className="en">Copyright ©2025 Reserved by <Link to={"https://github.com/cjmin-n"} target="_blank">JeongminChoi.</Link></small>    
            </footer>
        </>
    )
}

export default Footer;