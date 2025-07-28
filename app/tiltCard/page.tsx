"use client";
import React from "react";
import { useMotionValue, motion, useSpring, useTransform } from "framer-motion";

export default function page() {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-blue-600 ">
      <TiltCard />
    </div>
  );
}

function TiltCard() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg","-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg","10deg"]); 

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const { height, width, left, top } = (
      e.target as HTMLDivElement
    ).getBoundingClientRect();
    const mouseX = e.clientX - left;
    const mouseY = e.clientY - top;
    // prettier-ignore
    const xPct = (mouseX / width )- 0.5;
    // prettier-ignore
    const yPct = (mouseY / height )- 0.5;

    x.set(xPct);
    y.set(yPct);
    // const xPct = `${(mouseX / width) * 100}%`;
    // const yPct = `${(mouseY / height) * 100}%`;
  }
  function handelMouseLeave() {
    x.set(0);
    y.set(0);
  }
  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handelMouseLeave}
      style={{ transformStyle: "preserve-3d", rotateX, rotateY }}
      className="relative h-96 w-72 rounded-xl bg-gradient-to-br from-indigo-300 to-violet-300"
    >
      <div className="absolute inset-4 grid place-content-center rounded-xl bg-white shadow-lg font-bold text-2xl">
        Hover me
      </div>
    </motion.div>
  );
}
