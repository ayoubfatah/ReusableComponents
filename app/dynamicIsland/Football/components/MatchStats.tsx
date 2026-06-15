import { motion } from "framer-motion";
import { Goal, YellowCard } from "./Icons";
import { MatchStatsData, teams } from "../data/data";

type MatchStatsProps = {
  stats: MatchStatsData;
};

export function MatchStats({ stats }: MatchStatsProps) {
  const leftTeam = teams[0];
  const rightTeam = teams[1];

  const leftEvents = stats.events.filter(
    (event) => event.teamCode === leftTeam.code,
  );

  const rightEvents = stats.events.filter(
    (event) => event.teamCode === rightTeam.code,
  );

  return (
    <motion.div
      variants={statsContainerVariants}
      initial="hidden"
      animate="show"
      exit="hidden"
      className="mt-10 w-full text-white flex flex-col gap-2 px-6 pt-3"
    >
      <div className="text-green-500 w-full relative">
        <motion.span
          variants={minuteVariants}
          className="absolute top-1/2 right-1/2 translate-x-[50%] translate-y-[-50%] z-99999"
        >
          {stats.minute}
        </motion.span>
      </div>

      <motion.div
        variants={statsItemVariants}
        className="text-white font-semibold text-xl flex justify-between"
      >
        <span>{leftTeam.code}</span>
        <span>{rightTeam.code}</span>
      </motion.div>

      <motion.div variants={statsGroupVariants} className="flex flex-col">
        <motion.div
          variants={statsItemVariants}
          className="flex justify-between"
        >
          <span>{stats.possession[leftTeam.code]}%</span>
          <span className="uppercase tracking-wide">Possession</span>
          <span>{stats.possession[rightTeam.code]}%</span>
        </motion.div>

        <motion.div
          variants={statsItemVariants}
          className="relative w-full h-[4px] bg-white/60 mt-3 rounded-full overflow-hidden"
        >
          <motion.div
            variants={possessionBarVariants}
            custom={stats.possession[leftTeam.code]}
            className="absolute left-0 top-0 h-full bg-white rounded-full"
          />
        </motion.div>

        <motion.div
          variants={statsGroupVariants}
          className="flex justify-between mt-2"
        >
          <div className="flex flex-col items-start">
            {leftEvents.map((event) => (
              <StatEvent key={event.id} event={event} />
            ))}
          </div>

          <div className="flex flex-col items-start">
            {rightEvents.map((event) => (
              <StatEvent key={event.id} event={event} />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function StatEvent({ event }: { event: MatchStatsData["events"][number] }) {
  return (
    <motion.div
      variants={statsItemVariants}
      className="grid grid-cols-[16px_32px_auto] gap-1.5"
    >
      {event.type === "goal" ? <Goal /> : <YellowCard size={20} />}
      <span className="text-gray-400">{event.minute}´</span>
      <span>{event.player}</span>
    </motion.div>
  );
}

const statsContainerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.25,
    },
  },
};

const statsGroupVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const statsItemVariants = {
  hidden: {
    opacity: 0,
    y: 10,
    scale: 0.96,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
};

const minuteVariants = {
  hidden: {
    opacity: 0,
    y: 60,
  },
  show: {
    opacity: 1,
    y: 0,
  },
};

const possessionBarVariants = {
  hidden: {
    width: "0%",
  },
  show: (width: number) => ({
    width: `${width}%`,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  }),
};
