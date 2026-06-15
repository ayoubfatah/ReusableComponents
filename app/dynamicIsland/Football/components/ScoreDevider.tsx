import { motion } from "framer-motion";
type ScoreDividerProps = {
  expanded: boolean;
};

export function ScoreDivider({ expanded }: ScoreDividerProps) {
  return (
    <motion.span
      style={{
        y: 45,
        scale: 0,
      }}
      animate={{
        scale: expanded ? 1 : 0,
      }}
      transition={{
        delay: 0.8,
        duration: 0.256,
      }}
      className="h-[2px] w-[15px] bg-white"
    />
  );
}
