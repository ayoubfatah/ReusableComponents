"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const ITEMS = [
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-5 opacity-60"
      >
        <path d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.886V4.533ZM12.75 20.636A8.214 8.214 0 0 1 18 18.75c.966 0 1.89.166 2.75.47a.75.75 0 0 0 1-.708V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.103Z" />
      </svg>
    ),
    q: "so like, is this a course?",
    a: "nah, it's more like a playbook you come back to. no homework, no grades, just real techniques you can actually use.",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-5 opacity-60"
      >
        <path
          fillRule="evenodd"
          d="M12 6.75a5.25 5.25 0 0 1 6.775-5.025.75.75 0 0 1 .313 1.248l-3.32 3.319c.063.475.276.934.641 1.299.365.824.578 1.3.64l3.318-3.319a.75.75 0 0 1 1.248.313 5.25 5.25 0 0 1-5.472 6.756c-1.018-.086-1.87.1-2.309.634L7.344 21.3A3.298 3.298 0 1 1 2.7 16.657l8.684-7.151c.533-.44.72-1.291.634-2.309A5.342 5.342 0 0 1 12 6.75ZM4.117 19.125a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Z"
          clipRule="evenodd"
        />
      </svg>
    ),
    q: "what am i looking at here?",
    a: "deep dives into actual projects and experiments. some are polished interfaces, others are messy explorations. it's all about showing you how things work in practice.",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-5 opacity-60"
      >
        <path d="M11.7 2.805a.75.75 0 0 1 .6 0A60.65 60.65 0 0 1 22.83 8.72a.75.75 0 0 1-.231 1.337 49.948 49.948 0 0 0-9.902 3.912l-.003.002-.014.007a.75.75 0 0 1-.707 0A50.88 50.88 0 0 0 7.5 12.173v-.224c0-.131.067-.248.172-.311a54.615 54.615 0 0 1 4.653-2.52.75.75 0 0 0-.65-1.352 56.123 56.123 0 0 0-4.78 2.589 1.858 1.858 0 0 0-.859 1.228 49.803 49.803 0 0 0-4.634-1.527.75.75 0 0 1-.231-1.337A60.653 60.653 0 0 1 11.7 2.805Z" />
      </svg>
    ),
    q: "how is this structured?",
    a: "mix of videos, walkthroughs, and code snippets. you can jump around however you like - watch the demo first, then dive into the code, or read the breakdown if you prefer.",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-5 opacity-60"
      >
        <path
          fillRule="evenodd"
          d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 1 7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 1 6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 1 6 0ZM6.31 15.117A6.745 6.745 0 1 1 12 12a6.745 6.745 0 1 1 6.709 7.498.75.75 0 1 1-.372.568A12.696 12.696 0 1 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 1 1.019-4.38Z"
          clipRule="evenodd"
        />
      </svg>
    ),
    q: "built for who exactly?",
    a: "for anyone who actually makes things. if you care about making interfaces better and want to level up your skills, this is for you.",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-5 opacity-60"
      >
        <path
          d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5Z"
          clipRule="evenodd"
        />
      </svg>
    ),
    q: "what about AI tools?",
    a: "yeah, i use them. they're great for brainstorming and working through problems. not for replacing my thinking, just for helping me think better.",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-5 opacity-60"
      >
        <path d="M4.5 3.75a3 3 0 0 0-3 3v.75h21v-.75a3 3 0 0 0-3-3h-15Z" />
        <path
          fillRule="evenodd"
          d="M22.5 9.75h-21v7.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-7.5Zm-18 3.75a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z"
          clipRule="evenodd"
        />
      </svg>
    ),
    q: "pay once or subscription?",
    a: "just one payment, it's yours forever. price goes up as i add more stuff, but you get everything forever.",
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
  const cps = 50;
  const duration = item.a.length / cps;

  return (
    <div className="border-b border-neutral-200 dark:border-neutral-800">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center gap-0 py-4 cursor-pointer text-left group"
      >
        {/* Question */}
        <span className="flex-1 font-semibold text-[15px text-neutral-100">
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
            hsla(160,100%,50%,1) calc(100% - 20ch) 100%,
            #0000 100%
                ),
                linear-gradient(90deg,                           
             transparent 0 calc(100% - 0ch),
             rgba(0,0,0,0.85) calc(100% - 0ch) 100%
                ),
                linear-gradient(rgba(255,255,255,0.95) 0 50%) ,
                  linear-gradient(rgba(255, 255, 255, 0.441) 0 50%)   
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
