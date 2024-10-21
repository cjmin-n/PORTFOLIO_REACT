import FullNav from "./FullNav";
import { Link } from "react-router-dom";

const Header = () => {  

    return (
        <header>
            <h1 className="logo"><Link to={"/"}>Choi</Link></h1>
            <button className="btn btn-menuOpen">
                <div className="bar-wrap">
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>
            </button>
            <FullNav/>
        </header>
    )

}

export default Header;