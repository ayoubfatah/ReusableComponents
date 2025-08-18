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
  const totalHeight = `${cardData.length * 100}vh`;

  return (
    <main
      ref={containerRef}
      className="relative bg-black"
      style={{ height: totalHeight }}
    >
      {cardData.map((card, index) => (
        <Card
          key={card.id}
          data={card}
          index={index}
          total={cardData.length}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </main>
  );
}

interface CardProps {
  data: CardData;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}

const Card = ({ data, index, total, scrollYProgress }: CardProps) => {
  // Dynamic scroll ranges based on card position
  const isFirst = index === 0;
  const isLast = index === total - 1;

  // Calculate scroll progress ranges for this card
  const startProgress = index / total;
  const endProgress = (index + 1) / total;

  // Combine transformations
  const scale = useTransform(
    scrollYProgress,
    [startProgress - 0.1, startProgress, endProgress - 0.1, endProgress + 0.1],
    [0.6, 1, 1, isLast ? 1 : 0.6]
  );

  const rotate = useTransform(
    scrollYProgress,
    [startProgress - 0.1, startProgress, endProgress - 0.1, endProgress + 0.1],
    [isFirst ? 0 : -15, 0, 0, isLast ? 0 : -15]
  );

  // Opacity for smooth transitions
  const opacity = useTransform(
    scrollYProgress,
    [startProgress - 0.05, startProgress, endProgress, endProgress + 0.05],
    [0, 1, 1, isLast ? 1 : 0]
  );

  return (
    <motion.div
      style={{ scale, rotate, opacity }}
      className="sticky top-0 h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <Image
        src={data.image}
        alt={`Card ${data.id}`}
        fill
        className="object-cover"
        priority={index < 2} // Prioritize first two images
      />

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20 z-10" />

      {/* Content Overlay */}
      {(data.title || data.description) && (
        <motion.div
          className={`relative z-20 text-center ${
            data.textColor || "text-white"
          }`}
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {data.title && (
            <h1 className="text-[3.5vw] font-bold mb-4">{data.title}</h1>
          )}

          {data.description && (
            <div className="flex items-center justify-center gap-4 text-[2vw]">
              <span>Section</span>
              <motion.div
                className="relative w-[12.5vw] h-[8vw] overflow-hidden rounded-lg"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={data.image}
                  alt="preview"
                  fill
                  className="object-cover"
                />
              </motion.div>
              <span>{data.description}</span>
            </div>
          )}
        </motion.div>
      )}

      {/* Card indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex space-x-2">
          {Array.from({ length: total }).map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === index ? "bg-white scale-125" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

// Optional: Add a loading component
export const CardSkeleton = () => (
  <div className="sticky top-0 h-screen flex items-center justify-center bg-gray-900">
    <div className="animate-pulse">
      <div className="w-64 h-32 bg-gray-700 rounded-lg mb-4" />
      <div className="w-48 h-4 bg-gray-700 rounded mb-2" />
      <div className="w-32 h-4 bg-gray-700 rounded" />
    </div>
  </div>
);
