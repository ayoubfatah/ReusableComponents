"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import useMousePosition from "./useMousePosition";
import "./magneticCursor.css"; // We'll create this next

export default function Page() {
  const ref = useRef<HTMLButtonElement>(null); // Ref for the magnetic element
  const { x: mouseX, y: mouseY } = useMousePosition();

  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const { left, top, width, height } = element.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    // Calculate distance between mouse and element center
    const distanceX = mouseX - centerX;
    const distanceY = mouseY - centerY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    const threshold = 100;

    if (distance < threshold) {
      // Move towards the mouse (e.g., 20% of the distance)
      setPosition({ x: distanceX * 0.2, y: distanceY * 0.2 });
    } else {
      setPosition({ x: 0, y: 0 });
    }
  }, [mouseX, mouseY]);

  const { x, y } = position;

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-gray-100 flex items-center justify-center">
      {/* Magnetic Element */}
      <motion.button
        ref={ref}
        className="magnetic-button"
        animate={{ x, y }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.1,
        }}
      >
        Magnetic Button
      </motion.button>

      {/* Optional: Custom Cursor (can be a simple dot) */}
      <motion.div
        className="custom-cursor"
        style={{ left: mouseX, top: mouseY }}
        animate={{ scale: 1 }} // Can add hover effects here later
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />

      <div className="absolute bottom-5 text-center text-gray-600">
        Move your mouse near the button.
      </div>
    </div>
  );
}
