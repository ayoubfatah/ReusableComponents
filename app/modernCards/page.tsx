"use client";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import useHandleClickOutside from "./useHandleClickOutside";

const cards = [
  {
    id: 1,
    title: "Card 1",
    description: "Card 1 description",
    accentColor: "#E8A87C",
    shadowColor: "rgba(232,168,124,0.45)",
    borderColor: "rgba(232,168,124,0.35)",
  },
  {
    id: 2,
    title: "Card 2",
    description: "Card 2 description",
    accentColor: "#B388FF",
    shadowColor: "rgba(179,136,255,0.45)",
    borderColor: "rgba(179,136,255,0.35)",
  },
  {
    id: 3,
    title: "Card 3",
    description: "Card 3 description",
    accentColor: "#7EB8A4",
    shadowColor: "rgba(126,184,164,0.45)",
    borderColor: "rgba(126,184,164,0.35)",
  },
  {
    id: 4,
    title: "Card 4",
    description: "Card 4 description",
    accentColor: "#C97FA8",
    shadowColor: "rgba(201,127,168,0.45)",
    borderColor: "rgba(201,127,168,0.35)",
  },
  {
    id: 5,
    title: "Card 5",
    description: "Card 5 description",
    accentColor: "#7A9CC4",
    shadowColor: "rgba(122,156,196,0.45)",
    borderColor: "rgba(122,156,196,0.35)",
  },
  {
    id: 6,
    title: "Card 6",
    description: "Card 6 description",
    accentColor: "#FF6B6B",
    shadowColor: "rgba(255,107,107,0.45)",
    borderColor: "rgba(255,107,107,0.35)",
  },
  {
    id: 7,
    title: "Card 7",
    description: "Card 7 description",
    accentColor: "#4ECDC4",
    shadowColor: "rgba(78,205,196,0.45)",
    borderColor: "rgba(78,205,196,0.35)",
  },
  {
    id: 8,
    title: "Card 8",
    description: "Card 8 description",
    accentColor: "#95E77E",
    shadowColor: "rgba(149,231,126,0.45)",
    borderColor: "rgba(149,231,126,0.35)",
  },
  {
    id: 9,
    title: "Card 9",
    description: "Card 9 description",
    accentColor: "#FFD93D",
    shadowColor: "rgba(255,217,61,0.45)",
    borderColor: "rgba(255,217,61,0.35)",
  },
  {
    id: 10,
    title: "Card 10",
    description: "Card 10 description",
    accentColor: "#A8E6CF",
    shadowColor: "rgba(168,230,207,0.45)",
    borderColor: "rgba(168,230,207,0.35)",
  },
  {
    id: 11,
    title: "Card 11",
    description: "Card 11 description",
    accentColor: "#FFB6C1",
    shadowColor: "rgba(255,182,193,0.45)",
    borderColor: "rgba(255,182,193,0.35)",
  },
  {
    id: 12,
    title: "Card 12",
    description: "Card 12 description",
    accentColor: "#DDA0DD",
    shadowColor: "rgba(221,160,221,0.45)",
    borderColor: "rgba(221,160,221,0.35)",
  },
];

type Card = (typeof cards)[number];

export default function Page() {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);

  function handleCardClick(card: Card) {
    setSelectedCard(card);
  }

  const ref = useRef<HTMLDivElement>(null);
  useHandleClickOutside(ref, () => {
    setSelectedCard(null);
  });

  const isAnyCardSelected = () => {
    return !!selectedCard?.id;
  };

  const isCurrentCardSelected = (card: Card) => {
    return selectedCard?.id === card.id;
  };

  return (
    <div className="h-screen w-screen p-8 bg-[#0e0e0e]">
      <div className="grid grid-cols-4 gap-4 max-w-6xl mx-auto">
        {cards.map((card) => (
          <motion.div
            key={card.id}
            ref={ref}
            onClick={() => handleCardClick(card)}
            initial={{
              opacity: 0,
              scale: 0,
              y: 300,
              filter: "blur(10px)",
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              filter: "blur(0px)",
            }}
            whileHover={{
              scale: 1.05,
            }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 10,
            }}
            className="group relative bg-black rounded-2xl overflow-hidden cursor-pointer h-80"
            style={{
              border: `1px solid ${card.borderColor}`,
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(
                  to top,
                  ${card.accentColor} 0%,
                  ${card.accentColor}22 0%,
                  transparent 100%
                )`,
              }}
            />

            <div className="absolute bottom-0 left-0 right-0 p-4">
              <p
                className="text-[10px] uppercase tracking-[0.18em] mb-1 font-medium"
                style={{ color: card.accentColor, fontFamily: "monospace" }}
              >
                #{String(card.id).padStart(2, "0")}
              </p>
              <h2
                className="text-white text-base font-semibold leading-tight mb-1"
                style={{
                  fontFamily: "'Georgia', serif",
                  textShadow: "0 1px 6px rgba(0,0,0,0.5)",
                }}
              >
                {card.title}
              </h2>
              <p className="text-white/60 text-[11px] leading-snug">
                {card.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
