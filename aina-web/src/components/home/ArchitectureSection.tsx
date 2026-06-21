"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/home/FeaturesSection";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/motion";

// ─────────────────────────────────────────────
// Architecture layer data
// ─────────────────────────────────────────────
const layers = [
  {
    id: "ingestion",
    number: "01",
    label: "Ingestion Layer",
    title: "Multi-Format Sample Intake",
    description:
      "Accepts APK, IPA, PE, ELF, Mach-O, ZIP, and raw binary via REST API, web upload, or CI/CD webhook. Automatic unpacking, mime-type detection, and deduplication via SHA-256/TLSH fuzzy hash.",
    chips: ["REST API", "Webhook CI/CD", "TLSH Dedup", "10 MB → 4 GB"],
    color: "#00ff85",
    side: "left",
  },
  {
    id: "static",
    number: "02",
    label: "Static Analysis",
    title: "Deep Code Inspection",
    description:
      "Dissects the binary without execution — extracting class hierarchies, API call trees, permissions, hardcoded IOCs, certificate metadata, and control-flow graphs fed into the AI pipeline.",
    chips: ["JADX / Ghidra", "CFG Extraction", "IOC Harvest", "YARA × 10K+"],
    color: "#00b4d8",
    side: "right",
  },
  {
    id: "dynamic",
    number: "03",
    label: "Dynamic Sandbox",
    title: "Isolated Execution & Monitoring",
    description:
      "Runs samples in hardware-isolated VMs with full API hooking, network interception, filesystem monitoring, and screenshot capture — extracting runtime behavior invisible to static tools.",
    chips: ["API Hooking", "PCAP Capture", "Screenshot", "Anti-Evasion"],
    color: "#a78bfa",
    side: "left",
  },
  {
    id: "ai",
    number: "04",
    label: "AI Engine",
    title: "Multi-Model Threat Reasoning",
    description:
      "Fuses static features, behavioral logs, and binary visualizations through a transformer ensemble for final verdict — with SHAP-based explanation for every signal that drove the decision.",
    chips: ["CNN + GNN", "Transformer", "SHAP XAI", "99.2% Accuracy"],
    color: "#ff3b5c",
    side: "right",
  },
];

// ─────────────────────────────────────────────
// Architecture node card
// ─────────────────────────────────────────────
function ArchNode({ layer, index }: { layer: typeof layers[0]; index: number }) {
  const isLeft = layer.side === "left";

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`flex items-center gap-6 lg:gap-12 ${isLeft ? "flex-row" : "flex-row-reverse"}`}
    >
      {/* Card */}
      <div
        className="flex-1 group relative rounded-2xl overflow-hidden"
        style={{ border: `1px solid ${layer.color}18` }}
      >
        {/* Left colored stripe */}
        <div
          className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
          style={{ background: `linear-gradient(180deg, transparent, ${layer.color}, transparent)` }}
        />
        {/* Hover glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 70% 70% at ${isLeft ? "20%" : "80%"} 50%, ${layer.color}10 0%, transparent 70%)` }}
        />

        <div className="relative bg-[#0a1628] p-8 lg:p-10">
          <div className="flex items-start gap-4 mb-5">
            {/* Number */}
            <span
              className="text-4xl font-bold leading-none font-mono shrink-0"
              style={{ color: `${layer.color}30` }}
            >
              {layer.number}
            </span>
            <div>
              <span
                className="text-[11px] font-semibold tracking-widest uppercase mb-1 block"
                style={{ color: layer.color }}
              >
                {layer.label}
              </span>
              <h3 className="text-xl lg:text-2xl font-bold text-white leading-snug">{layer.title}</h3>
            </div>
          </div>
          <p className="text-[#94a3b8] text-sm leading-relaxed mb-6 max-w-lg">{layer.description}</p>
          {/* Chips */}
          <div className="flex flex-wrap gap-2">
            {layer.chips.map((chip) => (
              <span
                key={chip}
                className="text-xs font-mono px-3 py-1 rounded-lg"
                style={{ color: layer.color, background: `${layer.color}10`, border: `1px solid ${layer.color}20` }}
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Center connector dot — only on desktop */}
      <div className="hidden lg:flex flex-col items-center shrink-0">
        <motion.div
          className="w-5 h-5 rounded-full border-2 z-10"
          style={{ borderColor: layer.color, boxShadow: `0 0 12px ${layer.color}` }}
          animate={{ scale: [1, 1.25, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.4 }}
        />
      </div>

      {/* Spacer for alternating layout */}
      <div className="hidden lg:block flex-1" />
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// Vertical pipeline spine
// ─────────────────────────────────────────────
function PipelineSpine() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start center", "end center"] });
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={ref} className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px">
      {/* Track */}
      <div className="absolute inset-0 bg-[#0f2942]" />
      {/* Animated fill */}
      <motion.div
        className="absolute top-0 left-0 right-0 origin-top"
        style={{
          height,
          background: "linear-gradient(180deg, #00ff85, #00b4d8, #a78bfa, #ff3b5c)",
        }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────
// Architecture section
// ─────────────────────────────────────────────
export function ArchitectureSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} id="architecture" className="relative py-28 lg:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-dots opacity-30" />
      {/* Deep gradient backdrop */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 100% 60% at 50% 50%, rgba(0,20,40,0.6) 0%, transparent 70%)" }}
      />

      <Container>
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center max-w-3xl mx-auto mb-24"
        >
          <motion.div variants={fadeUp} className="flex justify-center mb-5">
            <SectionLabel text="System Architecture" color="teal" />
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-5xl sm:text-6xl font-bold text-white leading-[1.06] tracking-tight mb-6">
            Four-Layer{" "}
            <span style={{ background: "linear-gradient(135deg, #00b4d8, #00ff85)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Intelligence
            </span>{" "}
            Pipeline
          </motion.h2>
          <motion.p variants={fadeUp} className="text-xl text-[#94a3b8] leading-relaxed">
            Every sample flows through a proven chain — ingestion → static → dynamic → AI — producing a deterministic, auditable verdict in under 500ms.
          </motion.p>
        </motion.div>

        {/* Pipeline */}
        <div className="relative">
          <PipelineSpine />
          <div className="space-y-14 lg:space-y-16">
            {layers.map((layer, i) => (
              <ArchNode key={layer.id} layer={layer} index={i} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
