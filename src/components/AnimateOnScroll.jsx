import { useEffect, useRef, useState } from "react";
import { cn } from "@/utils";

/**
 * Wrapper qui anime les enfants au scroll (fade-in + slide-up) quand la section entre dans le viewport.
 * @param {React.ReactNode} children
 * @param {string} [className] - Classes additionnelles
 * @param {number} [delay=0] - Délai en ms avant de lancer l'animation
 * @param {number} [threshold=0.1] - Seuil de visibilité (0-1) pour déclencher l'animation
 * @param {"up"|"left"|"right"|"fade"} [direction="up"] - Direction de l'entrée
 */
export default function AnimateOnScroll({
  children,
  className,
  delay = 0,
  threshold = 0.1,
  direction = "up",
}) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  const directionClasses = {
    up: "translate-y-8",
    left: "translate-x-8",
    right: "-translate-x-8",
    fade: "translate-y-0",
  };

  const directionClassesInView = {
    up: "translate-y-0",
    left: "translate-x-0",
    right: "translate-x-0",
    fade: "translate-y-0",
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let delayTimer;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            delayTimer = setTimeout(() => setIsInView(true), delay);
          }
        });
      },
      { threshold, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (delayTimer) clearTimeout(delayTimer);
    };
  }, [threshold, delay]);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out",
        isInView
          ? `opacity-100 ${directionClassesInView[direction]}`
          : `opacity-0 ${directionClasses[direction]}`,
        className
      )}
      style={delay ? { transitionDelay: isInView ? `${delay}ms` : "0ms" } : undefined}
    >
      {children}
    </div>
  );
}
