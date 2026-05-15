"use client";
import { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";

const WORDS = [
  "Refactor",
  "Compile",
  "Deploy",
  "Debug",
  "Commit",
  "Merge",
  "Optimize",
];
const MORPH_DURATION_SECONDS = 0.8;
const HOLD_DURATION_SECONDS = 0.5;
function applyMorphProgress(
  wordA: HTMLSpanElement,
  wordB: HTMLSpanElement,
  progress: number,
) {
  const progressInverse = 1 - progress;
  wordB.style.filter = `blur(${Math.min(8 / progress - 8, 100)}px)`;
  wordB.style.opacity = String(Math.pow(progress, 0.4));
  wordA.style.filter =
    progressInverse > 0
      ? `blur(${Math.min(8 / progressInverse - 8, 100)}px)`
      : "none";
  wordA.style.opacity = String(Math.pow(progressInverse, 0.4));
}
function snapToWordB(wordA: HTMLSpanElement, wordB: HTMLSpanElement) {
  wordA.style.filter = "none";
  wordA.style.opacity = "0";
  wordB.style.filter = "none";
  wordB.style.opacity = "1";
}

export default function GooeyTextMorph() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [nextWordIndex, setNextWordIndex] = useState(1);

  const currentSpanRef = useRef<HTMLSpanElement>(null);
  const nextSpanRef = useRef<HTMLSpanElement>(null);
  const morphProgressSeconds = useRef(0);
  const holdTimeRemainingSeconds = useRef(0);
  const lastFrameTimestamp = useRef(0);
  const animationFrameId = useRef<number | null>(null);
  const isAnimating = useRef(false);

  useEffect(() => {
    if (isAnimating.current) return;

    const nextIndex = (currentWordIndex + 1) % WORDS.length;
    setNextWordIndex(nextIndex);
    isAnimating.current = true;
    morphProgressSeconds.current = 0;
    holdTimeRemainingSeconds.current = 0;
    lastFrameTimestamp.current = Date.now();

    function onAnimationFrame() {
      const currentSpan = currentSpanRef.current;
      const nextSpan = nextSpanRef.current;
      if (!currentSpan || !nextSpan) return;

      const now = Date.now();
      const secondsElapsed = (now - lastFrameTimestamp.current) / 1000;
      lastFrameTimestamp.current = now;

      const isInHoldPhase = holdTimeRemainingSeconds.current > 0;

      if (isInHoldPhase) {
        holdTimeRemainingSeconds.current -= secondsElapsed;
        if (holdTimeRemainingSeconds.current <= 0) {
          snapToWordB(currentSpan, nextSpan);
          setCurrentWordIndex(nextIndex);
          isAnimating.current = false;
          return;
        }

        snapToWordB(currentSpan, nextSpan);
      } else {
        morphProgressSeconds.current += secondsElapsed;
        const morphFraction =
          morphProgressSeconds.current / MORPH_DURATION_SECONDS;

        if (morphFraction >= 1) {
          holdTimeRemainingSeconds.current = HOLD_DURATION_SECONDS;
          snapToWordB(currentSpan, nextSpan);
        } else {
          applyMorphProgress(currentSpan, nextSpan, morphFraction);
        }
      }

      animationFrameId.current = requestAnimationFrame(onAnimationFrame);
    }

    animationFrameId.current = requestAnimationFrame(onAnimationFrame);

    return () => {
      if (animationFrameId.current !== null) {
        cancelAnimationFrame(animationFrameId.current);
        isAnimating.current = false;
      }
    };
  }, [currentWordIndex]);

  return (
    <>
      <svg className={cn("absolute", "w-0", "h-0")}>
        <defs>
          <filter id="gooey-merge">
            <feGaussianBlur
              in="SourceAlpha"
              stdDeviation="8"
              result="blurredAlpha"
            />
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 255 -140"
            />
          </filter>
        </defs>
      </svg>

      <div
        className={cn(
          "fixed",
          "inset-0",
          "bg-black",
          "flex",
          "flex-col",
          "items-center",
          "justify-center",
        )}
      >
        <div
          className={cn("relative", "w-full", "h-32")}
          style={{ filter: "url(#gooey-merge) blur(0.1px)" }}
        >
          <span
            ref={currentSpanRef}
            className={cn(
              "absolute",
              "w-full",
              "inline-block",
              "text-center",
              "text-8xl",
              "font-black",
              "text-white",
              "select-none",
            )}
            style={{ opacity: "1" }}
          >
            {WORDS[currentWordIndex]}
          </span>
          <span
            ref={nextSpanRef}
            className={cn(
              "absolute",
              "w-full",
              "inline-block",
              "text-center",
              "text-8xl",
              "font-black",
              "text-white",
              "select-none",
            )}
            style={{ opacity: "0" }}
          >
            {WORDS[nextWordIndex]}
          </span>
        </div>
      </div>
    </>
  );
}
