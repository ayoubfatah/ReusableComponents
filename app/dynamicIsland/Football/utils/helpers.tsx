import { useEffect, useRef, useState } from "react";

export function useCountUpScore(score: number) {
  const previousScoreRef = useRef(score);
  const [displayScore, setDisplayScore] = useState(score);

  useEffect(() => {
    const previousScore = previousScoreRef.current;

    if (previousScore === score) return;

    const direction = score > previousScore ? 1 : -1;
    let currentScore = previousScore;

    const intervalId = window.setInterval(() => {
      currentScore += direction;
      setDisplayScore(currentScore);

      if (currentScore === score) {
        previousScoreRef.current = score;
        window.clearInterval(intervalId);
      }
    }, 180);

    return () => window.clearInterval(intervalId);
  }, [score]);

  return displayScore;
}
