import { useState, useEffect } from 'react';
import { useInView } from 'framer-motion';

export function useInViewSequence(ref, count, { delayMs = 600, margin = "-100px" } = {}) {
  const isInView = useInView(ref, { once: true, margin });
  const [activeSteps, setActiveSteps] = useState(Array(count).fill(false));

  useEffect(() => {
    if (!isInView) return;
    const timers = [];
    for (let i = 0; i < count; i++) {
      timers.push(
        setTimeout(() => {
          setActiveSteps(prev => {
            const next = [...prev];
            next[i] = true;
            return next;
          });
        }, i * delayMs)
      );
    }
    return () => timers.forEach(clearTimeout);
  }, [isInView, count, delayMs]);

  return activeSteps;
}
