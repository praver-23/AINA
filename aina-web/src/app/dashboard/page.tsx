"use client";

import type { Metadata } from "next";
import { motion } from "framer-motion";
import {
  Shield,
  AlertTriangle,
  Package,
  Lock,
  Code2,
  Activity,
  Clock,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Minus,
  Wifi,
  Camera,
  Mic,
  MapPin,
  MessageSquare,
  Phone,
  Database,
  Globe,
  Eye,
  Cpu,
  RefreshCw,
  FileWarning,
  CheckCircle2,
  XCircle,
  Info,
  BarChart3,
  Scan,
  Bug,
} from "lucide-react";
import { fadeUp, staggerContainer, staggerChildren, viewportOnce } from "@/lib/motion";
import { Container } from "@/components/layout/Container";

// ─── Dummy Data ─────────────────────────────────────────────────────────────

const statCards = [
  {
    id: "stat-threat-score",
    label: "Threat Score",
    value: "84",
    unit: "/ 100",
    delta: "+12",
    deltaDir: "up" as const,
    icon: Shield,
    color: "orange",
    description: "Critical risk threshold",
    badge: "CRITICAL",
  },
  {
    id: "stat-risk-level",
    label: "Risk Level",
    value: "HIGH",
    unit: "",
    delta: "Elevated",
    deltaDir: "neutral" as const,
    icon: AlertTriangle,
    color: "red",
    description: "Requires immediate review",
    badge: "ALERT",
  },
  {
    id: "stat-apk-status",
    label: "APK Status",
    value: "FLAGGED",
    unit: "",
    delta: "Malicious",
    deltaDir: "up" as const,
    icon: Package,
    color: "red",
    description: "com.fake.banking.app",
    badge: "FLAGGED",
  },
  {
    id: "stat-permissions",
    label: "Permissions Detected",
    value: "23",
    unit: "total",
    delta: "14 dangerous",
    deltaDir: "up" as const,
    icon: Lock,
    color: "orange",
    description: "Above normal baseline",
    badge: "HIGH",
  },
  {
    id: "stat-suspicious-apis",
    label: "Suspicious APIs",
    value: "47",
    unit: "calls",
    delta: "+31 vs avg",
    deltaDir: "up" as const,
    icon: Code2,
    color: "orange",
    description: "Dynamic code loading detected",
    badge: "WARN",
  },
];

const permissions = [
  { name: "ACCESS_FINE_LOCATION", icon: MapPin, level: "dangerous", granted: true },
  { name: "READ_CONTACTS", icon: Phone, level: "dangerous", granted: true },
  { name: "RECORD_AUDIO", icon: Mic, level: "dangerous", granted: true },
  { name: "CAMERA", icon: Camera, level: "dangerous", granted: true },
  { name: "READ_SMS", icon: MessageSquare, level: "dangerous", granted: true },
  { name: "INTERNET", icon: Globe, level: "normal", granted: true },
  { name: "ACCESS_NETWORK_STATE", icon: Wifi, level: "normal", granted: true },
  { name: "READ_CALL_LOG", icon: Phone, level: "dangerous", granted: true },
  { name: "WRITE_EXTERNAL_STORAGE", icon: Database, level: "dangerous", granted: true },
  { name: "FOREGROUND_SERVICE", icon: Activity, level: "normal", granted: true },
  { name: "RECEIVE_BOOT_COMPLETED", icon: Cpu, level: "normal", granted: true },
  { name: "KILL_BACKGROUND_PROCESSES", icon: RefreshCw, level: "dangerous", granted: false },
];

const suspiciousApis = [
  { api: "DexClassLoader.loadClass()", category: "Dynamic Loading", severity: "critical", count: 12 },
  { api: "Runtime.exec()", category: "Command Execution", severity: "critical", count: 8 },
  { api: "Reflection.invoke()", category: "Obfuscation", severity: "high", count: 15 },
  { api: "TelephonyManager.getIMEI()", category: "Device ID", severity: "high", count: 3 },
  { api: "getRunningServices()", category: "Service Enum", severity: "medium", count: 6 },
  { api: "getInstalledPackages()", category: "App Enum", severity: "medium", count: 4 },
  { api: "startActivity(implicit)", category: "Intent Hijack", severity: "high", count: 7 },
  { api: "Base64.decode(exec)", category: "Encoded Payload", severity: "critical", count: 5 },
];

const recentAnalyses = [
  {
    id: "analysis-1",
    name: "com.fake.banking.app",
    version: "3.2.1",
    score: 84,
    level: "Critical",
    date: "2026-06-22 03:44",
    status: "flagged",
    size: "12.4 MB",
  },
  {
    id: "analysis-2",
    name: "com.suspicious.cleaner",
    version: "1.0.0",
    score: 67,
    level: "High",
    date: "2026-06-21 21:12",
    status: "flagged",
    size: "8.1 MB",
  },
  {
    id: "analysis-3",
    name: "com.legit.finance.tools",
    version: "2.5.0",
    score: 18,
    level: "Low",
    date: "2026-06-21 17:30",
    status: "clean",
    size: "5.7 MB",
  },
  {
    id: "analysis-4",
    name: "com.adware.tracker.sdk",
    version: "4.1.3",
    score: 72,
    level: "High",
    date: "2026-06-21 14:05",
    status: "flagged",
    size: "18.3 MB",
  },
  {
    id: "analysis-5",
    name: "com.utility.manager.pro",
    version: "1.2.0",
    score: 44,
    level: "Medium",
    date: "2026-06-20 09:50",
    status: "review",
    size: "3.2 MB",
  },
];

const timeline = [
  {
    id: "tl-1",
    time: "03:44:12",
    date: "Today",
    event: "Analysis complete — Critical threat detected",
    detail: "com.fake.banking.app flagged for dynamic code loading and IMEI exfiltration",
    type: "critical",
  },
  {
    id: "tl-2",
    time: "03:44:01",
    date: "Today",
    event: "47 suspicious API calls identified",
    detail: "DexClassLoader, Runtime.exec(), and encoded payload decoding detected",
    type: "warning",
  },
  {
    id: "tl-3",
    time: "03:43:55",
    date: "Today",
    event: "APK decompiled successfully",
    detail: "JADX decompilation completed — 3,847 classes, 14,203 methods extracted",
    type: "info",
  },
  {
    id: "tl-4",
    time: "03:43:40",
    date: "Today",
    event: "Permission manifest parsed",
    detail: "23 permissions identified, 14 classified as dangerous by Android API",
    type: "warning",
  },
  {
    id: "tl-5",
    time: "03:43:33",
    date: "Today",
    event: "File submitted for analysis",
    detail: "SHA-256: a4f3d9b2c1e8f7a0... · MD5: d41d8cd98f00b204...",
    type: "info",
  },
  {
    id: "tl-6",
    time: "21:12:08",
    date: "Yesterday",
    event: "com.suspicious.cleaner flagged — High risk",
    detail: "Adware patterns and hidden overlay activity detected",
    type: "warning",
  },
  {
    id: "tl-7",
    time: "17:30:45",
    date: "Yesterday",
    event: "com.legit.finance.tools cleared",
    detail: "No malicious patterns found. Score: 18/100",
    type: "success",
  },
];

// Weekly scan trend data (simulated bars)
const weeklyScans = [
  { day: "Mon", total: 12, flagged: 4 },
  { day: "Tue", total: 18, flagged: 7 },
  { day: "Wed", total: 9, flagged: 2 },
  { day: "Thu", total: 24, flagged: 11 },
  { day: "Fri", total: 31, flagged: 18 },
  { day: "Sat", total: 8, flagged: 3 },
  { day: "Sun", total: 15, flagged: 6 },
];
const maxScans = Math.max(...weeklyScans.map((d) => d.total));

// Risk distribution donut (fake percentages)
const riskBreakdown = [
  { label: "Critical", pct: 22, color: "#ff3b5c" },
  { label: "High", pct: 35, color: "#f97316" },
  { label: "Medium", pct: 28, color: "#f59e0b" },
  { label: "Low", pct: 15, color: "#22c55e" },
];

// ─── Helper components ───────────────────────────────────────────────────────

function SeverityBadge({ level }: { level: string }) {
  const map: Record<string, string> = {
    critical: "bg-[#ff3b5c]/10 text-[#ff3b5c] border border-[#ff3b5c]/30",
    high: "bg-[#f97316]/10 text-[#f97316] border border-[#f97316]/30",
    medium: "bg-[#f59e0b]/10 text-[#f59e0b] border border-[#f59e0b]/30",
    low: "bg-[#22c55e]/10 text-[#22c55e] border border-[#22c55e]/30",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${map[level] ?? map.medium}`}>
      {level}
    </span>
  );
}

function ScoreRing({ score }: { score: number }) {
  const r = 36;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  const color = score >= 75 ? "#ff3b5c" : score >= 50 ? "#f97316" : score >= 25 ? "#f59e0b" : "#22c55e";
  return (
    <div className="relative w-20 h-20 flex items-center justify-center">
      <svg width="80" height="80" className="-rotate-90" viewBox="0 0 80 80">
        <circle cx="40" cy="40" r={r} fill="none" stroke="#0f2942" strokeWidth="6" />
        <circle
          cx="40" cy="40" r={r} fill="none"
          stroke={color} strokeWidth="6"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 6px ${color}80)` }}
        />
      </svg>
      <span className="absolute text-sm font-bold" style={{ color }}>{score}</span>
    </div>
  );
}

function TimelineIcon({ type }: { type: string }) {
  const map: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
    critical: { icon: XCircle, color: "#ff3b5c", bg: "bg-[#ff3b5c]/10 border-[#ff3b5c]/30" },
    warning: { icon: AlertTriangle, color: "#f97316", bg: "bg-[#f97316]/10 border-[#f97316]/30" },
    info: { icon: Info, color: "#00b4d8", bg: "bg-[#00b4d8]/10 border-[#00b4d8]/30" },
    success: { icon: CheckCircle2, color: "#22c55e", bg: "bg-[#22c55e]/10 border-[#22c55e]/30" },
  };
  const { icon: Icon, color, bg } = map[type] ?? map.info;
  return (
    <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 ${bg}`}>
      <Icon size={14} style={{ color }} />
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#020817] relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
      <div className="absolute top-0 left-0 w-[600px] h-[400px] bg-[radial-gradient(ellipse_at_top_left,rgba(249,115,22,0.08)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-[radial-gradient(ellipse_at_top_right,rgba(255,59,92,0.07)_0%,transparent_70%)] pointer-events-none" />

      <Container className="relative z-10 py-10 pt-28">

        {/* ── Header ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-10"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-2">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#f97316]/30 bg-[#f97316]/5 text-[10px] font-bold tracking-widest text-[#f97316] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f97316] animate-pulse" />
              Live Analysis
            </span>
            <span className="text-xs text-[#64748b] font-mono">Session #20260622-0344</span>
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-white mb-1">
            APK Threat{" "}
            <span className="bg-gradient-to-r from-[#f97316] to-[#ff3b5c] bg-clip-text text-transparent">
              Intelligence Dashboard
            </span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-[#94a3b8] text-sm">
            Real-time malware analysis · AINA Static + Dynamic Engine v4.2
          </motion.p>
        </motion.div>

        {/* ── Stat Cards ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8"
        >
          {statCards.map((card) => {
            const Icon = card.icon;
            const isOrange = card.color === "orange";
            const accent = isOrange ? "#f97316" : "#ff3b5c";
            const accentBg = isOrange ? "bg-[#f97316]/10" : "bg-[#ff3b5c]/10";
            const accentBorder = isOrange ? "border-[#f97316]/20" : "border-[#ff3b5c]/20";
            const accentText = isOrange ? "text-[#f97316]" : "text-[#ff3b5c]";
            const glow = isOrange
              ? "hover:shadow-[0_0_30px_rgba(249,115,22,0.12)]"
              : "hover:shadow-[0_0_30px_rgba(255,59,92,0.12)]";
            return (
              <motion.div
                key={card.id}
                id={card.id}
                variants={staggerChildren}
                className={`relative overflow-hidden rounded-xl border ${accentBorder} bg-[#0a1628] p-5 transition-all duration-300 hover:-translate-y-1 ${glow} group`}
              >
                {/* glow blob */}
                <div
                  className="absolute -top-4 -right-4 w-24 h-24 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"
                  style={{ background: accent }}
                />
                <div className="relative">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-9 h-9 rounded-lg ${accentBg} flex items-center justify-center`}>
                      <Icon size={16} style={{ color: accent }} />
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${accentBorder} ${accentText} uppercase tracking-wider`}>
                      {card.badge}
                    </span>
                  </div>
                  <p className="text-xs text-[#64748b] mb-1">{card.label}</p>
                  <div className="flex items-end gap-1 mb-1">
                    <span className={`text-2xl font-bold ${accentText}`}>{card.value}</span>
                    {card.unit && <span className="text-xs text-[#64748b] mb-0.5">{card.unit}</span>}
                  </div>
                  <p className="text-[11px] text-[#64748b] truncate">{card.description}</p>
                  <div className="flex items-center gap-1 mt-2">
                    {card.deltaDir === "up" && <TrendingUp size={10} className="text-[#ff3b5c]" />}
                    {card.deltaDir === "down" && <TrendingDown size={10} className="text-[#22c55e]" />}
                    {card.deltaDir === "neutral" && <Minus size={10} className="text-[#f97316]" />}
                    <span className="text-[10px] text-[#64748b]">{card.delta}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Row 2: Charts ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

          {/* Weekly scan bar chart */}
          <motion.div
            id="chart-weekly-scans"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="lg:col-span-2 rounded-xl border border-[#0f2942] bg-[#0a1628] p-6"
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-xs text-[#64748b] uppercase tracking-widest mb-1">Weekly Activity</p>
                <h2 className="text-base font-semibold text-white">Scans vs. Flagged APKs</h2>
              </div>
              <div className="flex items-center gap-4 text-xs text-[#64748b]">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-[#0f2942]" />Total</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-[#f97316]" />Flagged</span>
              </div>
            </div>
            <div className="flex items-end gap-2 h-36">
              {weeklyScans.map((d, i) => (
                <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex flex-col gap-0.5 items-center" style={{ height: "112px" }}>
                    {/* total bar */}
                    <div className="relative w-full flex flex-col justify-end" style={{ height: "112px" }}>
                      <motion.div
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={viewportOnce}
                        transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                        style={{ originY: 1, height: `${(d.total / maxScans) * 100}%` }}
                        className="w-full rounded-t-sm bg-[#1a2f4a] absolute bottom-0"
                      />
                      {/* flagged bar */}
                      <motion.div
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={viewportOnce}
                        transition={{ duration: 0.5, delay: i * 0.06 + 0.1, ease: [0.22, 1, 0.36, 1] }}
                        style={{
                          originY: 1,
                          height: `${(d.flagged / maxScans) * 100}%`,
                          background: "linear-gradient(to top, #ff3b5c, #f97316)",
                          boxShadow: "0 0 8px rgba(249,115,22,0.4)",
                        }}
                        className="w-full rounded-t-sm absolute bottom-0"
                      />
                    </div>
                  </div>
                  <span className="text-[10px] text-[#64748b]">{d.day}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between text-[10px] text-[#64748b] mt-3 pt-3 border-t border-[#0f2942]">
              <span>Total this week: <span className="text-white font-semibold">117</span></span>
              <span>Flagged: <span className="text-[#ff3b5c] font-semibold">51</span> ({Math.round(51/117*100)}%)</span>
            </div>
          </motion.div>

          {/* Risk distribution */}
          <motion.div
            id="chart-risk-distribution"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="rounded-xl border border-[#0f2942] bg-[#0a1628] p-6"
          >
            <p className="text-xs text-[#64748b] uppercase tracking-widest mb-1">Distribution</p>
            <h2 className="text-base font-semibold text-white mb-5">Risk Breakdown</h2>

            {/* SVG donut */}
            <div className="flex justify-center mb-5">
              <div className="relative w-32 h-32">
                <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                  {(() => {
                    let offset = 0;
                    const r = 46;
                    const circ = 2 * Math.PI * r;
                    return riskBreakdown.map((seg) => {
                      const dashArray = (seg.pct / 100) * circ;
                      const dashOffset = circ - dashArray;
                      const el = (
                        <circle
                          key={seg.label}
                          cx="60" cy="60" r={r}
                          fill="none"
                          stroke={seg.color}
                          strokeWidth="14"
                          strokeDasharray={`${dashArray} ${circ - dashArray}`}
                          strokeDashoffset={-(offset / 100) * circ}
                          style={{ filter: `drop-shadow(0 0 4px ${seg.color}60)` }}
                        />
                      );
                      offset += seg.pct;
                      return el;
                    });
                  })()}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-bold text-white">100</span>
                  <span className="text-[10px] text-[#64748b]">APKs</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              {riskBreakdown.map((seg) => (
                <div key={seg.label} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ background: seg.color }} />
                    <span className="text-[#94a3b8]">{seg.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1 rounded-full bg-[#0f2942] overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${seg.pct}%`, background: seg.color }} />
                    </div>
                    <span className="text-[#64748b] w-7 text-right">{seg.pct}%</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Row 3: Permissions + Suspicious APIs ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

          {/* Permissions */}
          <motion.div
            id="panel-permissions"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="rounded-xl border border-[#0f2942] bg-[#0a1628] overflow-hidden"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#0f2942]">
              <div className="flex items-center gap-2">
                <Lock size={14} className="text-[#f97316]" />
                <h2 className="text-sm font-semibold text-white">Permissions Detected</h2>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#f97316]/10 text-[#f97316] border border-[#f97316]/20 font-bold">23</span>
              </div>
              <span className="text-[10px] text-[#ff3b5c] font-semibold">14 DANGEROUS</span>
            </div>
            <div className="divide-y divide-[#0f2942] max-h-80 overflow-y-auto">
              {permissions.map((perm) => {
                const Icon = perm.icon;
                const isDangerous = perm.level === "dangerous";
                return (
                  <div key={perm.name} className="flex items-center gap-3 px-5 py-2.5 hover:bg-[#0f2942]/40 transition-colors">
                    <div className={`w-7 h-7 rounded flex items-center justify-center shrink-0 ${isDangerous ? "bg-[#ff3b5c]/10" : "bg-[#0f2942]"}`}>
                      <Icon size={12} className={isDangerous ? "text-[#ff3b5c]" : "text-[#64748b]"} />
                    </div>
                    <span className="text-xs font-mono text-[#94a3b8] flex-1 truncate">{perm.name}</span>
                    <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${isDangerous ? "bg-[#ff3b5c]/10 text-[#ff3b5c] border border-[#ff3b5c]/20" : "bg-[#0f2942] text-[#64748b]"}`}>
                      {perm.level}
                    </span>
                    {perm.granted ? (
                      <CheckCircle2 size={12} className="text-[#f97316] shrink-0" />
                    ) : (
                      <XCircle size={12} className="text-[#64748b] shrink-0" />
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Suspicious APIs */}
          <motion.div
            id="panel-suspicious-apis"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="rounded-xl border border-[#0f2942] bg-[#0a1628] overflow-hidden"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#0f2942]">
              <div className="flex items-center gap-2">
                <Bug size={14} className="text-[#ff3b5c]" />
                <h2 className="text-sm font-semibold text-white">Suspicious API Calls</h2>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#ff3b5c]/10 text-[#ff3b5c] border border-[#ff3b5c]/20 font-bold">47</span>
              </div>
              <span className="text-[10px] text-[#f97316] font-semibold">3 CRITICAL</span>
            </div>
            <div className="divide-y divide-[#0f2942] max-h-80 overflow-y-auto">
              {suspiciousApis.map((api) => (
                <div key={api.api} className="flex items-center gap-3 px-5 py-2.5 hover:bg-[#0f2942]/40 transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-mono text-[#e2e8f0] truncate mb-0.5">{api.api}</p>
                    <p className="text-[10px] text-[#64748b]">{api.category}</p>
                  </div>
                  <SeverityBadge level={api.severity} />
                  <span className="text-xs text-[#64748b] font-mono w-8 text-right">×{api.count}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Row 4: Timeline + Recent Analyses ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">

          {/* Timeline */}
          <motion.div
            id="panel-timeline"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="lg:col-span-3 rounded-xl border border-[#0f2942] bg-[#0a1628] overflow-hidden"
          >
            <div className="flex items-center gap-2 px-5 py-4 border-b border-[#0f2942]">
              <Clock size={14} className="text-[#f97316]" />
              <h2 className="text-sm font-semibold text-white">Analysis Timeline</h2>
            </div>
            <div className="px-5 py-4 space-y-4 max-h-96 overflow-y-auto">
              {timeline.map((item, i) => (
                <div key={item.id} className="relative flex gap-3">
                  {/* connector line */}
                  {i < timeline.length - 1 && (
                    <div className="absolute left-4 top-8 w-px h-full bg-[#0f2942]" />
                  )}
                  <TimelineIcon type={item.type} />
                  <div className="flex-1 min-w-0 pb-1">
                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                      <span className="text-xs font-semibold text-white">{item.event}</span>
                    </div>
                    <p className="text-[11px] text-[#64748b] leading-relaxed">{item.detail}</p>
                    <p className="text-[10px] text-[#475569] mt-1 font-mono">{item.date} · {item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent analyses */}
          <motion.div
            id="panel-recent-analyses"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="lg:col-span-2 rounded-xl border border-[#0f2942] bg-[#0a1628] overflow-hidden"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#0f2942]">
              <div className="flex items-center gap-2">
                <Scan size={14} className="text-[#f97316]" />
                <h2 className="text-sm font-semibold text-white">Recent Analyses</h2>
              </div>
              <button id="btn-view-all-analyses" className="text-[10px] text-[#f97316] hover:text-[#ff3b5c] flex items-center gap-0.5 transition-colors font-semibold">
                View All <ChevronRight size={10} />
              </button>
            </div>
            <div className="divide-y divide-[#0f2942]">
              {recentAnalyses.map((item) => {
                const statusStyle: Record<string, string> = {
                  flagged: "text-[#ff3b5c] bg-[#ff3b5c]/10 border-[#ff3b5c]/20",
                  clean: "text-[#22c55e] bg-[#22c55e]/10 border-[#22c55e]/20",
                  review: "text-[#f59e0b] bg-[#f59e0b]/10 border-[#f59e0b]/20",
                };
                return (
                  <div key={item.id} id={item.id} className="flex items-center gap-3 px-5 py-3 hover:bg-[#0f2942]/40 transition-colors">
                    <ScoreRing score={item.score} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-mono text-[#e2e8f0] truncate">{item.name}</p>
                      <p className="text-[10px] text-[#64748b]">v{item.version} · {item.size}</p>
                      <p className="text-[10px] text-[#475569] mt-0.5">{item.date}</p>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${statusStyle[item.status]}`}>
                      {item.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* ── Row 5: Cyber Appearance / System Info ── */}
        <motion.div
          id="panel-cyber-appearance"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="rounded-xl border border-[#f97316]/20 bg-[#0a1628] overflow-hidden"
          style={{ boxShadow: "0 0 40px rgba(249,115,22,0.05), inset 0 1px 0 rgba(249,115,22,0.1)" }}
        >
          <div className="flex items-center gap-2 px-5 py-4 border-b border-[#0f2942]">
            <Eye size={14} className="text-[#f97316]" />
            <h2 className="text-sm font-semibold text-white">Cyber Appearance</h2>
            <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full border border-[#f97316]/30 bg-[#f97316]/5 text-[#f97316] font-bold uppercase tracking-wider animate-pulse">
              Live
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#0f2942]">

            {/* APK Identity */}
            <div className="px-5 py-5">
              <p className="text-[10px] text-[#64748b] uppercase tracking-widest mb-3">APK Identity</p>
              <div className="space-y-2.5">
                {[
                  { label: "Package", value: "com.fake.banking.app" },
                  { label: "Version", value: "3.2.1 (build 210)" },
                  { label: "Size", value: "12.4 MB" },
                  { label: "Min SDK", value: "API 21 (Android 5.0)" },
                  { label: "Target SDK", value: "API 34 (Android 14)" },
                  { label: "Cert SHA", value: "a4:f3:d9:b2:c1:e8..." },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between gap-2">
                    <span className="text-[11px] text-[#64748b]">{row.label}</span>
                    <span className="text-[11px] font-mono text-[#94a3b8] truncate max-w-[160px] text-right">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Threat Indicators */}
            <div className="px-5 py-5">
              <p className="text-[10px] text-[#64748b] uppercase tracking-widest mb-3">Threat Indicators</p>
              <div className="space-y-2">
                {[
                  { label: "Dynamic Code Loading", active: true },
                  { label: "Anti-Debugging Techniques", active: true },
                  { label: "Obfuscated Strings", active: true },
                  { label: "Network C2 Communication", active: true },
                  { label: "Overlay Phishing UI", active: false },
                  { label: "Root Detection Bypass", active: true },
                  { label: "SMS Interception", active: true },
                  { label: "Keylogging Activity", active: false },
                ].map((indicator) => (
                  <div key={indicator.label} className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${indicator.active ? "bg-[#ff3b5c]" : "bg-[#0f2942]"}`}
                      style={indicator.active ? { boxShadow: "0 0 6px #ff3b5c" } : {}} />
                    <span className={`text-[11px] ${indicator.active ? "text-[#94a3b8]" : "text-[#475569]"}`}>{indicator.label}</span>
                    <span className={`ml-auto text-[10px] font-bold ${indicator.active ? "text-[#ff3b5c]" : "text-[#475569]"}`}>
                      {indicator.active ? "DETECTED" : "CLEAR"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Engine Status */}
            <div className="px-5 py-5">
              <p className="text-[10px] text-[#64748b] uppercase tracking-widest mb-3">Engine Status</p>
              <div className="space-y-3">
                {[
                  { name: "Static Analysis", status: "complete", pct: 100 },
                  { name: "Dynamic Sandbox", status: "complete", pct: 100 },
                  { name: "ML Classifier", status: "complete", pct: 100 },
                  { name: "Network Forensics", status: "running", pct: 67 },
                  { name: "Signature Matching", status: "complete", pct: 100 },
                ].map((engine) => (
                  <div key={engine.name}>
                    <div className="flex justify-between mb-1">
                      <span className="text-[11px] text-[#94a3b8]">{engine.name}</span>
                      <span className={`text-[10px] font-bold ${engine.status === "running" ? "text-[#f97316] animate-pulse" : "text-[#22c55e]"}`}>
                        {engine.status === "running" ? "RUNNING" : "DONE"}
                      </span>
                    </div>
                    <div className="h-1 rounded-full bg-[#0f2942] overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${engine.pct}%` }}
                        viewport={viewportOnce}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full rounded-full"
                        style={{
                          background: engine.status === "running"
                            ? "linear-gradient(90deg, #f97316, #ff3b5c)"
                            : "#22c55e",
                          boxShadow: engine.status === "running" ? "0 0 6px #f97316" : "none",
                        }}
                      />
                    </div>
                  </div>
                ))}

                <div className="pt-3 border-t border-[#0f2942] space-y-1.5">
                  {[
                    { label: "Analysis Duration", value: "11.2s" },
                    { label: "Engine Version", value: "v4.2.1" },
                    { label: "Threat DB", value: "Jun 22 2026" },
                  ].map((row) => (
                    <div key={row.label} className="flex justify-between">
                      <span className="text-[11px] text-[#64748b]">{row.label}</span>
                      <span className="text-[11px] font-mono text-[#94a3b8]">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom threat summary bar */}
          <div className="px-5 py-3 border-t border-[#0f2942] bg-[#ff3b5c]/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileWarning size={14} className="text-[#ff3b5c]" />
              <span className="text-xs text-[#ff3b5c] font-semibold">VERDICT: MALICIOUS — Do not install this APK</span>
            </div>
            <div className="flex items-center gap-2">
              <BarChart3 size={12} className="text-[#64748b]" />
              <span className="text-[10px] text-[#64748b]">Confidence: <span className="text-[#f97316] font-bold">96.4%</span></span>
            </div>
          </div>
        </motion.div>

        {/* Footer note */}
        <div className="mt-6 text-center text-[10px] text-[#475569]">
          AINA APK Intelligence Engine · Analysis ID: AINA-20260622-0344-X84F · All data is simulated for demonstration
        </div>

      </Container>
    </div>
  );
}
