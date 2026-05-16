import React from "react";
import { motion } from "framer-motion";

export default function IntegrationConnected() {
  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center justify-center gap-2.5 py-10 px-7 h-[200px]"
    >
      <div className="w-10 h-10 rounded-full bg-[#edfaee] border border-[#c6f0c8] flex items-center justify-center mb-1">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#2dc138"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            d="M5 12l5 5L20 6"
          />
        </svg>
      </div>

      <p className="text-[15px] font-medium text-[#111]">
        Integration connected
      </p>
      <p className="text-[13px] text-[#888] text-center">
        Your workspace is live and receiving events.
      </p>
    </motion.div>
  );
}
