"use client";
import { useRef } from "react";
import useMousePosition from "../magneticCursor/useMousePosition";
import MagneticChar from "./MagneticChar";

const text = "Just keep swimming.";

export default function Page() {
  const { x: mouseX, y: mouseY } = useMousePosition();
  const ref = useRef<null | HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className="bg-black text-white h-screen w-full flex flex-col justify-center items-center text-[84px] "
    >
      <div className="flex items-center gap-5">
        {text.split(" ").map((char, i) => (
          <MagneticChar
            threshold={200}
            key={i}
            char={char}
            mouseX={mouseX}
            mouseY={mouseY}
          />
        ))}
      </div>
      <p className="text-[16px]">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi, quos?
      </p>
    </div>
  );
}
