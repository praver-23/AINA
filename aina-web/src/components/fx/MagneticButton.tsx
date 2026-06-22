"use client";

import { useRef, useCallback } from "react";

/**
 * useMagneticButton
 * ─────────────────
 * A React hook that adds a magnetic attraction effect to any element.
 * On hover, the element gently translates toward the cursor.
 * On leave, it snaps back with a spring-like feel via CSS transition.
 *
 * Usage:
 *   const magnetic = useMagneticButton();
 *   <button {...magnetic} id="my-btn">Click</button>
 *
 * Strength: 0.28 means the element travels 28% of the cursor delta —
 * enough to feel responsive without being distracting.
 */
export function useMagneticButton(strength = 0.28) {
  const ref = useRef<HTMLElement | null>(null);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * strength;
      const dy = (e.clientY - cy) * strength;
      el.style.transform = `translate(${dx}px, ${dy}px)`;
      el.style.transition = "transform 0.1s ease-out";
    },
    [strength]
  );

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0px, 0px)";
    el.style.transition = "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)";
  }, []);

  const setRef = useCallback((el: HTMLElement | null) => {
    ref.current = el;
  }, []);

  return {
    ref: setRef,
    onMouseMove,
    onMouseLeave,
  } as {
    ref: (el: HTMLElement | null) => void;
    onMouseMove: React.MouseEventHandler<HTMLElement>;
    onMouseLeave: React.MouseEventHandler<HTMLElement>;
  };
}

/**
 * MagneticWrapper
 * ───────────────
 * A drop-in wrapper that applies the magnetic effect to its children.
 * Wraps any existing button/link without altering its markup.
 *
 * Usage:
 *   <MagneticWrapper><button>Click me</button></MagneticWrapper>
 */
import { useRef as useRef2 } from "react";

export function MagneticWrapper({
  children,
  strength = 0.3,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef2<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * strength;
    const dy = (e.clientY - cy) * strength;
    el.style.transform = `translate(${dx}px, ${dy}px)`;
    el.style.transition = "transform 0.08s linear";
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0px, 0px)";
    el.style.transition = "transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{ display: "inline-flex" }}
    >
      {children}
    </div>
  );
}
