"use client";
import { motion } from "framer-motion";

export default function page() {
  return (
    <div className="flex flex-col gap-16 items-center justify-center h-screen bg-black text-white">
      <div className="flex items-center gap-3">
        <FlipLink>home</FlipLink>
        <FlipLink>about</FlipLink>
        <FlipLink>contact</FlipLink>
        <FlipLink>Sing up</FlipLink>
        <FlipLink>Test</FlipLink>
      </div>
    </div>
  );
}
function FlipLink({ children }: { children: string }) {
  const DELAY = 0.025;
  const DURATION = 0.25;

  return (
    <motion.div
      initial="initial"
      whileHover="hovered"
      className="relative block  text-4xl font-bold whitespace-nowrap uppercase cursor-pointer overflow-hidden"
      style={{ lineHeight: 0.9 }}
    >
      <span className="flex gap-[2px]">
        {children.split("").map((l, i) => (
          <span key={`top-${i}`} className="  ">
            <motion.span
              className="block"
              transition={{
                delay: i * DELAY,
                duration: DURATION,
                ease: "easeInOut",
              }}
              variants={{
                initial: { y: 0 },
                hovered: { y: "-100%" },
              }}
            >
              {l === " " ? "\u00A0" : l}
            </motion.span>
          </span>
        ))}
      </span>

      <span className="absolute inset-0 flex gap-[2px]">
        {children.split("").map((l, i) => (
          <span key={`bot-${i}`} className="relative   ">
            <motion.span
              className="block"
              transition={{
                delay: i * DELAY,
                duration: DURATION,
                ease: "easeInOut",
              }}
              variants={{
                initial: { y: "100%" },
                hovered: { y: "0%" },
              }}
            >
              {l === " " ? "\u00A0" : l}
            </motion.span>
          </span>
        ))}
      </span>
    </motion.div>
  );
}
