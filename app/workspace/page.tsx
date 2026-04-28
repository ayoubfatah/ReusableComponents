"use client";

import { motion } from "framer-motion";
import { MainContent } from "./components/MainContent";

export default function Page() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.24 }}
      className="h-screen flex flex-col justify-center items-center gap-0"
    >
      <MainContent />
    </motion.main>
  );
}
