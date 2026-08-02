import type { Transition, Variants } from "framer-motion";

/**
 * Shared motion language for LifeReplay AI.
 *
 * Principles:
 * - Subtle, not decorative. Motion should feel like the UI settling into
 *   place, never like it's performing.
 * - Consistent easing (`easeOut`) so everything feels like one system.
 * - Short durations for direct-manipulation feedback (buttons, hovers),
 *   slightly longer for content entering the viewport.
 */

export const easeOut: Transition["ease"] = [0.16, 1, 0.3, 1];
export const easeInOut: Transition["ease"] = [0.65, 0, 0.35, 1];

export const duration = {
  fast: 0.12,
  base: 0.2,
  slow: 0.36,
} as const;

/** Simple opacity fade — for content that just needs to appear gracefully. */
export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: duration.base, ease: easeOut } },
  exit: { opacity: 0, transition: { duration: duration.fast, ease: easeInOut } },
};

/** Fade + rise — the default for cards, panels, and page sections. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: easeOut },
  },
  exit: { opacity: 0, y: 8, transition: { duration: duration.fast, ease: easeInOut } },
};

/** Fade + horizontal slide — for items entering from a rail or drawer. */
export const slideIn: Variants = {
  hidden: { opacity: 0, x: -8 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: duration.base, ease: easeOut },
  },
  exit: { opacity: 0, x: -8, transition: { duration: duration.fast, ease: easeInOut } },
};

/** Gentle scale-in — for dialogs, popovers, and dropdown content. */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: duration.base, ease: easeOut },
  },
  exit: { opacity: 0, scale: 0.98, transition: { duration: duration.fast, ease: easeInOut } },
};

/** Stagger wrapper — apply to a parent, pair children with `fadeUp` or `slideIn`. */
export const staggerContainer = (staggerChildren = 0.05, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren, delayChildren },
  },
});

/** Page-level transition for route/view changes. */
export const pageTransition: Variants = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: easeOut },
  },
  exit: { opacity: 0, y: -6, transition: { duration: duration.base, ease: easeInOut } },
};

/** Hover/tap presets for direct-manipulation elements (cards, buttons). */
export const hoverLift = {
  whileHover: { y: -2, transition: { duration: duration.fast, ease: easeOut } },
  whileTap: { y: 0, scale: 0.99, transition: { duration: duration.fast, ease: easeOut } },
};

export const pressable = {
  whileTap: { scale: 0.97, transition: { duration: duration.fast, ease: easeOut } },
};
