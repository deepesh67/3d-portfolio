import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { FiLinkedin, FiGithub } from "react-icons/fi";
import "./styles/Contact.css";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const section = sectionRef.current;

    // Left side: title + desc + button slide from left
    gsap.fromTo(
      section.querySelectorAll(".contact-title, .contact-desc, .freelance-btn"),
      { opacity: 0, x: -60 },
      {
        opacity: 1, x: 0,
        stagger: 0.14,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 80%" },
      }
    );

    // Right side: contact items slide from right with stagger
    gsap.fromTo(
      section.querySelectorAll(".contact-item"),
      { opacity: 0, x: 60 },
      {
        opacity: 1, x: 0,
        stagger: 0.12,
        duration: 1.0,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 78%" },
      }
    );
  }, []);
  return (
    <div className="contact-section section-container" id="contact" ref={sectionRef}>
      <div className="contact-grid">
        <div className="contact-left">
          <h2 className="contact-title">
            INTERESTED IN WORKING<br />
            TOGETHER? <span className="red-star">✦</span>
          </h2>
          <p className="contact-desc">
            I'm currently open to Full-Time Software Engineering opportunities.
          </p>
          <a href="mailto:khushijangid1902@gmail.com" className="freelance-btn">SEND A MESSAGE &rarr;</a>
        </div>
        
        <div className="contact-right">
          <div className="contact-item">
            <div className="contact-icon">
              <MdEmail />
            </div>
            <a href="mailto:khushijangid1902@gmail.com">khushijangid1902@gmail.com</a>
          </div>
          
          <div className="contact-item">
            <div className="contact-icon">
              <MdPhone />
            </div>
            <a href="tel:7737863869">+91 7737863869</a>
          </div>

          <div className="contact-item">
            <div className="contact-icon">
              <FiGithub />
            </div>
            <a href="https://github.com/khushijangid2004" target="_blank" rel="noreferrer">github.com/khushijangid2004</a>
          </div>

          <div className="contact-item">
            <div className="contact-icon">
              <FiLinkedin />
            </div>
            <a href="https://www.linkedin.com/in/khushi-jangid-6682b6307/" target="_blank" rel="noreferrer">linkedin.com/in/khushi-jangid-6682b6307</a>
          </div>
          
          <div className="contact-item">
            <div className="contact-icon">
              <MdLocationOn />
            </div>
            <span>Jaipur, India</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
