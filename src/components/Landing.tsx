import { PropsWithChildren, useEffect } from "react";
import { FiGithub, FiLinkedin, FiFileText, FiArrowDown } from "react-icons/fi";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles/Landing.css";

gsap.registerPlugin(ScrollTrigger);

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

        tl.to(".landing-content", {
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
    if (el) el.scrollIntoView({ behavior: "smooth" });
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
                <p className="greeting">Hi, I'm Khushi 👋</p>

                {/* Name */}
                <h1 className="name">
                  KHUSHI<br />JANGID
                </h1>
              </div>

              {/* Role */}
              <h2 className="role landing-info-h2">Full Stack Developer</h2>

              {/* Bio — resume-sourced, no invented content */}
              <p className="bio landing-h2-info">
                Building scalable web applications using{" "}
                <span className="bio-highlight">React.js</span>,{" "}
                <span className="bio-highlight">Node.js</span>,{" "}
                <span className="bio-highlight">Express.js</span>,{" "}
                <span className="bio-highlight">MongoDB</span> and{" "}
                <span className="bio-highlight">React Native</span>.
                <br />
                Currently building Enterprise GRC and Digital Lending platforms.
                <br />
                <em>Open to Full-Time Software Engineering Opportunities.</em>
              </p>

              {/* Availability indicator */}
              <div className="availability" aria-label="Currently available">
                <span className="dot" aria-hidden="true"></span>
                Open to Full-Time Roles
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
                  href="/Khushi_Jangid_Resume.pdf"
                  download="Khushi_Jangid_Resume.pdf"
                  className="cta-secondary"
                  aria-label="Download Khushi Jangid's Resume"
                >
                  <FiFileText /> Resume
                </a>

                <a
                  href="https://github.com/khushijangid1902"
                  target="_blank"
                  rel="noreferrer"
                  className="cta-icon"
                  aria-label="GitHub profile"
                >
                  <FiGithub />
                </a>

                <a
                  href="https://www.linkedin.com/in/khushi-jangid-6682b6307/"
                  target="_blank"
                  rel="noreferrer"
                  className="cta-icon"
                  aria-label="LinkedIn profile"
                >
                  <FiLinkedin />
                </a>
              </div>
            </div>

            {/* ── Center: Character/Profile image from Scene.tsx ── */}
            {children}

            {/* ── Right: Stats (honest, resume-based) ── */}
            <div className="landing-right">
              <div className="stat-block">
                <span className="stat-num">7</span>
                <span className="stat-text">MONTHS<br />EXPERIENCE</span>
              </div>
              <div className="stat-block">
                <span className="stat-num">2</span>
                <span className="stat-text">ENTERPRISE<br />PROJECTS</span>
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
