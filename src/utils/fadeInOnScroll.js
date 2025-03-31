// utils/fadeInOnScroll.js
import gsap from "gsap";

export const observeFadeIn = (selector = ".fade-in", options = {}) => {
  const elements = document.querySelectorAll(selector);

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        gsap.to(entry.target, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          ...options
        });
        // obs.unobserve(entry.target); // 한 번만 실행되게
      }
    });
  }, {
    threshold: 0.3,
  });

  elements.forEach(el => observer.observe(el));
};
