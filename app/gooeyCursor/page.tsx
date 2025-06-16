"use client";
import React from "react";
import { motion } from "framer-motion";
import useMousePosition from "./useMousePosition";
import "./gooeyCursor.css"; // We'll create this next

export default function Page() {
  const { x, y } = useMousePosition();

  // Define the SVG filter inline for clarity
  const svgFilter = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      className="svg-filter-def"
    >
      <defs>
        <filter id="gooey-filter">
          {/* Blur the shapes */}

          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          {/* Adjust color values and alpha to create the gooey effect */}
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 30 -9"
            result="gooey"
          />
          {/* Optional: Put original graphic back on top */}
        </filter>
      </defs>
    </svg>
  );

  return (
    <div className="gooey-container">
      {/* Define the SVG filter (it won't be visible) */}
      {svgFilter}

      {/* Gooey Cursor */}
      <motion.div
        className="gooey-cursor"
        animate={{ x: x - 25, y: y - 25 }} // Offset to center 50px cursor
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />

      {/* Example Target Element */}
      <motion.div
        className="gooey-target"
        // Optional: Add hover animation or make it draggable
      />

      {/* Example Content (optional, behind the effect) */}
      <div className="content-info">Move the cursor near the circle.</div>
    </div>
  );
}
