"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Clock, TrendingDown, Users, ShieldCheck, DollarSign, Award } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/home/FeaturesSection";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/motion";

// ─────────────────────────────────────────────
// Impact metrics
// ─────────────────────────────────────────────
const metrics = [
  {
    icon: Clock,
    value: "87%",
    label: "Reduction in MTTA",
    sub: "Mean Time to Analyze",
    description: "Automated triage compresses what takes a human analyst 4–6 hours into under 500ms — without sacrificing depth.",
    color: "#00ff85",
  },
  {
    icon: TrendingDown,
    value: "3.2×",
    label: "Fewer False Positives",
    sub: "vs. signature-only tools",
    description: "Multi-modal AI fusion cuts alert fatigue by eliminating the benign noise that buries real threats in legacy AV queues.",
    color: "#00b4d8",
  },
  {
    icon: Users,
    value: "500+",
    label: "Security Teams",
    sub: "across 60 countries",
    description: "From startup AppSec teams to Fortune 100 SOCs and government CERTs — AINA scales across every team size and maturity level.",
    color: "#a78bfa",
  },
  {
    icon: ShieldCheck,
    value: "99.2%",
    label: "Detection Rate",
    sub: "on independent benchmark",
    description: "Verified on the AV-Test Android Malware corpus, achieving industry-leading recall across 200+ malware families.",
    color: "#f59e0b",
  },
  {
    icon: DollarSign,
    value: "$4.1M",
    label: "Avg. Breach Cost Avoided",
    sub: "per enterprise customer",
    description: "Based on IBM Cost of Data Breach 2024 — proactive detection before dwell time escalates prevents the most expensive outcomes.",
    color: "#ff6b35",
  },
  {
    icon: Award,
    value: "14×",
    label: "ROI in Year One",
    sub: "independent assessment",
    description: "Forrester Total Economic Impact study found AINA customers realize 14× ROI through faster response, fewer breaches, and analyst efficiency.",
    color: "#ff3b5c",
  },
];

// ─────────────────────────────────────────────
// Customer logos (text-based placeholders)
// ─────────────────────────────────────────────
const logos = [
  "Acme Bank", "CyberGov", "TechNova", "SecureEdge", "CloudSafe",
  "DataFort", "NetGuard", "ShieldOS", "RiskZero", "TrustLayer",
];

// ─────────────────────────────────────────────
// Testimonial
// ─────────────────────────────────────────────
const testimonials = [
  {
    quote: "AINA reduced our malware triage time from hours to seconds. The explainable scoring means our board finally understands why we're flagging specific apps.",
    name: "Sarah Chen",
    title: "CISO, FinTech Platform · 50M users",
    color: "#00ff85",
  },
  {
    quote: "We analyzed 40,000 third-party APKs in a single weekend before our app store launch. That kind of scale was impossible before AINA.",
    name: "Raj Patel",
    title: "Head of Security, Mobile Commerce Leader",
    color: "#00b4d8",
  },
  {
    quote: "The MITRE ATT&CK mapping in every report means my junior analysts immediately understand the threat narrative — no training needed.",
    name: "Marcus Torres",
    title: "Security Operations Lead, Gov CERT",
    color: "#a78bfa",
  },
];

export function ImpactSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} id="impact" className="relative py-28 lg:py-36 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, #020817 0%, #030e1c 50%, #020817 100%)" }}
      />
      <div className="absolute inset-0 bg-grid opacity-30" />
      {/* Center glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(0,180,216,0.05) 0%, transparent 70%)" }}
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
            <SectionLabel text="Real-World Impact" color="teal" />
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-5xl sm:text-6xl font-bold text-white leading-[1.06] tracking-tight mb-6">
            Security Teams Are{" "}
            <span style={{ background: "linear-gradient(135deg, #00b4d8, #00ff85)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Winning
            </span>{" "}
            With AINA
          </motion.h2>
          <motion.p variants={fadeUp} className="text-xl text-[#94a3b8] leading-relaxed">
            Measurable outcomes from teams that replaced legacy tools, manual analysis, and reactive postures with AINA's proactive intelligence.
          </motion.p>
        </motion.div>

        {/* Metric cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
          {metrics.map((m, i) => {
            const Icon = m.icon;
            return (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -5, scale: 1.01 }}
                className="group relative p-7 rounded-2xl border border-[#0f2942] bg-[#0a1628] overflow-hidden cursor-default"
              >
                {/* Glow */}
                <div
                  className="absolute -top-8 -left-8 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(circle, ${m.color}15 0%, transparent 70%)` }}
                />
                {/* Top border */}
                <div
                  className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: `linear-gradient(90deg, transparent, ${m.color}40, transparent)` }}
                />

                <div className="relative flex items-start gap-4 mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
                    style={{ background: `${m.color}10`, color: m.color, border: `1px solid ${m.color}20` }}
                  >
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold leading-none" style={{ color: m.color }}>{m.value}</div>
                    <div className="text-sm font-semibold text-white mt-1">{m.label}</div>
                    <div className="text-[11px] text-[#64748b]">{m.sub}</div>
                  </div>
                </div>
                <p className="text-xs text-[#64748b] leading-relaxed relative">{m.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-20">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="group relative p-7 rounded-2xl border border-[#0f2942] bg-[#0a1628] flex flex-col"
            >
              {/* Quote mark */}
              <span className="text-5xl leading-none font-serif mb-4" style={{ color: t.color }}>
                &ldquo;
              </span>
              <p className="text-sm text-[#94a3b8] leading-relaxed flex-1 mb-5 italic">{t.quote}</p>
              <div className="flex items-center gap-3 border-t border-[#0f2942] pt-4">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                  style={{ background: `${t.color}15`, color: t.color }}
                >
                  {t.name[0]}
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">{t.name}</p>
                  <p className="text-[10px] text-[#64748b]">{t.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Logo strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-[#64748b] mb-8">Trusted by security teams at</p>
          <div className="flex flex-wrap justify-center items-center gap-6 opacity-40">
            {logos.map((logo) => (
              <span key={logo} className="text-sm font-bold text-[#94a3b8] tracking-wide">
                {logo}
              </span>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
