"use client";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import React from "react";

const GRADIENTS = [
  "https://products.ls.graphics/mesh-gradients/images/03.-Snowy-Mint_1-p-130x130q80.jpeg",
  "https://products.ls.graphics/mesh-gradients/images/04.-Hopbush_1-p-130x130q80.jpeg",
  "https://products.ls.graphics/mesh-gradients/images/06.-Wisteria-p-130x130q80.jpeg",
  "https://products.ls.graphics/mesh-gradients/images/09.-Light-Sky-Blue-p-130x130q80.jpeg",
  "https://products.ls.graphics/mesh-gradients/images/12.-Tumbleweed-p-130x130q80.jpeg",
  "https://products.ls.graphics/mesh-gradients/images/15.-Perfume_1-p-130x130q80.jpeg",
  "https://products.ls.graphics/mesh-gradients/images/36.-Pale-Chestnut-p-130x130q80.jpeg",
];

const SPRING_VALUES = {
  stiffness: 150,
  damping: 12,
  mass: 0.4,
};
export default function Page() {
  const mouseX = useMotionValue(Infinity);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <div
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="flex items-end gap-4 bg-black px-6 py-4 rounded-2xl h-[110px] relative"
      >
        {GRADIENTS.map((gradient, index) => (
          <DockCard key={index} gradient={gradient} mouseX={mouseX} />
        ))}
      </div>
    </main>
  );
}

function DockCard({ gradient, mouseX }: { gradient: string; mouseX: any }) {
  const ref = React.useRef<HTMLDivElement>(null);

  const [isBouncing, setIsBouncing] = React.useState(false);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? {
      x: 0,
      width: 0,
    };
    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distance, [-200, 0, 200], [80, 110, 80]);
  const heightTransform = useTransform(distance, [-200, 0, 200], [80, 110, 80]);
  const imgScaleTransform = useTransform(
    distance,
    [-200, 0, 200],
    [0.8, 1.1, 0.8],
  );

  const smoothScale = useSpring(imgScaleTransform, SPRING_VALUES);

  const smoothWidth = useSpring(widthTransform, SPRING_VALUES);

  const smoothHeight = useSpring(heightTransform, SPRING_VALUES);

  const handleCardClick = () => {
    setIsBouncing(true);
    const timeoutId = setTimeout(() => setIsBouncing(false), 2000);
    return () => clearTimeout(timeoutId);
  };

  return (
    <div className="relative">
      <motion.div
        ref={ref}
        style={{
          width: smoothWidth,
          height: smoothHeight,
        }}
        animate={{
          y: isBouncing ? [-4, 4, -4, 4, 0] : 0,
        }}
        transition={{ duration: 1, repeat: isBouncing ? 4 : 0 }}
        onClick={handleCardClick}
        className="rounded-xl flex justify-center items-center bg-[#262626] border border-white/10  cursor-pointer hover:brightness-110 hover:saturate-100 relative z-0 overflow-hidden"
      >
        <motion.img
          src={gradient}
          alt=""
          className="absolute  blur-[70px]  translate-y-[10px] w-full h-full rounded-xl object-cover"
        />
        <motion.img
          src={gradient}
          alt=""
          className="relative z-0 rounded-full object-cover size-[60px]"
          style={{
            scale: smoothScale,
          }}
        />
      </motion.div>
      <span
        className={`size-[3px] rounded-full bg-white absolute left-1/2 -translate-x-1/2 -bottom-2.5 z-50 transition-opacity duration-300 ${isBouncing ? "opacity-100" : "opacity-0"}`}
      ></span>
    </div>
  );
}
