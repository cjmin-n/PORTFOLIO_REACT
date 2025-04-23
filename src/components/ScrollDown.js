import { useEffect, useRef, useState } from "react";

export const ScrollDown = () => {

    const indicatorRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    

    useEffect(() => {
        const isMobile = window.matchMedia("(max-width: 1024px)").matches;
        if(isMobile) {
            setIsVisible(true);
            return;
        }

        const container = document.querySelector(".section-visual");

        const handleMouseMove = (e) => {
            if (!indicatorRef.current) return;

            const hoveredEl = document.elementFromPoint(e.clientX, e.clientY);
            const hoveredCursor = getComputedStyle(hoveredEl).cursor;

            if (hoveredCursor === "pointer") {
                setIsVisible(false);
                return;
            }

            setIsVisible(true);

            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            indicatorRef.current.style.left = `${x}px`;
            indicatorRef.current.style.top = `${y}px`;
        };

        const handleMouseEnter = () => setIsVisible(true);
        const handleMouseLeave = () => setIsVisible(false);

        container.addEventListener("mousemove", handleMouseMove);
        container.addEventListener("mouseenter", handleMouseEnter);
        container.addEventListener("mouseleave", handleMouseLeave);

        return () => {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);



    return (
        <div 
            ref={indicatorRef}
            className={`scroll-indicator ${isVisible ? "" : "hidden"}`}
        >
            <img src="/images/scrollText.png" alt="scroll text" className="scroll-text rotating" />
            <img src="/images/centerStar.png" alt="center star" className="scroll-center" />
        </div>
    );
}