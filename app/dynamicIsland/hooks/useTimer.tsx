import { useMotionTemplate, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function useTimer(TOTAL: number) {
  const progress = useMotionValue(100);

  const startRef = useRef(Date.now());
  const pausedElapsedRef = useRef(0);

  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let raf: number;

    const update = () => {
      if (!isPaused) {
        const elapsed =
          (Date.now() - startRef.current) / 1000 + pausedElapsedRef.current;

        const remaining = Math.max(TOTAL - elapsed, 0);

        const percent = (remaining / TOTAL) * 100;

        progress.set(percent);

        if (remaining <= 0) {
          startRef.current = Date.now();
          pausedElapsedRef.current = 0;
        }
      }

      raf = requestAnimationFrame(update);
    };

    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [isPaused, progress, TOTAL]);

  useEffect(() => {
    if (isPaused) {
      pausedElapsedRef.current += (Date.now() - startRef.current) / 1000;
    } else {
      startRef.current = Date.now();
    }
  }, [isPaused]);

  const secondsLeft = useTransform(progress, (p: number) =>
    Math.ceil((p / 100) * TOTAL),
  );

  const gradient = useMotionTemplate`
      conic-gradient(
        #F7A815 0% ${progress}%,
        rgb(42, 42, 42) ${progress}% 100%
      )
    `;

  return {
    isPaused,
    setIsPaused,
    progress,
    secondsLeft,
    gradient,
  };
}
