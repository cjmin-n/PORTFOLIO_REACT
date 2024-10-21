import { Link } from "react-router-dom";

const FullNav = () => {

    return (
        <>
            <div className="left">
                <nav>
                    <ul>
                        <li>
                            <Link to ={"#about"}>
                                <span className="txt">About</span>
                                <span className="round">01</span>
                            </Link>
                        </li>
                        <li>
                            <Link to ={"#projects"}>
                                <span className="txt">Projects</span>
                                <span className="round">02</span>
                            </Link>
                        </li>
                        <li>
                            <Link to ={"#contact"}>
                                <span className="txt">Contact</span>
                                <span className="round">03</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="right">
                <dl>
                    <dt>Github</dt>
                    <dd>
                        <Link to={"https://github.com/cjmin-n"}>github.com/cjmin-n</Link>
                    </dd>
                </dl>
                <dl>
                    <dt>velog</dt>
                    <dd>
                        <Link to={"https://velog.io/@cjmin-n"}>github.com/cjmin-n</Link>
                    </dd>
                </dl>
                <dl>
                    <dt>E-MAIL</dt>
                    <dd>
                        <Link to={"mailto:mymemose93@gmail.com"}>
                            mymemose93@gmail.com
                        </Link>
                    </dd>
                </dl>
                <a href="" className="btn btn-resume"><span>DOWNLOAD RESUME</span> <i className="icon icon-down">↘</i></a>
            </div>
        </>
    )

}
export default FullNav;