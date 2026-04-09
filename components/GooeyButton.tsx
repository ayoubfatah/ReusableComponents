"use client";

import { ReactNode, useEffect, useState } from "react";

type GooeyButtonProps = {
  icon: ReactNode;
  color?: string;
  size?: number;
  blurRadius?: number;
  isOpen?: boolean;
};

const GooeyButton = ({
  icon,
  color = "black",
  size = 64,
  blurRadius = 10,
  isOpen = false,
}: GooeyButtonProps) => {
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
          {/* Gooey button */}
          <button
            className="relative z-[9999] flex items-center justify-center shadow-lg transition-transform duration-300 rounded-full"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: color,
              transformOrigin: "center",
            }}
            aria-label="Gooey button"
          >
            {hideSvg && (
              <div className={`${hideSvg ? "text-white" : ""}`}>{icon}</div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GooeyButton;
