"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Upload, Play, ChevronRight, Cpu, Shield, Network } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { Container } from "@/components/layout/Container";
import { CyberVisualization } from "@/components/home/CyberVisualization";

// ─────────────────────────────────────────────
// Animated background grid + glow for hero
// ─────────────────────────────────────────────
function HeroBackground() {
  return (
    <>
      {/* Base grid */}
      <div className="absolute inset-0 bg-grid opacity-60" />

      {/* Green glow — upper left */}
      <motion.div
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(0,255,133,0.07) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Teal glow — lower right */}
      <motion.div
        className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(0,180,216,0.06) 0%, transparent 70%)",
        }}
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Horizontal scan line */}
      <motion.div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00ff85]/20 to-transparent pointer-events-none"
        animate={{ top: ["0%", "100%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
      />
    </>
  );
}

// ─────────────────────────────────────────────
// Eyebrow badge
// ─────────────────────────────────────────────
function EyebrowBadge() {
  return (
    <motion.div variants={fadeUp} className="flex items-center gap-3 flex-wrap">
      <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00ff85]/20 bg-[#00ff85]/5 text-xs font-semibold tracking-widest text-[#00ff85] uppercase">
        <motion.span
          className="w-1.5 h-1.5 rounded-full bg-[#00ff85]"
          animate={{ opacity: [1, 0.3, 1], scale: [1, 0.8, 1] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        />
        AI Malware Intelligence
      </span>
      <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#64748b]">
        <span className="w-1 h-1 rounded-full bg-[#64748b]" />
        Android · iOS · Windows · Linux
      </span>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// Headline
// ─────────────────────────────────────────────
function Headline() {
  return (
    <motion.div variants={fadeUp}>
      <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.06] tracking-tight">
        {/* Line 1 */}
        <span className="block text-white">AI-Powered</span>
        {/* Line 2 — gradient */}
        <span className="block gradient-text-green">Malware</span>
        {/* Line 3 */}
        <span className="block text-white">Intelligence</span>
      </h1>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// Subheading
// ─────────────────────────────────────────────
function Subheading() {
  return (
    <motion.p
      variants={fadeUp}
      className="text-lg sm:text-xl text-[#94a3b8] leading-relaxed max-w-lg"
    >
      Reverse engineering, static analysis, dynamic analysis and{" "}
      <span className="text-[#e2e8f0] font-medium">
        explainable threat intelligence.
      </span>
    </motion.p>
  );
}

// ─────────────────────────────────────────────
// CTA buttons
// ─────────────────────────────────────────────
function CTAButtons() {
  return (
    <motion.div
      variants={fadeUp}
      className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
    >
      {/* Primary — Analyze APK */}
      <Link
        href="/platform"
        id="hero-analyze-apk"
        className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-sm overflow-hidden transition-all duration-300 hover:-translate-y-0.5"
        style={{
          background: "linear-gradient(135deg, #00ff85, #00d4aa)",
          color: "#020817",
          boxShadow: "0 0 20px rgba(0,255,133,0.3), 0 4px 20px rgba(0,255,133,0.2)",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.boxShadow =
            "0 0 35px rgba(0,255,133,0.5), 0 6px 30px rgba(0,255,133,0.3)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.boxShadow =
            "0 0 20px rgba(0,255,133,0.3), 0 4px 20px rgba(0,255,133,0.2)";
        }}
      >
        {/* Shimmer */}
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        <Upload className="w-4 h-4 shrink-0" />
        Analyze APK
        <ChevronRight className="w-4 h-4 opacity-60 group-hover:translate-x-0.5 transition-transform" />
      </Link>

      {/* Secondary — View Demo */}
      <button
        id="hero-view-demo"
        className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl border font-medium text-sm transition-all duration-300 hover:-translate-y-0.5"
        style={{
          borderColor: "rgba(0,180,216,0.3)",
          color: "#e2e8f0",
          background: "rgba(0,180,216,0.05)",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(0,180,216,0.6)";
          (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,180,216,0.1)";
          (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 20px rgba(0,180,216,0.15)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(0,180,216,0.3)";
          (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,180,216,0.05)";
          (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
        }}
      >
        <Play className="w-4 h-4 text-[#00b4d8] fill-[#00b4d8] shrink-0" />
        View Demo
      </button>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// Feature pills row
// ─────────────────────────────────────────────
const pillItems = [
  { icon: Cpu, label: "Static Analysis" },
  { icon: Network, label: "Dynamic Analysis" },
  { icon: Shield, label: "YARA Detection" },
];

function FeaturePills() {
  return (
    <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3">
      {pillItems.map(({ icon: Icon, label }) => (
        <span
          key={label}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#0f2942] bg-[#0a1628] text-xs text-[#64748b] font-medium"
        >
          <Icon className="w-3.5 h-3.5 text-[#00b4d8]" />
          {label}
        </span>
      ))}
      <span className="text-xs text-[#64748b] ml-1">& more →</span>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// Main HeroSection export
// ─────────────────────────────────────────────
export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      aria-label="Hero section"
    >
      <HeroBackground />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center py-28 pt-36 lg:pt-28">
          {/* ── Left: Text content ── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-8"
          >
            <EyebrowBadge />
            <Headline />
            <Subheading />
            <CTAButtons />
            <FeaturePills />

            {/* Trusted-by micro text */}
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-3 pt-2"
            >
              <div className="flex -space-x-2">
                {["#00ff85", "#00b4d8", "#a78bfa", "#f59e0b"].map((c, i) => (
                  <div
                    key={i}
                    className="w-7 h-7 rounded-full border-2 border-[#020817] flex items-center justify-center text-[8px] font-bold"
                    style={{ backgroundColor: `${c}22`, borderColor: "#020817", color: c }}
                  >
                    {["SB", "MA", "TK", "RJ"][i]}
                  </div>
                ))}
              </div>
              <p className="text-xs text-[#64748b]">
                Trusted by <span className="text-[#e2e8f0]">500+ security teams</span> worldwide
              </p>
            </motion.div>
          </motion.div>

          {/* ── Right: Cyber visualization ── */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative lg:h-[580px]"
          >
            {/* Outer glow ring */}
            <div
              className="absolute -inset-4 rounded-3xl pointer-events-none"
              style={{
                background: "radial-gradient(ellipse, rgba(0,255,133,0.04) 0%, transparent 70%)",
              }}
            />
            <CyberVisualization />
          </motion.div>
        </div>
      </Container>

      {/* Bottom fade into stats */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#020817] to-transparent pointer-events-none" />

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        aria-hidden="true"
      >
        <motion.div
          className="w-5 h-8 rounded-full border border-[#0f2942] flex items-start justify-center p-1"
        >
          <motion.div
            className="w-1 h-2 rounded-full bg-[#00ff85]"
            animate={{ y: [0, 10, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
