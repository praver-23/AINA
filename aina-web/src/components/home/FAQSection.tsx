"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/home/FeaturesSection";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/motion";

// ─────────────────────────────────────────────
// FAQ data
// ─────────────────────────────────────────────
const faqs = [
  {
    q: "What file formats does AINA support?",
    a: "AINA supports Android APK, iOS IPA, Windows PE (EXE, DLL, SYS), Linux ELF, macOS Mach-O, ZIP/RAR archives, raw binary blobs, and JavaScript/script files. Samples up to 4 GB are accepted via API or web upload. Compressed archives are auto-unpacked and each contained file analyzed individually.",
    category: "Platform",
  },
  {
    q: "How long does analysis take?",
    a: "Static analysis completes in under 30 seconds for most samples. Dynamic sandbox analysis runs for a configurable 60–300 seconds of emulated runtime. The final AI verdict including the explainable report is available within 500ms of static completion. Priority queue slots are available on Pro and Enterprise plans for latency-sensitive workflows.",
    category: "Performance",
  },
  {
    q: "Is my sample data kept private?",
    a: "Yes. All samples are encrypted in transit (TLS 1.3) and at rest (AES-256). Samples are isolated in per-tenant encrypted storage and never shared with other tenants or used to train shared models without explicit consent. Enterprise customers can opt into fully air-gapped on-premise deployments with zero data leaving their environment.",
    category: "Privacy",
  },
  {
    q: "How does AINA handle obfuscated or packed malware?",
    a: "AINA employs multi-layer deobfuscation including string decryption, reflection resolution, dynamic loading unpacking, native library analysis, and sandbox-based unpacking. Heavily packed samples are executed in the sandbox until the final payload is memory-mapped and extracted for secondary static analysis — catching malware that evades static-only scanners.",
    category: "Technical",
  },
  {
    q: "What does 'explainable' threat intelligence mean?",
    a: "Every verdict includes a SHAP-based feature attribution showing exactly which signals drove the score — top contributing API calls, YARA matches, behavioral flags, and network indicators. An LLM-generated plain-language explanation translates these signals into a human-readable narrative suitable for board reports, legal proceedings, or junior analyst training.",
    category: "AI",
  },
  {
    q: "Can AINA integrate with my existing security stack?",
    a: "Yes — AINA provides webhooks, a full REST API, and native integrations with Splunk, Microsoft Sentinel, Elastic SIEM, CrowdStrike, SentinelOne, Jira, ServiceNow, and PagerDuty. STIX/TAXII 2.1 output is available for threat sharing with ISACs, partner CERTs, and MISP instances.",
    category: "Integration",
  },
  {
    q: "Does AINA detect zero-day malware?",
    a: "Yes. Unlike signature-only scanners, AINA's AI models detect behavioral and structural anomalies that indicate malicious intent regardless of whether the specific sample has been seen before. Our GNN-based call graph analysis and binary visualization CNNs surface novel variants with no known hash or YARA match.",
    category: "AI",
  },
  {
    q: "What compliance frameworks does AINA support?",
    a: "AINA maintains SOC 2 Type II certification, ISO 27001 accreditation, and is GDPR-compliant with a Data Processing Agreement available for EU customers. On-premise deployment options support air-gap requirements for government and regulated financial institutions. FedRAMP authorization is in progress.",
    category: "Compliance",
  },
];

// ─────────────────────────────────────────────
// Category filter
// ─────────────────────────────────────────────
const categories = ["All", ...Array.from(new Set(faqs.map((f) => f.category)))];

// ─────────────────────────────────────────────
// FAQ item
// ─────────────────────────────────────────────
function FAQItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="group rounded-xl border border-[#0f2942] bg-[#0a1628] overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-[#0d1e36] transition-colors duration-200"
        aria-expanded={open}
      >
        <div className="flex items-start gap-4">
          <span className="text-[10px] font-bold px-2 py-0.5 rounded border border-[#00ff85]/20 bg-[#00ff85]/05 text-[#00ff85] tracking-wider uppercase shrink-0 mt-0.5">
            {faq.category}
          </span>
          <span className="text-sm font-semibold text-white leading-snug">{faq.q}</span>
        </div>
        <div className="shrink-0 w-6 h-6 rounded-full border border-[#0f2942] flex items-center justify-center group-hover:border-[#00ff85]/30 transition-colors">
          <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <ChevronDown className="w-3.5 h-3.5 text-[#64748b] group-hover:text-[#00ff85] transition-colors" />
          </motion.div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5">
              <div className="h-px bg-[#0f2942] mb-4" />
              <p className="text-sm text-[#94a3b8] leading-relaxed pl-[calc(2rem+8px)]">{faq.a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// FAQ section
// ─────────────────────────────────────────────
export function FAQSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = faqs.filter(
    (f) => activeCategory === "All" || f.category === activeCategory
  );

  return (
    <section ref={ref} id="faq" className="relative py-28 lg:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-dots opacity-30" />
      <div
        className="absolute top-0 right-0 w-[500px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(0,255,133,0.04) 0%, transparent 70%)" }}
      />

      <Container className="max-w-4xl">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.div variants={fadeUp} className="flex justify-center mb-5">
            <SectionLabel text="FAQ" color="green" />
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-5xl sm:text-6xl font-bold text-white leading-[1.06] tracking-tight mb-6">
            Questions,{" "}
            <span className="gradient-text-green">Answered</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-xl text-[#94a3b8] leading-relaxed">
            Everything you need to know about how AINA works, what it analyzes, and how it fits into your security stack.
          </motion.p>
        </motion.div>

        {/* Category filter pills */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full border text-xs font-semibold tracking-wide transition-all duration-200 ${
                activeCategory === cat
                  ? "border-[#00ff85] bg-[#00ff85]/10 text-[#00ff85]"
                  : "border-[#0f2942] bg-transparent text-[#64748b] hover:text-[#94a3b8] hover:border-[#1a3050]"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* FAQ list */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="space-y-3"
          >
            {filtered.map((faq, i) => (
              <FAQItem key={faq.q} faq={faq} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-14 text-center p-8 rounded-2xl border border-[#0f2942] bg-[#0a1628]"
        >
          <h3 className="text-lg font-bold text-white mb-2">Still have questions?</h3>
          <p className="text-sm text-[#64748b] mb-6">
            Our security engineers are available for a live 30-minute Q&A session.
          </p>
          <a
            href="/contact"
            id="faq-cta-contact"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(135deg, #00ff85, #00d4aa)",
              color: "#020817",
              boxShadow: "0 0 20px rgba(0,255,133,0.2)",
            }}
          >
            Talk to an Engineer
          </a>
        </motion.div>
      </Container>
    </section>
  );
}
