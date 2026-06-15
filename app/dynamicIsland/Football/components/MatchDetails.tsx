import { MatchEventData } from "../data/data";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { MatchEvent } from "./MatchEvent";
import { Goal, YellowCard } from "./Icons";
import { EventDivider } from "./EventDivider";

type MatchDetailsProps = {
  events: MatchEventData[];
  minute: number;
};

export function MatchDetails({ events, minute }: MatchDetailsProps) {
  const [displayMinute, setDisplayMinute] = useState(minute - 1);

  const moroccoEvents = events.filter((event) => event.teamCode === "MA");
  const brazilEvents = events.filter((event) => event.teamCode === "BR");

  useEffect(() => {
    setDisplayMinute(minute - 1);

    const timeoutId = window.setTimeout(() => {
      setDisplayMinute(minute);
    }, 600);

    return () => window.clearTimeout(timeoutId);
  }, [minute]);

  return (
    <motion.div
      exit={{
        opacity: 0,
        y: 20,
      }}
      className="mt-6 flex flex-col gap-2"
    >
      <motion.div
        key={displayMinute}
        initial={{
          opacity: 0,
          y: 8,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.25,
        }}
        className="font-medium text-green-500"
      >
        {displayMinute}
      </motion.div>

      <motion.div
        layout
        initial={{
          opacity: 0,
          width: 40,
          height: 59,
        }}
        animate={{
          opacity: 1,
          width: 120,
          height: 59,
        }}
        transition={{
          delay: 0.5,
          duration: 0.7,
        }}
        className="flex items-center justify-center gap-3 rounded-full bg-white/10"
      >
        {moroccoEvents.map((event) => (
          <MatchEvent
            key={event.id}
            delay={0}
            icon={event.type === "goal" ? <Goal /> : <YellowCard size={30} />}
            minute={event.minute}
          />
        ))}

        <EventDivider />

        {brazilEvents.map((event, index) => (
          <MatchEvent
            key={event.id}
            delay={0.55 + index * 0.1}
            icon={event.type === "goal" ? <Goal /> : <YellowCard size={30} />}
            minute={event.minute}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
