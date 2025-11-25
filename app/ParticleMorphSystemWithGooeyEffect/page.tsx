"use client";
import { AnimatePresence, motion } from "framer-motion";
import {
    Circle,
    Diamond,
    Heart,
    Hexagon,
    Rocket,
    Square,
    Triangle
} from "lucide-react";
import { useState } from "react";

const PARTICLE_COUNT = 81;

const SHAPES = {
  heart: (index: number, total: number) => {
    const t = (index / total) * Math.PI * 2;
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = -(
      13 * Math.cos(t) -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t)
    );
    return { x: x * 8, y: y * 8 };
  },

  circle: (index: number, total: number) => {
    const angle = (index / total) * Math.PI * 2;
    const radius = 150;
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    };
  },

  triangle: (index: number, total: number) => {
    const t = index / total;
    if (t < 0.333) {
      const p = t / 0.333;
      return {
        x: p * 90,
        y: -100 + p * 160,
      };
    }
    if (t < 0.666) {
      const p = (t - 0.333) / 0.333;
      return {
        x: 90 - p * 180,
        y: 60,
      };
    }
    const p = (t - 0.666) / 0.334;
    return {
      x: -90 + p * 90,
      y: 60 - p * 160,
    };
  },

  square: (index: number, total: number) => {
    const t = index / total;
    const s = 90;
    if (t < 0.25) {
      const p = t / 0.25;
      return { x: -s + p * (2 * s), y: -s };
    }
    if (t < 0.5) {
      const p = (t - 0.25) / 0.25;
      return { x: s, y: -s + p * (2 * s) };
    }
    if (t < 0.75) {
      const p = (t - 0.5) / 0.25;
      return { x: s - p * (2 * s), y: s };
    }
    const p = (t - 0.75) / 0.25;
    return { x: -s, y: s - p * (2 * s) };
  },

  diamond: (index: number, total: number) => {
    const t = index / total;
    const size = 130;
    if (t < 0.25) {
      const p = t / 0.25;
      return { x: p * size, y: -size + p * size };
    }
    if (t < 0.5) {
      const p = (t - 0.25) / 0.25;
      return { x: size - p * size, y: p * size };
    }
    if (t < 0.75) {
      const p = (t - 0.5) / 0.25;
      return { x: -p * size, y: size - p * size };
    }
    const p = (t - 0.75) / 0.25;
    return { x: -size + p * size, y: -p * size };
  },

  hexagon: (index: number, total: number) => {
    const t = index / total;
    const segmentIndex = Math.floor(t * 6);
    const progress = (t * 6) % 1;
    const radius = 130;
    const theta1 = segmentIndex * (Math.PI / 3);
    const theta2 = (segmentIndex + 1) * (Math.PI / 3);
    const x1 = Math.cos(theta1) * radius;
    const y1 = Math.sin(theta1) * radius;
    const x2 = Math.cos(theta2) * radius;
    const y2 = Math.sin(theta2) * radius;
    return {
      x: x1 + (x2 - x1) * progress,
      y: y1 + (y2 - y1) * progress,
    };
  },

  spacecraft: (index: number, total: number) => {
    const t = index / total;
    if (t < 0.4) {
      const p = t / 0.4;
      return { x: 0 + p * -80, y: -100 + p * 180 };
    }
    if (t < 0.8) {
      const p = (t - 0.4) / 0.4;
      return { x: 0 + p * 80, y: -100 + p * 180 };
    }
    const p = (t - 0.8) / 0.2;
    return {
      x: -80 + p * 160,
      y: 80 + Math.sin(p * Math.PI * 3) * 10,
    };
  },
};

const shapeButtons = [
  { name: "heart", icon: Heart, label: "Heart" },
  { name: "circle", icon: Circle, label: "Circle" },
  { name: "triangle", icon: Triangle, label: "Triangle" },
  { name: "square", icon: Square, label: "Square" },
  { name: "diamond", icon: Diamond, label: "Diamond" },
  { name: "hexagon", icon: Hexagon, label: "Hexagon" },
  { name: "spacecraft", icon: Rocket, label: "Ship" },
] as const;

type shapes = (typeof shapeButtons)[number]["name"];

export default function ParticleMorphSystem() {
  const [shape, setShape] = useState<shapes>("heart");

  const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    id: i,
  }));

  const blurRadius = 10;

  return (
    <div className="min-h-screen bg-black text-white flex justify-center items-center overflow-hidden">
      <div className="max-w-5xl mx-auto w-full relative z-10 flex flex-col items-center">
        <div className="mb-10 flex flex-col items-center gap-4">
          <div className="flex flex-wrap gap-2 items-center justify-center max-w-3xl">
            {shapeButtons.map(({ name, icon: Icon, label }) => (
              <button
                key={name}
                onClick={() => setShape(name)}
                className="relative px-3 py-2 rounded-lg transition-all flex items-center gap-2 text-xs md:text-sm bg-gray-800 hover:bg-gray-700"
              >
                <Icon size={14} className="relative z-10" />
                <span className="relative z-10 hidden sm:inline">{label}</span>
                {shape === name && (
                  <motion.div
                    layoutId="activeShapeBackground"
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="relative w-full flex justify-center items-center h-[500px]">
          <motion.div
            layout
            className="relative w-full h-full"
            style={{
              filter: "url(#gooey)",
            }}
          >
            <AnimatePresence mode="wait">
              {particles.map((particle, index) => {
                const pos = SHAPES[shape as shapes](index, PARTICLE_COUNT);

                return (
                  <motion.div
                    key={particle.id}
                    className="absolute cursor-pointer"
                    style={{
                      left: "50%",
                      top: "50%",
                    }}
                    animate={{
                      x: pos.x,
                      y: pos.y,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 40,
                      damping: 10,
                      mass: 1,
                    }}
                    whileHover={{ scale: 2, zIndex: 100 }}
                  >
                    <motion.div
                      className="w-3 h-3 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg"
                      animate={{}}
                      transition={{
                        duration: 2,
                        delay: index * 0.02,
                      }}
                    />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <svg
        className="fixed pointer-events-none"
        style={{ width: 0, height: 0 }}
      >
        <defs>
          <filter id="gooey">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation={blurRadius}
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 99 -17"
              result="gooey"
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
}
