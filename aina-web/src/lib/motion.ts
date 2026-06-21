/**
 * Shared Framer Motion variants used across all AINA pages.
 */

export const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export const slideLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export const slideRight = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerChildren = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Viewport config to trigger animations once when element enters view */
export const viewportOnce = { once: true, margin: "-80px" };

// ─── Spring Physics Presets ───────────────────────────────────────────────────
// Inspired by iOS spring physics — feels physical, not interpolated.

/** Tight snap — small UI elements (icons, badges, pills) */
export const springTight = { type: "spring", stiffness: 500, damping: 30, mass: 0.6 } as const;

/** Gentle float — cards and panels lifting on hover */
export const springGentle = { type: "spring", stiffness: 300, damping: 25, mass: 0.8 } as const;

/** Bouncy — CTA buttons and interactive highlights */
export const springBouncy = { type: "spring", stiffness: 400, damping: 18, mass: 0.7 } as const;

/** Slow drift — large decorative elements */
export const springSlow = { type: "spring", stiffness: 120, damping: 20, mass: 1.2 } as const;

// ─── Spring Variants ──────────────────────────────────────────────────────────

/** Spring fade-up — more alive than the easing version */
export const springFadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 25, mass: 0.8 },
  },
};

/** Spring scale-in — for cards, modals, overlays appearing */
export const springScaleIn = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 400, damping: 18, mass: 0.7 },
  },
};

/** Spring slide from left */
export const springSlideLeft = {
  hidden: { opacity: 0, x: -36 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 300, damping: 25, mass: 0.8 },
  },
};

/** Spring slide from right */
export const springSlideRight = {
  hidden: { opacity: 0, x: 36 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 300, damping: 25, mass: 0.8 },
  },
};

/** Stagger container for spring children */
export const springStaggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.08,
    },
  },
};
