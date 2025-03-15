"use client";
import React, { useState } from "react";
import "./horizontal.css";
import { AnimatePresence, motion } from "framer-motion";

export const menuSlide = {
  initial: {
    y: "-150%",
  },
  enter: {
    y: "0%",
    transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
  },
  exit: {
    y: "-150%",
    transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
  },
};

export default function Page() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  //prettier-ignore
  const initialPath = `M0 0 Q 1000 220 2000 0`;
  //prettier-ignore
  // const targetPath = `M0 0 Q 1000 0 2000 0`;
  const targetPath = `M0 0 Q 1000 0 2000 0`;

  const pathAnimation = {
    initial: {
      d: initialPath,
    },
    enter: {
      d: targetPath,
      transition: { duration: 1, delay: 0, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      d: initialPath,
      transition: { duration: 1, delay: 0, ease: [0.76, 0, 0.24, 1] },
    },
  };
  return (
    <div>
      <div className="bg-black h-screen w-full relative ">
        <button
          onClick={toggleMenu}
          className="flex flex-col z-[100] items-center justify-center gap-3 absolute top-0 right-0 m-10 bg-blue-500 w-[60px] h-[60px] rounded-full"
        >
          <span
            className={`bg-white w-6 h-[2px] transition-transform ${
              isOpen ? "rotate-45 translate-y-2" : ""
            }`}
          ></span>

          <span
            className={`bg-white w-6 h-[2px] transition-transform ${
              isOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          ></span>
        </button>

        <AnimatePresence mode="sync">
          {isOpen && (
            <motion.nav
              variants={menuSlide}
              animate="enter"
              exit="exit"
              initial="initial"
              className="bg-white w-full h-[250px] top-0 left-0"
            >
              <div>s</div>
              <svg className="svgCurveHorizontal">
                <motion.path
                  variants={pathAnimation}
                  initial="initial"
                  animate="enter"
                  exit="exit"
                  // d="M0 0 Q 1000 100 2000 0"
                />
              </svg>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
