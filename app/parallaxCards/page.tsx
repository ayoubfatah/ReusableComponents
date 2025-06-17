"use client";
import {
  type MotionValue,
  useScroll,
  motion,
  useTransform,
} from "framer-motion";
import Lenis from "lenis";
import Image from "next/image";
import React, { useEffect, useRef } from "react";

export default function Page() {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy(); // Cleanup on unmount
    };
  }, []);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  return (
    <main>
      <div ref={containerRef} className="h-[400vh]   ">
        <Card1 scrollYProgress={scrollYProgress} />
        <Card2 scrollYProgress={scrollYProgress} />
        <Card3 scrollYProgress={scrollYProgress} />
      </div>
    </main>
  );
}

function Card1({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const scale = useTransform(scrollYProgress, [0, 0.4], [1, 0.9]);
  const scaleImage = useTransform(scrollYProgress, [0, 1], [1.4, 1]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [0.5, 1]);

  return (
    <motion.section
      style={{ scale }}
      className="sticky top-0 h-screen flex -translate-y-[32px]"
    >
      <div className="relative flex   justify-center items-center    w-[900px] h-[420px]   bg-gradient-to-r from-[#a7cce6] to-[#b5d4e7]  text-white mx-auto m-auto  rounded-3xl py-5 px-10">
        <div className=" h–[400px] w-[500px] inline-flex flex-col self-start mt-4 justify-center ">
          <h1 className="font-[700] text-3xl ">Section 1</h1>

          <motion.p style={{ opacity: textOpacity }} className="">
            The quantum entanglement of neural networks creates a fascinating
            dance between artificial intelligence and human consciousness. As
            algorithms evolve, they weave intricate patterns of understanding
            that transcend traditional computational boundaries.
          </motion.p>
          <button className="inline-block w-fit mt-4 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
            Click for more
          </button>
        </div>
        <motion.div className="relative overflow-hidden w-[600px] h-[350px] ml-3.5 rounded-2xl">
          <motion.div
            style={{ scale: scaleImage }}
            className="relative w-full h-full"
          >
            <Image
              fill
              src="/image1.jpg"
              className="bg-green-300 rounded-2xl absolute inset-0 object-cover"
              alt="image"
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
function Card2({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.92]);
  const scaleImage = useTransform(scrollYProgress, [0, 1], [1.4, 1]);
  return (
    <motion.section
      style={{ scale }}
      className=" sticky top-0 h-screen flex justify-center  -translate-y-[18px]"
    >
      <div className="relative flex  items-start  w-[900px] h-[420px] bg-gradient-to-r from-[#c1c2b4] to-[#c8c6a9] text-white mx-auto m-auto  rounded-3xl py-5 px-10">
        <div className=" h–[400px] w-[500px] inline-flex flex-col justify-center ">
          <h1 className="font-[700] text-3xl ">Section 1</h1>

          <p className="">
            The quantum entanglement of neural networks creates a fascinating
            dance between artificial intelligence and human consciousness. As
            algorithms evolve, they weave intricate patterns of understanding
            that transcend traditional computational boundaries.
          </p>
          <button className="inline-block w-fit mt-4 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
            Click for more
          </button>
        </div>
        <motion.div className="relative overflow-hidden w-[600px] h-[350px] ml-3.5 rounded-2xl">
          <motion.div
            style={{ scale: scaleImage }}
            className="relative w-full h-full"
          >
            <Image
              fill
              src="/image2.jpg"
              className="bg-green-300 rounded-2xl absolute inset-0 object-cover"
              alt="image"
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}

function Card3({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.94]);
  const scaleImage = useTransform(scrollYProgress, [0, 1], [1.4, 1]);
  return (
    <motion.section
      style={{ scale }}
      className=" sticky top-0 h-screen flex justify-center"
    >
      <div className="relative flex  items-start  w-[900px] h-[420px] bg-gradient-to-r from-[#99b4b2] to-[#b7d0c9] text-gray-50 mx-auto m-auto  rounded-3xl py-5 px-10">
        <div className=" h–[400px] w-[500px] inline-flex flex-col justify-center ">
          <h1 className="font-[700] text-3xl ">Section 1</h1>

          <p className="">
            The quantum entanglement of neural networks creates a fascinating
            dance between artificial intelligence and human consciousness. As
            algorithms evolve, they weave intricate patterns of understanding
            that transcend traditional computational boundaries.
          </p>
          <button className="inline-block w-fit mt-4 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
            Click for more
          </button>
        </div>
        <motion.div className="relative overflow-hidden w-[600px] h-[350px] ml-3.5 rounded-2xl">
          <motion.div
            style={{ scale: scaleImage }}
            className="relative w-full h-full"
          >
            <Image
              fill
              src="/image3.jpg"
              className="bg-green-300 rounded-2xl absolute inset-0 object-cover"
              alt="image"
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
