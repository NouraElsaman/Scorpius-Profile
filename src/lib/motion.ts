/**
 * SCORPIUS Motion System
 *
 * Centralized spring presets and animation variants.
 * All interactive components must import from here — no duplicated transitions.
 *
 * Performance contract:
 *   - Animate only: transform, opacity
 *   - No layout properties (width, height, margin, padding, top, left)
 *   - All springs are GPU composited
 *   - Accessibility: MotionConfig reducedMotion="user" in the root component
 *     disables all motion for users who prefer reduced motion.
 */

import type { Transition, Variants } from "framer-motion";

/* ─── Spring presets ─────────────────────────────────────────────────── */

/** Slow, organic — for large/ambient elements */
export const springGentle: Transition = {
  type: "spring",
  stiffness: 120,
  damping: 20,
  mass: 1,
};

/** Balanced — for modals, panels, content reveals */
export const springStandard: Transition = {
  type: "spring",
  stiffness: 240,
  damping: 28,
  mass: 1,
};

/** Fast, responsive — for hover lifts, button feedback */
export const springSnappy: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 32,
  mass: 0.8,
};

/* ─── Page / section variants ────────────────────────────────────────── */

export const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: springStandard },
};

export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.35, ease: "easeOut" } },
};

export const scaleIn: Variants = {
  hidden:  { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: springStandard },
};

export const staggerContainer: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

export const staggerItem: Variants = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: springStandard },
};

export const heroReveal: Variants = {
  hidden:  { opacity: 0, scale: 0.95, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { ...springGentle, delay: 0.15 },
  },
};

/* ─── Modal variants ─────────────────────────────────────────────────── */

export const backdropVariants: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.22, ease: "easeOut" } },
  exit:    { opacity: 0, transition: { duration: 0.2,  ease: "easeIn"  } },
};

export const modalPanelVariants: Variants = {
  hidden:  { opacity: 0, scale: 0.97, y: 10 },
  visible: { opacity: 1, scale: 1,    y: 0,  transition: springStandard },
  exit:    { opacity: 0, scale: 0.97, y: 10, transition: { duration: 0.18, ease: "easeIn" } },
};

/* ─── Card hover variants ────────────────────────────────────────────── */

/**
 * Service card — lift 4 px, icon lifts + scales.
 * Applied via initial="rest" whileHover="hover" on the outer motion.div.
 * The icon motion.div uses iconVariants to respond to the parent state.
 */
export const serviceCardVariants: Variants = {
  rest:  { y: 0,  transition: springSnappy },
  hover: { y: -4, transition: springSnappy },
};

export const serviceIconVariants: Variants = {
  rest:  { y: 0,  scale: 1,    transition: springSnappy },
  hover: { y: -2, scale: 1.1,  transition: springSnappy },
};

/**
 * Project card — lift 3 px; children respond via shared variant names.
 */
export const projectCardVariants: Variants = {
  rest:  { y: 0,  transition: springSnappy },
  hover: { y: -3, transition: springSnappy },
};

export const projectArrowVariants: Variants = {
  rest:  { x: 0, y: 0,  transition: springSnappy },
  hover: { x: 3, y: -3, transition: springSnappy },
};

export const techPillVariants: Variants = {
  rest:  { y: 0,  transition: springSnappy },
  hover: { y: -1, transition: springSnappy },
};

/* ─── Button interaction presets ─────────────────────────────────────── */

/** Pass to whileHover on motion.a / motion.button */
export const buttonHover = { scale: 1.02, y: -2 } as const;

/** Pass to whileTap on motion.a / motion.button */
export const buttonTap = { scale: 0.97, y: 0 } as const;

/* ─── Gallery image transition ───────────────────────────────────────── */

export const galleryImageVariants: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
  exit:    { opacity: 0, transition: { duration: 0.18, ease: "easeIn" } },
};
