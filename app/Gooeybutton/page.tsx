"use client";

import { ReactNode, useEffect, useState } from "react";
import { Bell, Home, Mail, Settings, User } from "./icons";

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
  // Example of custom buttons configuration
  const customButtons = [
    {
      icon: <Home />,
      position: { x: -120, y: 3 },
      delay: 0,
    },
    {
      icon: <Bell />,
      position: { x: -85, y: -85 },
      delay: 0.12,
    },
    {
      icon: <Mail />,
      position: { x: 0, y: -120 },
      delay: 0.22,
    },
    {
      icon: <User />,
      position: { x: 85, y: -85 },
      delay: 0.32,
    },

    {
      icon: <Settings />,
      position: { x: 120, y: 3 },
      delay: 0.42,
    },
  ];

  return (
    <GooeyButtonMenu
      buttons={customButtons}
      color="black"
      mainButtonSize={70}
      childButtonSize={60}
      blurRadius={12}
    />
  );
}

// to the right
// {
//   icon: <Home />,
//   position: { x: 0, y: 120 },
//   delay: 0,
// },
// {
//   icon: <Bell />,
//   position: { x: 95, y: 90 },
//   delay: 0.12,
// },
// {
//   icon: <Mail />,
//   position: { x: 0, y: -120 },
//   delay: 0.22,
// },
// {
//   icon: <User />,
//   position: { x: 85, y: -85 },
//   delay: 0.32,
// },
// {
//   icon: <Settings />,
//   position: { x: 120, y: 0 },
//   delay: 0.42,
// },
