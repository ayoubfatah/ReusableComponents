"use client";
import { motion } from "framer-motion";

export default function page() {
  return (
    <div className="flex flex-col gap-10 items-center justify-center h-screen bg-black text-white">
      <div className="flex items-center gap-3">
        <FlipLink>Hover</FlipLink>
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
      className=" relative block overflow-hidden text-6xl font-bold whitespace-nowrap uppercase cursor-pointer "
      style={{
        lineHeight: 0.8,
      }}
    >
      <span>
        {children.split("").map((l, i) => (
          <motion.span
            className="inline-block"
            transition={{
              delay: i * DELAY,
              duration: DURATION,
              ease: "easeInOut",
            }}
            variants={{
              initial: {
                y: 0,
              },
              hovered: {
                y: "-100%",
              },
            }}
            key={i}
          >
            {l}
          </motion.span>
        ))}
      </span>

      <span className="absolute inset-0">
        {" "}
        {children.split("").map((l, i) => (
          <motion.span
            className="inline-block"
            transition={{
              delay: i * DELAY,
              duration: DURATION,
              ease: "easeInOut",
            }}
            variants={{
              initial: {
                y: "100%",
              },
              hovered: {
                y: 0,
              },
            }}
            key={i}
          >
            {l}
          </motion.span>
        ))}{" "}
      </span>
    </motion.div>
  );
}
