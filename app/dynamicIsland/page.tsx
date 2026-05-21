"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Ring } from "./ring";
import { Timer } from "./timer";
import Iphone from "./Iphone";

const VIEW_OPTIONS = {
  idle: "Standby",
  ring: "Alert",
  "timer-compact": "Quick Timer",
  "timer-expanded": "Extended Timer",
};
export default function DynamicIsland() {
  const [view, setView] = useState("idle");
  const [variantKey, setVariantKey] = useState("idle");

  const content = useMemo(() => {
    switch (view) {
      case "ring":
        return <Ring />;
      case "timer-compact":
        return <Timer variant="compact" />;
      case "timer-expanded":
        return <Timer variant="expanded" />;
      case "idle":
        return <div className="h-7" />;
    }
  }, [view]);
  console.log("variantKey", variantKey);
  return (
    <div className="">
      <Iphone>
        <div className="relative flex h-full w-full flex-col justify-between">
          <motion.div
            layout
            transition={{
              type: "spring",
              bounce: BOUNCE_VARIANTS[variantKey],
            }}
            className="mx-auto w-fit min-w-[100px] overflow-hidden rounded-full bg-black"
          >
            <motion.div
              style={{ borderRadius: 9999 }}
              transition={{
                type: "spring",
                bounce: BOUNCE_VARIANTS[variantKey],
              }}
              initial={{
                scale: 0.9,
                opacity: 0,
                filter: "blur(5px)",
                originX: 0.5,
                originY: 0.5,
              }}
              animate={{
                scale: 1,
                opacity: 1,
                filter: "blur(0px)",
                originX: 0.5,
                originY: 0.5,
                transition: {
                  delay: 0.05,
                },
              }}
              key={view}
            >
              {content}
            </motion.div>
          </motion.div>

          <div className="pointer-events-none absolute top-0 left-1/2 flex h-[200px] w-[300px] -translate-x-1/2 items-start justify-center">
            <AnimatePresence
              mode="popLayout"
              custom={ANIMATION_VARIANTS[variantKey]}
            >
              <motion.div
                style={{ borderRadius: 9999 }}
                initial={{ opacity: 0 }}
                exit="exit"
                variants={variants}
                key={view}
              >
                {content}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* buttons */}
          <div className="flex w-full justify-center gap-4 absolute top-[-100px] h-[100%]">
            {Object.entries(VIEW_OPTIONS).map(([key, label]) => (
              <button
                type="button"
                className="h-10 whitespace-nowrap rounded-full bg-white px-2.5 py-1.5 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-gray-300/50 ring-inset hover:bg-gray-50"
                onClick={() => {
                  setView(key);
                  setVariantKey(`${view}-${key}`);
                  console.log(`${view}-${key}`);
                }}
                key={key}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </Iphone>
    </div>
  );
}

const variants = {
  exit: (transition) => {
    return {
      ...transition,
      opacity: [1, 0],
      filter: "blur(5px)",
    };
  },
};

const ANIMATION_VARIANTS = {
  "ring-idle": {
    scale: 1,
    scaleX: 0.9,
    bounce: 0.5,
  },
  "timer-compact-idle": {
    scale: 0.9,
    scaleX: 0.9,
    bounce: 0.5,
  },
  "timer-expanded-ring": {
    scale: 0.7,
    y: -7.5,
    bounce: 0.35,
  },
  "timer-expanded-timer-compact": {
    scale: 0.7,
    y: -7.5,
    bounce: 0.35,
  },
  "ring-timer-expanded": {
    scale: 1.4,
    y: 7.5,
    bounce: 0.35,
  },
  "timer-expanded-idle": {
    scale: 0.7,
    y: -7.5,
    bounce: 0.3,
  },
  "timer-compact-ring": {
    scale: 0.9,
    scaleX: 0.9,
    bounce: 0.05,
  },
};

const BOUNCE_VARIANTS = {
  idle: 0.5,
  "idle-timer-expanded": 0.3,
  "idle-ring": 0.5,
  "ring-idle": 0.5,
  "timer-compact-idle": 0.5,
  "timer-compact-ring": 0,
  "ring-timer-expanded": 0.35,
  "timer-expanded-ring": 0.35,
  "timer-expanded-idle": 0.3,
  "timer-expanded-timer-compact": 0.35,
};
