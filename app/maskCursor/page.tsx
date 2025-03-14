"use client";
import React, { useState } from "react";
import "./gooey.css";
import useMousePosition from "./useMousePosition";
import { motion } from "framer-motion";

export default function Page() {
  const [isHovered, setIsHovered] = useState(false);
  const { x, y } = useMousePosition();
  const size = isHovered ? 400 : 40;
  return (
    <main className="h-screen !bg-black text-gray-50/90 cursor-none font-semibold ">
      <motion.div
        animate={{
          WebkitMaskSize: `${size}px`,
          WebkitMaskPosition: `${x - size / 2}px ${y - size / 2}px`,
        }}
        transition={{
          type: "tween",
          ease: "backOut",
        }}
        className="mask  w-full cursor-none  absolute h-full flex items-center justify-center text-[60px] leading-[66px]"
      >
        <p
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="w-[1200px] cursor-none"
        >
          The [French Revolution](w) began in 1789 and fundamentally altered the
          political and social landscape of France. The revolution was sparked
          by economic distress, social inequality, and political discontent with
          the [absolute monarchy](w) of King Louis XVI. Key events such as the
          [storming of the Bastille](w) became symbols of the people’s power and
          desire for change.
        </p>
      </motion.div>
      <div className="body  cursor-none w-full  h-full flex items-center justify-center text-[60px] leading-[66px]">
        <p className="w-[1200px] cursor-none">
          Despite the promise of liberty and equality, the revolution led to
          violence and instability. The [Reign of Terror](w), led by figures
          like [Maximilien Robespierre](w), marked a period of mass executions
          of perceived enemies of the revolution. The people’s thirst for
          justice turned into an authoritarian rule under the guise of
          revolutionary ideals, raising questions about the true nature of the
          revolution.
        </p>
      </div>
    </main>
  );
}
