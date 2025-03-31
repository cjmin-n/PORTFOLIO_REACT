import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";

const Visual = () => {
  const { visualRef, startTyping } = useOutletContext(); // context로 startTyping 받음

  const words = ["full-stack", "creative", "AI-driven"];
  const colors = ["#0A84FF", "#5AB66E", "#FF6B6B"];

  const [wordIndex, setWordIndex] = useState(0);
  const [letterIndex, setLetterIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    if (!startTyping) return;

    const currentWord = words[wordIndex];
    const typing = setTimeout(() => {
      setDisplayText(currentWord.slice(0, letterIndex + 1));
      setLetterIndex((prev) => prev + 1);
    }, 90);

    if (letterIndex === currentWord.length) {
      clearTimeout(typing);
      setTimeout(() => {
        setLetterIndex(0);
        setWordIndex((prev) => (prev + 1) % words.length);
        setDisplayText("");
      }, 1500);
    }

    return () => clearTimeout(typing);
  }, [letterIndex, wordIndex, startTyping]);

  return (
    <section ref={visualRef} className="section section-visual h-screen">
      <div className="inner flex flex-row h-full items-center">
        <div className="txt-wrap">
          <div><p className="en">Hi I'm a</p></div>
          <div className="change-wrap">
            <p
              className="font-mono text-3xl md:text-4xl typing-effect"
              style={{ color: colors[wordIndex] }}
            >
              {displayText}
              <span className="cursor">|</span>
            </p>
          </div>
          <div><p>Developer.</p></div>
          <div className="btn-wrap flex gap-5">
            <a href="#projects" className="btn"><span>See my work</span></a>
            <a href="#contact" className="btn"><span>Get in touch</span></a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Visual;
