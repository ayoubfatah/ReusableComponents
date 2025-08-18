"use client";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

type Props = {
  char: string;
  mouseX: number;
  mouseY: number;
  threshold?: number;
};

export default function MagneticChar({
  char,
  mouseX,
  mouseY,
  threshold = 300,
}: Props) {
  const ref = useRef<null | HTMLSpanElement>(null);

  const weightValue = useMotionValue(300);
  const colorValue = useMotionValue("rgb(255, 255, 255)");

  const smoothWeight = useSpring(weightValue, {
    stiffness: 80,
    damping: 6,
    mass: 0.9,
    bounce: 0,
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const { left, top, width, height } = el.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const dx = mouseX - centerX;
    const dy = mouseY - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    const weight = distance < threshold ? 600 : 300;
    weightValue.set(weight);
    const color =
      distance < threshold ? "rgb(164, 245, 204)" : "rgb(255, 255, 255)";
    colorValue.set(color);
  }, [mouseX, mouseY, weightValue, threshold, colorValue]);

  return (
    <motion.span
      ref={ref}
      style={{
        fontWeight: smoothWeight,
        color: colorValue,
        display: "inline-block",
      }}
      transition={{ ease: "easeInOut", duration: 0.3 }}
    >
      {char}
    </motion.span>
  );
}
