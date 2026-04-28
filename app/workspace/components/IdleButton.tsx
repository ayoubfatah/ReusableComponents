import { motion } from "framer-motion";

export function IdleButton() {
  return (
    <motion.button className="font-semibold px-4 py-2 rounded-full bg-gray-100 text-gray-400">
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2, ease: [0.5, 1, 0.89, 1] }}
      >
        Continue
      </motion.span>
    </motion.button>
  );
}
