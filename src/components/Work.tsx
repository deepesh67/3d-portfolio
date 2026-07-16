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
    badge: "Personal Project",
    category: "HR System",
    title: "HR Management System",
    description:
      "A full-stack HR management system to manage employee leave requests and attendance tracking. Implemented role-based access (Admin & Employee), daily marking, validation rules, and an admin dashboard.",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
    image: "/images/hr-system.png",
    links: [
      { type: "GitHub", url: "https://github.com/deepesh67", icon: <FiGithub />, disabled: false },
    ],
  },
  {
    number: "02",
    year: "2025",
    badge: "Personal Project",
    category: "Form Builder",
    title: "No-Code Dynamic Form Builder",
    description:
      "A No-Code Dynamic Form Builder using the MERN Stack, enabling users to create and publish forms without coding. Features dynamic form rendering, real-time response collection, CSV export, analytics dashboard, and drag-and-drop functionality.",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT"],
    image: "/images/form-builder.png",
    links: [
      { type: "GitHub", url: "https://github.com/deepesh67", icon: <FiGithub />, disabled: false },
    ],
  },
  {
    number: "03",
    year: "2025",
    badge: "Personal Project",
    category: "Task Manager",
    title: "TaskFlow",
    description:
      "A task management web app built with the MERN stack. Features JWT authentication for login/signup, and CRUD operations for managing tasks with a responsive UI.",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT"],
    image: "/images/taskflow.png",
    links: [
      { type: "GitHub", url: "https://github.com/deepesh67", icon: <FiGithub />, disabled: false },
    ],
  },
  {
    number: "04",
    year: "2025",
    badge: "Personal Project",
    category: "Weather App",
    title: "SkyLens",
    description:
      "A real-time weather dashboard with live API data. Includes AQI monitoring, °C/°F toggle, city search with geolocation, and a 2-year historical chart analysis.",
    tech: ["React.js", "Tailwind CSS", "Open-Meteo API", "Recharts"],
    image: "/images/skylens.png",
    links: [
      { type: "GitHub", url: "https://github.com/deepesh67", icon: <FiGithub />, disabled: false },
    ],
  },
];

const STACK_OFFSETS = [
  { y: -48, scale: 0.82, opacity: 0,    z: 0 }, // hidden back card
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

  /* ── Get the visual stack order for a given active index ── */
  const getSlot = useCallback(
    (projectIdx: number) => {
      const total = projects.length;
      // How far is this project from the active one?
      const diff = (projectIdx - activeIndex + total) % total;
      // Map diff to slot index (front is highest slot index)
      return Math.max(0, STACK_OFFSETS.length - 1 - diff);
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

    if (!frontCard) {
      isAnimating.current = false;
      return;
    }

    // Disable CSS transition temporarily so GSAP can animate smoothly
    frontCard.style.transition = "none";

    // Animate front card sweeping away to the right and fading out
    gsap.to(frontCard, {
      x: 60,
      opacity: 0,
      scale: 0.85,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => {
        // Clear GSAP inline styles so CSS can take over again
        gsap.set(frontCard, { clearProps: "all" });
        frontCard.style.transition = "";

        // Advance active index, triggering a React re-render with new styles
        setActiveIndex((prev) => (prev + 1) % projects.length);

        // Wait for CSS transitions of the sliding cards to finish
        setTimeout(() => {
          isAnimating.current = false;
        }, 550);
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
