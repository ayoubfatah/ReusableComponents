"use client";
import { animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// The SVG paths for the numbers.
// Currently contains 1 through 5.
// To support unique shapes for 6-20, add the path strings to this array.
const numbers = [
  "M192.82129,50.2793C177.64941,25.23682,155.23437,12,128,12S78.35059,25.23682,63.17871,50.2793C50.81055,70.69238,44,98.294,44,128c0,29.70361,6.81055,57.30469,19.17773,77.71777C78.35059,230.76221,100.76562,244,128,244s49.64941-13.23779,64.82227-38.28223C205.18945,185.30469,212,157.70361,212,128,212,98.294,205.18945,70.69238,192.82129,50.2793ZM128,220c-41.44727,0-60-46.20654-60-92s18.55273-92,60-92,60,46.20654,60,92S169.44727,220,128,220Z",
  "M87.9,79.2c1.1-0.4,53.7-39.2,54.9-39.1v180.5", // 1
  "M81.7,85.7c-1.4-67,112.3-55.1,90.2,11.6c-12.6,32-70.6,83.7-88.8,113.7h105.8", // 2
  "M74.8,178.5c3,39.4,63.9,46.7,88.6,23.7c34.3-35.1,5.4-75.8-41.7-77c29.9,5.5,68.7-43.1,36.5-73.7 c-23.4-21.5-76.5-11.1-78.6,25", // 3
  "M161.9,220.8 161.9,41 72.6,170.9 208.2,170.9", // 4
  "M183.2,43.7H92.1l-10,88.3c0,0,18.3-21.9,51-21.9s49.4,32.6,49.4,48.2c0,22.2-9.5,57-52.5,57s-51.4-36.7-51.4-36.7", // 5
  "M128,100a68.12932,68.12932,0,0,0-11.18555.936l37.48828-62.78418a11.99965,11.99965,0,1,0-20.60546-12.30372L69.208,133.85278c-.10913.18286-.19776.37183-.2959.55786A67.9766,67.9766,0,1,0,128,100Zm0,112a43.97716,43.97716,0,0,1-37.7439-66.585l.18872-.31592A43.99446,43.99446,0,1,1,128,212Z",
  "M187.38379,43.79492l-64,192a11.99967,11.99967,0,1,1-22.76758-7.58984L159.35059,52H80a12,12,0,0,1,0-24h96a11.999,11.999,0,0,1,11.38379,15.79492Z",
  "M178.64062,127.08447a72.0157,72.0157,0,0,0-11.4873-8.77881,62.79451,62.79451,0,0,0,4.96-4.18505,57.63178,57.63178,0,0,0,0-84.90772,65.13331,65.13331,0,0,0-88.22656,0,57.63178,57.63178,0,0,0,0,84.90772,62.83973,62.83973,0,0,0,4.96,4.18505,72.03006,72.03006,0,0,0-11.48731,8.7793,65.92976,65.92976,0,0,0,0,97.16406,74.795,74.795,0,0,0,101.28125-.00048,65.92975,65.92975,0,0,0,0-97.16407ZM100.31445,96.62354a33.63846,33.63846,0,0,1,0-49.91358,41.13895,41.13895,0,0,1,55.3711,0,33.63846,33.63846,0,0,1,0,49.91358,41.13895,41.13895,0,0,1-55.3711,0ZM162.21289,206.752a50.80186,50.80186,0,0,1-68.42578.00049,41.93735,41.93735,0,0,1,0-62.1709,50.80188,50.80188,0,0,1,68.42578-.00049,41.93735,41.93735,0,0,1,0,62.1709Z",
  "M186.78223,122.16455c.116-.1936.21069-.39331.31469-.59058a68.02482,68.02482,0,1,0-48.02954,33.51124L101.457,217.83057A12.0003,12.0003,0,1,0,122.043,230.16943l64.09765-106.93457.002-.00341ZM128,132a44.046,44.046,0,1,1,37.80762-21.52588l-.30347.50635A44.01052,44.01052,0,0,1,128,132Z",
];

export default function Home() {
  // State tracks the actual number (1 to 20)
  const [activeNumber, setActiveNumber] = useState(0);

  const circles = useRef<SVGCircleElement[]>([]);
  const paths = useRef<SVGPathElement[]>([]);
  const nbOfCircles = 90;
  const radius = 20;

  const pathIndex = activeNumber;

  const handleDecrease = () => {
    if (activeNumber >= 0) {
      setActiveNumber((prev) => prev - 1);
    }
  };

  const handleIncrease = () => {
    if (activeNumber < 20) {
      setActiveNumber((prev) => prev + 1);
    }
  };

  // Animation Logic
  useEffect(() => {
    if (paths.current[pathIndex]) {
      const length = paths.current[pathIndex].getTotalLength();
      const step = length / nbOfCircles;

      circles.current.forEach((circle, i) => {
        if (!circle) return;
        const { x, y } = paths.current[pathIndex].getPointAtLength(i * step);
        animate(
          circle,
          { cx: x, cy: y },
          { delay: i * 0.001, ease: "easeOut", duration: 0.4 }
        );
      });
    }
  }, [activeNumber, pathIndex]);

  return (
    <main className="justify-center items-center flex flex-col h-screen bg-white gap-8">
      {/* Visual Display */}
      <svg className="size-[290px] " viewBox="0 0 256 256">
        <defs>
          <filter id="filter">
            <feGaussianBlur in="SourceAlpha" stdDeviation="8" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 30 -10"
              result="filter"
            />
          </filter>
        </defs>

        {/* Hidden Paths */}
        <g>
          {numbers.map((path, i) => (
            <path
              className="hidden"
              key={`p_${i}`}
              ref={(ref) => {
                if (ref) paths.current[i] = ref;
              }}
              d={path}
            />
          ))}
        </g>

        {/* Visible Circles */}
        <g style={{ filter: "url(#filter)" }}>
          {[...Array(nbOfCircles)].map((_, i) => (
            <circle
              fill="black"
              key={`c_${i}`}
              ref={(ref) => {
                if (ref) circles.current[i] = ref;
              }}
              cx="128"
              cy="128"
              r={radius}
            />
          ))}
        </g>
      </svg>

      {/* Controls */}
      <div className="flex flex-col items-center gap-4">
        <div className="text-2xl font-bold font-mono">
          Current: {activeNumber}
        </div>
        <div className="flex gap-4">
          <button
            onClick={handleDecrease}
            disabled={activeNumber === 0}
            className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Decrease -
          </button>
          <button
            onClick={handleIncrease}
            disabled={activeNumber === numbers.length + 1}
            className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Increase +
          </button>
        </div>
      </div>
    </main>
  );
}
