import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles/Certifications.css";

gsap.registerPlugin(ScrollTrigger);

const certs = [
  {
    title: "Full Stack Development Intern",
    issuer: "Regex Software",
    details: "45 Days. Successfully completed Full Stack Development Internship and was awarded a certificate of completion.",
  },
  {
    title: "C++ Object-Oriented Programming",
    issuer: "SKIT College Summer Training Program",
    details: "Completed summer training program focused on core C++ concepts, object-oriented programming, and data structures.",
  }
];

const Certifications = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const section = sectionRef.current;

    // Heading from left
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

    // Cards rise from bottom with stagger
    gsap.fromTo(
      section.querySelectorAll(".cert-card"),
      { opacity: 0, y: 60 },
      {
        opacity: 1, y: 0,
        stagger: 0.16,
        duration: 1.0,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 75%" },
      }
    );
  }, []);

  return (
    <section className="cert-section section-container" id="certifications" ref={sectionRef}>
      <div className="cert-container">
        <h2 className="section-title">CERTIFICATIONS</h2>
        
        <div className="cert-grid">
          {certs.map((cert, index) => (
            <div className="cert-card" key={index}>
              <div className="cert-icon">
                <span className="cert-star">✦</span>
              </div>
              <div className="cert-content">
                <h3 className="cert-title">{cert.title}</h3>
                <h4 className="cert-issuer">{cert.issuer}</h4>
                <p className="cert-details">{cert.details}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
