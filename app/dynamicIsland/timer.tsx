import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTimer } from "./hooks/useTimer";

type TimerProps = {
  variant?: "compact" | "expanded";
};
export function Timer({ variant = "expanded" }: TimerProps) {
  const TOTAL = 10;

  const { isPaused, setIsPaused, secondsLeft, gradient } = useTimer(TOTAL);

  if (variant === "compact") {
    return (
      <CompactTimer
        isPaused={isPaused}
        setIsPaused={setIsPaused}
        gradient={gradient}
        secondsLeft={secondsLeft}
      />
    );
  }

  return (
    <ExpandedTimer
      isPaused={isPaused}
      setIsPaused={setIsPaused}
      secondsLeft={secondsLeft}
      gradient={gradient}
    />
  );
}

/* ------------------------------ */
/* COMPACT */
/* ------------------------------ */

function CompactTimer({ setIsPaused, gradient, secondsLeft }: any) {
  return (
    <div className="flex w-[148px] h-7  items-center gap-2 py-3 pr-4 pl-2.5">
      <motion.button
        aria-label="Pause timer"
        onClick={() => setIsPaused((p: boolean) => !p)}
        whileTap={{ scale: 0.9 }}
        style={{
          background: gradient,
          WebkitMask:
            "radial-gradient(farthest-side, transparent calc(100% - 1.5px), black 0)",
          mask: "radial-gradient(farthest-side, transparent calc(100% - 1.5px), black 0)",
        }}
        className="flex size-4 items-center justify-center rounded-full relative"
      >
        <div className="h-1 w-2 bg-red-500  "></div>
      </motion.button>

      <div className="ml-auto flex items-baseline gap-1.5 text-[#F7A815]">
        <Counter value={secondsLeft} size="sm" />
      </div>
    </div>
  );
}

/* ------------------------------ */
/* EXPANDED */
/* ------------------------------ */

function ExpandedTimer({ isPaused, setIsPaused, secondsLeft }: any) {
  return (
    <div className="flex w-[284px] items-center gap-2 py-3 pr-5 pl-3.5">
      <motion.button
        aria-label="Pause timer"
        onClick={() => setIsPaused((p: boolean) => !p)}
        whileTap={{ scale: 0.9 }}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-[#5A3C07] transition-colors hover:bg-[#694608]"
      >
        <AnimatePresence initial={false} mode="wait">
          {isPaused ? (
            <motion.svg
              key="play"
              initial={{
                opacity: 0,
                scale: 0.5,
                filter: "blur(4px)",
              }}
              animate={{
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
              }}
              exit={{
                opacity: 0,
                scale: 0.5,
                filter: "blur(4px)",
              }}
              transition={{ duration: 0.1 }}
              viewBox="0 0 12 14"
              className="h-4 w-4 fill-current text-[#FDB000]"
            >
              <path d="M0.9375 13.2422C1.25 13.2422 1.51562 13.1172 1.82812 12.9375L10.9375 7.67188C11.5859 7.28906 11.8125 7.03906 11.8125 6.625C11.8125 6.21094 11.5859 5.96094 10.9375 5.58594L1.82812 0.3125C1.51562 0.132812 1.25 0.015625 0.9375 0.015625C0.359375 0.015625 0 0.453125 0 1.13281V12.1172C0 12.7969 0.359375 13.2422 0.9375 13.2422Z" />
            </motion.svg>
          ) : (
            <motion.svg
              key="pause"
              initial={{
                opacity: 0,
                scale: 0.5,
                filter: "blur(4px)",
              }}
              animate={{
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
              }}
              exit={{
                opacity: 0,
                scale: 0.5,
                filter: "blur(4px)",
              }}
              transition={{ duration: 0.1 }}
              viewBox="0 0 10 13"
              className="h-4 w-4 fill-current text-[#FDB000]"
            >
              <path d="M1.03906 12.7266H2.82031C3.5 12.7266 3.85938 12.3672 3.85938 11.6797V1.03906C3.85938 0.328125 3.5 0 2.82031 0H1.03906C0.359375 0 0 0.359375 0 1.03906V11.6797C0 12.3672 0.359375 12.7266 1.03906 12.7266ZM6.71875 12.7266H8.49219C9.17969 12.7266 9.53125 12.3672 9.53125 11.6797V1.03906C9.53125 0.328125 9.17969 0 8.49219 0H6.71875C6.03125 0 5.67188 0.359375 5.67188 1.03906V11.6797C5.67188 12.3672 6.03125 12.7266 6.71875 12.7266Z" />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>

      <button className="flex h-10 w-10 items-center justify-center rounded-full bg-[#3C3D3C] text-white hover:bg-[#4A4B4A]">
        <svg
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <div className="ml-auto flex items-baseline gap-1.5 pr-0.5 text-[#F7A815]">
        <span className="text-sm font-medium">Timer</span>
        <Counter value={secondsLeft} />
      </div>
    </div>
  );
}

/* ------------------------------ */
/* COUNTER */
/* ------------------------------ */

function Counter({ value, size = "lg" }: { value: any; size?: "lg" | "sm" }) {
  const [display, setDisplay] = useState(10);

  useEffect(() => {
    const unsubscribe = value.on("change", (latest: number) => {
      setDisplay(latest);
    });

    return () => unsubscribe();
  }, [value]);

  const digits = display.toString().padStart(2, "0").split("");

  return (
    <div
      className={`relative overflow-hidden whitespace-nowrap font-light ${
        size === "lg" ? "w-[64px] text-3xl" : "w-[30px] text-sm"
      }`}
    >
      0:
      <AnimatePresence initial={false} mode="popLayout">
        {digits.map((n, i) => (
          <motion.div
            key={n + i}
            className="inline-block tabular-nums"
            initial={{
              y: 12,
              opacity: 0,
              filter: "blur(2px)",
            }}
            animate={{
              y: 0,
              opacity: 1,
              filter: "blur(0px)",
            }}
            exit={{
              y: -12,
              opacity: 0,
              filter: "blur(2px)",
            }}
            transition={{
              type: "spring",
              bounce: 0.35,
            }}
          >
            {n}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
