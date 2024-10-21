import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer>
            <p className="ft-logo">Choi</p>
            <small>© 2024 - JEONGMIN CHOI Portfolio</small>
            <div className="ft-btn-wrap">
                <Link to={"mailto:mymemose93@gmail.com"} className="btn-mail">
                    <img src="" alt="mail" />
                </Link>
                <Link to={"https://github.com/cjmin-n"} className="btn-github">
                    <img src="" alt="github" />
                </Link>
                <Link to={"https://velog.io/@cjmin-n"} className="btn-velog">
                    <img src="" alt="velog" />
                </Link>
            </div>
        </footer>
    )
}

export default Footer;