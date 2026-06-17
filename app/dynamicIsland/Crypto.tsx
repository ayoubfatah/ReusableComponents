"use client";

import { motion } from "framer-motion";
import { containerVariants } from "./Football/data/animationData";
import { MatchScore } from "./Football/data/data";

const containerVariants: Variants = {
  collapsed: {
    height: 56,
    width: 330,
    borderRadius: 50,
  },
  expanded: {
    height: 180,
    width: 400,
    borderRadius: 50,
  },
  showStats: {
    height: 280,
    width: 400,
    borderRadius: 50,
  },
};

export function Crypto() {
  return <CompactFootball />;
}

type CompactFootballProps = {};

function CompactFootball({}: CompactFootballProps) {
  return (
    <motion.button
      type="button"
      variants={containerVariants}
      transition={{
        duration: 0.5,
        type: "spring",
        bounce: 0.2,
      }}
      className="flex flex-col items-center overflow-hidden bg-red-500 pb-4 px-4 pt-3"
    >
      <div className="flex w-full items-start justify-between"></div>
    </motion.button>
  );
}
