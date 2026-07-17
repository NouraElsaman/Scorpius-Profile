import { useEffect, useRef, type RefObject } from "react";

/**
 * Adds `.is-visible` when the element enters the viewport (once).
 * Pair with the `.reveal` CSS utility for smooth scroll-in animations.
 */
export function useReveal<T extends HTMLElement = HTMLElement>(
  options?: IntersectionObserverInit,
): RefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-visible");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.14, rootMargin: "0px 0px -60px 0px", ...options },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [options]);

  return ref;
}