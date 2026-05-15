import { JSX } from "react";
import { ConnectButtonProps, LabelChar } from "../../types";
import {AnimatePresence, motion } from "framer-motion"
import { labelChars } from "../../helper";
import Spinner from "../../icons/Spinner";
import Check from "../../icons/Check";
export function ConnectButton({
  state,
  disabled = false,
  onClick,
}: ConnectButtonProps): JSX.Element {
  const isConnected = state === "CONNECTED";

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: 0.97 }}
      animate={{
        backgroundColor: isConnected ? "#2dc138" : "#111111",
        borderColor: isConnected ? "#2dc138" : "#111111",
      }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-center gap-1.5 px-5 py-2.5 rounded-full border text-white text-[14px] font-medium cursor-pointer disabled:opacity-50"
    >
      {/* Morphing label */}
      <div className="flex h-5 items-center overflow-hidden">
        <AnimatePresence mode="popLayout">
          {labelChars(state).map(({ char, key }: LabelChar) => (
            <motion.span
              key={key}
              layout
              initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              {char}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>

      {/* Icon */}
      <AnimatePresence mode="wait">
        {state === "CONNECTING" && (
          <motion.span
            key="spinner"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.2 }}
          >
            <Spinner />
          </motion.span>
        )}

        {state === "CONNECTED" && (
          <motion.span
            key="check"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Check />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
