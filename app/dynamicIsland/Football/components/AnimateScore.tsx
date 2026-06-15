import { AnimatePresence, motion } from "framer-motion";
import { useCountUpScore } from "../utils/helpers";
import { scoreVariants } from "../data/animationData";
type AnimatedScoreProps = {
  score: number;
  direction: number;
  animationState: "collapsed" | "expanded" | "showStats";
};

export function AnimatedScore({
  score,
  direction,
  animationState,
}: AnimatedScoreProps) {
  const displayScore = useCountUpScore(score);
  const isExpanded = animationState === "expanded";

  return (
    <motion.span
      custom={direction}
      animate={animationState}
      variants={scoreVariants}
      transition={{
        delay: isExpanded ? 0 : 0.91,
        duration: 0.275,
      }}
      className="relative block h-7 min-w-4 overflow-hidden text-xl font-bold text-white"
    >
      <AnimatePresence mode="popLayout" initial={true}>
        <motion.span
          key={displayScore}
          initial={{
            y: 24,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: 0.25,
            delay: isExpanded ? 0 : 0.91,
            ease: "easeOut",
          }}
          className="block leading-7"
        >
          {displayScore}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
}
