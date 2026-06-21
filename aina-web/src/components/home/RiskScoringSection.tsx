"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/home/FeaturesSection";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/motion";

// ─────────────────────────────────────────────
// Score gauge SVG
// ─────────────────────────────────────────────
function RiskGauge({ score, started }: { score: number; started: boolean }) {
  const radius = 72;
  const circumference = 2 * Math.PI * radius;
  // 270° sweep arc
  const arc = circumference * 0.75;
  const fill = (score / 100) * arc;

  const getColor = (s: number) => {
    if (s < 30) return "#00ff85";
    if (s < 60) return "#f59e0b";
    if (s < 80) return "#ff6b35";
    return "#ff3b5c";
  };
  const color = getColor(score);
  const label = score < 30 ? "CLEAN" : score < 60 ? "SUSPICIOUS" : score < 80 ? "HIGH RISK" : "MALICIOUS";

  return (
    <div className="relative w-56 h-56 mx-auto">
      <svg viewBox="0 0 180 180" className="w-full h-full -rotate-[135deg]">
        {/* Track */}
        <circle
          cx="90" cy="90" r={radius}
          fill="none" stroke="#0f2942" strokeWidth="10"
          strokeDasharray={`${arc} ${circumference - arc}`}
          strokeLinecap="round"
        />
        {/* Colored fill */}
        <motion.circle
          cx="90" cy="90" r={radius}
          fill="none" stroke={color} strokeWidth="10"
          strokeDasharray={`${fill} ${circumference - fill}`}
          strokeLinecap="round"
          initial={{ strokeDasharray: `0 ${circumference}` }}
          animate={started ? { strokeDasharray: `${fill} ${circumference - fill}` } : {}}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          style={{ filter: `drop-shadow(0 0 8px ${color})` }}
        />
      </svg>
      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className="text-5xl font-bold leading-none tabular-nums"
          style={{ color }}
          initial={{ opacity: 0 }}
          animate={started ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          {score}
        </motion.span>
        <span className="text-xs font-bold tracking-widest mt-1" style={{ color }}>
          {label}
        </span>
        <span className="text-[10px] text-[#64748b] mt-0.5">/ 100</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Scoring dimension bar
// ─────────────────────────────────────────────
interface DimBarProps {
  label: string;
  value: number;
  color: string;
  started: boolean;
  delay?: number;
}

function DimBar({ label, value, color, started, delay = 0 }: DimBarProps) {
  return (
    <div>
      <div className="flex justify-between mb-1.5">
        <span className="text-xs font-medium text-[#94a3b8]">{label}</span>
        <span className="text-xs font-mono font-semibold" style={{ color }}>{value}</span>
      </div>
      <div className="h-1.5 rounded-full bg-[#0f2942] overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}99, ${color})` }}
          initial={{ width: "0%" }}
          animate={started ? { width: `${value}%` } : {}}
          transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Sample selector tabs
// ─────────────────────────────────────────────
const samples = [
  {
    name: "BankBot.APK",
    score: 94,
    family: "Banking Trojan",
    dimensions: [
      { label: "Static Signals", value: 91, color: "#ff3b5c" },
      { label: "Behavioral Flags", value: 96, color: "#ff3b5c" },
      { label: "Network Anomaly", value: 88, color: "#ff6b35" },
      { label: "Obfuscation Level", value: 78, color: "#f59e0b" },
      { label: "YARA Matches", value: 100, color: "#ff3b5c" },
    ],
    tags: ["C2 Beacon", "SMS Intercept", "Overlay Attack", "Anti-Debug"],
    verdict: "MALICIOUS",
    verdictColor: "#ff3b5c",
  },
  {
    name: "SpyAgent.IPA",
    score: 71,
    family: "Spyware",
    dimensions: [
      { label: "Static Signals", value: 65, color: "#ff6b35" },
      { label: "Behavioral Flags", value: 78, color: "#ff6b35" },
      { label: "Network Anomaly", value: 82, color: "#ff6b35" },
      { label: "Obfuscation Level", value: 55, color: "#f59e0b" },
      { label: "YARA Matches", value: 40, color: "#f59e0b" },
    ],
    tags: ["Location Tracking", "Contact Harvest", "Background Exec"],
    verdict: "HIGH RISK",
    verdictColor: "#ff6b35",
  },
  {
    name: "CleanUtil.APK",
    score: 12,
    family: "Utility (Benign)",
    dimensions: [
      { label: "Static Signals", value: 8, color: "#00ff85" },
      { label: "Behavioral Flags", value: 15, color: "#00ff85" },
      { label: "Network Anomaly", value: 6, color: "#00ff85" },
      { label: "Obfuscation Level", value: 20, color: "#00b4d8" },
      { label: "YARA Matches", value: 0, color: "#00ff85" },
    ],
    tags: ["No IOCs", "Signed Certificate", "Play Store"],
    verdict: "CLEAN",
    verdictColor: "#00ff85",
  },
];

// ─────────────────────────────────────────────
// Risk dimensions list
// ─────────────────────────────────────────────
const scoringFactors = [
  {
    title: "Behavioral Signals",
    description: "Runtime API calls, permission abuse, background service spawning, and inter-app communications captured during sandbox execution.",
    weight: "35%",
    color: "#a78bfa",
  },
  {
    title: "Static Features",
    description: "Class structure anomalies, reflection usage, native JNI bridges, obfuscation density, and hardcoded C2 strings from decompiled source.",
    weight: "30%",
    color: "#00b4d8",
  },
  {
    title: "Network Profile",
    description: "C2 communication patterns, DNS lookup frequency, HTTPS pinning bypass attempts, and TLS fingerprint matching against known threat actors.",
    weight: "20%",
    color: "#00ff85",
  },
  {
    title: "Threat Intelligence",
    description: "Hash reputation, signer certificate revocation, package name collision with known malware families, and VirusTotal consensus score.",
    weight: "15%",
    color: "#f59e0b",
  },
];

export function RiskScoringSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);
  const sample = samples[active];

  return (
    <section ref={ref} id="risk-scoring" className="relative py-28 lg:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-35" />
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(167,139,250,0.06) 0%, transparent 70%)" }}
      />

      <Container>
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-3xl mb-20"
        >
          <motion.div variants={fadeUp} className="mb-5">
            <SectionLabel text="Risk Scoring Engine" color="purple" />
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-5xl sm:text-6xl font-bold text-white leading-[1.06] tracking-tight mb-6">
            A Score That{" "}
            <span style={{ background: "linear-gradient(135deg, #a78bfa, #ff3b5c)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Explains Itself
            </span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-xl text-[#94a3b8] leading-relaxed max-w-xl">
            Every verdict is a deterministic 0–100 composite — breaking down exactly which signals drove the score so analysts can trust and audit every decision.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* ── Left: Live demo panel ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border border-[#0f2942] bg-[#0a1628] overflow-hidden"
          >
            {/* Tab bar */}
            <div className="flex border-b border-[#0f2942] bg-[#061020]">
              {samples.map((s, i) => (
                <button
                  key={s.name}
                  onClick={() => setActive(i)}
                  className={`flex-1 px-4 py-3.5 text-xs font-mono font-medium transition-all duration-300 border-b-2 ${
                    active === i ? "border-current text-white bg-[#0a1628]" : "border-transparent text-[#64748b] hover:text-[#94a3b8]"
                  }`}
                  style={active === i ? { borderColor: s.verdictColor, color: s.verdictColor } : {}}
                >
                  {s.name}
                </button>
              ))}
            </div>

            <div className="p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35 }}
                >
                  {/* Gauge + verdict */}
                  <div className="flex flex-col items-center mb-8">
                    <RiskGauge score={sample.score} started={inView} />
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-xs text-[#64748b]">Family:</span>
                      <span className="text-xs font-semibold" style={{ color: sample.verdictColor }}>{sample.family}</span>
                    </div>
                  </div>

                  {/* Dimension bars */}
                  <div className="space-y-3 mb-6">
                    {sample.dimensions.map((d, i) => (
                      <DimBar key={d.label} {...d} started={inView} delay={0.2 + i * 0.1} />
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {sample.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] px-2.5 py-1 rounded-lg font-mono"
                        style={{
                          color: sample.verdictColor,
                          background: `${sample.verdictColor}12`,
                          border: `1px solid ${sample.verdictColor}25`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* ── Right: Scoring factor cards ── */}
          <div className="space-y-5">
            {scoringFactors.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="group flex gap-5 p-6 rounded-2xl border border-[#0f2942] bg-[#0a1628] hover:border-[#1a3050] transition-colors duration-300"
              >
                {/* Weight badge */}
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 font-bold text-sm"
                  style={{ background: `${f.color}12`, color: f.color, border: `1px solid ${f.color}20` }}
                >
                  {f.weight}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white mb-1.5">{f.title}</h3>
                  <p className="text-xs text-[#64748b] leading-relaxed">{f.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
