"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

// Card data interface
interface CardData {
  id: number;
  image: string;
  title?: string;
  description?: string;
  backgroundColor?: string;
  textColor?: string;
}

// Sample card data
const cardData: CardData[] = [
  {
    id: 1,
    image: "/image1.jpg",
    title: "Scroll Perspective",
    description: "Section Transition",
    backgroundColor: "bg-red-500",
    textColor: "text-white",
  },
  {
    id: 2,
    image: "/image2.jpg",
    backgroundColor: "bg-blue-500",
    textColor: "text-white",
  },
  {
    id: 3,
    image: "/image3.jpg",
    backgroundColor: "bg-green-500",
    textColor: "text-white",
  },
  {
    id: 4,
    image: "/image4.jpg",
    backgroundColor: "bg-purple-500",
    textColor: "text-white",
  },
  {
    id: 5,
    image: "/image1.jpg",
    title: "Loop Back",
    description: "Seamless Transition",
    backgroundColor: "bg-orange-500",
    textColor: "text-white",
  },
  {
    id: 6,
    image: "/image2.jpg",
    backgroundColor: "bg-blue-500",
    textColor: "text-white",
  },
  {
    id: 7,
    image: "/image3.jpg",
    backgroundColor: "bg-green-500",
    textColor: "text-white",
  },
  {
    id: 8,
    image: "/image4.jpg",
    backgroundColor: "bg-purple-500",
    textColor: "text-white",
  },
  {
    id: 9,
    image: "/image1.jpg",
    title: "Loop Back",
    description: "Seamless Transition",
    backgroundColor: "bg-orange-500",
    textColor: "text-white",
  },
  {
    id: 10,
    image: "/image2.jpg",
    backgroundColor: "bg-blue-500",
    textColor: "text-white",
  },
  {
    id: 11,
    image: "/image3.jpg",
    backgroundColor: "bg-green-500",
    textColor: "text-white",
  },
];

export default function Page() {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Calculate total height based on number of cards

  return (
    <main className="relative bg-black">
      <section className="h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-white mb-4 tracking-wider">
            HORIZONTAL
          </h1>
          <p className="text-2xl text-gray-300 font-light">
            Scroll to explore the gallery
          </p>
        </div>
      </section>
      <section ref={containerRef} className="h-[500vh] ">
        <div className="sticky mt-10 top-30 bg-black flex gap-0 w-[400vw]">
          {cardData.map((card) => (
            <Card key={card.id} data={card} scrollYProgress={scrollYProgress} />
          ))}
        </div>
      </section>
      <section className="h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-white mb-4 tracking-wider">
            SCROLLING
          </h1>
          <p className="text-2xl text-gray-300 font-light">
            Thanks for exploring
          </p>
        </div>
      </section>
    </main>
  );
}

function Card({
  data,
  scrollYProgress,
}: {
  data: CardData;
  scrollYProgress: MotionValue<number>;
}) {
  const translateX = useTransform(scrollYProgress, [0, 0.9], [0, -2100]);

  return (
    <motion.div
      style={{ translateX: translateX }}
      className="   h-[600px] w-[400px] relative mx-[20px]"
    >
      {/* Background Image */}

      <Image
        src={data.image}
        alt={`Card ${data.id}`}
        fill
        className="object-cover"
      />
    </motion.div>
  );
}
