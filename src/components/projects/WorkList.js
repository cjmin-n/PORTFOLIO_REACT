import { Link } from "react-router-dom";
import Archive from "../../pages/Archive";
import { RiShareBoxLine } from "react-icons/ri";
import { RiNotionLine } from "react-icons/ri";
import projectList from "./projectList.json";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { observeFadeIn } from "../../utils/fadeInOnScroll";

const Work = () => {

     // Show More / Show Less 관리
  const [showAll, setShowAll] = useState(false);

  // 보여줄 아이템 갯수
  const visibleItemsCount = 6;

  // 버튼 클릭 이벤트
  const handleToggleShowAll = () => {
    setShowAll((prev) => !prev);
  };

  // 실제 화면에 표시할 프로젝트 목록 (showAll이면 전체, 아니면 앞에서 6개만)
  const displayedProjects = showAll ? projectList : projectList.slice(0, visibleItemsCount);

  useEffect(() => {
    observeFadeIn();
  }, []);

    return (
        <section className="section section-work">
            <div className="inner">
                <h4 className="en sub-tit fade-in">Things I've Shipped</h4>
                <Link to={Archive} className="en btn-view fade-in">view the archive</Link>
                <ul className="list fade-in">
                    <AnimatePresence>
                        {displayedProjects.map((project, index) => (
                            <motion.li
                                key={project.title} 
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    transition: {
                                    duration: 0.3,
                                    delay: index * 0.05
                                    }
                                }}
                                exit={{
                                    opacity: 0,
                                    y: 20,
                                    transition: {
                                    duration: 0.2,
                                    delay: 0
                                    }
                                }}
                                whileHover={{
                                y: -5, 
                                transition: { type: "spring", stiffness: 200, damping: 12 }
                                }}
                            >
                                <div>
                                    <div className="top flex justify-between items-center">                             
                                        <svg width="45" height="36" viewBox="0 0 63 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1.0315 6.25084V6.25C1.0315 3.36577 3.3863 1 6.3 1H24.7881L30.7957 6.95992L31.0881 7.25H31.5H56.7C59.6202 7.25 62 9.62228 62 12.5V43.75C62 46.6277 59.6202 49 56.7 49H6.3C3.37989 49 1.00022 46.6279 1 43.7504C1 43.7503 1 43.7501 1 43.75L1.0315 6.25084Z" stroke="#0A84FF" strokeWidth="2"/>
                                        </svg>
                                        <div className="link-wrap">
                                            <ul className="flex items-center">
                                                <li>
                                                    <a href={project.detail} target="_blank" rel="noopener noreferrer" title="Github바로가기">
                                                        <RiNotionLine className="w-7 h-7" />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href={project.link} target="_blank" rel="noopener noreferrer" title="Notion소개페이지바로가기">
                                                        <RiShareBoxLine className="w-6 h-6" />
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="middle">
                                        <p className="tit">{project.title}</p>
                                        <p className="en">{project.date}</p>
                                        <p className="desc">{project.contents}</p>
                                    </div>
                                </div>
                                <div className="bottom">
                                    <p className="en">{project.skill}</p>
                                </div>
                            </motion.li>
                        ))}
                    </AnimatePresence>
                </ul>
                {projectList.length > visibleItemsCount && (
                    <button className="btn" onClick={handleToggleShowAll}>
                    <span>{showAll ? "Show Less" : "Show More"}</span>
                    </button>
                )}
            </div>
        </section>
    );
}

export default Work;