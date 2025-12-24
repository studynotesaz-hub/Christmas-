
import React, { useEffect, useRef } from 'react';

const Snowfall: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', resize);
    resize();

    interface Flake {
      x: number;
      y: number;
      radius: number;
      speed: number;
      opacity: number;
      layer: number; // 0 (background) to 2 (foreground)
    }

    const flakes: Flake[] = [];
    const count = 120;

    for (let i = 0; i < count; i++) {
      const layer = Math.random() < 0.2 ? 2 : Math.random() < 0.5 ? 1 : 0;
      flakes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: layer === 2 ? Math.random() * 3 + 2 : layer === 1 ? Math.random() * 1.5 + 1 : Math.random() * 1 + 0.5,
        speed: layer === 2 ? Math.random() * 1.5 + 1 : layer === 1 ? Math.random() * 0.8 + 0.4 : Math.random() * 0.4 + 0.2,
        opacity: layer === 2 ? 0.4 : layer === 1 ? 0.3 : 0.15,
        layer
      });
    }

    let animationId: number;
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      flakes.forEach((f) => {
        // Subtle drift based on time
        const drift = Math.sin(Date.now() * 0.001 + f.x) * (f.layer + 1) * 0.5;
        
        ctx.beginPath();
        ctx.arc(f.x + drift, f.y, f.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${f.opacity})`;
        ctx.fill();

        f.y += f.speed;
        if (f.y > height) {
          f.y = -20;
          f.x = Math.random() * width;
        }
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
    />
  );
};

export default Snowfall;
