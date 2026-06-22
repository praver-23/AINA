"use client";

import { useEffect, useRef } from "react";

/**
 * CursorSpotlight
 * ───────────────
 * A soft radial glow that tracks the mouse across the entire viewport.
 * Implemented with a single fixed <div> whose background-position is
 * updated directly on the DOM element (no React state) to keep it off
 * the React render cycle entirely.
 *
 * The glow is intentionally subtle — it blends with the existing dark
 * AINA background without overpowering any content.
 */
export function CursorSpotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let tx = -9999;
    let ty = -9999;
    let cx = -9999;
    let cy = -9999;

    // Lerp factor — lower = more lag / softer follow
    const LERP = 0.09;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    const tick = () => {
      cx += (tx - cx) * LERP;
      cy += (ty - cy) * LERP;
      el.style.setProperty("--sx", `${cx}px`);
      el.style.setProperty("--sy", `${cy}px`);
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden"
      style={
        {
          "--sx": "-9999px",
          "--sy": "-9999px",
          background:
            "radial-gradient(520px circle at var(--sx) var(--sy), rgba(0,255,133,0.055) 0%, rgba(0,180,216,0.025) 35%, transparent 70%)",
        } as React.CSSProperties
      }
    />
  );
}
