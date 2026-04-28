import { motion } from "framer-motion";
import { LoadingSpinnerIcon } from "../icons";

export function ConfirmingButton() {
  return (
    <motion.button
      disabled
      className="font-semibold px-4 py-2 text-gray-400 rounded-full "
    >
      <motion.span
        initial={{ opacity: 0, y: 8, filter: "blur(12px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -8, filter: "blur(12px)" }}
        transition={{ duration: 0.2, ease: [0.5, 1, 0.89, 1] }}
        className="flex items-center gap-2 justify-center"
      >
        <LoadingSpinnerIcon /> Confirming...
      </motion.span>
    </motion.button>
  );
}
