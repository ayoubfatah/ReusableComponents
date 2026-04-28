import { motion } from "framer-motion";

export function TakenButton() {
  return (
    <motion.button className="font-semibold px-4 py-2 rounded-full transition-colors duration-300 bg-[#c00b17] text-white h-10">
      <motion.span
        className="flex items-center gap-2 justify-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2, ease: [0.5, 1, 0.89, 1] }}
      >
        Slug is taken
      </motion.span>
    </motion.button>
  );
}
