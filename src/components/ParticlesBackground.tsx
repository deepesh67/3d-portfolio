import React, { useEffect, useRef } from 'react';

const skillsList = [
  { name: "HTML5", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
  { name: "CSS3", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" },
  { name: "JavaScript", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
  { name: "React", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
  { name: "Tailwind", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Node.js", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
  { name: "MongoDB", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" },
  { name: "MySQL", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" },
  { name: "Python", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
  { name: "C++", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" },
  { name: "Git", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
  { name: "GitHub", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" },
  { name: "Postman", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg" },
  { name: "VS Code", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg" }
];

const ParticlesBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let skillParticles: SkillParticle[] = [];
    let starParticles: StarParticle[] = [];
    let animationFrameId: number;

    // Preload images
    const loadedImages: { [key: string]: HTMLImageElement } = {};
    skillsList.forEach(skill => {
      const img = new Image();
      img.src = skill.url;
      loadedImages[skill.name] = img;
    });

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    window.addEventListener('resize', resizeCanvas);

    // Tiny stars for background depth
    class StarParticle {
      x: number;
      y: number;
      size: number;
      opacity: number;
      opacitySpeed: number;

      constructor() {
        this.x = Math.random() * (canvas?.width || window.innerWidth);
        this.y = Math.random() * (canvas?.height || window.innerHeight);
        this.size = Math.random() * 1.2 + 0.1;
        this.opacity = Math.random();
        this.opacitySpeed = (Math.random() * 0.01) - 0.005;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fill();
      }

      update() {
        this.opacity += this.opacitySpeed;
        if (this.opacity >= 0.8 || this.opacity <= 0.05) {
          this.opacitySpeed = -this.opacitySpeed;
        }
        this.draw();
      }
    }

    // Elegant, sparse floating skill logos
    class SkillParticle {
      x!: number;
      y!: number;
      size!: number;
      speedY!: number;
      speedX!: number;
      opacity!: number;
      fadeState!: 'in' | 'out';
      skill!: { name: string, url: string };
      maxOpacity!: number;
      rotation!: number;
      rotationSpeed!: number;

      constructor() {
        this.initParticle();
        // Randomize initial opacity so they don't all fade in at once
        this.opacity = Math.random() * 0.4;
        this.fadeState = Math.random() > 0.5 ? 'in' : 'out';
      }

      initParticle() {
        const w = canvas?.width || window.innerWidth;
        const h = canvas?.height || window.innerHeight;
        this.x = Math.random() * (w - 100) + 50; 
        this.y = Math.random() * (h - 100) + 50;
        
        // Size of logos increased to make them more prominent while maintaining fewer count
        this.size = w < 768 ? 40 : 65; 
        
        // Very slow drift
        this.speedY = (Math.random() * -0.2) - 0.1; 
        this.speedX = (Math.random() * 0.2) - 0.1;

        // Slight rotation for natural floating feel
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() * 0.01) - 0.005;

        this.opacity = 0;
        this.fadeState = 'in';
        this.maxOpacity = Math.random() * 0.4 + 0.45; // 45-85% opacity max
        
        this.skill = skillsList[Math.floor(Math.random() * skillsList.length)];
      }

      draw() {
        if (!ctx) return;
        const img = loadedImages[this.skill.name];
        
        if (img && img.complete) {
          ctx.save();
          ctx.translate(this.x, this.y);
          ctx.rotate(this.rotation);
          
          ctx.globalAlpha = this.opacity;
          
          // Subtle glow behind the logo
          ctx.shadowBlur = 20;
          ctx.shadowColor = `rgba(255, 255, 255, ${this.opacity * 0.5})`;
          
          // Draw image centered at current coordinates
          ctx.drawImage(img, -this.size / 2, -this.size / 2, this.size, this.size);
          
          ctx.restore();
        }
      }

      update() {
        // Slow vertical and horizontal drift
        this.y += this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotationSpeed;

        // Elegant fade in and fade out
        if (this.fadeState === 'in') {
          this.opacity += 0.002; 
          if (this.opacity >= this.maxOpacity) {
            this.fadeState = 'out';
          }
        } else {
          this.opacity -= 0.002;
          if (this.opacity <= 0) {
            this.initParticle(); 
          }
        }

        this.draw();
      }
    }

    const init = () => {
      skillParticles = [];
      starParticles = [];
      
      const isMobile = window.innerWidth < 768;
      const skillCount = isMobile ? 2 : 3; // Significantly reduced to maintain large gaps
      
      for (let i = 0; i < skillCount; i++) {
        skillParticles.push(new SkillParticle());
      }

      const starCount = isMobile ? 25 : 50;
      for (let i = 0; i < starCount; i++) {
        starParticles.push(new StarParticle());
      }
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      animationFrameId = requestAnimationFrame(animate);
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < starParticles.length; i++) {
        starParticles[i].update();
      }
      
      for (let i = 0; i < skillParticles.length; i++) {
        skillParticles[i].update();
      }
    };

    // Give images a tiny bit of time to start loading before init
    setTimeout(() => {
      resizeCanvas();
      animate();
    }, 100);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
};

export default ParticlesBackground;
