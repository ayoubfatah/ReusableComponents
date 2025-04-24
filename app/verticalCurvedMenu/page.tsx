"use client";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import "./curvedMenu.css";
import Navbar from "./Navbar";

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-black h-screen w-full relative ">
      <button
        onClick={toggleMenu}
        className="flex flex-col z-[100] items-center justify-center gap-3 absolute top-0 right-0 m-10 bg-blue-500 w-[60px] h-[60px] rounded-full"
      >
        <span
          className={`bg-white w-6 h-[1.5px] transition-transform ${
            isOpen ? "rotate-45 translate-y-2" : ""
          }`}
        ></span>

        <span
          className={`bg-white w-6 h-[1.5px] transition-transform ${
            isOpen ? "-rotate-45 -translate-y-1.5" : ""
          }`}
        ></span>
      </button>

      <AnimatePresence mode="wait">{isOpen && <Navbar />}</AnimatePresence>
    </div>
  );
};

export default BurgerMenu;
