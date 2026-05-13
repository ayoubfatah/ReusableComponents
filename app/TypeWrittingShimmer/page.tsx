"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const EASE = [0.215, 0.61, 0.355, 1] as const;

export function ShimmerText({
  text,
  isOpen,
}: {
  text: string;
  isOpen: boolean;
}) {
  const cps = 20;
  const duration = text.length / cps;

  return (
    <motion.div
      initial={false}
      animate={{ y: isOpen ? 0 : "1lh", opacity: isOpen ? 1 : 0.7 }}
      transition={{ duration: 0.36, ease: EASE }}
      className="pb-4"
    >
      <p
        className="text-[22px] text-start leading-relaxed m-0"
        style={{
          display: "inline",
          backgroundImage: `
             linear-gradient(90deg,
            #0000 0 calc(100% - 20ch),
            #f86262 calc(100% - 10ch) 100%,
            #0000 100%
                ),
                linear-gradient(90deg,                           
             transparent 0 calc(100% - 0ch),
             rgba(0,0,0,0.85) calc(100% - 0ch) 100%
                ),
                linear-gradient(rgba(255,255,255,0.95) 0 50%) 
              `,
          backgroundPosition: isOpen ? "0% 0, 0 0" : "200% 0, 0 0",
          backgroundSize: "200% 100%, 100% 100%",
          backgroundRepeat: "no-repeat",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
          transition: isOpen
            ? `background-position ${duration}s cubic-bezier(0.215, 0.61, 0.355, 1)`
            : "background-position 0s",
        }}
      >
        {text}{" "}
      </p>
    </motion.div>
  );
}

export default function Page() {
  const [isMount, setIsMount] = useState(false);
  useEffect(() => {
    setIsMount(true);
  }, []);
  return (
    <main className="h-screen flex flex-col justify-center items-center bg-black">
      <div className="w-[700px]">
        <ShimmerText
          text="This component creates a typewriter effect with shimmer animation that reveals text progressively using only CSS. The shimmer effect follows the text reveal, creating a smooth typing animation with a glowing highlight that moves across the text as it appears. No JavaScript needed - pure CSS magic"
          isOpen={isMount}
        />
      </div>
    </main>
  );
}
