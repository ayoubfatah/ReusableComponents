"use client";
import React from "react";
import { motion, useTime, useTransform } from "framer-motion";

export default function SineWaveDots() {
  const distance = 100; // Max movement in px
  const time = useTime(); // MotionValue that updates every frame
  const dotCount = 10;

  // Create an array of phase shifts so dots are spaced out
  const phaseShifts = Array.from(
    { length: dotCount },
    (_, i) => (i / dotCount) * Math.PI * 2
  );

  return (
    <div className="h-screen flex items-center justify-center gap-4 bg-gray-100">
      {phaseShifts.map((phase, index) => {
        // Each dot gets a sine wave with a different phase
        const y = useTransform(
          time,
          (t) => Math.sin(t / 1000 + phase) * distance
        );

        return (
          <motion.div
            key={index}
            style={{
              width: 50,
              height: 50,
              borderRadius: "50%",
              background: `hsl(${(index / dotCount) * 360}, 70%, 60%)`, // colorful dots
              y,
            }}
          />
        );
      })}
    </div>
  );
}
