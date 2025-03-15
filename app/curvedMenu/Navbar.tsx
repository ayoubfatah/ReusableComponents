import React from "react";
import { menuSlide, slide } from "./anim";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Curve from "./curve";

const navConfig = [{ title: "Home" }, { title: "Work" }, { title: "Contact" }];

export default function Navbar() {
  return (
    <motion.nav
      variants={menuSlide}
      animate="enter"
      exit="exit"
      initial="initial"
      className={cn(
        "  flex flex-col justify-center items-center bg-[#292929] z-[10]   w-[350px] h-full fixed top-0 right-0"
      )}
    >
      <ul className="flex flex-col justify-center gap-10 text-white text-[28px] cursor-pointer">
        {navConfig.map((nav, i) => (
          <motion.li
            key={nav.title}
            variants={slide}
            animate="enter"
            exit="exit"
            initial="initial"
            custom={i}
          >
            {nav.title}
          </motion.li>
        ))}
      </ul>
      <Curve />
    </motion.nav>
  );
}
