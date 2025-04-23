import { useEffect, useRef, useState } from "react";
import { CgArrowAlignV } from "react-icons/cg";
import { FiGithub } from "react-icons/fi";
import { RiNotionLine } from "react-icons/ri";

export const ProjectCard = ({title, summary, description, skills, notion, github, thumbnail, url}) => {

    const videoRef = useRef(null);
    const btnRef = useRef(null);
    const [ isPlaying, setIsPlaying ] = useState(false);
    const [ isVideoExisting, setIsVideoExisting ] = useState(false);

    const isVerticalVideo = title?.includes("LocaTrip");


    const handleClickPlay = () => {
        const video = videoRef.current;
        if (video) {
            video.play().then(() => {
                setIsPlaying(true);
            }).catch((err) => {
                console.warn("재생 실패:", err);
            });
        }
    };

    useEffect(()=>{
        if(url.video) setIsVideoExisting(true);
    }, [url])



    return(
        <li className="fade-in">
            <div className="img-wrap">
                <img src={thumbnail} alt="" className={`${isPlaying ? "opacity-0" : "opacity-100"}`}/>
                {isVideoExisting && title && (<div className="video-wrap">
                    <div className={`dim ${isPlaying ? "opacity-0" : "opacity-100"}`}></div>
                    <button className={`btn-play ${isPlaying ? "opacity-0" : "opacity-100"}`} onClick={handleClickPlay} ref={btnRef}></button>
                    {url?.video?.trim() && url.video.trim().length > 5 && (
                        <video
                            key={`video-${title}`}
                            ref={videoRef}
                            controls
                            muted
                            className={`w-full ${isVerticalVideo ? "object-contain w-auto h-full" : "object-cover"} ${isPlaying ? "opacity-100": "opacity-0"}`}
                        >
                            <source src={url.video} type="video/mp4" />
                        </video>
                    )}
                </div>)}
            </div>
            <div className="txt-wrap">
                <h6 className="en">Featured Project</h6>
                <h5 className="title">{title}</h5>
                <p className="desc">{summary}</p>
                <div className="desc-wrap">
                    <p>{description}</p>
                </div>
                <div className="skills">
                    {skills.map((item, idx)=>{
                        return <span key={idx} className="en"> {item}</span>
                    })}
                    
                </div>
                <div className="link-wrap">
                    <ul className="flex">
                        <li>
                            <a href={notion} target="_blank" rel="noreferrer" title="Notion소개페이지바로가기">
                                <RiNotionLine className="w-7 h-7" />
                            </a>
                        </li>
                        <li>
                            <a href={github} target="_blank" rel="noreferrer" title="Github바로가기">
                                <FiGithub className="w-6 h-6" />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </li>
    );
    
};