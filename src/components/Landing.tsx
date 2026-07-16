import { PropsWithChildren, useEffect, useState } from "react";
import { FiGithub, FiLinkedin, FiFileText, FiArrowDown } from "react-icons/fi";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles/Landing.css";

gsap.registerPlugin(ScrollTrigger);

const TITLES = [
  "Software Engineer",
  "Full Stack Developer",
  "MERN Stack Developer",
  "React.js Developer",
  "Frontend Developer",
];

const Typewriter = () => {
  const [text, setText] = useState("");
  const [titleIndex, setTitleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentTitle = TITLES[titleIndex];
    const typingSpeed = isDeleting ? 40 : 100;
    const pauseTime = 2000;

    let timer: ReturnType<typeof setTimeout>;

    if (!isDeleting && text === currentTitle) {
      timer = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && text === "") {
      setIsDeleting(false);
      setTitleIndex((prev) => (prev + 1) % TITLES.length);
    } else {
      timer = setTimeout(() => {
        setText((prev) =>
          isDeleting
            ? currentTitle.substring(0, prev.length - 1)
            : currentTitle.substring(0, prev.length + 1)
        );
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, titleIndex]);

  return (
    <>
      {text}
      <span className="blinking-cursor">|</span>
    </>
  );
};

const Landing = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    let ctx: gsap.Context;
    // Wait for a brief moment to ensure ScrollSmoother in Navbar is fully initialized first
    const timer = setTimeout(() => {
      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: "#landingDiv",
            start: "top top",
            end: "bottom 30%",
            scrub: true,
          }
        });

        tl.to(".landing-left", {
          opacity: 0,
          y: -120,
          ease: "none"
        }, 0);
        
        tl.to(".landing-right", {
          opacity: 0,
          y: -120,
          ease: "none"
        }, 0);

        tl.to(".landing-bg-text", {
          opacity: 0,
          y: -60,
          ease: "none"
        }, 0);
      });
    }, 200);

    return () => {
      clearTimeout(timer);
      if (ctx) ctx.revert();
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      // Use smoother if initialized, fallback to native scrollIntoView
      import("./Navbar").then((module) => {
        if (module.smoother) {
          module.smoother.scrollTo(el, true, "top top");
        } else {
          el.scrollIntoView({ behavior: "smooth" });
        }
      });
    }
  };

  return (
    <>
      <div className="landing-section" id="landingDiv" aria-label="Hero section">
        {/* Decorative watermark background text */}
        <div className="landing-bg-text" aria-hidden="true">PORTFOLIO</div>

        <div className="landing-container">
          <div className="landing-content">

            {/* ── Left: Intro ── */}
            <div className="landing-left landing-info">
              <div className="landing-intro">
                {/* Greeting */}
                <p className="greeting">Hi, I'm Deepesh 👋</p>

                {/* Name */}
                <h1 className="name">
                  DEEPESH<br />SHARMA
                </h1>
              </div>

              {/* Role */}
              <h2 className="role landing-info-h2">
                <Typewriter />
              </h2>

              {/* Bio — resume-sourced, no invented content */}
              <p className="bio landing-h2-info">
                Full Stack Developer (MERN) with hands-on experience in building scalable web applications using{" "}
                <span className="bio-highlight">React.js</span>,{" "}
                <span className="bio-highlight">Node.js</span>,{" "}
                <span className="bio-highlight">Express.js</span>, and{" "}
                <span className="bio-highlight">MongoDB</span>.
                <br />
                Skilled in REST API development, authentication (JWT), and responsive UI design.
                <br />
                <em>Seeking an entry-level software developer role.</em>
              </p>

              {/* Availability indicator */}
              <div className="availability" aria-label="Currently available">
                <span className="dot" aria-hidden="true"></span>
                Open to Entry-Level Roles
              </div>

              {/* ── CTA Buttons ── */}
              <div className="hero-ctas" role="group" aria-label="Call to action buttons">
                <button
                  className="cta-primary"
                  onClick={() => scrollToSection("work")}
                  aria-label="View my projects"
                >
                  View Projects <FiArrowDown />
                </button>

                <a
                  href="/Deepesh_Sharma_FS_Resume.pdf"
                  download="Deepesh_Sharma_FS_Resume.pdf"
                  className="cta-secondary"
                  aria-label="Download Deepesh Sharma's Resume"
                >
                  <FiFileText /> Resume
                </a>

                <div className="social-icons" style={{ display: 'flex', gap: '0.85rem' }}>
                  <a
                    href="https://github.com/deepesh67"
                    target="_blank"
                    rel="noreferrer"
                    className="cta-icon"
                    aria-label="GitHub profile"
                  >
                    <FiGithub />
                  </a>

                  <a
                    href="https://www.linkedin.com/in/deepesh-sharma-29b83426a"
                    target="_blank"
                    rel="noreferrer"
                    className="cta-icon"
                    aria-label="LinkedIn profile"
                  >
                    <FiLinkedin />
                  </a>
                </div>
              </div>
            </div>

            {/* ── Center: Character/Profile image from Scene.tsx ── */}
            {children}

            {/* ── Right: Stats (honest, resume-based) ── */}
            <div className="landing-right">
              <div className="stat-block">
                <span className="stat-num">MERN</span>
                <span className="stat-text">STACK<br />TRAINEE</span>
              </div>
              <div className="stat-block">
                <span className="stat-num">4</span>
                <span className="stat-text">FULL-STACK<br />PROJECTS</span>
              </div>
              <div className="stat-block">
                <span className="stat-num">5+</span>
                <span className="stat-text">TECH<br />STACKS</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
