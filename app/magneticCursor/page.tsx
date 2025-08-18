"use client";
// import React, { useState, useRef, useEffect } from "react";
// import { motion } from "framer-motion";
// import useMousePosition from "./useMousePosition";
// import "./magneticCursor.css"; // We'll create this next

import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import "./magneticCursor.css"; // We'll create this next
import useMousePosition from "./useMousePosition";

export default function Page() {
  return (
    <>
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <filter id="gooey">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="
                1 0 0 0 0  
                0 1 0 0 0  
                0 0 1 0 0  
                0 0 0 28 -9"
              result="gooey"
            />
          </filter>
        </defs>
      </svg>
      <div className="relative h-screen w-screen   bg-gray-100 grid grid-cols-2 gap-[30px] items-center justify-center">
        {/* Magnetic Zone */}
        <div className="w-full flex justify-center items-center h-full">
          <NoMath />
        </div>
        <div className="w-full flex justify-center items-center border  h-full">
          <WithMath />
        </div>
      </div>
      <div className="w-full flex justify-center items-center border  bg-gray-100  h-full">
        <GooeyButton />
      </div>
    </>
  );
}

function NoMath() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  function handleMouseMove(e: React.MouseEvent) {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const rect = wrapper.getBoundingClientRect();

    // Mouse position relative to center of wrapper
    const offsetX = e.clientX - (rect.left + rect.width / 2);
    const offsetY = e.clientY - (rect.top + rect.height / 2);

    // Make movement smaller by multiplying (like a "strength" factor)
    setPosition({ x: offsetX * 0.2, y: offsetY * 0.2 });
  }

  function handleMouseLeave() {
    setPosition({ x: 0, y: 0 }); // Reset when mouse leaves
  }
  return (
    <>
      <div
        ref={wrapperRef}
        className="relative p-50  flex justify-center items-center    border   border-gray-300 rounded-lg"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Magnetic Button */}
        <motion.button
          className="magnetic-button  rounded-full size-[50px] flex justify-center items-center"
          animate={position}
          transition={{
            type: "spring",
            stiffness: 50,
            damping: 12,
            mass: 0.1,
          }}
        >
          M
        </motion.button>
      </div>

      <div className="absolute bottom-5 text-center text-gray-600">
        Using a Parent Element
      </div>
    </>
  );
}

export function WithMath() {
  const ref = useRef<HTMLButtonElement>(null); // Ref for the magnetic element
  const { x: mouseX, y: mouseY } = useMousePosition();

  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const { left, top, width, height } = element.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const distanceX = mouseX - centerX;
    const distanceY = mouseY - centerY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    const threshold = 250;

    if (distance < threshold) {
      setPosition({ x: distanceX * 0.3, y: distanceY * 0.3 });
    } else {
      setPosition({ x: 0, y: 0 });
    }
  }, [mouseX, mouseY]);

  const { x, y } = position;

  return (
    <>
      <motion.button
        ref={ref}
        className="magnetic-button  rounded-full size-[50px] flex justify-center items-center"
        animate={{ x, y }}
        transition={{
          type: "spring",
          stiffness: 50,
          damping: 12,
          mass: 0.1,
        }}
      >
        M
      </motion.button>

      <motion.div
        className="custom-cursor"
        style={{ left: mouseX, top: mouseY }}
        animate={{ scale: 1 }} // Can add hover effects here later
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />

      <div className="absolute bottom-5 text-center text-gray-600">
        Using pythagoras theorem
      </div>
    </>
  );
}

export function GooeyButton() {
  const ref = useRef<HTMLButtonElement>(null);
  const { x: mouseX, y: mouseY } = useMousePosition();
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const { left, top, width, height } = element.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const distanceX = mouseX - centerX;
    const distanceY = mouseY - centerY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    const threshold = 290;

    if (distance < threshold) {
      setPosition({ x: distanceX * 0.5, y: distanceY * 0.5 });
    } else {
      setPosition({ x: 0, y: 0 });
    }
  }, [mouseX, mouseY]);

  return (
    <div className="w-full flex justify-center items-center  h-full">
      {/* 👇 Apply the global gooey filter here */}
      <div
        className="relative flex items-center "
        style={{ filter: "url(#gooey)", WebkitFilter: "url(#gooey)" }}
      >
        {/* Static button */}
        <button className="size-[60px] rounded-full bg-black text-white font-bold"></button>

        {/* Magnetic animated button */}
        <motion.button
          ref={ref}
          animate={position}
          transition={{
            type: "spring",
            stiffness: 50,
            damping: 12,
            mass: 0.1,
          }}
          className="size-[50px] rounded-full clipPath  bg-black text-white font-bold absolute top-0 left-0"
        ></motion.button>
      </div>
    </div>
  );
}
