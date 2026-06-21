"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Upload, Cpu, ClipboardList, Bell, CheckCircle2, ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/home/FeaturesSection";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/motion";

// ─────────────────────────────────────────────
// Workflow step data
// ─────────────────────────────────────────────
const steps = [
  {
    step: "01",
    icon: Upload,
    title: "Submit Sample",
    subtitle: "Any format, any size",
    description:
      "Upload via the web portal, REST API, or automated CI/CD hook. Supports APK, IPA, PE, ELF, Mach-O, and raw binary up to 4 GB with instant queuing.",
    bullets: ["API key authentication", "Bulk batch upload", "S3 / GCS integration"],
    color: "#00ff85",
  },
  {
    step: "02",
    icon: Cpu,
    title: "Automated Analysis",
    subtitle: "Static + Dynamic + AI",
    description:
      "AINA spins up parallel analysis engines — static inspection, sandboxed execution, and ML inference — all running concurrently to minimize turnaround time.",
    bullets: ["Parallel execution", "Anti-evasion bypass", "Memory forensics"],
    color: "#00b4d8",
  },
  {
    step: "03",
    icon: ClipboardList,
    title: "AI Report Generated",
    subtitle: "Explainable by design",
    description:
      "A comprehensive, analyst-grade report is generated with detected behaviors, family classification, MITRE ATT&CK mapping, and LLM-generated plain-language explanation.",
    bullets: ["MITRE ATT&CK mapping", "SHAP explanations", "IOC extraction"],
    color: "#a78bfa",
  },
  {
    step: "04",
    icon: Bell,
    title: "Alerting & Response",
    subtitle: "Integrate with your stack",
    description:
      "Verdict and IOCs are pushed to your SIEM, SOAR, EDR, or ticketing system via webhooks. Automated playbooks can isolate hosts, block IPs, and create incidents.",
    bullets: ["SIEM / SOAR push", "Webhook alerts", "Auto-remediation"],
    color: "#ff3b5c",
  },
  {
    step: "05",
    icon: CheckCircle2,
    title: "Continuous Learning",
    subtitle: "Feedback loop at scale",
    description:
      "Analyst corrections, new samples, and community threat intelligence are fed back to retrain models weekly — keeping detection rates above 99% across novel families.",
    bullets: ["Weekly model updates", "Community IOC feed", "Analyst-in-the-loop"],
    color: "#f59e0b",
  },
];

// ─────────────────────────────────────────────
// Step card
// ─────────────────────────────────────────────
function StepCard({ step: s, index }: { step: typeof steps[0]; index: number }) {
  const Icon = s.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5 }}
      className="group relative flex flex-col rounded-2xl bg-[#0a1628] overflow-hidden"
      style={{ border: `1px solid rgba(15,41,66,0.9)` }}
    >
      {/* Top border on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
        style={{ background: `linear-gradient(90deg, transparent, ${s.color}, transparent)` }}
      />
      {/* Corner glow */}
      <div
        className="absolute -top-10 -left-10 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${s.color}15 0%, transparent 70%)` }}
      />

      <div className="relative p-7 flex flex-col gap-5 h-full">
        {/* Step number + icon */}
        <div className="flex items-center justify-between">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
            style={{ background: `${s.color}12`, color: s.color, border: `1px solid ${s.color}25` }}
          >
            <Icon className="w-5 h-5" />
          </div>
          <span className="text-4xl font-bold font-mono" style={{ color: `${s.color}20` }}>
            {s.step}
          </span>
        </div>

        {/* Text */}
        <div className="flex-1">
          <p className="text-[11px] font-semibold tracking-widest uppercase mb-1" style={{ color: s.color }}>
            {s.subtitle}
          </p>
          <h3 className="text-lg font-bold text-white mb-3">{s.title}</h3>
          <p className="text-sm text-[#64748b] leading-relaxed mb-5">{s.description}</p>

          {/* Bullets */}
          <ul className="space-y-1.5">
            {s.bullets.map((b) => (
              <li key={b} className="flex items-center gap-2 text-xs text-[#94a3b8]">
                <span className="w-1 h-1 rounded-full shrink-0" style={{ background: s.color }} />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// Flow connector arrow
// ─────────────────────────────────────────────
function StepConnector({ color }: { color: string }) {
  return (
    <div className="hidden lg:flex items-center justify-center -mx-2 z-10 shrink-0">
      <motion.div
        animate={{ x: [0, 6, 0], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ArrowRight className="w-5 h-5" style={{ color }} />
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Workflow section
// ─────────────────────────────────────────────
export function WorkflowSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} id="workflow" className="relative py-28 lg:py-36 overflow-hidden">
      {/* Teal tinted background */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #020817 0%, #040f1f 50%, #020817 100%)" }} />
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(0,180,216,0.06) 0%, transparent 70%)" }}
      />

      <Container>
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <motion.div variants={fadeUp} className="flex justify-center mb-5">
            <SectionLabel text="How It Works" color="teal" />
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-5xl sm:text-6xl font-bold text-white leading-[1.06] tracking-tight mb-6">
            From Upload to{" "}
            <span style={{ background: "linear-gradient(135deg, #00b4d8, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Verdict
            </span>
            <br />
            in Five Steps
          </motion.h2>
          <motion.p variants={fadeUp} className="text-xl text-[#94a3b8] leading-relaxed">
            A single automated workflow replaces days of manual reverse engineering and analyst triage.
          </motion.p>
        </motion.div>

        {/* Step flow — row on large, grid on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:items-stretch gap-4">
          {steps.map((step, i) => (
            <>
              <StepCard key={step.step} step={step} index={i} />
              {i < steps.length - 1 && (
                <StepConnector key={`arrow-${i}`} color={steps[i + 1].color} />
              )}
            </>
          ))}
        </div>
      </Container>
    </section>
  );
}
