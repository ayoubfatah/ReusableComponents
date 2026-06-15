import { motion } from "framer-motion";
import { ReactNode } from "react";

export type MatchEventProps = {
  icon: ReactNode;
  minute: string;
  delay: number;
};

export function MatchEvent({ icon, minute, delay }: MatchEventProps) {
  return (
    <motion.div
      layout
      initial={{
        opacity: 0,
        y: 8,
        scale: 0.8,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        delay,
        duration: 0.25,
      }}
      className="flex flex-col items-center justify-center"
    >
      {icon}
      <span className="text-[10px] text-white/60">{minute}</span>
    </motion.div>
  );
}
