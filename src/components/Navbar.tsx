import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
export let smoother: ScrollSmoother;

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [activeSection, setActiveSection] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.7,
      speed: 1.7,
      effects: true,
      autoResize: true,
      ignoreMobileResize: true,
    });

    smoother.scrollTop(0);
    smoother.paused(true);

    window.addEventListener("resize", () => {
      ScrollSmoother.refresh(true);
    });

    // Active section via GSAP ScrollTrigger (highly accurate with ScrollSmoother)
    const sectionIds = NAV_LINKS.map((l) => l.href.replace("#", ""));
    const triggers: ScrollTrigger[] = [];

    const timer = setTimeout(() => {
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const trig = ScrollTrigger.create({
          trigger: el,
          start: "top 50%",
          end: "bottom 50%",
          onToggle: (self) => {
            if (self.isActive) setActiveSection(id);
          },
        });
        triggers.push(trig);
      });
    }, 300);

    return () => {
      clearTimeout(timer);
      triggers.forEach((t) => t.kill());
    };
  }, []);

  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el && smoother) {
      smoother.scrollTo(el, true, "top top");
    }
    setMenuOpen(false);
  };

  return (
    <>
      <header className="header" role="banner">
        {/* Logo */}
        <a
          href="#landingDiv"
          className="nav-logo"
          aria-label="Deepesh Sharma — Home"
          onClick={(e) => { e.preventDefault(); scrollTo("#landingDiv"); }}
        >
          <img src="/images/logo.png" alt="Deepesh Sharma Logo" />
        </a>

        {/* Desktop Nav Links */}
        <nav className="nav-links" aria-label="Primary navigation">
          {NAV_LINKS.map((link) => {
            const id = link.href.replace("#", "");
            return (
              <a
                key={link.label}
                href={link.href}
                className={`nav-link ${activeSection === id ? "active" : ""}`}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                aria-current={activeSection === id ? "page" : undefined}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Social + CTA */}
        <div className="nav-right">
          <a
            href="https://github.com/deepesh67"
            target="_blank"
            rel="noreferrer"
            className="nav-icon-link"
            aria-label="GitHub profile"
          >
            <FiGithub />
          </a>
          <a
            href="https://linkedin.com/in/deepesh-sharma-29b83426a"
            target="_blank"
            rel="noreferrer"
            className="nav-icon-link"
            aria-label="LinkedIn profile"
          >
            <FiLinkedin />
          </a>
          <a
            href="#contact"
            className="nav-cta"
            onClick={(e) => { e.preventDefault(); scrollTo("#contact"); }}
          >
            Hire Me
          </a>

          {/* Mobile hamburger */}
          <button
            className={`hamburger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      {/* Mobile menu dropdown */}
      <div
        ref={menuRef}
        className={`mobile-menu ${menuOpen ? "visible" : ""}`}
        aria-hidden={!menuOpen}
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="mobile-nav-link"
            onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
          >
            {link.label}
          </a>
        ))}
        <div className="mobile-social">
          <a href="https://github.com/deepesh67" target="_blank" rel="noreferrer" aria-label="GitHub">
            <FiGithub />
          </a>
          <a href="https://linkedin.com/in/deepesh-sharma-29b83426a" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <FiLinkedin />
          </a>
        </div>
      </div>

      <div className="nav-fade" aria-hidden="true" />
    </>
  );
};

export default Navbar;
