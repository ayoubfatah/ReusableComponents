"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { MatchDetails } from "./Football/components/MatchDetails";
import { ScoreDivider } from "./Football/components/ScoreDevider";
import { TeamScore } from "./Football/components/TeamScore";
import { containerVariants } from "./Football/data/animationData";
import {
  initialEvents,
  initialScore,
  MatchEventData,
  MatchScore,
  matchStats,
  teams,
} from "./Football/data/data";
import { MatchStats } from "./Football/components/MatchStats";

export function Football() {
  const [score, setScore] = useState<MatchScore>(initialScore);

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
  const [isShowStats, setIShowStats] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [events, setEvents] = useState<MatchEventData[]>(initialEvents);

  const previousScoreRef = useRef(score);

  const animationState = isShowStats
    ? "showStats"
    : expanded
      ? "expanded"
      : "collapsed";

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key === "5") {
        setExpanded(false);
        setIShowStats(false);
      }
      if (event.key === "7") {
        setIShowStats(true);
      }

      if (event.key === "6") {
        setExpanded(true);
        setIShowStats(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  useEffect(() => {
    const previousScore = previousScoreRef.current;

    teams.forEach((team) => {
      const previous = previousScore[team.code];
      const current = score[team.code];

      if (current > previous) {
        const goalsScored = current - previous;

        setEvents((currentEvents) => [
          ...currentEvents,
          ...Array.from({ length: goalsScored }).map((_, index) => ({
            id: `${team.code}-goal-${Date.now()}-${index}`,
            teamCode: team.code,
            type: "goal" as const,
            minute: "52",
          })),
        ]);
      }
    });

    previousScoreRef.current = score;
  }, [score]);

  return (
    <motion.button
      type="button"
      aria-expanded={expanded}
      onClick={() => setExpanded((current) => !current)}
      variants={containerVariants}
      animate={animationState}
      transition={{
        duration: 0.5,
        type: "spring",
        bounce: 0.2,
      }}
      className="flex flex-col items-center overflow-hidden bg-black pb-4 px-4 pt-3"
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

      <AnimatePresence mode="wait">
        {expanded && !isShowStats && (
          <MatchDetails minute={52} key={"kldslfjsklf"} events={events} />
        )}
      </AnimatePresence>

      {isShowStats && <MatchStats stats={matchStats} />}
    </motion.button>
  );
}
