import React from "react";

type CardProps = {
  card: {
    id: number;
    title: string;
    description: string;
    accentColor: string;
    shadowColor: string;
    borderColor: string;
  };
  onClick?: () => void;
};

export default function Card({ card, onClick }: CardProps) {
  return (
    <div
      key={card.id}
      onClick={onClick}
      className="group relative bg-black rounded-2xl overflow-hidden cursor-pointer h-80 transition-transform hover:scale-105"
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
    </div>
  );
}
