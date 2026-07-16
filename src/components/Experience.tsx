import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles/Experience.css";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const section = sectionRef.current;

    // Heading slides from left
    gsap.fromTo(
      section.querySelector(".section-title"),
      { opacity: 0, x: -60 },
      {
        opacity: 1, x: 0,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 80%" },
      }
    );

    // Timeline items stagger in from left
    gsap.fromTo(
      section.querySelectorAll(".timeline-item"),
      { opacity: 0, x: -50 },
      {
        opacity: 1, x: 0,
        stagger: 0.18,
        duration: 1.0,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 75%" },
      }
    );
  }, []);

  return (
    <section className="experience-section section-container" id="experience" ref={sectionRef}>
      <div className="experience-container">
        <h2 className="section-title exp-animate">EXPERIENCE</h2>

        <div className="timeline">
          {/* Experience Item */}
          <div className="timeline-item exp-animate">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <div className="timeline-header">
                <h3 className="role-title">MERN Stack Trainee</h3>
                <span className="timeline-date">2025 - 2025</span>
              </div>
              <h4 className="company-name">Regex Software</h4>
              <ul className="responsibilities">
                <li>Built full-stack apps during intensive training program.</li>
              </ul>
            </div>
          </div>

          {/* Education Item (Integrated into timeline to save space, or kept in About. The prompt didn't specify, but timeline is good for both) */}
          <div className="timeline-item exp-animate">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <div className="timeline-header">
                <h3 className="role-title">B.Tech in Electronics and Communication Engineering</h3>
                <span className="timeline-date">11/2022 - 08/2026</span>
              </div>
              <h4 className="company-name">SKIT College (Rajasthan Technical University), Jaipur, India</h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
