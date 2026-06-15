import { motion } from "framer-motion";
import Image from "next/image";
import { logoVariants, nameVariants } from "../data/animationData";
import { Team } from "../data/data";
import { AnimatedScore } from "./AnimateScore";
import { cn } from "@/lib/utils";
type TeamScoreProps = {
  team: Team;
  score: number;
  side: "left" | "right";
  animationState: "collapsed" | "expanded" | "showStats";
};

export function TeamScore({
  team,
  score,
  side,
  animationState,
}: TeamScoreProps) {
  const direction = side === "left" ? 1 : -1;
  const isExpanded = animationState === "expanded";

  return (
    <motion.div
      animate={{
        gap: !isExpanded ? 0 : "20px",
      }}
      className={cn(
        "flex w-full items-center  ",
        side === "right" ? "flex-row-reverse" : "flex-row",
      )}
    >
      <motion.div
        custom={direction}
        initial={{
          scale: 0,
          y: 8,
          filter: "blur(3px)",
        }}
        animate={animationState}
        variants={logoVariants}
        transition={{
          duration: 0.3,
          ease: "linear",
          delay: isExpanded ? 0 : 0.6,
        }}
      >
        <Image alt={team.logoAlt} width={36} height={36} src={team.logoSrc} />
      </motion.div>

      <motion.span
        custom={direction}
        initial={{
          opacity: 0,
        }}
        animate={animationState}
        variants={nameVariants}
        transition={{
          delay: isExpanded ? 0 : 0.35,
          duration: 0.275,
        }}
        className="text-xl font-bold text-white"
      >
        {team.code}
      </motion.span>

      <AnimatedScore
        score={score}
        direction={direction}
        animationState={animationState}
      />
    </motion.div>
  );
}
