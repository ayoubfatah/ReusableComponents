"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";
import Iphone from "./Iphone";
import { Ring } from "./ring";
import { Timer } from "./timer";
import { Football } from "./football";

const VIEW_OPTIONS = {
  idle: "Standby",
  ring: "Alert",
  "timer-compact": "Quick Timer",
  "timer-expanded": "Extended Timer",
  "football-compact": "Football Compact",
} as const;

type View = keyof typeof VIEW_OPTIONS;

type TransitionKey = {
  [From in View]: {
    [To in Exclude<View, From>]: `${From}-${To}`;
  }[Exclude<View, From>];
}[View];

type VariantKey = "idle" | TransitionKey;

type ExitAnimation = {
  scale?: number;
  scaleX?: number;
  y?: number;
  bounce?: number;
  opacity?: number;
};

const VIEW_ENTRIES = Object.entries(VIEW_OPTIONS) as Array<
  [View, (typeof VIEW_OPTIONS)[View]]
>;

const keyMap: Partial<Record<string, View>> = {
  "1": "idle",
  "2": "ring",
  "3": "timer-compact",
  "4": "timer-expanded",
  "5": "football-compact",
};

export default function DynamicIsland() {
  const [view, setView] = useState<View>("idle");
  const [variantKey, setVariantKey] = useState<VariantKey>("idle");

  const changeView = useCallback(
    (nextView: View) => {
      if (nextView === view) {
        setVariantKey("idle");
        return;
      }

      setVariantKey(`${view}-${nextView}` as TransitionKey);
      setView(nextView);
    },
    [view],
  );

  const content = useMemo(() => {
    switch (view) {
      case "ring":
        return <Ring />;

      case "timer-compact":
        return <Timer variant="compact" />;

      case "timer-expanded":
        return <Timer variant="expanded" />;

      case "football-compact":
        return <Football />;

      case "idle":
        return <div className="h-7" />;
    }
  }, [view]);

  useEffect(() => {
    const handleOnKeyDown = (e: KeyboardEvent) => {
      const nextView = keyMap[e.key];

      if (nextView) {
        changeView(nextView);
      }
    };

    window.addEventListener("keydown", handleOnKeyDown);

    return () => window.removeEventListener("keydown", handleOnKeyDown);
  }, [changeView]);

  return (
    <div>
      <Iphone>
        <div className="relative flex h-full w-full flex-col justify-between">
          <motion.div
            layout
            transition={{
              type: "spring",
              bounce: BOUNCE_VARIANTS[variantKey],
            }}
            className="mx-auto w-fit min-w-[100px]  rounded-full bg-black"
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

          <div className="absolute top-[-100px] flex h-full w-full justify-center gap-4 opacity-0">
            {VIEW_ENTRIES.map(([key, label]) => (
              <button
                type="button"
                className="h-10 whitespace-nowrap rounded-full bg-white px-2.5 py-1.5 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-gray-300/50 ring-inset hover:bg-gray-50"
                onClick={() => changeView(key)}
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

const variants: Variants = {
  exit: (custom: ExitAnimation = {}) => {
    const { bounce = 0.35, ...transition } = custom;

    return {
      ...transition,
      opacity: [1, 0],
      filter: "blur(5px)",
      transition: {
        type: "spring",
        bounce,
      },
    };
  },
};

const ANIMATION_VARIANTS = {
  idle: {},

  "idle-ring": {
    scale: 0.9,
    scaleX: 0.9,
    bounce: 0.5,
  },
  "idle-timer-compact": {
    scale: 0.9,
    scaleX: 0.9,
    bounce: 0.5,
  },
  "idle-timer-expanded": {
    scale: 0.7,
    y: -7.5,
    bounce: 0.3,
  },
  "idle-football-compact": {
    scale: 0.9,
    scaleX: 0.9,
    bounce: 0.5,
  },

  "ring-idle": {
    scale: 1,
    scaleX: 0.9,
    bounce: 0.5,
  },
  "ring-timer-compact": {
    scale: 0.9,
    scaleX: 0.9,
    bounce: 0.05,
  },
  "ring-timer-expanded": {
    scale: 1.4,
    y: 7.5,
    bounce: 0.35,
  },
  "ring-football-compact": {
    scale: 0.9,
    scaleX: 0.9,
    bounce: 0.05,
  },

  "timer-compact-idle": {
    scale: 0.9,
    scaleX: 0.9,
    bounce: 0.5,
  },
  "timer-compact-ring": {
    scale: 0.9,
    scaleX: 0.9,
    bounce: 0.05,
  },
  "timer-compact-timer-expanded": {
    scale: 1.4,
    y: 7.5,
    bounce: 0.35,
  },
  "timer-compact-football-compact": {
    scale: 1,
    bounce: 0.35,
  },

  "timer-expanded-idle": {
    scale: 0.7,
    y: -7.5,
    bounce: 0.3,
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
  "timer-expanded-football-compact": {
    scale: 0.7,
    y: -7.5,
    bounce: 0.35,
  },

  "football-compact-idle": {
    scale: 0,
    opacity: 0,
  },
  "football-compact-ring": {
    scale: 0.9,
    scaleX: 0.9,
    bounce: 0.05,
  },
  "football-compact-timer-compact": {
    scale: 1,
    bounce: 0.35,
  },
  "football-compact-timer-expanded": {
    scale: 1.4,
    y: 7.5,
    bounce: 0.35,
  },
} satisfies Record<VariantKey, ExitAnimation>;

const BOUNCE_VARIANTS = {
  idle: 0.5,

  "idle-ring": 0.5,
  "idle-timer-compact": 0.5,
  "idle-timer-expanded": 0.3,
  "idle-football-compact": 0.1,

  "ring-idle": 0.5,
  "ring-timer-compact": 0,
  "ring-timer-expanded": 0.35,
  "ring-football-compact": 0,

  "timer-compact-idle": 0.5,
  "timer-compact-ring": 0,
  "timer-compact-timer-expanded": 0.35,
  "timer-compact-football-compact": 0.35,

  "timer-expanded-idle": 0.3,
  "timer-expanded-ring": 0.35,
  "timer-expanded-timer-compact": 0.35,
  "timer-expanded-football-compact": 0.35,

  "football-compact-idle": 0,
  "football-compact-ring": 0,
  "football-compact-timer-compact": 0.35,
  "football-compact-timer-expanded": 0.35,
} satisfies Record<VariantKey, number>;
