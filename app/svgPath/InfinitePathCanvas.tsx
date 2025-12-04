"use client";

import React, { useRef, useState, useLayoutEffect } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useSpring,
} from "framer-motion";

interface Props {
  config: any;
}

/**
 * InfinitePathCanvas
 *
 * Renders text moving infinitely along a curved SVG path.
 *
 * Improvements:
 * 1. Seamless Loop: Uses `getComputedTextLength` to measure exactly one repetition of the text.
 *    The animation resets position by exactly this length, creating a mathematically perfect loop without visual jumps.
 * 2. Visuals: Added strong CSS text-shadow for a neon glow effect.
 */
const InfinitePathCanvas: React.FC<Props> = ({ config }) => {
  const { text, fontSize, speed, isPlaying, opacity } = config;

  // Refs to access actual DOM elements for measurement
  const textRef = useRef<SVGTextElement>(null);

  // Motion value for the startOffset (in pixels)
  const currentOffset = useMotionValue(0);

  // State to store the length of one text segment (text + separator) in pixels
  const [segmentLength, setSegmentLength] = useState(0);

  // We smooth the opacity changes
  const smoothOpacity = useSpring(opacity, { stiffness: 100, damping: 20 });

  // The path definition
  const pathDefinition =
    "M0 230.579H271.5C271.5 230.579 719.5 5.57867 387.5 0.57867C55.5 -4.42133 506 230.579 506 230.579H799.5";

  // Construct the repeated text string.
  // We need enough copies to fill the path and allow scrolling.
  // 15 repetitions is usually safe for this path length and font size.
  const separator = " • ";
  const singleRepetition = text + separator;
  const repeatCount = 15;
  const repeatedText = new Array(repeatCount).fill(singleRepetition).join("");

  // Measurement Effect: Calculates the exact pixel width of one repetition
  useLayoutEffect(() => {
    if (textRef.current) {
      // Measure the total length of the repeated text string
      const totalLength = textRef.current.getComputedTextLength();

      if (totalLength > 0) {
        // The length of one segment is total / count
        const singleSegmentLen = totalLength / repeatCount;
        setSegmentLength(singleSegmentLen);
      }
    }
  }, [text, fontSize, repeatCount]); // Re-measure if text or font changes

  // Animation Loop
  useAnimationFrame((time, delta) => {
    if (!isPlaying || segmentLength === 0) return;

    // Move speed calculation (pixels per frame adjusted by delta)
    const moveBy = (speed * delta) / 10;

    // Get current offset
    const current = currentOffset.get();

    // Calculate next position (moving left)
    let next = current - moveBy;

    // Seamless Loop Logic:
    // If we have moved left by more than one segment length...
    if (next <= -segmentLength) {
      // ...snap back by exactly one segment length.
      // Because the text is repetitive, -segmentLength looks identical to 0 visually.
      // We use modulus or addition to keep the "remainder" movement for smoothness.
      next += segmentLength;
    }

    currentOffset.set(next);
  });

  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden relative">
      <svg
        className="w-full h-full max-w-5xl max-h-[600px]"
        viewBox="0 0 800 400"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Gradient for the text fill */}
          <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ec4899" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>

        {/* The Path Line (faintly visible) */}
        <motion.path
          d={pathDefinition}
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="2"
          strokeDasharray="5, 5"
        />

        {/* Invisible Path for text to follow */}
        <path id="pathCurve" d={pathDefinition} fill="none" />

        {/* 
          The Animated Text 
          We use a standard motion.text here but attach the ref to it
          to measure the contained text length.
        */}
        <motion.text
          ref={textRef}
          dy={fontSize / 3}
          style={{
            fontSize,
            opacity: smoothOpacity,
            fill: "url(#textGradient)",
            // Enhanced Glow Effect
            textShadow:
              "0 0 10px rgba(236, 72, 153, 0.6), 0 0 20px rgba(139, 92, 246, 0.4), 0 0 30px rgba(236, 72, 153, 0.2)",
          }}
          className="font-bold tracking-widest uppercase"
        >
          {/* 
            textPath with dynamic startOffset.
            We use the calculated pixel offset directly.
          */}
          <motion.textPath
            href="#pathCurve"
            startOffset={currentOffset}
            spacing="auto"
          >
            {repeatedText}
          </motion.textPath>
        </motion.text>
      </svg>

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
    </div>
  );
};

export default InfinitePathCanvas;
