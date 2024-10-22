import FullNav from "./FullNav";
import { Link } from "react-router-dom";

const Header = () => {  

    return (
        <header>
            <div className="top-header">
                <h1 className="logo"><Link to={"/"}><span className="serif">C</span><span>*</span> </Link></h1>
                <button className="btn btn-menuOpen">
                    <div className="bar-wrap">
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </div>
                </button>
            </div>
            <FullNav/>
        </header>
    )

}

export default Header;