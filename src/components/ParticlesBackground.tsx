import React, { useEffect, useRef } from 'react';

const ParticlesBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particlesArray: Particle[] = [];
    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    window.addEventListener('resize', resizeCanvas);

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      opacitySpeed: number;

      constructor() {
        if (!canvas) {
          this.x = 0; this.y = 0; this.size = 0; this.speedX = 0; this.speedY = 0; this.opacity = 0; this.opacitySpeed = 0;
          return;
        }
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.2; // Tiny stars
        
        // Slow drift upwards and diagonally
        this.speedX = (Math.random() * 0.3) - 0.15;
        this.speedY = (Math.random() * -0.3) - 0.1; 
        
        this.opacity = Math.random();
        this.opacitySpeed = (Math.random() * 0.02) - 0.01; // Twinkling effect
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        
        // Glowing star effect
        ctx.shadowBlur = 6;
        ctx.shadowColor = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        
        ctx.fill();
        
        // Reset shadow to avoid affecting other draws unintentionally, though we only draw stars
        ctx.shadowBlur = 0;
      }

      update() {
        if (!canvas) return;

        // Twinkling logic
        this.opacity += this.opacitySpeed;
        if (this.opacity >= 1 || this.opacity <= 0.1) {
          this.opacitySpeed = -this.opacitySpeed;
        }

        // Movement logic
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around the screen to keep it infinite
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;

        this.draw();
      }
    }

    const init = () => {
      particlesArray = [];
      // Adjust density based on screen size, stars usually need higher density than networks
      const numberOfParticles = Math.floor((canvas.width * canvas.height) / 4000);
      
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      animationFrameId = requestAnimationFrame(animate);
      
      // Slightly clear the canvas to create a faint trailing effect (shooting star feel for faster ones)
      // or just clear completely for clean stars
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
      }
    };

    resizeCanvas();
    animate();

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
