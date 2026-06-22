"use client";

import type { Metadata } from "next";
import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  FileWarning,
  Shield,
  Cpu,
  Brain,
  BarChart3,
  FileText,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  ChevronRight,
  Package,
  Loader2,
  CloudUpload,
  Sparkles,
  Eye,
  Download,
  RotateCcw,
  Info,
  Lock,
  Code2,
  Activity,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { fadeUp, staggerContainer, staggerChildren, viewportOnce } from "@/lib/motion";

// ─── Types ───────────────────────────────────────────────────────────────────

type StageStatus = "idle" | "running" | "done" | "error";

interface Stage {
  id: string;
  label: string;
  description: string;
  icon: React.ElementType;
  duration: number; // ms to simulate
  status: StageStatus;
  detail?: string;
}

interface RecentUpload {
  id: string;
  name: string;
  size: string;
  uploadedAt: string;
  score: number;
  verdict: "MALICIOUS" | "HIGH RISK" | "SUSPICIOUS" | "CLEAN";
  hash: string;
}

// ─── Mocked Data ─────────────────────────────────────────────────────────────

const INITIAL_STAGES: Stage[] = [
  {
    id: "upload",
    label: "Upload",
    description: "Transferring file to AINA secure sandbox",
    icon: CloudUpload,
    duration: 1200,
    status: "idle",
  },
  {
    id: "static",
    label: "Static Analysis",
    description: "Decompiling APK, parsing manifest & DEX bytecode",
    icon: FileWarning,
    duration: 2800,
    status: "idle",
    detail: "JADX · JADX-GUI · apktool · androguard",
  },
  {
    id: "dynamic",
    label: "Dynamic Analysis",
    description: "Executing in isolated sandbox, monitoring runtime behaviour",
    icon: Activity,
    duration: 3500,
    status: "idle",
    detail: "Android 14 Emulator · DynamoRIO · Frida hooks",
  },
  {
    id: "llm",
    label: "LLM Threat Explanation",
    description: "Generating natural-language threat narrative with AINA-LLM",
    icon: Brain,
    duration: 2200,
    status: "idle",
    detail: "AINA-LLM-7B · RAG over CVE corpus",
  },
  {
    id: "scoring",
    label: "Risk Scoring",
    description: "Computing composite 0–100 threat score from all signals",
    icon: BarChart3,
    duration: 900,
    status: "idle",
    detail: "Gradient Boosted Ensemble · 48 feature dimensions",
  },
  {
    id: "report",
    label: "Report Generation",
    description: "Compiling JSON, PDF, and STIX 2.1 threat report",
    icon: FileText,
    duration: 1100,
    status: "idle",
    detail: "STIX 2.1 · MITRE ATT&CK mapping · PDF/A-3",
  },
];

const STAGE_DETAILS: Record<string, string> = {
  upload: "SHA-256: a4f3d9b2c1e8f7a0d5b9c3e6f1a8d2b7 · MD5: d41d8cd98f00b204e9800998ecf8427e",
  static: "3,847 classes · 14,203 methods · 23 permissions · 14 dangerous · 47 suspicious API calls detected",
  dynamic: "Runtime: 45s · 1,204 syscalls · 8 network connections · 3 C2 beacons · 2 overlay attacks",
  llm: "Threat family: Banking Trojan (BankBot v3) · TTPs: T1418, T1421, T1516 · Confidence: 96.4%",
  scoring: "Composite score: 84/100 · Static: 91 · Behavioral: 96 · Network: 88 · Intel: 78",
  report: "Report ID: AINA-20260622-0344 · 14 pages · STIX bundle: 23 objects · MITRE coverage: 8 techniques",
};

const RECENT_UPLOADS: RecentUpload[] = [
  {
    id: "r1",
    name: "com.fake.banking.app_3.2.1.apk",
    size: "12.4 MB",
    uploadedAt: "2026-06-22 03:44",
    score: 84,
    verdict: "MALICIOUS",
    hash: "a4f3d9b2c1e8f7a0",
  },
  {
    id: "r2",
    name: "com.suspicious.cleaner_1.0.0.apk",
    size: "8.1 MB",
    uploadedAt: "2026-06-21 21:12",
    score: 67,
    verdict: "HIGH RISK",
    hash: "b7c2e5f9d1a3b8c4",
  },
  {
    id: "r3",
    name: "com.legit.finance.tools_2.5.0.apk",
    size: "5.7 MB",
    uploadedAt: "2026-06-21 17:30",
    score: 18,
    verdict: "CLEAN",
    hash: "c9d4f6a2e8b1c7d3",
  },
  {
    id: "r4",
    name: "com.adware.tracker.sdk_4.1.3.apk",
    size: "18.3 MB",
    uploadedAt: "2026-06-21 14:05",
    score: 72,
    verdict: "HIGH RISK",
    hash: "e3f7a1d9b5c2e8f4",
  },
  {
    id: "r5",
    name: "com.utility.manager.pro_1.2.0.apk",
    size: "3.2 MB",
    uploadedAt: "2026-06-20 09:50",
    score: 44,
    verdict: "SUSPICIOUS",
    hash: "f8b2c6d4a9e1f7b3",
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function verdictStyle(verdict: RecentUpload["verdict"]) {
  const map: Record<string, { text: string; border: string; bg: string }> = {
    MALICIOUS:  { text: "text-[#ff3b5c]",  border: "border-[#ff3b5c]/30",  bg: "bg-[#ff3b5c]/8"  },
    "HIGH RISK":{ text: "text-[#f97316]",  border: "border-[#f97316]/30",  bg: "bg-[#f97316]/8"  },
    SUSPICIOUS: { text: "text-[#f59e0b]",  border: "border-[#f59e0b]/30",  bg: "bg-[#f59e0b]/8"  },
    CLEAN:      { text: "text-[#22c55e]",  border: "border-[#22c55e]/30",  bg: "bg-[#22c55e]/8"  },
  };
  return map[verdict] ?? map.SUSPICIOUS;
}

function scoreColor(score: number) {
  if (score >= 75) return "#ff3b5c";
  if (score >= 50) return "#f97316";
  if (score >= 25) return "#f59e0b";
  return "#22c55e";
}

function ScoreRing({ score, size = 40 }: { score: number; size?: number }) {
  const r = (size - 8) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  const color = scoreColor(score);
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#0f2942" strokeWidth="4" />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke={color} strokeWidth="4"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 4px ${color}80)` }}
        />
      </svg>
      <span className="absolute text-[10px] font-bold" style={{ color }}>{score}</span>
    </div>
  );
}

// ─── Stage row ───────────────────────────────────────────────────────────────

function StageRow({
  stage,
  index,
  isLast,
}: {
  stage: Stage;
  index: number;
  isLast: boolean;
}) {
  const Icon = stage.icon;
  const statusConfig = {
    idle:    { iconColor: "#475569", ringColor: "#0f2942", bg: "bg-[#0a1628]" },
    running: { iconColor: "#f97316", ringColor: "#f97316", bg: "bg-[#0a1628]" },
    done:    { iconColor: "#22c55e", ringColor: "#22c55e", bg: "bg-[#0a1628]" },
    error:   { iconColor: "#ff3b5c", ringColor: "#ff3b5c", bg: "bg-[#0a1628]" },
  }[stage.status];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="flex gap-4"
    >
      {/* Icon + connector */}
      <div className="flex flex-col items-center">
        <motion.div
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border-2 transition-all duration-500"
          style={{
            borderColor: statusConfig.ringColor,
            boxShadow: stage.status === "running"
              ? `0 0 16px ${statusConfig.ringColor}50`
              : stage.status === "done"
              ? `0 0 8px ${statusConfig.ringColor}30`
              : "none",
            background: stage.status !== "idle" ? `${statusConfig.ringColor}10` : "#0a1628",
          }}
          animate={stage.status === "running" ? { scale: [1, 1.06, 1] } : {}}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        >
          {stage.status === "running" ? (
            <Loader2 size={16} style={{ color: statusConfig.iconColor }} className="animate-spin" />
          ) : stage.status === "done" ? (
            <CheckCircle2 size={16} style={{ color: statusConfig.iconColor }} />
          ) : stage.status === "error" ? (
            <XCircle size={16} style={{ color: statusConfig.iconColor }} />
          ) : (
            <Icon size={16} style={{ color: statusConfig.iconColor }} />
          )}
        </motion.div>
        {!isLast && (
          <div
            className="w-px flex-1 min-h-[28px] transition-colors duration-700"
            style={{
              background: stage.status === "done"
                ? "linear-gradient(to bottom, #22c55e60, #0f2942)"
                : "#0f2942",
            }}
          />
        )}
      </div>

      {/* Content */}
      <div className="pb-6 flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span
            className="text-sm font-semibold transition-colors duration-300"
            style={{
              color: stage.status === "idle" ? "#64748b"
                : stage.status === "running" ? "#f97316"
                : stage.status === "done" ? "#e2e8f0"
                : "#ff3b5c",
            }}
          >
            {stage.label}
          </span>
          {stage.status === "running" && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[10px] text-[#f97316] font-bold uppercase tracking-wider animate-pulse"
            >
              Processing…
            </motion.span>
          )}
          {stage.status === "done" && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-[10px] text-[#22c55e] font-bold uppercase tracking-wider"
            >
              Complete
            </motion.span>
          )}
        </div>
        <p className="text-xs text-[#64748b] mb-1.5">{stage.description}</p>

        {/* Running progress bar */}
        {stage.status === "running" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-0.5 rounded-full bg-[#0f2942] overflow-hidden w-full max-w-xs"
          >
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#f97316] to-[#ff3b5c]"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: stage.duration / 1000, ease: "linear" }}
            />
          </motion.div>
        )}

        {/* Done detail */}
        {stage.status === "done" && STAGE_DETAILS[stage.id] && (
          <motion.p
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-[11px] font-mono text-[#475569] leading-relaxed"
          >
            {STAGE_DETAILS[stage.id]}
          </motion.p>
        )}

        {/* Metadata pill */}
        {stage.detail && stage.status !== "idle" && (
          <div className="flex flex-wrap gap-1 mt-1.5">
            {stage.detail.split("·").map((t) => (
              <span
                key={t}
                className="text-[10px] px-2 py-0.5 rounded bg-[#0f2942] text-[#475569] font-mono"
              >
                {t.trim()}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Results panel ───────────────────────────────────────────────────────────

function ResultsPanel({ fileName }: { fileName: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="mt-6 rounded-xl border border-[#ff3b5c]/20 bg-[#0a1628] overflow-hidden"
      style={{ boxShadow: "0 0 40px rgba(255,59,92,0.06), inset 0 1px 0 rgba(255,59,92,0.08)" }}
    >
      {/* Verdict banner */}
      <div className="flex items-center justify-between px-5 py-3 bg-[#ff3b5c]/5 border-b border-[#ff3b5c]/20">
        <div className="flex items-center gap-2">
          <AlertTriangle size={14} className="text-[#ff3b5c]" />
          <span className="text-sm font-bold text-[#ff3b5c]">VERDICT: MALICIOUS</span>
          <span className="text-[10px] text-[#64748b]">· Confidence 96.4%</span>
        </div>
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            id="btn-view-report"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#ff3b5c]/10 text-[#ff3b5c] border border-[#ff3b5c]/20 hover:bg-[#ff3b5c]/20 transition-colors"
          >
            <Eye size={11} /> View Report
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            id="btn-download-report"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#0f2942] text-[#94a3b8] border border-[#0f2942] hover:text-white transition-colors"
          >
            <Download size={11} /> Download PDF
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-[#0f2942]">
        {[
          { label: "Threat Score", value: "84", sub: "/ 100", color: "#ff3b5c" },
          { label: "Risk Level", value: "Critical", sub: "Immediate action", color: "#f97316" },
          { label: "Permissions", value: "14", sub: "dangerous", color: "#f97316" },
          { label: "Suspicious APIs", value: "47", sub: "calls", color: "#f59e0b" },
        ].map((m) => (
          <div key={m.label} className="px-4 py-4 text-center">
            <p className="text-xs text-[#64748b] mb-1">{m.label}</p>
            <p className="text-xl font-bold" style={{ color: m.color }}>
              {m.value} <span className="text-xs font-normal text-[#64748b]">{m.sub}</span>
            </p>
          </div>
        ))}
      </div>

      {/* LLM Narrative */}
      <div className="px-5 py-4 border-t border-[#0f2942]">
        <div className="flex items-center gap-2 mb-2">
          <Brain size={13} className="text-[#a78bfa]" />
          <span className="text-xs font-semibold text-[#a78bfa]">AINA-LLM Threat Narrative</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#a78bfa]/10 text-[#a78bfa] border border-[#a78bfa]/20 font-bold">AI</span>
        </div>
        <p className="text-xs text-[#94a3b8] leading-relaxed">
          <span className="font-mono text-[#e2e8f0]">{fileName}</span> is classified as a{" "}
          <span className="text-[#ff3b5c] font-semibold">BankBot v3 Banking Trojan</span>. The sample
          leverages <span className="text-[#f97316]">DexClassLoader</span> to load a second-stage payload at runtime,
          uses <span className="text-[#f97316]">AccessibilityService</span> abuse for overlay phishing attacks targeting
          banking credentials, and exfiltrates IMEI, SMS OTPs, and contact lists to a hardcoded C2 at{" "}
          <span className="font-mono text-[#64748b]">185.220.101.47:8443</span>. Anti-debugging routines and
          root detection bypass are also present. MITRE ATT&CK techniques: T1418, T1421, T1516, T1406, T1409.
        </p>
      </div>
    </motion.div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

type UploadState = "idle" | "analyzing" | "done";

export default function UploadPage() {
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [stages, setStages] = useState<Stage[]>(INITIAL_STAGES);
  const [currentStageIdx, setCurrentStageIdx] = useState(-1);
  const [isDragOver, setIsDragOver] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const analysisRef = useRef<HTMLDivElement>(null);

  // Run the pipeline sequentially
  const runPipeline = useCallback(async (name: string) => {
    setUploadState("analyzing");
    setCurrentStageIdx(0);

    const stagesCopy = INITIAL_STAGES.map((s) => ({ ...s }));

    for (let i = 0; i < stagesCopy.length; i++) {
      setCurrentStageIdx(i);
      stagesCopy[i].status = "running";
      setStages([...stagesCopy]);

      await new Promise((r) => setTimeout(r, stagesCopy[i].duration));

      stagesCopy[i].status = "done";
      setStages([...stagesCopy]);
    }

    setUploadState("done");
  }, []);

  const handleFile = useCallback(
    (file: File) => {
      if (!file.name.toLowerCase().endsWith(".apk")) {
        alert("Please upload a valid .apk file.");
        return;
      }
      const sizeStr =
        file.size < 1024 * 1024
          ? `${(file.size / 1024).toFixed(1)} KB`
          : `${(file.size / (1024 * 1024)).toFixed(1)} MB`;
      setFileName(file.name);
      setFileSize(sizeStr);

      // Scroll to analysis panel after a brief delay
      setTimeout(() => {
        analysisRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);

      runPipeline(file.name);
    },
    [runPipeline]
  );

  // Demo: treat any file as an APK for demonstration
  const handleFileFlex = useCallback(
    (file: File) => {
      const sizeStr =
        file.size < 1024 * 1024
          ? `${(file.size / 1024).toFixed(1)} KB`
          : `${(file.size / (1024 * 1024)).toFixed(1)} MB`;
      const fakeApkName = file.name.endsWith(".apk") ? file.name : `${file.name.split(".")[0]}.apk`;
      setFileName(fakeApkName);
      setFileSize(sizeStr);

      setTimeout(() => {
        analysisRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);

      runPipeline(fakeApkName);
    },
    [runPipeline]
  );

  const handleReset = () => {
    setUploadState("idle");
    setStages(INITIAL_STAGES);
    setCurrentStageIdx(-1);
    setFileName(null);
    setFileSize(null);
  };

  // Drag & drop handlers
  const onDragOver = useCallback((e: React.DragEvent) => { e.preventDefault(); setIsDragOver(true); }, []);
  const onDragLeave = useCallback(() => setIsDragOver(false), []);
  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      const file = e.dataTransfer.files?.[0];
      if (file) handleFileFlex(file);
    },
    [handleFileFlex]
  );

  const allDone = stages.every((s) => s.status === "done");

  return (
    <div className="min-h-screen bg-[#020817] relative overflow-x-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
      <div className="absolute top-0 left-0 w-[700px] h-[500px] bg-[radial-gradient(ellipse_at_top_left,rgba(249,115,22,0.07)_0%,transparent_65%)] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-[radial-gradient(ellipse_at_top_right,rgba(255,59,92,0.06)_0%,transparent_65%)] pointer-events-none" />

      <Container className="relative z-10 py-10 pt-28 pb-24">

        {/* ── Page Header ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-10"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-3">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#f97316]/30 bg-[#f97316]/5 text-[10px] font-bold tracking-widest text-[#f97316] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f97316] animate-pulse" />
              APK Analysis Engine
            </span>
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Upload &{" "}
            <span className="bg-gradient-to-r from-[#f97316] to-[#ff3b5c] bg-clip-text text-transparent">
              Analyse APK
            </span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-[#94a3b8] text-sm max-w-xl">
            Drop your APK file below. AINA will run six analysis stages — from static decompilation
            through LLM threat explanation — and return a complete risk report in seconds.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">

          {/* ── LEFT: Drop zone + pipeline ── */}
          <div className="xl:col-span-3 space-y-6">

            {/* Drop zone */}
            <AnimatePresence mode="wait">
              {uploadState === "idle" ? (
                <motion.div
                  key="dropzone"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.4 }}
                >
                  <div
                    id="apk-drop-zone"
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className="relative cursor-pointer rounded-2xl border-2 border-dashed transition-all duration-300 overflow-hidden group"
                    style={{
                      borderColor: isDragOver ? "#f97316" : "#0f2942",
                      background: isDragOver
                        ? "rgba(249,115,22,0.04)"
                        : "rgba(10,22,40,0.6)",
                      boxShadow: isDragOver ? "0 0 40px rgba(249,115,22,0.12)" : "none",
                    }}
                  >
                    {/* Animated corner accents when dragging */}
                    {isDragOver && (
                      <>
                        <motion.div
                          className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#f97316] rounded-tl-2xl"
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                        <motion.div
                          className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#f97316] rounded-tr-2xl"
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0.25 }}
                        />
                        <motion.div
                          className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#f97316] rounded-bl-2xl"
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
                        />
                        <motion.div
                          className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#f97316] rounded-br-2xl"
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0.75 }}
                        />
                      </>
                    )}

                    <div className="relative py-20 px-8 flex flex-col items-center text-center">
                      {/* Animated icon */}
                      <motion.div
                        className="relative mb-6"
                        animate={isDragOver ? { scale: 1.12 } : { scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div
                          className="w-20 h-20 rounded-2xl flex items-center justify-center"
                          style={{
                            background: isDragOver ? "rgba(249,115,22,0.15)" : "rgba(15,41,66,0.8)",
                            border: `1.5px solid ${isDragOver ? "rgba(249,115,22,0.4)" : "rgba(15,41,66,1)"}`,
                            boxShadow: isDragOver ? "0 0 24px rgba(249,115,22,0.2)" : "none",
                          }}
                        >
                          <motion.div
                            animate={isDragOver
                              ? { y: [-4, 0, -4] }
                              : { y: [0, -6, 0] }
                            }
                            transition={{ duration: isDragOver ? 0.8 : 2.5, repeat: Infinity, ease: "easeInOut" }}
                          >
                            <Upload
                              size={36}
                              style={{ color: isDragOver ? "#f97316" : "#475569" }}
                            />
                          </motion.div>
                        </div>
                        {/* Ripple rings on drag */}
                        {isDragOver && (
                          <>
                            <motion.div
                              className="absolute inset-0 rounded-2xl border border-[#f97316]/30"
                              animate={{ scale: [1, 1.4], opacity: [0.6, 0] }}
                              transition={{ duration: 1.2, repeat: Infinity }}
                            />
                            <motion.div
                              className="absolute inset-0 rounded-2xl border border-[#f97316]/20"
                              animate={{ scale: [1, 1.7], opacity: [0.4, 0] }}
                              transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}
                            />
                          </>
                        )}
                      </motion.div>

                      <h2 className="text-lg font-semibold text-white mb-2">
                        {isDragOver ? "Release to analyse" : "Drop your APK here"}
                      </h2>
                      <p className="text-sm text-[#64748b] mb-6">
                        or{" "}
                        <span className="text-[#f97316] hover:text-[#ff3b5c] transition-colors font-medium cursor-pointer">
                          browse files
                        </span>{" "}
                        to upload
                      </p>

                      <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-[#475569]">
                        <span className="flex items-center gap-1.5">
                          <Package size={11} className="text-[#64748b]" />
                          .apk files only
                        </span>
                        <span className="w-px h-3 bg-[#0f2942]" />
                        <span className="flex items-center gap-1.5">
                          <Shield size={11} className="text-[#64748b]" />
                          Isolated sandbox
                        </span>
                        <span className="w-px h-3 bg-[#0f2942]" />
                        <span className="flex items-center gap-1.5">
                          <Lock size={11} className="text-[#64748b]" />
                          End-to-end encrypted
                        </span>
                        <span className="w-px h-3 bg-[#0f2942]" />
                        <span className="flex items-center gap-1.5">
                          <Clock size={11} className="text-[#64748b]" />
                          ~12s analysis
                        </span>
                      </div>
                    </div>

                    {/* Bottom hint bar */}
                    <div className="border-t border-[#0f2942] px-6 py-3 flex items-center justify-between bg-[#061020]">
                      <span className="text-[11px] text-[#475569] font-mono">Max size: 500 MB · Android 5.0+</span>
                      <span className="text-[11px] text-[#475569]">Demo: any file accepted</span>
                    </div>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".apk,*"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) handleFileFlex(f);
                    }}
                  />
                </motion.div>
              ) : (
                /* File accepted card */
                <motion.div
                  key="accepted"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.4 }}
                  className="rounded-2xl border border-[#f97316]/20 bg-[#0a1628] px-5 py-4 flex items-center gap-4"
                  style={{ boxShadow: "0 0 24px rgba(249,115,22,0.06)" }}
                >
                  <div className="w-12 h-12 rounded-xl bg-[#f97316]/10 border border-[#f97316]/20 flex items-center justify-center shrink-0">
                    <Package size={20} className="text-[#f97316]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white truncate">{fileName}</p>
                    <p className="text-xs text-[#64748b]">{fileSize} · APK file</p>
                  </div>
                  {uploadState === "done" && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleReset}
                      id="btn-reset-upload"
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-[#64748b] border border-[#0f2942] hover:text-white hover:border-[#f97316]/30 transition-all"
                    >
                      <RotateCcw size={12} /> New Upload
                    </motion.button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Analysis Pipeline ── */}
            <div ref={analysisRef}>
              <AnimatePresence>
                {uploadState !== "idle" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="rounded-2xl border border-[#0f2942] bg-[#0a1628] overflow-hidden"
                  >
                    {/* Panel header */}
                    <div className="flex items-center justify-between px-5 py-4 border-b border-[#0f2942]">
                      <div className="flex items-center gap-2">
                        <Cpu size={14} className="text-[#f97316]" />
                        <h2 className="text-sm font-semibold text-white">Analysis Pipeline</h2>
                        {uploadState === "analyzing" && (
                          <span className="text-[10px] text-[#f97316] font-bold uppercase animate-pulse">
                            Running
                          </span>
                        )}
                        {uploadState === "done" && (
                          <span className="text-[10px] text-[#22c55e] font-bold uppercase">
                            Complete
                          </span>
                        )}
                      </div>
                      {/* Overall progress */}
                      <div className="flex items-center gap-2 text-xs text-[#64748b]">
                        <span>{stages.filter((s) => s.status === "done").length} / {stages.length}</span>
                        <div className="w-20 h-1 rounded-full bg-[#0f2942] overflow-hidden">
                          <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-[#f97316] to-[#22c55e]"
                            animate={{
                              width: `${(stages.filter((s) => s.status === "done").length / stages.length) * 100}%`,
                            }}
                            transition={{ duration: 0.4 }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Stages */}
                    <div className="px-5 pt-5 pb-1">
                      {stages.map((stage, i) => (
                        <StageRow
                          key={stage.id}
                          stage={stage}
                          index={i}
                          isLast={i === stages.length - 1}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ── Results ── */}
            <AnimatePresence>
              {uploadState === "done" && fileName && (
                <ResultsPanel fileName={fileName} />
              )}
            </AnimatePresence>
          </div>

          {/* ── RIGHT: Recent Uploads + Tips ── */}
          <div className="xl:col-span-2 space-y-6">

            {/* Recent Uploads */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              id="panel-recent-uploads"
              className="rounded-2xl border border-[#0f2942] bg-[#0a1628] overflow-hidden"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-[#0f2942]">
                <div className="flex items-center gap-2">
                  <Clock size={13} className="text-[#64748b]" />
                  <h2 className="text-sm font-semibold text-white">Recent Uploads</h2>
                </div>
                <button
                  id="btn-view-all-uploads"
                  className="text-[10px] text-[#f97316] hover:text-[#ff3b5c] font-semibold flex items-center gap-0.5 transition-colors"
                >
                  View All <ChevronRight size={10} />
                </button>
              </div>

              <div className="divide-y divide-[#0f2942]">
                {RECENT_UPLOADS.map((upload, i) => {
                  const vs = verdictStyle(upload.verdict);
                  return (
                    <motion.div
                      key={upload.id}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.35, delay: i * 0.05 }}
                      id={`recent-upload-${upload.id}`}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-[#0f2942]/40 transition-colors cursor-pointer"
                    >
                      <ScoreRing score={upload.score} size={38} />
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-mono text-[#e2e8f0] truncate mb-0.5">
                          {upload.name}
                        </p>
                        <p className="text-[10px] text-[#475569]">
                          {upload.size} · {upload.uploadedAt}
                        </p>
                      </div>
                      <span
                        className={`text-[9px] font-bold px-2 py-0.5 rounded border uppercase whitespace-nowrap ${vs.text} ${vs.border} ${vs.bg}`}
                      >
                        {upload.verdict}
                      </span>
                    </motion.div>
                  );
                })}
              </div>

              {/* Stats bar */}
              <div className="border-t border-[#0f2942] px-5 py-3 flex items-center justify-between bg-[#061020]">
                <span className="text-[10px] text-[#475569]">
                  5 shown · <span className="text-[#64748b]">117 total this week</span>
                </span>
                <div className="flex items-center gap-3 text-[10px]">
                  <span className="text-[#ff3b5c]">▲ 3 malicious</span>
                  <span className="text-[#22c55e]">✓ 1 clean</span>
                </div>
              </div>
            </motion.div>

            {/* How it works */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              id="panel-how-it-works"
              className="rounded-2xl border border-[#0f2942] bg-[#0a1628] overflow-hidden"
            >
              <div className="flex items-center gap-2 px-5 py-4 border-b border-[#0f2942]">
                <Sparkles size={13} className="text-[#a78bfa]" />
                <h2 className="text-sm font-semibold text-white">How it Works</h2>
              </div>
              <div className="px-5 py-4 space-y-4">
                {[
                  {
                    icon: CloudUpload,
                    color: "#00b4d8",
                    title: "1. Secure Upload",
                    desc: "Your APK is transferred over TLS 1.3 to AINA's isolated analysis cluster. Files are never stored beyond 24 hours.",
                  },
                  {
                    icon: Code2,
                    color: "#f97316",
                    title: "2. Static + Dynamic",
                    desc: "JADX decompiles the APK and our sandbox executes it in a real Android 14 emulator instrumented with Frida hooks.",
                  },
                  {
                    icon: Brain,
                    color: "#a78bfa",
                    title: "3. AI Explanation",
                    desc: "AINA-LLM generates a plain-English threat narrative with MITRE ATT&CK mapping, so analysts of any skill level can act fast.",
                  },
                  {
                    icon: FileText,
                    color: "#22c55e",
                    title: "4. Report & Export",
                    desc: "Download a full PDF report, machine-readable JSON, or STIX 2.1 bundle for direct SIEM integration.",
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="flex gap-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                        style={{ background: `${item.color}12`, border: `1px solid ${item.color}20` }}
                      >
                        <Icon size={13} style={{ color: item.color }} />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-white mb-0.5">{item.title}</p>
                        <p className="text-[11px] text-[#64748b] leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Security notice */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="rounded-xl border border-[#0f2942] bg-[#0a1628] px-5 py-4"
            >
              <div className="flex items-start gap-3">
                <Info size={13} className="text-[#00b4d8] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-[#00b4d8] mb-1">Privacy Notice</p>
                  <p className="text-[11px] text-[#475569] leading-relaxed">
                    All files are analysed in an air-gapped sandbox. No data is shared with
                    third parties. Files are automatically purged after 24 hours. This demo
                    uses entirely mocked results.
                  </p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </Container>
    </div>
  );
}
