"use client";

import { ReactNode, useEffect, useState } from "react";
import { Bell, Home, Mail, Settings, User } from "./icons";
import { motion } from "framer-motion";

type Buttons = {
  icon: ReactNode;
  position: { x: number; y: number };
  delay: number;
};

type GooeyButtonMenu = {
  buttons: Buttons[];
  color: string;
  mainButtonSize: number;
  childButtonSize: number;
  blurRadius: number;
};
const GooeyButtonMenu = ({
  buttons,
  color = "black",
  mainButtonSize = 64,
  childButtonSize = 56,
  blurRadius = 10,
}: GooeyButtonMenu) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hideSvg, setHideSvg] = useState(false);
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (isOpen) {
      timeoutId = setTimeout(() => {
        setHideSvg(true);
      }, 690);
    } else {
      timeoutId = setTimeout(() => {
        setHideSvg(false);
      }, 130);
    }

    return () => clearTimeout(timeoutId);
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const childHalfSize = childButtonSize / 2;

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="relative">
        {/* SVG filter that creates the gooey effect */}
        {!hideSvg && (
          <svg
            className="z-[20]"
            style={{ position: "absolute", width: 0, height: 0 }}
          >
            <defs>
              <filter id="gooey">
                {/* Blur the original shapes */}
                <feGaussianBlur
                  in="SourceGraphic"
                  stdDeviation={blurRadius}
                  result="blur"
                />
                {/* Adjust color values and alpha to create the gooey effect */}
                <feColorMatrix
                  in="blur"
                  mode="matrix"
                  values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                  result="gooey"
                />
              </filter>
            </defs>
          </svg>
        )}
        {/* Container with the gooey filter applied */}
        <div
          className="relative"
          style={{ filter: "url('#gooey')", WebkitFilter: "url('#gooey')" }}
        >
          {/* Main toggle button */}
          <button
            className="relative z-[9999]  flex items-center justify-center shadow-lg transition-transform duration-300 rounded-full"
            style={{
              width: `${mainButtonSize}px`,
              height: `${mainButtonSize}px`,
              backgroundColor: color,
              transformOrigin: "center",
            }}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {/* <Plus
              size={mainButtonSize * 0.45}
              className={cn("", {
                "!text-white": hideSvg,
              })}
            /> */}
          </button>

          {/* Map through and render all child buttons */}
          {buttons.map((btn, index) => (
            <button
              key={index}
              className="absolute flex items-center justify-center shadow-lg transition-all duration-[600ms] rounded-full"
              style={{
                width: `${childButtonSize}px`,
                height: `${childButtonSize}px`,
                backgroundColor: color,
                top: "50%",
                left: "50%",
                marginTop: `-${childHalfSize}px`,
                marginLeft: `-${childHalfSize}px`,
                transform: isOpen
                  ? `translate(${btn.position.x}px, ${btn.position.y}px)`
                  : "translate(0, 0)",
                opacity: isOpen ? 1 : 0,
                zIndex: isOpen ? 5 : -1,
                transitionDelay: `${btn.delay}s`,
              }}
              aria-label={`Menu button ${index + 1}`}
            >
              {hideSvg && (
                <div className={`${hideSvg ? "text-white" : ""}`}>
                  {btn.icon}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function Page() {
  const [position, setPosition] = useState<"top" | "right" | "left">("top");

  function initialPositions(): Buttons[] {
    const customButtonsLeft = [
      { icon: <User />, position: { x: 0, y: -120 }, delay: 0.42 },
      { icon: <Mail />, position: { x: -95, y: -90 }, delay: 0.32 },
      { icon: <Home />, position: { x: -125, y: 0 }, delay: 0.22 },
      { icon: <Bell />, position: { x: -95, y: 85 }, delay: 0.12 },
      { icon: <Settings />, position: { x: 0, y: 120 }, delay: 0 },
    ];
    const customButtonsRight = [
      { icon: <User />, position: { x: 0, y: -120 }, delay: 0.42 },
      { icon: <Mail />, position: { x: 85, y: -85 }, delay: 0.32 },
      { icon: <Home />, position: { x: 120, y: 0 }, delay: 0.22 },
      { icon: <Bell />, position: { x: 95, y: 90 }, delay: 0.12 },
      { icon: <Settings />, position: { x: 0, y: 120 }, delay: 0.0 },
    ];
    const customButtonsTop = [
      { icon: <Home />, position: { x: -120, y: 3 }, delay: 0 },
      { icon: <Bell />, position: { x: -85, y: -85 }, delay: 0.12 },
      { icon: <Mail />, position: { x: 0, y: -120 }, delay: 0.22 },
      { icon: <User />, position: { x: 85, y: -85 }, delay: 0.32 },
      { icon: <Settings />, position: { x: 120, y: 3 }, delay: 0.42 },
    ];
    if (position == "right") return customButtonsRight;
    if (position == "left") return customButtonsLeft;
    return customButtonsTop;
  }

  return (
    <div className="flex flex-col items-center">
      {/* Buttons for selection */}
      <div className="relative flex justify-center gap-10 translate-y-[100px]">
        {["left", "top", "right"].map((pos) => (
          <button
            key={pos}
            className="relative cursor-pointer px-4 py-2 font-semibold"
            onClick={() => setPosition(pos as "top" | "right" | "left")}
          >
            {pos.toUpperCase()}
            {position === pos && (
              <motion.div
                layoutId="activeIndicator"
                className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1 w-[4px] bg-black rounded-full"
              />
            )}
          </button>
        ))}
      </div>

      {/* GooeyButtonMenu */}
      <GooeyButtonMenu
        buttons={initialPositions()}
        color="black"
        mainButtonSize={70}
        childButtonSize={60}
        blurRadius={12}
      />
    </div>
  );
}

// to the right
