"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const WORDS = ["REACT", "CRATE", "TRACE", "CATER", "RECTA"];
// const WORDS = ["FRAMER", "REFRAM", "FARMER", "RAMREF"];
// const WORDS = ["SHADOW", "DOSHAW", "WASHOD", "HOWDAS"];
// const WORDS = ["LAYOUT", "OUTLAY", "TALYOU", "YOUTAL"];

const BUTTON_WORDS = ["CONNECT", "CONNECTING", "CONNECTED", "ONLINE"];
const BUTTON_WORDS2 = ["RENDER", "RENDERING", "RENDERED", "VISIBLE"];

export default function Page() {
  const [index, setIndex] = useState(0);
  const [buttonIndex, setButtonIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % WORDS.length);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setButtonIndex((prev) => (prev + 1) % BUTTON_WORDS.length);
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="bg-black text-white">
      <section className="grid min-h-screen place-items-center">
        <Morph className="text-7xl font-black tracking-tight">
          {WORDS[index]}
        </Morph>
      </section>

      <section className="grid min-h-screen place-items-center">
        <motion.button
          whileTap={{ scale: 0.96 }}
          className="rounded-full border text-black border-white/10 bg-white px-8 py-4 text-xl font-semibold backdrop-blur"
        >
          <Morph className="text-xl font-semibold tracking-tight">
            {BUTTON_WORDS[buttonIndex]}
          </Morph>
        </motion.button>
      </section>
      <section className="grid min-h-screen place-items-center">
        <motion.button
          whileTap={{ scale: 0.96 }}
          className="rounded-full border text-black border-white/10 bg-white px-8 py-4 text-xl font-semibold backdrop-blur"
        >
          <Morph className="text-xl font-semibold tracking-tight">
            {BUTTON_WORDS2[buttonIndex]}
          </Morph>
        </motion.button>
      </section>
    </main>
  );
}

function Morph({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  const generateKeys = (text: string) => {
    const charCount: Record<string, number> = {};

    return text.split("").map((char) => {
      if (!charCount[char]) {
        charCount[char] = 0;
      }

      const key = `${char}-${charCount[char]}`;
      charCount[char]++;

      return { char, key };
    });
  };

  return (
    <div className={`flex ${className}`}>
      <AnimatePresence mode="popLayout">
        {generateKeys(children).map(({ char, key }) => (
          <motion.span
            key={key}
            layout
            initial={{
              opacity: 0,
              filter: "blur(10px)",
              y: 30,
            }}
            animate={{
              opacity: 1,
              filter: "blur(0px)",
              y: 0,
            }}
            exit={{
              opacity: 0,
              filter: "blur(10px)",
              y: -30,
            }}
            transition={{
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {char}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}
