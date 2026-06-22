"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
  twinkleSpeed: number;
  twinklePhase: number;
}

const COLORS = [
  "rgba(0,255,133,VAL)",
  "rgba(0,180,216,VAL)",
  "rgba(167,139,250,VAL)",
  "rgba(255,255,255,VAL)",
];

function makeColor(template: string, alpha: number) {
  return template.replace("VAL", alpha.toFixed(3));
}

/**
 * FloatingParticles
 * ─────────────────
 * A canvas-based particle system that renders slow, softly twinkling
 * dots across the full viewport. No DOM elements per particle —
 * everything drawn on a single <canvas> in a rAF loop.
 *
 * Props:
 *   count   — number of particles (default 60)
 *   speed   — movement multiplier (default 0.18 — very slow)
 *
 * Performance: a single canvas with willChange: transform.
 * The loop is cancelled on unmount to prevent memory leaks.
 */
export function FloatingParticles({
  count = 60,
  speed = 0.18,
}: {
  count?: number;
  speed?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = 0;
    let w = 0;
    let h = 0;
    let particles: Particle[] = [];

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };

    const spawn = (): Particle => {
      const colorTemplate = COLORS[Math.floor(Math.random() * COLORS.length)];
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed * 0.6 - speed * 0.15,
        size: Math.random() * 1.5 + 0.4,
        alpha: Math.random() * 0.4 + 0.05,
        color: colorTemplate,
        twinkleSpeed: Math.random() * 0.012 + 0.004,
        twinklePhase: Math.random() * Math.PI * 2,
      };
    };

    resize();
    particles = Array.from({ length: count }, spawn);

    window.addEventListener("resize", resize, { passive: true });

    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      t += 1;

      for (const p of particles) {
        // Twinkle
        const a = p.alpha * (0.5 + 0.5 * Math.sin(t * p.twinkleSpeed + p.twinklePhase));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = makeColor(p.color, a);
        ctx.fill();

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap horizontally, reset from bottom when it drifts too far up
        if (p.x < -4) p.x = w + 4;
        if (p.x > w + 4) p.x = -4;
        if (p.y < -4) { p.y = h + 4; p.x = Math.random() * w; }
        if (p.y > h + 4) { p.y = -4; p.x = Math.random() * w; }
      }

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [count, speed]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1]"
      style={{ willChange: "transform", opacity: 0.75 }}
    />
  );
}
