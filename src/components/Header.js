import FullNav from "./FullNav";
import { Link } from "react-router-dom";

const Header = () => {  

    return (
        <header>
            <div className="top-header flex items-center">
                <h1 className="logo"><Link to={"/"}><span className="serif">C</span><span>*</span> </Link></h1>
                {/* <button className="btn btn-menuOpen">
                    <div className="bar-wrap">
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </div>
                </button> */}
                <input type="checkbox" value="synthwave" className="toggle theme-controller" />
            </div>
            {/* <FullNav/> */}
        </header>
    )

}

export default Header;