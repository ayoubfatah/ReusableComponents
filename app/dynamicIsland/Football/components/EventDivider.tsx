import { motion } from "framer-motion";
export function EventDivider() {
  return (
    <motion.div
      layout
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={
        {
          // delay: 0.5,
        }
      }
      className="h-[50%] w-[1px] bg-white/60"
    />
  );
}
