import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles/Skills.css";

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    title: "Frontend",
    skills: ["HTML", "CSS", "JavaScript", "React.js", "Tailwind CSS"]
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express.js", "REST APIs"]
  },
  {
    title: "Database",
    skills: ["MongoDB", "MySQL"]
  },
  {
    title: "Languages",
    skills: ["JavaScript", "Python", "C/C++"]
  },
  {
    title: "Tools",
    skills: ["Git", "GitHub", "Postman", "VS Code"]
  }
];

const SkillCard = ({ title, skills, index }: { title: string; skills: string[]; index: number }) => {
  const getIcon = (category: string) => {
    const gradId = `grad-${index}`;
    
    switch (category.toLowerCase()) {
      case "frontend":
        return (
          <svg viewBox="0 0 100 100" className="skill-3d-svg">
            <defs>
              <radialGradient id={gradId} cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#ffda85" />
                <stop offset="60%" stopColor="#d9a016" />
                <stop offset="100%" stopColor="#5c4106" />
              </radialGradient>
            </defs>
            <circle cx="50" cy="50" r="28" fill={`url(#${gradId})`} />
            <ellipse cx="50" cy="36" rx="14" ry="4" fill="rgba(255, 255, 255, 0.45)" />
          </svg>
        );
      case "backend":
        return (
          <svg viewBox="0 0 100 100" className="skill-3d-svg">
            <defs>
              <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffce6b" />
                <stop offset="50%" stopColor="#d9a016" />
                <stop offset="100%" stopColor="#4d3705" />
              </linearGradient>
            </defs>
            <g>
              <path d="M28,30 C28,18 72,18 72,30 L72,70 C72,82 28,82 28,70 Z" fill={`url(#${gradId})`} />
              <ellipse cx="50" cy="30" rx="22" ry="7" fill="#ffebad" />
              <ellipse cx="50" cy="50" rx="22" ry="7" fill="#d9a016" opacity="0.9" />
              <ellipse cx="50" cy="70" rx="22" ry="7" fill="#6b4b0a" opacity="0.9" />
            </g>
          </svg>
        );
      case "database":
        return (
          <svg viewBox="0 0 100 100" className="skill-3d-svg">
            <defs>
              <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffce6b" />
                <stop offset="100%" stopColor="#7a560a" />
              </linearGradient>
            </defs>
            <g>
              <path d="M50,15 L82,30 L50,45 L18,30 Z" fill="#ffebad" />
              <path d="M18,30 L50,45 L50,75 L18,60 Z" fill={`url(#${gradId})`} />
              <path d="M50,45 L82,30 L82,60 L50,75 Z" fill="#9e7119" />
            </g>
          </svg>
        );
      case "languages":
        return (
          <svg viewBox="0 0 100 100" className="skill-3d-svg">
            <defs>
              <linearGradient id={gradId} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffce6b" />
                <stop offset="100%" stopColor="#d9a016" />
              </linearGradient>
            </defs>
            <g>
              <rect x="32" y="14" width="36" height="72" rx="7" fill={`url(#${gradId})`} stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
              <rect x="36" y="20" width="28" height="52" rx="3" fill="#4d3705" />
              <circle cx="50" cy="79" r="2.5" fill="#ffffff" opacity="0.9" />
              <line x1="46" y1="17" x2="54" y2="17" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" strokeLinecap="round" />
            </g>
          </svg>
        );
      case "tools":
        return (
          <svg viewBox="0 0 100 100" className="skill-3d-svg">
            <defs>
              <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffce6b" />
                <stop offset="100%" stopColor="#d9a016" />
              </linearGradient>
            </defs>
            <g>
              <circle cx="50" cy="50" r="21" fill="none" stroke={`url(#${gradId})`} strokeWidth="7" />
              <circle cx="50" cy="50" r="9" fill="#4d3705" />
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                <rect 
                  key={i} 
                  x="47" 
                  y="18" 
                  width="6" 
                  height="12" 
                  rx="1.5"
                  fill={`url(#${gradId})`} 
                  transform={`rotate(${angle} 50 50)`} 
                />
              ))}
            </g>
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 100 100" className="skill-3d-svg">
            <defs>
              <linearGradient id={gradId} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffce6b" />
                <stop offset="100%" stopColor="#d9a016" />
              </linearGradient>
            </defs>
            <g>
              <polygon points="50,15 80,40 65,75 35,75 20,40" fill={`url(#${gradId})`} />
              <polygon points="50,28 70,45 60,67 40,67 30,45" fill="#4d3705" />
            </g>
          </svg>
        );
    }
  };

  return (
    <div className="skill-card">
      <div className="skill-icon-wrapper">
        {getIcon(title)}
      </div>
      <div className="skill-content">
        <h3 className="skill-title">{title}</h3>
        <p className="skill-subtitle">{skills.join(" • ")}</p>
      </div>
    </div>
  );
};

const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    
    gsap.fromTo(
      sectionRef.current.querySelector(".marquee-wrapper"),
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      }
    );
  }, []);

  // Duplicate cards for seamless infinite scroll
  // We double it to ensure the track can scroll exactly 50% and look continuous
  const allCards = [...skillCategories, ...skillCategories, ...skillCategories, ...skillCategories];

  return (
    <section className="skills-section section-container" id="skills" ref={sectionRef}>
      <div className="skills-container">
        <h2 className="section-title">TECHNICAL SKILLS</h2>

        <div className="marquee-wrapper">
          <div className="marquee-track">
            {allCards.map((category, idx) => (
              <SkillCard 
                key={idx} 
                title={category.title} 
                skills={category.skills} 
                index={idx % skillCategories.length} 
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
