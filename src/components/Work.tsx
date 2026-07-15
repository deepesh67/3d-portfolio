import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiGithub, FiExternalLink, FiLock, FiArrowRight } from "react-icons/fi";
import "./styles/Work.css";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    number: "01",
    year: "2025",
    badge: "Company Project",
    category: "GRC Platform",
    title: "LawDocs Comply",
    description:
      "A comprehensive Governance, Risk & Compliance platform for legal document management. Built AI-assisted document review workflows and role-based access modules.",
    tech: ["React.js", "Node.js", "MongoDB", "Express.js"],
    image: "/images/lawdocs.png",
    links: [
      { type: "Case Study", url: "#", icon: <FiExternalLink />, disabled: false },
      { type: "Confidential", url: "#", icon: <FiLock />, disabled: true },
    ],
  },
  {
    number: "02",
    year: "2025",
    badge: "Personal Project",
    category: "Portfolio Website",
    title: "Personal Portfolio",
    description:
      "A 3D animated portfolio with GSAP scroll-triggered animations, a Three.js character, and a custom design system built from scratch using React and Vite.",
    tech: ["React.js", "GSAP", "Three.js", "TypeScript"],
    image: "/images/portfolio.png",
    links: [
      { type: "Live Demo", url: "https://khushijangid.dev", icon: <FiExternalLink />, disabled: false },
      { type: "GitHub", url: "https://github.com/khushijangid1902", icon: <FiGithub />, disabled: false },
    ],
  },
];

const STACK_OFFSETS = [
  { y: -32, scale: 0.88, opacity: 0.45, z: 1 }, // back card
  { y: -16, scale: 0.94, opacity: 0.7,  z: 2 }, // middle card
  { y: 0,   scale: 1,    opacity: 1,    z: 3 }, // front card (active)
];

const Work = () => {
  const sectionRef   = useRef<HTMLDivElement>(null);
  const deckRef      = useRef<HTMLDivElement>(null);
  // activeIndex = index in `projects` that is currently the FRONT card
  const [activeIndex, setActiveIndex] = useState(0);
  const isAnimating  = useRef(false);

  /* ── Scroll entrance ── */
  useEffect(() => {
    if (!sectionRef.current) return;
    const section = sectionRef.current;

    gsap.fromTo(
      section.querySelector(".work-left-text"),
      { opacity: 0, x: -70 },
      {
        opacity: 1, x: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 78%" },
      }
    );

    gsap.fromTo(
      section.querySelector(".work-nav"),
      { opacity: 0, x: 40 },
      {
        opacity: 1, x: 0,
        duration: 1.0,
        ease: "power3.out",
        delay: 0.1,
        scrollTrigger: { trigger: section, start: "top 78%" },
      }
    );

    gsap.fromTo(
      section.querySelector(".work-deck-wrapper"),
      { opacity: 0, y: 80 },
      {
        opacity: 1, y: 0,
        duration: 1.3,
        ease: "power3.out",
        delay: 0.15,
        scrollTrigger: { trigger: section, start: "top 75%" },
      }
    );
  }, []);

  /* ── Get the visual stack order for a given active index ──
     The 3 cards are displayed in this visual arrangement:
       slot 0 = back
       slot 1 = middle
       slot 2 = front (active)
     We map project indices to these slots cyclically.
  */
  const getSlot = useCallback(
    (projectIdx: number) => {
      const total = projects.length;
      // How far is this project from the active one?
      const diff = (projectIdx - activeIndex + total) % total;
      // diff 0 → front (slot 2), diff 1 → middle (slot 1), diff 2 → back (slot 0)
      return STACK_OFFSETS.length - 1 - (diff % STACK_OFFSETS.length);
    },
    [activeIndex]
  );

  /* ── Advance to next card ── */
  const handleNext = () => {
    if (isAnimating.current || !deckRef.current) return;
    isAnimating.current = true;

    const frontCard = deckRef.current.querySelector(
      `[data-idx="${activeIndex}"]`
    ) as HTMLElement;

    // Animate front card sweeping away to the back of the stack
    gsap.to(frontCard, {
      x: 60,
      opacity: 0,
      scale: 0.85,
      duration: 0.45,
      ease: "power2.in",
      onComplete: () => {
        // Snap it back invisibly so React's state update can reposition it
        gsap.set(frontCard, { x: 0, opacity: 0, scale: 0.88 });
        setActiveIndex((prev) => (prev + 1) % projects.length);
        // Fade new layout in
        gsap.to(deckRef.current!.querySelectorAll(".stack-card"), {
          opacity: (i, el) => {
            const slot = parseInt((el as HTMLElement).dataset.slot ?? "0");
            return STACK_OFFSETS[slot]?.opacity ?? 1;
          },
          duration: 0.35,
          ease: "power2.out",
          onComplete: () => { isAnimating.current = false; },
        });
      },
    });
  };

  return (
    <div className="work-section" id="work" ref={sectionRef}>
      <div className="work-inner section-container">

        {/* ── Top header: label + heading + nav ── */}
        <div className="work-left">
          {/* Text group */}
          <div className="work-left-text">
            <span className="work-label">PROJECTS</span>
            <h2 className="work-heading">
              Code That Solves <span className="work-heading-accent">Real Problems.</span>
            </h2>
            <p className="work-sub">
              A selection of production-grade and personal projects built with
              modern web &amp; mobile technologies.
            </p>
          </div>

          {/* Navigation — right side of header */}
          <div className="work-nav">
            <button className="work-nav-btn" onClick={handleNext} aria-label="Next project">
              <FiArrowRight />
            </button>
            <span className="work-nav-count">
              {String(activeIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* ── Full-width stacked card deck ── */}
        <div className="work-deck-wrapper" ref={deckRef}>
          {projects.map((project, idx) => {
            const slot   = getSlot(idx);
            const offset = STACK_OFFSETS[slot];

            return (
              <div
                key={idx}
                className={`stack-card ${slot === STACK_OFFSETS.length - 1 ? "stack-card--front" : ""}`}
                data-idx={idx}
                data-slot={slot}
                style={{
                  transform: `translateY(${offset.y}px) scale(${offset.scale})`,
                  opacity: offset.opacity,
                  zIndex: offset.z,
                }}
                onClick={slot === STACK_OFFSETS.length - 1 ? undefined : handleNext}
              >
                {/* Card body */}
                <div className="stack-card-body">
                  {/* Left info */}
                  <div className="stack-info">
                    <div className="stack-meta">
                      <span className="stack-number">{project.number}</span>
                      <div className="stack-tags">
                        <span className="stack-tag">{project.year}</span>
                        <span className="stack-tag">{project.badge}</span>
                        <span className="stack-tag">{project.category}</span>
                      </div>
                    </div>

                    <h3 className="stack-title">{project.title}</h3>
                    <p className="stack-desc">{project.description}</p>

                    <div className="stack-tech">
                      {project.tech.map((t, i) => (
                        <span key={i} className="tech-pill">{t}</span>
                      ))}
                    </div>

                    <div className="stack-links">
                      {project.links.map((link, i) => (
                        <a
                          key={i}
                          href={link.url}
                          className={`stack-btn ${link.disabled ? "btn-disabled" : ""}`}
                          target={link.disabled ? undefined : "_blank"}
                          rel="noreferrer"
                          onClick={(e) => link.disabled && e.preventDefault()}
                        >
                          {link.icon}
                          {link.type} <FiArrowRight className="btn-arrow" />
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Right image */}
                  <div className="stack-image">
                    <img src={project.image} alt={project.title} loading="lazy" />
                    <div className="stack-image-overlay" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default Work;
