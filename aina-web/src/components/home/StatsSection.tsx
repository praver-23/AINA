"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { staggerContainer, staggerChildren } from "@/lib/motion";
import { Container } from "@/components/layout/Container";

// ─────────────────────────────────────────────
// Animated counter hook
// ─────────────────────────────────────────────
function useCountUp(target: number, duration = 2000, decimals = 0) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  const start = () => {
    if (started) return;
    setStarted(true);
    const startTime = performance.now();
    const startVal = 0;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Easing: ease out quart
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = startVal + (target - startVal) * eased;
      setCount(parseFloat(current.toFixed(decimals)));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  return { count, start };
}

// ─────────────────────────────────────────────
// Individual stat card
// ─────────────────────────────────────────────
interface StatCardProps {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  sublabel?: string;
  decimals?: number;
  color: "green" | "teal" | "purple" | "red";
  duration?: number;
  started: boolean;
  /** If provided, show this string instead of the counted number */
  displayValue?: string;
}

const colorMap = {
  green: { text: "#00ff85", glow: "rgba(0,255,133,0.15)", border: "rgba(0,255,133,0.15)", track: "rgba(0,255,133,0.08)" },
  teal: { text: "#00b4d8", glow: "rgba(0,180,216,0.15)", border: "rgba(0,180,216,0.15)", track: "rgba(0,180,216,0.08)" },
  purple: { text: "#a78bfa", glow: "rgba(167,139,250,0.15)", border: "rgba(167,139,250,0.15)", track: "rgba(167,139,250,0.08)" },
  red: { text: "#ff3b5c", glow: "rgba(255,59,92,0.15)", border: "rgba(255,59,92,0.15)", track: "rgba(255,59,92,0.08)" },
};

function StatCard({ value, suffix, prefix = "", label, decimals = 0, color, duration = 2200, started, displayValue }: StatCardProps) {
  const { count, start } = useCountUp(value, duration, decimals);
  const c = colorMap[color];

  useEffect(() => {
    if (started) start();
  }, [started]); // eslint-disable-line react-hooks/exhaustive-deps

  // Use displayValue override if provided, otherwise format the counted number
  const countDisplay = decimals > 0 ? count.toFixed(decimals) : Math.floor(count).toLocaleString();
  const display = displayValue ?? countDisplay;

  return (
    <motion.div
      variants={staggerChildren}
      className="relative group flex flex-col items-center text-center p-8 rounded-2xl transition-all duration-500 cursor-default overflow-hidden"
      style={{
        border: `1px solid ${c.border}`,
        background: c.track,
      }}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
        style={{ background: `radial-gradient(ellipse 60% 60% at 50% 0%, ${c.glow} 0%, transparent 70%)` }}
      />

      {/* Top accent line */}
      <div
        className="absolute top-0 left-8 right-8 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${c.text}, transparent)` }}
      />

      {/* Value */}
      <div className="relative">
        <span
          className="text-5xl font-bold tracking-tight tabular-nums"
          style={{ color: c.text, textShadow: `0 0 20px ${c.glow}` }}
        >
          {prefix}{display}{suffix}
        </span>
      </div>

      {/* Label */}
      <p className="mt-3 text-sm font-medium text-[#94a3b8] tracking-wide">{label}</p>

      {/* Animated bar at bottom */}
      <div className="relative w-full mt-6 h-0.5 bg-[#0f2942] rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: c.text }}
          initial={{ width: "0%" }}
          animate={started ? { width: "100%" } : { width: "0%" }}
          transition={{ duration: duration / 1000, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// Stats section
// ─────────────────────────────────────────────
const stats = [
  {
    value: 10000,
    suffix: "+",
    label: "Threats analyzed",
    color: "green" as const,
    duration: 2000,
    displayValue: "10K",
  },
  {
    value: 99.2,
    suffix: "%",
    label: "Detection accuracy",
    color: "teal" as const,
    decimals: 1,
    duration: 2400,
  },
  {
    value: 500,
    suffix: "ms",
    label: "Average response",
    color: "purple" as const,
    duration: 1800,
  },
  {
    value: 4.8,
    suffix: "M",
    label: "Risk events",
    color: "red" as const,
    decimals: 1,
    duration: 2200,
  },
];

export function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      id="stats"
      className="relative py-20 overflow-hidden"
      aria-label="Platform statistics"
    >
      {/* Subtle background */}
      <div className="absolute inset-0 bg-dots opacity-40" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0f2942] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0f2942] to-transparent" />

      <Container>
        {/* Section label */}
        <motion.p
          className="text-center text-xs font-semibold uppercase tracking-widest text-[#64748b] mb-10"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Platform intelligence at a glance
        </motion.p>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
        >
          {stats.map((stat) => (
            <StatCard
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              color={stat.color}
              decimals={stat.decimals ?? 0}
              duration={stat.duration}
              started={isInView}
              displayValue={(stat as { displayValue?: string }).displayValue}
            />
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
