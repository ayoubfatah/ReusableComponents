"use client";

import { motion } from "framer-motion";
import { type ClassValue, clsx } from "clsx";

const EASE = [0.215, 0.61, 0.355, 1] as const;

function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function InfiniteShimmerText({
  children,
  textSize = "text-[22px]",
  textColor = "#62e4f8",
  backgroundColor = "rgba(255,255,255,0.95)",
  className = "",
}: {
  children: React.ReactNode;
  textSize?: string;
  textColor?: string;
  backgroundColor?: string;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.36, ease: EASE }}
      className="pb-4"
    >
      {/* Infinite shimmer text — CSS background-clip trick */}
      <p
        className={cn(textSize, "leading-relaxed m-0", className)}
        style={{
          display: "inline",
          backgroundImage: `
             linear-gradient(90deg,
            #0000 0 calc(100% - 20ch),
            ${textColor} calc(100% - 0ch) 100%,
            #0000 100%
                ),
                linear-gradient(90deg,                           
             transparent 0 calc(100% - 0ch),
             rgba(0,0,0,0.85) calc(100% - 0ch) 100%
                ),
                linear-gradient(${backgroundColor} 0 50%) ,
                linear-gradient(${backgroundColor} 0 0%)    
              `,
          backgroundPosition: "200% 0, 0 0",
          backgroundSize: "200% 100%, 100% 100%",
          backgroundRepeat: "no-repeat",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
          animation: "shimmer 2s ease-in-out infinite",
        }}
      >
        {children}
      </p>
    </motion.div>
  );
}

export default function Page() {
  return (
    <>
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0, 0 0; }
          100% { background-position: -200% 0, 0 0; }
        }
      `}</style>
      <main className="h-screen flex flex-col justify-center items-center bg-black ">
        <div className="flex gap-6">
          <InfiniteShimmerText
            textSize="text-[12px]"
            backgroundColor="#505050"
            className="text-[12px]!"
          >
            Generating code ...
          </InfiniteShimmerText>
          <InfiniteShimmerText
            textSize="text-[12px]"
            backgroundColor="#505050"
            className="text-[12px]!"
          >
            Generating code ...
          </InfiniteShimmerText>
        </div>
      </main>
    </>
  );
}
