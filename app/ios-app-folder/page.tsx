"use client";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const closingSpringValues = {
  type: "spring",
  bounce: 0.1,
  duration: 0.5,
};
const openingSpringValues = {
  type: "spring",
  bounce: 0.35,
  duration: 0.7,
};

const variants = {
  initial: { scale: 0.3, opacity: 0.5, filter: "blur(5px)" },
  animate: { scale: 1, opacity: 1, filter: "blur(0px)" },
  exit: { scale: 0.3, opacity: 0.5, filter: "blur(5px)" },
};

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <main
      onClick={() => setIsOpen(!isOpen)}
      className="h-screen w-full flex justify-center items-center bg-gray-100"
    >
      {/* card with icons inside  */}
      {!isOpen && (
        <AnimatePresence initial={false} mode="popLayout">
          <div className="grid grid-cols-2 gap-4  bg-white shadow-md rounded-xl p-4">
            <MotionConfig transition={closingSpringValues}>
              <motion.img
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                width={80}
                height={80}
                src="https://examples.motion.dev/photos/creativestudio/finalcuticon.png"
                alt="finalcuticon "
                className="w-20 h-20 rounded-lg object-cover"
              />
              <motion.img
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                width={80}
                height={80}
                src="https://examples.motion.dev/photos/creativestudio/pixelmatorpro.png"
                alt="Pixelmator "
                className="w-20 h-20 rounded-lg object-cover"
              />

              <motion.img
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                width={80}
                height={80}
                src="https://examples.motion.dev/photos/creativestudio/logicpro.png"
                alt="logicpro "
                className="w-20 h-20 rounded-lg object-cover"
              />

              <div className="grid grid-cols-2 gap-2">
                <motion.img
                  layoutId="keynote"
                  width={40}
                  height={40}
                  src="https://examples.motion.dev/photos/creativestudio/keynote.png"
                  alt="Keynote"
                  className="size-9 rounded object-cover"
                />
                <motion.img
                  layoutId="compressor"
                  width={40}
                  height={40}
                  src="https://examples.motion.dev/photos/creativestudio/compressor.png"
                  alt="Compressor"
                  className="size-9 rounded object-cover"
                />

                <motion.img
                  layoutId="freeform"
                  width={40}
                  height={40}
                  src="https://examples.motion.dev/photos/creativestudio/freeform.png"
                  alt="Freeform"
                  className="size-9 rounded object-cover"
                />
                <motion.img
                  layoutId="numbers"
                  width={40}
                  height={40}
                  src="https://examples.motion.dev/photos/creativestudio/numbers.png"
                  alt="numbers"
                  className="size-9 rounded object-cover"
                />
              </div>
            </MotionConfig>
          </div>
        </AnimatePresence>
      )}

      {/* opened card */}
      {isOpen && (
        <AnimatePresence mode="wait">
          <MotionConfig transition={openingSpringValues}>
            <motion.div
              onClick={() => setIsOpen(false)}
              className="grid grid-cols-4 gap-4"
            >
              <motion.div
                variants={variants}
                initial={{
                  y: 100,
                  x: 100,
                  scale: 0.3,
                  opacity: 0.5,
                  filter: "blur(5px)",
                }}
                animate={{
                  y: 0,
                  x: 0,
                  scale: 1,
                  opacity: 1,
                  filter: "blur(0px)",
                }}
                exit="exit"
                className="flex flex-col items-center gap-2"
              >
                <Image
                  width={64}
                  height={64}
                  src="https://examples.motion.dev/photos/creativestudio/pixelmatorpro.png"
                  alt="Pixelmator Pro"
                  className="size-20"
                />
                <p className="font-semibold text-sm">Pixelmator Pro</p>
              </motion.div>

              <motion.div
                variants={variants}
                initial={{
                  y: 90,
                  x: 40,
                  scale: 0.3,
                  opacity: 0.5,
                  filter: "blur(5px)",
                }}
                animate={{
                  y: 0,
                  x: 0,
                  scale: 1,
                  opacity: 1,
                  filter: "blur(0px)",
                }}
                exit="exit"
                className="flex flex-col items-center gap-2"
              >
                <Image
                  width={64}
                  height={64}
                  src="https://examples.motion.dev/photos/creativestudio/finalcuticon.png"
                  alt="Final Cut"
                  className="size-20"
                />
                <p className="font-semibold text-sm">Final Cut</p>
              </motion.div>

              <motion.div
                variants={variants}
                initial={{
                  y: 90,
                  x: -40,
                  scale: 0.3,
                  opacity: 0.5,
                  filter: "blur(5px)",
                }}
                animate={{
                  x: 0,
                  y: 0,
                  scale: 1,
                  opacity: 1,
                  filter: "blur(0px)",
                }}
                exit="exit"
                className="flex flex-col items-center gap-2"
              >
                <Image
                  width={64}
                  height={64}
                  src="https://examples.motion.dev/photos/creativestudio/logicpro.png"
                  alt="Logic Pro"
                  className="size-20"
                />
                <p className="font-semibold text-sm">Logic Pro</p>
              </motion.div>

              <motion.div
                variants={variants}
                initial={{
                  y: 50,
                  x: -50,
                  scale: 0.3,
                  opacity: 0.5,
                  filter: "blur(5px)",
                }}
                animate={{
                  y: 0,
                  x: 0,
                  scale: 1,
                  opacity: 1,
                  filter: "blur(0px)",
                }}
                exit="exit"
                transition={{
                  delay: 0.05,
                }}
                layoutId="pages"
                className="flex flex-col items-center gap-2"
              >
                <Image
                  width={64}
                  height={64}
                  src="https://examples.motion.dev/photos/creativestudio/pages.png"
                  alt="Pages"
                  className="size-20"
                />
                <p className="font-semibold text-sm">Pages</p>
              </motion.div>

              <motion.div
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                layoutId="keynote"
                className="flex flex-col items-center gap-2"
              >
                <Image
                  width={64}
                  height={64}
                  src="https://examples.motion.dev/photos/creativestudio/keynote.png"
                  alt="Keynote"
                  className="size-20"
                />
                <p className="font-semibold text-sm">Keynote</p>
              </motion.div>

              <motion.div
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                layoutId="compressor"
                className="flex flex-col items-center gap-2"
              >
                <Image
                  width={64}
                  height={64}
                  src="https://examples.motion.dev/photos/creativestudio/compressor.png"
                  alt="Compressor"
                  className="size-20"
                />
                <p className="font-semibold text-sm">Compressor</p>
              </motion.div>

              <motion.div
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                layoutId="freeform"
                className="flex flex-col items-center gap-2"
              >
                <Image
                  width={64}
                  height={64}
                  src="https://examples.motion.dev/photos/creativestudio/freeform.png"
                  alt="Freeform"
                  className="size-20"
                />
                <p className="font-semibold text-sm">Freeform</p>
              </motion.div>

              <motion.div
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                layoutId="numbers"
                className="flex flex-col items-center gap-2"
              >
                <Image
                  width={64}
                  height={64}
                  src="https://examples.motion.dev/photos/creativestudio/numbers.png"
                  alt="Numbers"
                  className="size-20"
                />
                <p className="font-semibold text-sm">Numbers</p>
              </motion.div>
            </motion.div>
          </MotionConfig>
        </AnimatePresence>
      )}
    </main>
  );
}
