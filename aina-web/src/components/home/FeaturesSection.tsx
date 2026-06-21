"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Code2, FlaskConical, Activity, Brain, FileSearch, ShieldAlert,
  GitBranch, Layers, Microscope, Network, ScanLine, Cpu
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/motion";
import { TiltCard } from "@/components/fx/TiltCard";

// ─────────────────────────────────────────────
// Section label — reused across all sections
// ─────────────────────────────────────────────
export function SectionLabel({ text, color = "green" }: { text: string; color?: "green" | "teal" | "purple" | "red" }) {
  const colors = {
    green: "text-[#00ff85] border-[#00ff85]/20 bg-[#00ff85]/5",
    teal: "text-[#00b4d8] border-[#00b4d8]/20 bg-[#00b4d8]/5",
    purple: "text-[#a78bfa] border-[#a78bfa]/20 bg-[#a78bfa]/5",
    red: "text-[#ff3b5c] border-[#ff3b5c]/20 bg-[#ff3b5c]/5",
  };
  return (
    <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-semibold tracking-widest uppercase ${colors[color]}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {text}
    </span>
  );
}

// ─────────────────────────────────────────────
// Feature card
// ─────────────────────────────────────────────
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  tag?: string;
  accent?: "green" | "teal" | "purple" | "red";
  delay?: number;
}

const accentConfig = {
  green: { border: "#00ff85", glow: "rgba(0,255,133,0.12)", text: "#00ff85", bg: "rgba(0,255,133,0.08)" },
  teal: { border: "#00b4d8", glow: "rgba(0,180,216,0.12)", text: "#00b4d8", bg: "rgba(0,180,216,0.08)" },
  purple: { border: "#a78bfa", glow: "rgba(167,139,250,0.12)", text: "#a78bfa", bg: "rgba(167,139,250,0.08)" },
  red: { border: "#ff3b5c", glow: "rgba(255,59,92,0.12)", text: "#ff3b5c", bg: "rgba(255,59,92,0.08)" },
};

function FeatureCard({ icon, title, description, tag, accent = "green", delay = 0 }: FeatureCardProps) {
  const c = accentConfig[accent];
  return (
    <TiltCard maxTilt={5} className="h-full">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -6, scale: 1.01 }}
        className="group relative flex flex-col rounded-2xl overflow-hidden cursor-default h-full"
        style={{ border: `1px solid rgba(15,41,66,0.8)` }}
      >
        {/* Hover glow overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${c.glow} 0%, transparent 70%)` }}
        />
        {/* Top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `linear-gradient(90deg, transparent, ${c.border}, transparent)` }}
        />

        <div className="relative p-7 flex flex-col gap-5 bg-[#0a1628] h-full">
          {/* Icon box */}
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
            style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}20` }}
          >
            {icon}
          </div>

          <div className="flex-1">
            <div className="flex items-start justify-between gap-3 mb-2">
              <h3 className="text-base font-semibold text-white leading-snug">{title}</h3>
              {tag && (
                <span
                  className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-md tracking-wider uppercase"
                  style={{ color: c.text, background: c.bg, border: `1px solid ${c.border}30` }}
                >
                  {tag}
                </span>
              )}
            </div>
            <p className="text-sm text-[#64748b] leading-relaxed">{description}</p>
          </div>
        </div>
      </motion.div>
    </TiltCard>
  );
}

// ─────────────────────────────────────────────
// Features Section
// ─────────────────────────────────────────────
const features = [
  {
    icon: <FileSearch className="w-5 h-5" />,
    title: "Static Analysis Engine",
    description: "Deep inspection of APK structure — DEX bytecode, manifest permissions, certificate chains, and embedded strings — without execution.",
    tag: "Core",
    accent: "green" as const,
  },
  {
    icon: <FlaskConical className="w-5 h-5" />,
    title: "Dynamic Sandbox",
    description: "Isolated runtime environment that executes malware samples, captures API calls, network traffic, file system mutations, and registry changes.",
    tag: "Core",
    accent: "teal" as const,
  },
  {
    icon: <Brain className="w-5 h-5" />,
    title: "AI Classification",
    description: "Multi-model ensemble combining CNNs on binary visualizations, GNNs on call graphs, and transformer-based log reasoning for high-precision labeling.",
    tag: "AI",
    accent: "purple" as const,
  },
  {
    icon: <Code2 className="w-5 h-5" />,
    title: "Decompilation & RE",
    description: "Automated reverse engineering with JADX and Ghidra backends, extracting readable Java source from obfuscated DEX with symbol recovery.",
    accent: "green" as const,
  },
  {
    icon: <ScanLine className="w-5 h-5" />,
    title: "YARA Rule Matching",
    description: "Run 10,000+ community and proprietary YARA rules in parallel against samples, with real-time rule synthesis for novel threat families.",
    accent: "teal" as const,
  },
  {
    icon: <ShieldAlert className="w-5 h-5" />,
    title: "Explainable Reports",
    description: "LLM-generated analyst-grade reports explaining every detection decision in plain language — why it's malicious, what it does, and who made it.",
    tag: "XAI",
    accent: "purple" as const,
  },
  {
    icon: <Microscope className="w-5 h-5" />,
    title: "Memory Forensics",
    description: "Heap and stack dump analysis to detect injected shellcode, reflective DLL loading, and in-memory-only payloads missed by disk-based scanning.",
    accent: "red" as const,
  },
  {
    icon: <Network className="w-5 h-5" />,
    title: "Network Behaviour",
    description: "C2 beacon detection, DNS tunneling identification, exfiltration pattern modeling, and TLS fingerprinting via JA3/JA4 signatures.",
    accent: "red" as const,
  },
  {
    icon: <Cpu className="w-5 h-5" />,
    title: "Multi-Platform Support",
    description: "Unified analysis pipeline for Android APK, iOS IPA, Windows PE/ELF, macOS Mach-O, and Linux shared objects in a single submission flow.",
    accent: "green" as const,
  },
];

export function FeaturesSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} id="features" className="relative py-28 lg:py-36 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(0,255,133,0.05) 0%, transparent 70%)" }}
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
            <SectionLabel text="Platform Features" color="green" />
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-5xl sm:text-6xl font-bold text-white leading-[1.06] tracking-tight mb-6">
            Every Layer of{" "}
            <span className="gradient-text-green">Analysis</span>
            <br />
            In One Platform
          </motion.h2>
          <motion.p variants={fadeUp} className="text-xl text-[#94a3b8] leading-relaxed max-w-xl">
            From initial upload to final verdict — AINA covers static, dynamic, behavioral, and AI-driven analysis without stitching together multiple tools.
          </motion.p>
        </motion.div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <FeatureCard key={f.title} {...f} delay={i * 0.06} />
          ))}
        </div>
      </Container>
    </section>
  );
}
