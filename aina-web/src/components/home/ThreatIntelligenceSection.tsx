"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Globe, Rss, Database, Share2, TrendingUp, Zap } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/home/FeaturesSection";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/motion";

// ─────────────────────────────────────────────
// Live threat ticker data
// ─────────────────────────────────────────────
const threatFeed = [
  { time: "00:03s", family: "BankBot.v4", platform: "Android", score: 96, verdict: "MALICIOUS", color: "#ff3b5c" },
  { time: "00:11s", family: "Cobalt Strike", platform: "Windows", score: 99, verdict: "MALICIOUS", color: "#ff3b5c" },
  { time: "00:29s", family: "GriftHorse", platform: "Android", score: 88, verdict: "HIGH RISK", color: "#ff6b35" },
  { time: "00:47s", family: "Coper Trojan", platform: "Android", score: 92, verdict: "MALICIOUS", color: "#ff3b5c" },
  { time: "01:02s", family: "CleanPhoto.APK", platform: "Android", score: 11, verdict: "CLEAN", color: "#00ff85" },
  { time: "01:18s", family: "MedusaBot", platform: "Android", score: 94, verdict: "MALICIOUS", color: "#ff3b5c" },
];

function ThreatTicker() {
  return (
    <div className="rounded-2xl border border-[#0f2942] bg-[#061020] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#0f2942] bg-[#040c1a]">
        <div className="flex items-center gap-2">
          <motion.span
            className="w-2 h-2 rounded-full bg-[#00ff85]"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span className="text-xs font-mono text-[#94a3b8]">LIVE THREAT FEED</span>
        </div>
        <span className="text-xs font-mono text-[#64748b]">Global Sensor Network · 140 countries</span>
      </div>

      {/* Feed rows */}
      <div className="divide-y divide-[#0a1628]">
        {threatFeed.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="flex items-center gap-4 px-5 py-3 text-xs font-mono hover:bg-[#0a1628] transition-colors"
          >
            <span className="text-[#64748b] w-12 shrink-0">{t.time}</span>
            <span className="text-[#e2e8f0] flex-1 truncate">{t.family}</span>
            <span className="text-[#64748b] w-16 hidden sm:block">{t.platform}</span>
            <span className="w-8 text-center font-bold" style={{ color: t.color }}>{t.score}</span>
            <span
              className="px-2.5 py-0.5 rounded-md text-[10px] font-bold tracking-wider shrink-0"
              style={{ color: t.color, background: `${t.color}15`, border: `1px solid ${t.color}25` }}
            >
              {t.verdict}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Intelligence source cards
// ─────────────────────────────────────────────
const sources = [
  {
    icon: Globe,
    title: "Global Sensor Network",
    description: "Passive honeypots and decoy APPs across 140 countries automatically capture new malware samples submitted in real time.",
    stat: "50K+ samples/day",
    color: "#00ff85",
  },
  {
    icon: Rss,
    title: "OSINT & Community",
    description: "Aggregates threat intel from MalwareBazaar, VirusTotal, Abuse.ch, OTX, MISP, and community YARA rule repositories.",
    stat: "1M+ IOCs indexed",
    color: "#00b4d8",
  },
  {
    icon: Database,
    title: "Historical Corpus",
    description: "A curated dataset of 4.8M labeled samples spanning 15 years enables robust family classification and zero-day pattern recognition.",
    stat: "4.8M labeled samples",
    color: "#a78bfa",
  },
  {
    icon: Share2,
    title: "Partner Intelligence",
    description: "Bi-directional sharing with MSSPs, telecom providers, and government CERTs enriches context and accelerates novel threat discovery.",
    stat: "200+ partner orgs",
    color: "#f59e0b",
  },
  {
    icon: TrendingUp,
    title: "Campaign Tracking",
    description: "Long-horizon attribution engine correlates infrastructure overlap, code reuse, and TTPs across APT campaigns and financially-motivated actors.",
    stat: "340+ active campaigns",
    color: "#ff6b35",
  },
  {
    icon: Zap,
    title: "Real-Time Updates",
    description: "Threat indicators propagate across all tenants within 90 seconds of discovery — no waiting for overnight signature pushes.",
    stat: "< 90s propagation",
    color: "#ff3b5c",
  },
];

// ─────────────────────────────────────────────
// Threat Intelligence section
// ─────────────────────────────────────────────
export function ThreatIntelligenceSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} id="threat-intelligence" className="relative py-28 lg:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-dots opacity-40" />
      {/* Green ambient glow */}
      <div
        className="absolute top-0 left-0 w-[700px] h-[500px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(0,255,133,0.05) 0%, transparent 70%)" }}
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
            <SectionLabel text="Threat Intelligence" color="green" />
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-5xl sm:text-6xl font-bold text-white leading-[1.06] tracking-tight mb-6">
            Intelligence That{" "}
            <span className="gradient-text-green">Never Sleeps</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-xl text-[#94a3b8] leading-relaxed">
            AINA feeds on a global mesh of sensors, open-source communities, and curated partner intelligence — keeping the threat graph current 24/7.
          </motion.p>
        </motion.div>

        {/* Live ticker */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <ThreatTicker />
        </motion.div>

        {/* Source cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {sources.map((src, i) => {
            const Icon = src.icon;
            return (
              <motion.div
                key={src.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -5 }}
                className="group relative p-6 rounded-2xl border border-[#0f2942] bg-[#0a1628] overflow-hidden cursor-default"
              >
                {/* Glow hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse 70% 60% at 20% 20%, ${src.color}10 0%, transparent 70%)` }}
                />
                {/* Top line */}
                <div
                  className="absolute top-0 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                  style={{ background: `linear-gradient(90deg, ${src.color}, transparent)` }}
                />

                <div className="relative flex items-start gap-4 mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
                    style={{ background: `${src.color}12`, color: src.color, border: `1px solid ${src.color}20` }}
                  >
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-0.5">{src.title}</h3>
                    <span className="text-[11px] font-mono font-semibold" style={{ color: src.color }}>{src.stat}</span>
                  </div>
                </div>
                <p className="text-xs text-[#64748b] leading-relaxed relative">{src.description}</p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
