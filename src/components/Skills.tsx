import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles/Skills.css";

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    title: "Frontend",
    skills: ["React.js", "React Native", "JavaScript", "TypeScript", "HTML5", "CSS3"]
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express.js", "REST APIs"]
  },
  {
    title: "Database",
    skills: ["MongoDB", "Supabase"]
  },
  {
    title: "Mobile Development",
    skills: ["React Native", "Expo", "TypeScript"]
  },
  {
    title: "Developer Tools",
    skills: ["Git", "GitHub", "Postman", "VS Code"]
  }
];

const SkillCard = ({ title, skills, index }: { title: string; skills: string[]; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Smooth tilt angles
    const rotateX = ((centerY - y) / centerY) * 12;
    const rotateY = ((x - centerX) / centerX) * 12;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  const getIcon = (category: string) => {
    const glowId = `glow-${index}`;
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
              <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            <circle cx="50" cy="50" r="28" fill={`url(#${gradId})`} filter={`url(#${glowId})`} />
            <ellipse cx="50" cy="36" rx="14" ry="4" fill="rgba(255, 255, 255, 0.45)" filter="blur(1px)" />
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
      case "mobile development":
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
      case "developer tools":
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
    <div className="skills-card-wrapper floating-card" style={{ animationDelay: `${index * 0.6}s` }}>
      <div 
        ref={cardRef}
        className="skill-category" 
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="skill-3d-wrapper">
          {getIcon(title)}
        </div>
        <h3 className="skill-category-title">{title}</h3>
        <div className="skill-tags">
          {skills.map((skill, i) => (
            <span key={i} className="skill-tag">{skill}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const elements = sectionRef.current.querySelectorAll(".skills-card-wrapper");
    gsap.fromTo(
      elements,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <section className="skills-section section-container" id="skills" ref={sectionRef}>
      <div className="skills-container">
        <h2 className="section-title">TECHNICAL SKILLS</h2>

        <div className="skills-masonry">
          <div className="skills-column col-1">
            <SkillCard {...skillCategories[0]} index={0} /> {/* Frontend */}
            <SkillCard {...skillCategories[2]} index={2} /> {/* Database */}
          </div>
          <div className="skills-column col-2">
            <SkillCard {...skillCategories[1]} index={1} /> {/* Backend */}
            <SkillCard {...skillCategories[3]} index={3} /> {/* Mobile Development */}
          </div>
          <div className="skills-column col-3">
            <SkillCard {...skillCategories[4]} index={4} /> {/* Developer Tools */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
