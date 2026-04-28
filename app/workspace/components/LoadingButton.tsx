import { motion } from "framer-motion";
import { LoadingSpinnerIcon } from "../icons";

export function LoadingButton() {
  return (
    <button
      disabled
      className="font-semibold px-4 py-2 rounded-full bg-gray-100 text-gray-400"
    >
      <motion.span
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.2, ease: [0.5, 1, 0.89, 1] }}
        className="flex items-center gap-2 justify-center"
      >
        <LoadingSpinnerIcon /> Verifying
      </motion.span>
    </button>
  );
}
