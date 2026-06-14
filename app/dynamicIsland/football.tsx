"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import Image from "next/image";
import { type ReactNode, useEffect, useRef, useState } from "react";

function YellowCard() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      className="size-[30px]"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_800_11560)">
        <path
          d="M9.5459 0.848389H4.45499C3.40063 0.848389 2.5459 1.70312 2.5459 2.75748V11.2421C2.5459 12.2965 3.40063 13.1512 4.45499 13.1512H9.5459C10.6003 13.1512 11.455 12.2965 11.455 11.2421V2.75748C11.455 1.70312 10.6003 0.848389 9.5459 0.848389Z"
          fill="#fece2f"
        />
      </g>

      <defs>
        <clipPath id="clip0_800_11560">
          <rect width="14" height="14" fill="white" stroke="none" />
        </clipPath>
      </defs>
    </svg>
  );
}

function Goal() {
  return <span className="text-[20px]">⚽️</span>;
}

type TeamCode = "MA" | "BR";

type Team = {
  code: TeamCode;
  logoSrc: string;
  logoAlt: string;
};

type MatchScore = Record<TeamCode, number>;

const teams: Team[] = [
  {
    code: "MA",
    logoAlt: "Moroccan flag",
    logoSrc:
      "https://images.fotmob.com/image_resources/logo/teamlogo/6262_small.png",
  },
  {
    code: "BR",
    logoAlt: "Brazilian flag",
    logoSrc:
      "https://images.fotmob.com/image_resources/logo/teamlogo/8256_small.png",
  },
];

const initialScore: MatchScore = {
  MA: 1,
  BR: 0,
};

const containerVariants: Variants = {
  collapsed: {
    height: 56,
    width: 330,
    borderRadius: 50,
  },
  expanded: {
    height: 175,
    width: 400,
    borderRadius: 50,
  },
};

const logoVariants: Variants = {
  collapsed: {
    scale: 1,
    x: 0,
    y: 0,
    filter: "blur(0px)",
  },
  expanded: (direction: number) => ({
    scale: 1.4,
    x: direction * 20,
    y: 14,
    filter: "blur(0px)",
  }),
};

const nameVariants: Variants = {
  collapsed: {
    opacity: 0,
    x: 0,
    y: 0,
  },
  expanded: (direction: number) => ({
    opacity: 1,
    x: direction * 30,
    y: 14,
  }),
};

const scoreVariants: Variants = {
  collapsed: {
    opacity: 1,
    x: 0,
    y: 0,
  },
  expanded: (direction: number) => ({
    opacity: 1,
    x: direction * 50,
    y: 14,
  }),
};

export function Football() {
  const [score, setScore] = useState<MatchScore>(initialScore);

  /**
   * Example score update.
   *
   * Starts as:
   * MA 1 - 0 BR
   *
   * After 3 seconds:
   * MA 1 - 1 BR
   */
  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setScore((currentScore) => ({
        ...currentScore,
        BR: 1,
      }));
    }, 3000);

    return () => window.clearTimeout(timeoutId);
  }, []);

  return <CompactFootball score={score} />;
}

type CompactFootballProps = {
  score: MatchScore;
};

function CompactFootball({ score }: CompactFootballProps) {
  const [expanded, setExpanded] = useState(false);

  const animationState = expanded ? "expanded" : "collapsed";

  return (
    <motion.button
      type="button"
      aria-expanded={expanded}
      onClick={() => setExpanded((current) => !current)}
      variants={containerVariants}
      animate={animationState}
      className="flex flex-col items-center overflow-hidden bg-black px-4 pt-3"
    >
      <div className="flex w-full items-start justify-between">
        <TeamScore
          team={teams[0]}
          score={score.MA}
          side="left"
          animationState={animationState}
        />

        <ScoreDivider expanded={expanded} />

        <TeamScore
          team={teams[1]}
          score={score.BR}
          side="right"
          animationState={animationState}
        />
      </div>

      {expanded && <MatchDetails />}
    </motion.button>
  );
}

type ScoreDividerProps = {
  expanded: boolean;
};

function ScoreDivider({ expanded }: ScoreDividerProps) {
  return (
    <motion.span
      style={{
        y: 35,
        scale: 0,
      }}
      animate={{
        scale: expanded ? 1 : 0,
      }}
      transition={{
        delay: 0.3,
        duration: 0.256,
      }}
      className="h-[2px] w-[15px] bg-white"
    />
  );
}

function MatchDetails() {
  return (
    <div className="mt-4 flex flex-col gap-2">
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 0.5,
          duration: 0.3,
        }}
        className="font-medium text-green-500"
      >
        52´
      </motion.div>

      <motion.div
        initial={{
          opacity: 0,
          width: 40,
          height: 59,
        }}
        animate={{
          opacity: 1,
          width: 220,
          height: 59,
        }}
        transition={{
          delay: 0.5,
          duration: 0.3,
        }}
        className="flex items-center justify-center gap-3 rounded-full bg-white/10"
      >
        <MatchEvent delay={0.55} icon={<Goal />} minute="25" />
        <MatchEvent delay={0.2} icon={<YellowCard />} minute="25" />

        <EventDivider />

        <MatchEvent delay={0.2} icon={<YellowCard />} minute="25" />
        <MatchEvent delay={0.55} icon={<YellowCard />} minute="25" />
      </motion.div>
    </div>
  );
}

type MatchEventProps = {
  icon: ReactNode;
  minute: string;
  delay: number;
};

function MatchEvent({ icon, minute, delay }: MatchEventProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        delay,
      }}
      className="flex flex-col items-center justify-center"
    >
      {icon}
      <span className="text-[10px] text-white/60">{minute}</span>
    </motion.div>
  );
}

function EventDivider() {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        delay: 0,
      }}
      className="h-[50%] w-[1px] bg-white/60"
    />
  );
}

type TeamScoreProps = {
  team: Team;
  score: number;
  side: "left" | "right";
  animationState: "collapsed" | "expanded";
};

function TeamScore({ team, score, side, animationState }: TeamScoreProps) {
  const direction = side === "left" ? 1 : -1;
  const isExpanded = animationState === "expanded";

  return (
    <motion.div
      className={cn(
        "flex w-full items-center gap-4",
        side === "right" ? "flex-row-reverse" : "flex-row",
      )}
    >
      {/* Team logo component */}
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
          type: "linear",
          delay: isExpanded ? 0 : 0.6,
        }}
      >
        <Image alt={team.logoAlt} width={36} height={36} src={team.logoSrc} />
      </motion.div>

      {/* Team name/code component */}
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

      {/* Team score component with bottom-to-top count animation */}
      <AnimatedScore
        score={score}
        direction={direction}
        animationState={animationState}
      />
    </motion.div>
  );
}

type AnimatedScoreProps = {
  score: number;
  direction: number;
  animationState: "collapsed" | "expanded";
};

function AnimatedScore({
  score,
  direction,
  animationState,
}: AnimatedScoreProps) {
  const displayScore = useCountUpScore(score);

  return (
    <motion.span
      custom={direction}
      animate={animationState}
      variants={scoreVariants}
      transition={{
        delay: animationState === "expanded" ? 0 : 0.71,
        duration: 0.275,
      }}
      className="relative block h-7 min-w-4 overflow-hidden text-xl font-bold text-white"
    >
      <AnimatePresence mode="popLayout" initial={false}>
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
            y: -24,
            opacity: 0,
          }}
          transition={{
            duration: 0.25,
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

function useCountUpScore(score: number) {
  const previousScoreRef = useRef(score);
  const [displayScore, setDisplayScore] = useState(score);

  useEffect(() => {
    const previousScore = previousScoreRef.current;

    if (previousScore === score) return;

    const direction = score > previousScore ? 1 : -1;
    let currentScore = previousScore;

    const intervalId = window.setInterval(() => {
      currentScore += direction;
      setDisplayScore(currentScore);

      if (currentScore === score) {
        previousScoreRef.current = score;
        window.clearInterval(intervalId);
      }
    }, 180);

    return () => window.clearInterval(intervalId);
  }, [score]);

  return displayScore;
}
