"use client";

import { useEffect, useRef } from "react";

export default function ParticleGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let mouse = { x: -1000, y: -1000 };

    const particles: { x: number; y: number; baseX: number; baseY: number }[] =
      [];
    const spacing = 40;
    const maxDist = 120;

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
      initParticles();
    }

    function initParticles() {
      particles.length = 0;
      const cols = Math.ceil(canvas!.width / spacing);
      const rows = Math.ceil(canvas!.height / spacing);
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * spacing + spacing / 2;
          const y = j * spacing + spacing / 2;
          particles.push({ x, y, baseX: x, baseY: y });
        }
      }
    }

    function draw() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      for (const p of particles) {
        const dx = mouse.x - p.baseX;
        const dy = mouse.y - p.baseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDist) {
          const force = (maxDist - dist) / maxDist;
          p.x = p.baseX - dx * force * 0.3;
          p.y = p.baseY - dy * force * 0.3;
        } else {
          p.x += (p.baseX - p.x) * 0.1;
          p.y += (p.baseY - p.y) * 0.1;
        }

        const alpha = dist < maxDist ? 0.15 + (1 - dist / maxDist) * 0.35 : 0.08;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, 1.2, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(46, 196, 182, ${alpha})`;
        ctx!.fill();
      }

      // Draw lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < spacing * 1.5) {
            const mdx = mouse.x - (particles[i].x + particles[j].x) / 2;
            const mdy = mouse.y - (particles[i].y + particles[j].y) / 2;
            const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
            const alpha =
              mDist < maxDist
                ? 0.04 + (1 - mDist / maxDist) * 0.12
                : 0.02;
            ctx!.beginPath();
            ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.lineTo(particles[j].x, particles[j].y);
            ctx!.strokeStyle = `rgba(46, 196, 182, ${alpha})`;
            ctx!.lineWidth = 0.5;
            ctx!.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    }

    const handleMouse = (e: MouseEvent) => {
      mouse = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouse);
    resize();
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
}
