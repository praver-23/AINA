# AINA

AINA is a GenAI-powered malware analysis platform that helps people identify malicious Android applications before they compromise their privacy, finances, and digital security. It analyzes Android APKs using static analysis, dynamic sandbox execution, and AI-generated threat explanations — giving security teams something more useful than a raw scan result.

---

## Problem Statement

Malicious APKs are a common vector for financial fraud. Banking trojans, fake utility apps, and overlay malware steal credentials and OTPs, often going undetected because existing tools either need expert reverse engineers to interpret them, or produce outputs that are too noisy to act on quickly. There's a gap between "file is malicious" and "here's exactly what it does and why."

---

## About AINA

AINA bridges that gap. It's designed to take a raw APK, run it through a full analysis pipeline — static decompilation, permission analysis, dynamic sandbox execution, YARA rule matching, and ML-based classification — and return an explainable threat report written in plain language. You drop an APK, it gets decompiled, its permissions and API calls are analyzed, it runs in a sandbox, an ML model classifies it, and an LLM writes up what it actually does — which malware family it belongs to, which APIs it abuses, and which MITRE ATT&CK techniques apply.

The backend integration is still pending. The frontend is complete and demonstrates the full intended user flow with simulated data.

---

## Screenshots

**Homepage**

![Homepage hero with cyber visualization and APK scanner](./AINA/Screenshot%202026-06-22%20230339.png)

**Dashboard**

![Dashboard showing threat score cards, weekly scan chart, and risk breakdown donut](./AINA/Screenshot%202026-06-22%20230356.png)

**Upload & Analyse**

![Upload page with drag-and-drop zone and recent uploads sidebar](./AINA/Screenshot%202026-06-22%20230419.png)

---

## Demo

- [AINA-website.mp4](./AINA/AINA-website.mp4) — full site walkthrough
- [AINA_Homepage_Figma Demo.mp4](./AINA/AINA_Homepage_Figma%20Demo.mp4) — early Figma prototype

---

## Features

What's actually built in the frontend:

- **Dark UI with cyber aesthetic** — custom design system, glassmorphism panels, glow effects, dot/grid backgrounds
- **Animated landing page** — nine sections, all scroll-triggered with Framer Motion
- **APK upload flow** — drag-and-drop or file browse, six-stage pipeline simulation (upload → static → dynamic → LLM → scoring → report), verdict panel at the end
- **Dashboard** — threat score cards, weekly bar chart, risk distribution donut, permissions table, suspicious API list, analysis timeline, engine status
- **Risk scoring panel** — interactive gauge with per-dimension bars; three sample APKs to switch between (BankBot, SpyAgent, CleanUtil)
- **Threat intelligence section** — scrolling threat feed, intelligence source cards
- **FAQ** — accordion with category filter tabs
- **Cursor spotlight** — radial glow that follows the mouse, implemented with rAF + lerp, no React state
- **Floating particles** — canvas-based particle system running globally (60 particles, twinkling, slow drift)
- **Micro-interactions** — tilt cards, magnetic buttons, parallax layers, scroll-animated pipeline connector, hover glows
- **Responsive** — works on mobile, tablet, desktop; mobile nav is a slide-in drawer
- **Supporting pages** — Platform, Solutions, Pricing, About, Blog, Careers, Contact, Legal

---

## Tech Stack

### Frontend

| | |
|---|---|
| Next.js 16 | App Router |
| React 19 | — |
| TypeScript 5 | — |
| Tailwind CSS 4 | — |
| Framer Motion 12 | animations |
| shadcn/ui | component primitives |
| Lucide React | icons |
| Space Grotesk | heading/body font |
| JetBrains Mono | monospace font |

### Backend (Planned)

Not integrated yet. The current pipeline runs on `setTimeout` chains and hardcoded mock data. Planned stack:

| Layer | Tech |
|---|---|
| API | FastAPI |
| Queue / Cache | Redis |
| Database | PostgreSQL |
| Auth + Storage | Supabase |
| AI orchestration | LangChain |
| LLM | Gemini |

---

## Project Structure

```
aina-web/
├── src/
│   ├── app/                  # Pages (Next.js App Router)
│   │   ├── page.tsx          # Landing page
│   │   ├── layout.tsx        # Root layout — fonts, Navbar, Footer, global effects
│   │   ├── globals.css       # Design tokens, Tailwind config, utility classes
│   │   ├── upload/           # APK upload + pipeline UI
│   │   ├── dashboard/        # Threat intelligence dashboard
│   │   ├── platform/
│   │   ├── solutions/
│   │   ├── pricing/
│   │   ├── about/
│   │   ├── blog/
│   │   ├── careers/
│   │   ├── contact/
│   │   └── legal/
│   ├── components/
│   │   ├── home/             # Landing page sections
│   │   ├── layout/           # Navbar, Footer, PageHero, Section, Container
│   │   ├── fx/               # Cursor, particles, tilt, parallax, magnetic button
│   │   ├── contact/          # Contact form
│   │   └── ui/               # shadcn primitives
│   └── lib/
│       ├── motion.ts         # Framer Motion variants and spring presets
│       └── utils.ts          # cn() helper
├── docs/                     # Design system notes (not served)
├── AINA/                     # Screenshots and demo videos
├── package.json
├── next.config.ts
└── tsconfig.json
```

---

## Getting Started

```bash
git clone https://github.com/aashitiwari102/AINA.git
cd AINA/aina-web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run lint    # ESLint
```

`@/*` maps to `src/*`.

---

## What's Not Built Yet

The frontend is complete. Backend integration is the next step:

- **Static analysis engine** — APK decompilation (JADX), DEX parsing, permission extraction, YARA matching
- **Dynamic sandbox** — sandboxed execution, API call tracing, network capture, anti-evasion
- **LLM threat narratives** — connecting the analysis output to Gemini for plain-language explanations
- **Risk scoring backend** — real composite scoring from actual signals instead of hardcoded values
- **WebSocket updates** — live pipeline progress instead of simulated timers

---

## Contributors

Team Ego Primus

- Praver Agarwal
- Aashi Tiwari
