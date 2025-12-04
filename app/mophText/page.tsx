"use client";
import React, { useState, useEffect, useRef } from "react";

export default function GooeyTextMorph() {
  const texts = ["This", "is", "so", "fun", "to", "build"];

  const morphTime = 0.8;
  const cooldownTime = 0.1;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);

  const text1Ref = useRef<HTMLSpanElement | null>(null);
  const text2Ref = useRef<HTMLSpanElement | null>(null);

  const morphRef = useRef(0);
  const cooldownRef = useRef(0);
  const timeRef = useRef(Date.now());
  const animationFrameRef = useRef<number | null>(null);

  const setMorph = (fraction: number) => {
    if (!text1Ref.current || !text2Ref.current) return;

    text2Ref.current.style.filter = `blur(${Math.min(
      8 / fraction - 8,
      100
    )}px)`;
    text2Ref.current.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    const inverseFraction = 1 - fraction;
    text1Ref.current.style.filter = `blur(${Math.min(
      8 / inverseFraction - 8,
      100
    )}px)`;
    text1Ref.current.style.opacity = `${Math.pow(inverseFraction, 0.4) * 100}%`;
  };

  const doCooldown = () => {
    morphRef.current = 0;

    if (text2Ref.current) {
      text2Ref.current.style.filter = "";
      text2Ref.current.style.opacity = "100%";
    }

    if (text1Ref.current) {
      text1Ref.current.style.filter = "";
      text1Ref.current.style.opacity = "0%";
    }
  };

  useEffect(() => {
    const doMorph = () => {
      morphRef.current -= cooldownRef.current;
      cooldownRef.current = 0;

      let fraction = morphRef.current / morphTime;

      if (fraction > 1) {
        cooldownRef.current = cooldownTime;
        fraction = 1;
      }

      setMorph(fraction);
    };
    if (!isAnimating) return;

    const animate = () => {
      const newTime = Date.now();
      const shouldStop = cooldownRef.current > 0;
      const dt = (newTime - timeRef.current) / 1000;
      timeRef.current = newTime;

      cooldownRef.current -= dt;

      if (cooldownRef.current <= 0) {
        if (shouldStop) {
          // Animation complete - update current index
          setCurrentIndex(nextIndex);
          setIsAnimating(false);
          doCooldown();
          return;
        }
        doMorph();
      } else {
        doCooldown();
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isAnimating, nextIndex]);

  useEffect(() => {
    function handleClick() {
      if (isAnimating) return;

      const next = (currentIndex + 1) % texts.length;
      setNextIndex(next);
      setIsAnimating(true);
      morphRef.current = 0;
      cooldownRef.current = 0;
      timeRef.current = Date.now();
    }
    handleClick();
  }, [currentIndex, texts.length, isAnimating]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@900&display=swap');
      `}</style>

      {/* SVG Filter */}
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="threshold">
            <feGaussianBlur in="SourceAlpha" stdDeviation="8" result="blur" />
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

      <div className="fixed inset-0  bg-black flex flex-col items-center justify-center gap-12">
        <div
          className="relative w-full h-32"
          style={{ filter: "url(#threshold) blur(0.1px)" }}
        >
          <span
            ref={text1Ref}
            className="absolute w-full inline-block text-center text-8xl font-black text-white select-none"
            style={{
              opacity: "100%",
            }}
          >
            {texts[currentIndex]}
          </span>
          <span
            ref={text2Ref}
            className="absolute w-full inline-block text-center text-8xl font-black text-white select-none"
            style={{
              opacity: "0%",
            }}
          >
            {texts[nextIndex]}
          </span>
        </div>

        {/* <button
          onClick={handleClick}
          disabled={isAnimating}
          className="px-8 py-4 mt-20 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 disabled:cursor-not-allowed text-white font-bold text-lg rounded-full transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-purple-500/50"
        >
          {isAnimating ? "Morphing..." : "Morph Text"}
        </button> */}
      </div>
    </>
  );
}
