import { useCallback, useEffect, useRef, type RefObject } from "react";

/**
 * useCursorLight
 *
 * Tracks pointer position relative to a card element and writes
 * --cx / --cy CSS custom properties (0–100) onto the element.
 * The `.cursor-light::before` overlay in styles.css reads these
 * to paint a soft teal radial highlight capped at ~9% opacity.
 *
 * Scoped to: project cards, service cards, primary CTA buttons only.
 *
 * Constraints:
 * - Disabled on touch/non-hover devices
 * - Disabled when prefers-reduced-motion is set
 * - Throttled to requestAnimationFrame (max 60fps)
 * - No layout reads during animation — only on pointermove
 * - Zero extra DOM nodes (CSS ::before handles the overlay)
 */
export function useCursorLight<T extends HTMLElement = HTMLElement>(): RefObject<T | null> {
  const ref = useRef<T | null>(null);
  const rafId = useRef<number>(0);

  const handleMove = useCallback((e: PointerEvent) => {
    const el = ref.current;
    if (!el) return;

    cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      const cx = ((e.clientX - rect.left) / rect.width) * 100;
      const cy = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty("--cx", `${cx.toFixed(1)}`);
      el.style.setProperty("--cy", `${cy.toFixed(1)}`);
    });
  }, []);

  const handleLeave = useCallback(() => {
    cancelAnimationFrame(rafId.current);
    const el = ref.current;
    if (!el) return;
    // Reset to center so re-hover doesn't flash from edge
    el.style.setProperty("--cx", "50");
    el.style.setProperty("--cy", "50");
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Skip on touch/non-hover devices
    if (window.matchMedia?.("(hover: none)").matches) return;

    // Skip if user prefers reduced motion
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    el.addEventListener("pointermove", handleMove, { passive: true });
    el.addEventListener("pointerleave", handleLeave, { passive: true });

    return () => {
      cancelAnimationFrame(rafId.current);
      el.removeEventListener("pointermove", handleMove);
      el.removeEventListener("pointerleave", handleLeave);
    };
  }, [handleMove, handleLeave]);

  return ref;
}
