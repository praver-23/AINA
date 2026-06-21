"use client";

import { useRef, useEffect } from "react";

/**
 * useParallax
 * ───────────
 * A hook that binds a subtle parallax effect to a DOM element.
 * The element translates slightly opposite to the mouse direction —
 * the deeper/larger the layer, the more it moves.
 *
 * Parameters:
 *   strength  — px travel at full offset (default 12)
 *   lerp      — smoothing factor 0–1 (default 0.07)
 *
 * The loop uses rAF with lerp so the movement is always smooth
 * regardless of mouse speed — no jank, no React re-renders.
 *
 * Usage:
 *   const parallax = useParallax(14);
 *   <div ref={parallax}>content</div>
 */
export function useParallax(strength = 12, lerpFactor = 0.07) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      // Normalize to -1 → +1 relative to viewport center
      tx = ((e.clientX / window.innerWidth) - 0.5) * strength * -1;
      ty = ((e.clientY / window.innerHeight) - 0.5) * strength * -1;
    };

    const tick = () => {
      cx += (tx - cx) * lerpFactor;
      cy += (ty - cy) * lerpFactor;
      el.style.transform = `translate(${cx.toFixed(2)}px, ${cy.toFixed(2)}px)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [strength, lerpFactor]);

  return ref;
}

/**
 * ParallaxLayer
 * ─────────────
 * A wrapper div that moves in parallax with mouse movement.
 * Drop it around any decorative element (background blob, grid overlay,
 * SVG illustration) to add depth without changing the layout.
 *
 * Usage:
 *   <ParallaxLayer strength={18} className="absolute inset-0 ...">
 *     <div className="bg-gradient..." />
 *   </ParallaxLayer>
 */
export function ParallaxLayer({
  children,
  strength = 12,
  lerp = 0.07,
  className = "",
  style,
}: {
  children: React.ReactNode;
  strength?: number;
  lerp?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useParallax(strength, lerp);

  return (
    <div
      ref={ref}
      className={className}
      style={{ willChange: "transform", ...style }}
    >
      {children}
    </div>
  );
}
