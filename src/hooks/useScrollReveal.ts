import { useEffect, useRef } from "react";

/**
 * Adds a fade-in + slide-up animation when the element enters the viewport.
 * Uses IntersectionObserver for performance.
 * Cleans up inline styles after animation so Tailwind hover classes work.
 */
export function useScrollReveal<T extends HTMLElement>(
  options: { threshold?: number; delay?: number } = {},
) {
  const ref = useRef<T>(null);
  const { threshold = 0.15, delay = 0 } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Set initial hidden state
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
    el.style.transition = `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`;

    const reveal = () => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";

      // Clean up inline styles after animation so Tailwind hover classes work
      const cleanup = () => {
        el.style.removeProperty("opacity");
        el.style.removeProperty("transform");
        el.style.removeProperty("transition");
        el.removeEventListener("transitionend", cleanup);
      };
      el.addEventListener("transitionend", cleanup, { once: true });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Small RAF delay ensures styles are painted before animating
          requestAnimationFrame(() => {
            requestAnimationFrame(reveal);
          });
          observer.unobserve(el);
        }
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, delay]);

  return ref;
}
