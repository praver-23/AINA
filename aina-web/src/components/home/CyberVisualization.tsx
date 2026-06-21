"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// ─────────────────────────────────────────────
// Hex grid background canvas
// ─────────────────────────────────────────────
function HexGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const hexRadius = 22;
    const hexWidth = hexRadius * 2;
    const hexHeight = Math.sqrt(3) * hexRadius;

    let t = 0;
    let raf: number;

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      const cols = Math.ceil(w / (hexWidth * 0.75)) + 2;
      const rows = Math.ceil(h / hexHeight) + 2;

      for (let col = -1; col < cols; col++) {
        for (let row = -1; row < rows; row++) {
          const x = col * hexWidth * 0.75;
          const y = row * hexHeight + (col % 2 === 0 ? 0 : hexHeight / 2);
          const dist = Math.sqrt((x - w / 2) ** 2 + (y - h / 2) ** 2);
          const pulse = 0.5 + 0.5 * Math.sin((dist / 60) - t * 1.5);
          const alpha = 0.03 + pulse * 0.05;

          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i - Math.PI / 6;
            const px = x + hexRadius * 0.9 * Math.cos(angle);
            const py = y + hexRadius * 0.9 * Math.sin(angle);
            i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
          }
          ctx.closePath();
          ctx.strokeStyle = `rgba(0, 180, 216, ${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      t += 0.016;
      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-60"
      aria-hidden="true"
    />
  );
}

// ─────────────────────────────────────────────
// Floating particle
// ─────────────────────────────────────────────
function Particle({ delay, duration, x, y }: { delay: number; duration: number; x: number; y: number }) {
  return (
    <motion.div
      className="absolute w-1 h-1 rounded-full bg-[#00ff85]"
      style={{ left: `${x}%`, top: `${y}%` }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0, 1.5, 0],
        y: [0, -30, -60],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeOut",
      }}
    />
  );
}

// ─────────────────────────────────────────────
// Orbit ring with nodes
// ─────────────────────────────────────────────
function OrbitRing({
  radius,
  duration,
  nodeCount,
  color,
  nodeSize = 4,
  reverse = false,
  opacity = 0.25,
}: {
  radius: number;
  duration: number;
  nodeCount: number;
  color: string;
  nodeSize?: number;
  reverse?: boolean;
  opacity?: number;
}) {
  const nodes = Array.from({ length: nodeCount }, (_, i) => ({
    angle: (360 / nodeCount) * i,
    delay: (duration / nodeCount) * i,
  }));

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {/* Ring */}
      <div
        className="absolute rounded-full border"
        style={{
          width: radius * 2,
          height: radius * 2,
          borderColor: `${color}${Math.round(opacity * 255).toString(16).padStart(2, "0")}`,
          borderStyle: "dashed",
          borderWidth: 1,
        }}
      />
      {/* Rotating nodes */}
      <motion.div
        className="absolute"
        style={{ width: radius * 2, height: radius * 2 }}
        animate={{ rotate: reverse ? -360 : 360 }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        {nodes.map((node, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: nodeSize,
              height: nodeSize,
              backgroundColor: color,
              top: "50%",
              left: "50%",
              marginTop: -nodeSize / 2,
              marginLeft: -nodeSize / 2,
              transform: `rotate(${node.angle}deg) translateY(-${radius}px)`,
              boxShadow: `0 0 ${nodeSize * 2}px ${color}`,
            }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{
              duration: 2,
              delay: node.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Central APK Scanner
// ─────────────────────────────────────────────
function ApkScanner() {
  return (
    <div className="relative w-28 h-36 flex flex-col items-center justify-center z-10">
      {/* Outer glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: "radial-gradient(ellipse, rgba(0,255,133,0.15) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Phone body */}
      <div
        className="relative w-20 h-32 rounded-2xl border border-[#00ff85]/40 bg-[#0a1628] flex flex-col items-center justify-between p-2 overflow-hidden"
        style={{ boxShadow: "0 0 30px rgba(0,255,133,0.15), inset 0 0 20px rgba(0,180,216,0.05)" }}
      >
        {/* Screen top notch */}
        <div className="w-8 h-1.5 rounded-full bg-[#0f2942]" />

        {/* APK icon in center */}
        <div className="flex-1 flex flex-col items-center justify-center gap-1.5">
          {/* Robot icon SVG */}
          <svg viewBox="0 0 32 32" className="w-10 h-10" fill="none">
            <rect x="6" y="10" width="20" height="16" rx="3" fill="#0f2942" stroke="#00ff85" strokeWidth="1.5" />
            <rect x="11" y="14" width="3.5" height="3.5" rx="1" fill="#00ff85" />
            <rect x="17.5" y="14" width="3.5" height="3.5" rx="1" fill="#00b4d8" />
            <rect x="13" y="20" width="6" height="1.5" rx="0.75" fill="#00ff85" opacity="0.6" />
            <line x1="16" y1="10" x2="16" y2="7" stroke="#00ff85" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="16" cy="6" r="1.5" fill="#00ff85" />
            <line x1="6" y1="16" x2="3" y2="16" stroke="#00b4d8" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="26" y1="16" x2="29" y2="16" stroke="#00b4d8" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span className="text-[7px] font-mono text-[#00ff85] tracking-widest">ANALYZING</span>
        </div>

        {/* Bottom home bar */}
        <div className="w-10 h-1 rounded-full bg-[#0f2942]" />

        {/* Scanning beam */}
        <motion.div
          className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00ff85] to-transparent opacity-80"
          animate={{ top: ["0%", "100%", "0%"] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Floating data labels
// ─────────────────────────────────────────────
const floatingLabels = [
  { text: "DEX Header", x: 5, y: 12, color: "#00ff85", delay: 0 },
  { text: "SMALI", x: 75, y: 8, color: "#00b4d8", delay: 0.4 },
  { text: "Permissions ×14", x: 78, y: 78, color: "#ff3b5c", delay: 0.8 },
  { text: "Native Libs", x: 3, y: 80, color: "#a78bfa", delay: 1.2 },
  { text: "Manifest", x: 35, y: 3, color: "#00b4d8", delay: 1.6 },
  { text: "Anti-Debug", x: 60, y: 92, color: "#ff3b5c", delay: 2.0 },
];

function FloatingLabel({ text, x, y, color, delay }: typeof floatingLabels[0]) {
  return (
    <motion.div
      className="absolute flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-mono whitespace-nowrap"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        borderColor: `${color}30`,
        backgroundColor: `${color}08`,
        color,
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: [0, 1, 1, 0], scale: [0.8, 1, 1, 0.8], y: [4, 0, 0, -4] }}
      transition={{ duration: 4, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full shrink-0"
        style={{ backgroundColor: color, boxShadow: `0 0 4px ${color}` }}
      />
      {text}
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// Terminal readout strip
// ─────────────────────────────────────────────
const terminalLines = [
  { text: "> Unpacking APK archive...", color: "#94a3b8" },
  { text: "> DEX bytecode extracted ✓", color: "#00ff85" },
  { text: "> 847 classes analyzed", color: "#94a3b8" },
  { text: "> THREAT: C2 beacon detected", color: "#ff3b5c" },
  { text: "> Sandbox exec: 23s elapsed", color: "#00b4d8" },
  { text: "> Risk score: 94/100 🔴", color: "#ff3b5c" },
];

function TerminalReadout() {
  const [visibleLines, setVisibleLines] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleLines((v) => (v >= terminalLines.length ? 1 : v + 1));
    }, 900);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="absolute bottom-4 left-4 right-4 rounded-lg border border-[#0f2942] bg-[#020817]/90 p-3 font-mono text-[10px] space-y-1 overflow-hidden"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.6 }}
    >
      <div className="flex items-center gap-1.5 mb-2 pb-1.5 border-b border-[#0f2942]">
        <div className="w-2 h-2 rounded-full bg-[#ff3b5c]" />
        <div className="w-2 h-2 rounded-full bg-[#f59e0b]" />
        <div className="w-2 h-2 rounded-full bg-[#00ff85]" />
        <span className="ml-1 text-[#64748b]">aina-analysis.sh</span>
      </div>
      {terminalLines.slice(0, visibleLines).map((line, i) => (
        <motion.div
          key={`${i}-${visibleLines}`}
          className="flex items-start gap-1"
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          style={{ color: line.color }}
        >
          {line.text}
          {i === visibleLines - 1 && (
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="ml-0.5"
            >▋</motion.span>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// Threat score arc
// ─────────────────────────────────────────────
function ThreatArc() {
  const score = 94;
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const strokeDash = (score / 100) * circumference * 0.75; // 270° arc

  return (
    <motion.div
      className="absolute top-4 right-4 flex flex-col items-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.8, duration: 0.6 }}
    >
      <div className="relative w-20 h-20">
        <svg viewBox="0 0 120 120" className="w-full h-full -rotate-[135deg]">
          {/* Track */}
          <circle
            cx="60" cy="60" r={radius}
            fill="none" stroke="#0f2942" strokeWidth="8"
            strokeDasharray={`${circumference * 0.75} ${circumference * 0.25}`}
            strokeLinecap="round"
          />
          {/* Score arc */}
          <motion.circle
            cx="60" cy="60" r={radius}
            fill="none" stroke="#ff3b5c" strokeWidth="8"
            strokeDasharray={`${strokeDash} ${circumference - strokeDash}`}
            strokeLinecap="round"
            initial={{ strokeDasharray: `0 ${circumference}` }}
            animate={{ strokeDasharray: `${strokeDash} ${circumference - strokeDash}` }}
            transition={{ delay: 1, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ filter: "drop-shadow(0 0 4px #ff3b5c)" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-lg font-bold text-[#ff3b5c] leading-none">{score}</span>
          <span className="text-[8px] text-[#64748b] mt-0.5">RISK</span>
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// Main exported visualization
// ─────────────────────────────────────────────
export function CyberVisualization() {
  const particles = Array.from({ length: 12 }, (_, i) => ({
    delay: i * 0.4,
    duration: 2 + Math.random() * 2,
    x: 10 + Math.random() * 80,
    y: 20 + Math.random() * 60,
  }));

  return (
    <div
      className="relative w-full h-full min-h-[520px] rounded-2xl overflow-hidden"
      aria-hidden="true"
      style={{
        background: "radial-gradient(ellipse 80% 80% at 50% 50%, #0a1628 0%, #020817 100%)",
        border: "1px solid rgba(0,180,216,0.15)",
        boxShadow: "0 0 60px rgba(0,180,216,0.08), inset 0 0 60px rgba(0,255,133,0.03)",
      }}
    >
      {/* Hex grid */}
      <HexGrid />

      {/* Particles */}
      {particles.map((p, i) => (
        <Particle key={i} {...p} />
      ))}

      {/* Floating labels */}
      {floatingLabels.map((label) => (
        <FloatingLabel key={label.text} {...label} />
      ))}

      {/* Orbit rings */}
      <OrbitRing radius={140} duration={18} nodeCount={6} color="#00b4d8" opacity={0.2} />
      <OrbitRing radius={100} duration={12} nodeCount={4} color="#00ff85" opacity={0.3} nodeSize={5} />
      <OrbitRing radius={64} duration={8} nodeCount={3} color="#a78bfa" opacity={0.25} nodeSize={3} reverse />

      {/* Center scanner */}
      <div className="absolute inset-0 flex items-center justify-center">
        <ApkScanner />
      </div>

      {/* Threat arc gauge */}
      <ThreatArc />

      {/* Connection lines (SVG overlay) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
        <defs>
          <radialGradient id="lineGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00ff85" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#00b4d8" stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* Pulsing concentric ring */}
        <motion.circle
          cx="50%" cy="44%" r="45"
          fill="none" stroke="#00ff85" strokeWidth="0.5" strokeOpacity="0.3"
          initial={{ r: 45, opacity: 0.3 }}
          animate={{ r: [45, 90, 45], opacity: [0.3, 0, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
        />
        <motion.circle
          cx="50%" cy="44%" r="45"
          fill="none" stroke="#00b4d8" strokeWidth="0.5" strokeOpacity="0.2"
          animate={{ r: [45, 120, 45], opacity: [0.2, 0, 0.2] }}
          transition={{ duration: 3, delay: 1, repeat: Infinity, ease: "easeOut" }}
        />
      </svg>

      {/* Terminal readout */}
      <TerminalReadout />
    </div>
  );
}
