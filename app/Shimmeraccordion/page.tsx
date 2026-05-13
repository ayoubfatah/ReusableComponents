"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const ITEMS = [
  {
    q: "how did you learn to code like this?",
    a: "by building a lot of messy projects first. most of what i know came from breaking things and figuring out why they broke.",
  },
  {
    q: "what's your favorite part about coding?",
    a: "turning random ideas into something real. seeing a small concept become an actual product never gets old.",
  },
  {
    q: "frontend or backend?",
    a: "both. i like frontend for the creativity and backend for the problem solving. building full projects is the fun part.",
  },
  {
    q: "how do you improve as a developer?",
    a: "by staying curious. i rebuild things, explore different approaches, and try to understand the reasoning behind good code.",
  },
  {
    q: "what do you focus on most when building?",
    a: "clean user experience, smooth interactions, and code that's simple enough to maintain later.",
  },
  {
    q: "what's your coding style?",
    a: "experiment first, refine later. i care more about learning and iteration than writing perfect code on the first try.",
  },
  {
    q: "what keeps you motivated to code?",
    a: "the fact that there's always something new to learn and a better way to build things.",
  },
];

const EASE = [0.215, 0.61, 0.355, 1] as const;

function AccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: (typeof ITEMS)[0];
  isOpen: boolean;
  onToggle: () => void;
}) {
  const cps = 40;
  const duration = item.a.length / cps;

  return (
    <div className="border-b border-neutral-200 dark:border-neutral-800 ">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center gap-0 py-4 cursor-pointer text-left group"
      >
        {/* Question */}
        <span className="flex-1 font-semibold text-[16px] text-neutral-100 font-sans">
          {item.q}
        </span>

        {/* Plus icon */}
      </button>

      {/* Content */}
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0 }}
        transition={{ duration: 0.26, ease: EASE }}
        style={{ overflow: "hidden" }}
      >
        <motion.div
          initial={false}
          animate={{ y: isOpen ? 0 : "1lh", opacity: isOpen ? 1 : 0.7 }}
          transition={{ duration: 0.26, ease: EASE }}
          className="pb-4"
        >
          {/* Shimmer text — CSS background-clip trick */}
          <p
            className="text-[15px] leading-relaxed m-0"
            style={{
              display: "inline",
              backgroundImage: `
             linear-gradient(90deg,
            #0000 0 calc(100% - 20ch),
            hsla(0,100%,50%,1) calc(100% - 20ch) 100%,
            #0000 100%
                ),
                linear-gradient(90deg,                           
             transparent 0 calc(100% - 0ch),
             rgba(0,0,0,0.85) calc(100% - 0ch) 100%
                ),
                linear-gradient(rgba(255,255,255,0.95) 0 50%) ,
                  linear-gradient(rgba(255, 255, 255, 0.441) 0 0%)   
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
            {item.a}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function ShimmerAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <main className="h-screen bg-black  flex justify-center items-center w-full">
        <section className=" w-full max-w-[480px]">
          <h2 className="sr-only">Frequently asked questions</h2>
          {ITEMS.map((item, i) => (
            <AccordionItem
              key={i}
              item={item}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </section>
      </main>
    </>
  );
}
