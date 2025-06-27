import { useRef, useEffect, useState } from "react";

export default function useScrollFadeIn() {
  const ref = useRef();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(node);

    return () => observer.unobserve(node);
  }, []);

  return [ref, isVisible];
} 