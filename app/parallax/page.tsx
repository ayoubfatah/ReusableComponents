"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
export default function Page() {
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  return (
    <main ref={containerRef} className="relative h-[600vh] bg-black">
      <Section1 scrollYProgress={scrollYProgress}></Section1>
      <Section2 scrollYProgress={scrollYProgress}></Section2>
      <Section3 scrollYProgress={scrollYProgress}></Section3>
      <Section4 scrollYProgress={scrollYProgress}></Section4>
    </main>
  );
}

const Section1 = ({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) => {
  const scale = useTransform(scrollYProgress, [0, 0.4], [1, 0.6]);
  const rotate = useTransform(scrollYProgress, [0, 0.4], [0, -10]);

  console.log({ scale });
  return (
    <motion.div
      style={{ scale, rotate }}
      className="sticky top-0 h-screen  text-[3.5vw] flex flex-col items-center justify-center text-white pb-[10vh]"
    >
      <p>Scroll Perspective</p>
      <div className="flex gap-4">
        <p>Section</p>
        <div className="relative w-[12.5vw]">
          <Image src="/image1.jpg" alt="img" fill />
        </div>
        <p>Transition</p>
      </div>
    </motion.div>
  );
};

const Section2 = ({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) => {
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.6, 1]);
  const rotate = useTransform(scrollYProgress, [0, 0.3], [-10, 0]);
  return (
    <motion.div style={{ scale, rotate }} className="sticky top-0  h-screen">
      <Image src="/image2.jpg" alt="img" fill />
    </motion.div>
  );
};

const Section3 = ({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) => {
  const scale = useTransform(scrollYProgress, [0, 0.4], [0.6, 1]);
  const rotate = useTransform(scrollYProgress, [0, 0.4], [-20, 0]);

  return (
    <motion.div
      style={{ rotate, scale }}
      className="sticky top-0 h-screen  flex items-center justify-center"
    >
      <Image src="/image4.jpg" alt="img" fill />
    </motion.div>
  );
};

const Section4 = ({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) => {
  const scale = useTransform(scrollYProgress, [0, 0.62], [0.6, 1]);
  const rotate = useTransform(scrollYProgress, [0, 0.62], [-20, 0]);
  return (
    <motion.div
      style={{ rotate, scale }}
      className="sticky top-0 h-screen  flex items-center justify-center"
    >
      <Image src="/image3.jpg" alt="img" fill />
    </motion.div>
  );
};
