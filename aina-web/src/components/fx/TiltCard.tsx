"use client";

import { useRef, useCallback } from "react";

/**
 * useTiltCard
 * ───────────
 * A hook that adds a subtle 3D tilt effect to a card element based on
 * mouse position within the element. Works purely with CSS transforms,
 * no Framer Motion dependency needed (though it integrates fine alongside it).
 *
 * Parameters:
 *   maxTilt  — max degrees of rotation (default 8)
 *   glare    — whether to add a moving shine overlay (default true)
 *
 * Usage:
 *   const tilt = useTiltCard();
 *   <div ref={tilt.ref} onMouseMove={tilt.onMouseMove} onMouseLeave={tilt.onMouseLeave} style={tilt.style}>
 *     card content
 *   </div>
 */
export function useTiltCard(maxTilt = 7, glare = true) {
  const ref = useRef<HTMLDivElement | null>(null);
  const glareRef = useRef<HTMLDivElement | null>(null);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;   // 0 → 1
      const y = (e.clientY - rect.top) / rect.height;   // 0 → 1
      const rotX = (0.5 - y) * maxTilt * 2;             // tilt on X axis
      const rotY = (x - 0.5) * maxTilt * 2;             // tilt on Y axis

      el.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02,1.02,1.02)`;
      el.style.transition = "transform 0.08s linear";

      if (glare && glareRef.current) {
        const angle = Math.atan2(y - 0.5, x - 0.5) * (180 / Math.PI);
        glareRef.current.style.opacity = "1";
        glareRef.current.style.background = `linear-gradient(${angle}deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 60%)`;
      }
    },
    [maxTilt, glare]
  );

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
    el.style.transition = "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)";
    if (glare && glareRef.current) {
      glareRef.current.style.opacity = "0";
      glareRef.current.style.transition = "opacity 0.4s ease";
    }
  }, [glare]);

  const setRef = useCallback((el: HTMLDivElement | null) => {
    ref.current = el;
  }, []);

  const setGlareRef = useCallback((el: HTMLDivElement | null) => {
    glareRef.current = el;
  }, []);

  return { ref: setRef, glareRef: setGlareRef, onMouseMove, onMouseLeave };
}

/**
 * TiltCard
 * ────────
 * A wrapper component that applies the tilt + glare effect.
 * Keeps the transform on the wrapper and renders children normally —
 * preserving all existing layout, borders, shadows, etc.
 *
 * Usage:
 *   <TiltCard className="rounded-2xl border border-[#0f2942] bg-[#0a1628]">
 *     ...existing content...
 *   </TiltCard>
 */
export function TiltCard({
  children,
  className = "",
  maxTilt = 6,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  style?: React.CSSProperties;
}) {
  const { ref, glareRef, onMouseMove, onMouseLeave } = useTiltCard(maxTilt);

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`relative ${className}`}
      style={{ transformStyle: "preserve-3d", willChange: "transform", ...style }}
    >
      {/* Glare layer */}
      <div
        ref={glareRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] z-10 transition-opacity duration-300"
        style={{ opacity: 0 }}
      />
      {children}
    </div>
  );
}
