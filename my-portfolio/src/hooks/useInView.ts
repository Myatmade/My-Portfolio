import { useEffect, useMemo, useRef, useState } from "react";
import { useAnimation } from "../context/AnimationContext";

export function useInView(options: IntersectionObserverInit = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const { animationsEnabled } = useAnimation();
  const [isVisible, setIsVisible] = useState(!animationsEnabled);
  const observerOptions = useMemo(
    () => ({ threshold: 0.15, rootMargin: "0px 0px -5% 0px", ...options }),
    [options],
  );

  useEffect(() => {
    if (!animationsEnabled) {
      setIsVisible(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, observerOptions);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [animationsEnabled, observerOptions]);

  return { ref, isVisible };
}
