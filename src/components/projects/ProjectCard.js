import { useEffect, useRef, useState } from "react";
import { FiGithub, FiExternalLink, FiPlay } from "react-icons/fi";

const GRADIENTS = [
    "linear-gradient(135deg, #1e3a8a 0%, #6366f1 100%)",
    "linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)",
    "linear-gradient(135deg, #7c2d12 0%, #ea580c 100%)",
    "linear-gradient(135deg, #581c87 0%, #a855f7 100%)",
    "linear-gradient(135deg, #1e293b 0%, #475569 100%)",
];

function pickGradient(seed) {
    if (!seed) return GRADIENTS[0];
    let hash = 0;
    for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
    return GRADIENTS[hash % GRADIENTS.length];
}

export const ProjectCard = ({
    title,
    summary,
    description,
    skills = [],
    thumbnail,
    visibility = "public",
    is_featured = false,
    company,
    url_demo = "",
    url_github = "",
    url_video = "",
}) => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const hasThumbnail = Boolean(thumbnail && thumbnail.trim());
    const hasVideo = Boolean(url_video && url_video.trim());
    const isInternal = visibility === "internal";

    const handleClickPlay = () => {
        const video = videoRef.current;
        if (video) {
            video.play().then(() => setIsPlaying(true)).catch((err) => console.warn("재생 실패:", err));
        }
    };

    useEffect(() => {
        if (!hasVideo) setIsPlaying(false);
    }, [hasVideo]);

    return (
        <li className="fade-in relative">
            {(is_featured || isInternal) && (
                <div className="absolute top-3 right-3 z-10 flex gap-2">
                    {is_featured && (
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-400 text-yellow-900">
                            ⭐ Featured
                        </span>
                    )}
                    {isInternal && (
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-slate-700 text-slate-100">
                            🔒 사내 프로젝트
                        </span>
                    )}
                </div>
            )}

            <div className="img-wrap">
                {hasThumbnail ? (
                    <>
                        <img src={thumbnail} alt="" className={isPlaying ? "opacity-0" : "opacity-100"} />
                        {hasVideo && (
                            <div className="video-wrap">
                                <div className={`dim ${isPlaying ? "opacity-0" : "opacity-100"}`}></div>
                                <button
                                    className={`btn-play ${isPlaying ? "opacity-0" : "opacity-100"}`}
                                    onClick={handleClickPlay}
                                    aria-label="비디오 재생"
                                ></button>
                                <video
                                    key={`video-${title}`}
                                    ref={videoRef}
                                    controls
                                    muted
                                    className={`w-full object-cover ${isPlaying ? "opacity-100" : "opacity-0"}`}
                                >
                                    <source src={url_video} type="video/mp4" />
                                </video>
                            </div>
                        )}
                    </>
                ) : (
                    <div
                        className="w-full h-full flex flex-col justify-between p-6 text-white"
                        style={{ background: pickGradient(title), minHeight: 220 }}
                    >
                        <div>
                            {company && (
                                <p className="text-xs uppercase tracking-widest opacity-70 mb-2">{company}</p>
                            )}
                            <h3 className="text-xl md:text-2xl font-bold leading-tight">{title}</h3>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-3">
                            {skills.slice(0, 3).map((skill, idx) => (
                                <span
                                    key={idx}
                                    className="text-[10px] md:text-xs px-2 py-0.5 rounded-full bg-white/20 backdrop-blur"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="txt-wrap">
                <h6 className="en">{is_featured ? "Pinned Project" : "Featured Project"}</h6>
                <h5 className="title">{title}</h5>
                {summary && <p className="desc">{summary}</p>}
                {description && (
                    <div className="desc-wrap">
                        <p>{description}</p>
                    </div>
                )}
                <div className="skills">
                    {skills.map((item, idx) => (
                        <span key={idx} className="en">
                            {" "}
                            {item}
                        </span>
                    ))}
                </div>
                {!isInternal && (url_github || url_demo || url_video) && (
                    <div className="link-wrap">
                        <ul className="flex">
                            {url_github && (
                                <li>
                                    <a href={url_github} target="_blank" rel="noreferrer" title="GitHub 저장소">
                                        <FiGithub className="w-6 h-6" />
                                    </a>
                                </li>
                            )}
                            {url_demo && (
                                <li>
                                    <a href={url_demo} target="_blank" rel="noreferrer" title="데모 사이트">
                                        <FiExternalLink className="w-6 h-6" />
                                    </a>
                                </li>
                            )}
                            {url_video && !hasThumbnail && (
                                <li>
                                    <a href={url_video} target="_blank" rel="noreferrer" title="데모 영상">
                                        <FiPlay className="w-6 h-6" />
                                    </a>
                                </li>
                            )}
                        </ul>
                    </div>
                )}
            </div>
        </li>
    );
};
