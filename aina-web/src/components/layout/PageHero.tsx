"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { Container } from "./Container";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  titleHighlight?: string;
  description: string;
  variant?: "green" | "teal" | "purple";
  children?: React.ReactNode;
  className?: string;
}

const variantStyles: Record<string, string> = {
  green: "gradient-text-green",
  teal: "gradient-text-teal",
  purple: "from-purple-400 to-[#00b4d8]",
};

const variantGlow: Record<string, string> = {
  green: "bg-glow-green",
  teal: "bg-glow-teal",
  purple: "bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(124,58,237,0.12)_0%,transparent_70%)]",
};

/**
 * Full-viewport hero used across all AINA pages.
 * Supports animated eyebrow badge, gradient headline, and description.
 */
export function PageHero({
  eyebrow,
  title,
  titleHighlight,
  description,
  variant = "green",
  children,
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative min-h-screen flex flex-col justify-center overflow-hidden",
        "bg-grid",
        variantGlow[variant],
        className
      )}
    >
      {/* Radial corner accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00ff85]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#00b4d8]/5 rounded-full blur-3xl pointer-events-none" />

      <Container>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-4xl mx-auto text-center py-32 pt-40"
        >
          {/* Eyebrow badge */}
          {eyebrow && (
            <motion.div variants={fadeUp} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00ff85]/20 bg-[#00ff85]/5 text-xs font-semibold tracking-widest text-[#00ff85] uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00ff85] animate-pulse" />
                {eyebrow}
              </span>
            </motion.div>
          )}

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight mb-6"
          >
            {title}{" "}
            {titleHighlight && (
              <span className={cn("inline-block", variantStyles[variant])}>
                {titleHighlight}
              </span>
            )}
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            className="text-lg sm:text-xl text-[#94a3b8] leading-relaxed max-w-2xl mx-auto mb-10"
          >
            {description}
          </motion.p>

          {/* Slot for CTA buttons or any extra content */}
          {children && (
            <motion.div variants={fadeUp}>{children}</motion.div>
          )}
        </motion.div>
      </Container>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#020817] to-transparent pointer-events-none" />

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        aria-hidden="true"
      >
        <span className="text-xs text-[#64748b] tracking-widest uppercase">Scroll</span>
        <motion.div
          className="w-px h-10 bg-gradient-to-b from-[#00ff85] to-transparent"
          animate={{ scaleY: [0, 1, 0], originY: 0 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
