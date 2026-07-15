import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles/About.css";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const section = sectionRef.current;

    // Label + heading → slide from left
    gsap.fromTo(
      section.querySelectorAll(".about-label, .about-heading"),
      { opacity: 0, x: -50 },
      {
        opacity: 1, x: 0,
        stagger: 0.15,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 80%" },
      }
    );

    // Body text paragraphs → stagger up from bottom
    gsap.fromTo(
      section.querySelectorAll(".about-text"),
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0,
        stagger: 0.12,
        duration: 1.0,
        ease: "power3.out",
        delay: 0.2,
        scrollTrigger: { trigger: section, start: "top 78%" },
      }
    );
  }, []);

  return (
    <section
      className="about-section section-container"
      id="about"
      ref={sectionRef}
      aria-label="About Khushi Jangid"
    >
      <div className="about-inner">
        <div className="about-label about-animate">About</div>
        <h2 className="about-heading about-animate">
          Turning ideas into<br />
          <span className="about-heading-accent">scalable products.</span>
        </h2>
        <div className="about-body">
          <p className="about-text about-animate">
            I'm <strong>Khushi Jangid</strong>, a Full Stack Developer based in Jaipur, India, specializing in the
            MERN stack — <strong>MongoDB, Express.js, React.js, and Node.js</strong>. I build production-grade
            enterprise applications and cross-platform mobile apps using <strong>React Native</strong>.
          </p>
          <p className="about-text about-animate">
            Currently, I contribute to <strong>LawDocs</strong>, where I've built AI-assisted document review
            workflows, integrated complex <strong>REST APIs</strong>, and developed authentication, onboarding, and KYC
            flows for real-world users. I work across the full stack — from designing component libraries in React to
            architecting <strong>Node.js</strong> + <strong>MongoDB</strong> backends.
          </p>
          <p className="about-text about-animate">
            I care deeply about code quality, developer experience, and shipping products that work well for users.
            I'm looking for <em>full-time software engineering roles</em> where I can contribute to impactful products
            and grow alongside a strong engineering team.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
