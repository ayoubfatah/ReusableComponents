"use client";
import { useEffect, useLayoutEffect, useRef } from "react";

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
const LERP_FACTOR = 0.18;
const CARD_W = 200;
const CARD_H = 257;
const INITIAL_GRID_POSITIONS = [
  {
    x: 418,
    y: 120,
  },
  {
    x: 630,
    y: 120,
  },
  {
    x: 842,
    y: 120,
  },
  {
    x: 1054,
    y: 120,
  },
  {
    x: 418,
    y: 389,
  },
  {
    x: 630,
    y: 389,
  },
  {
    x: 842,
    y: 389,
  },
  {
    x: 1054,
    y: 389,
  },
  {
    x: 418,
    y: 658,
  },
  {
    x: 630,
    y: 658,
  },
  {
    x: 842,
    y: 658,
  },
  {
    x: 1054,
    y: 658,
  },
];

function lerp(a: number, b: number, t: number) {
  return a + t * (b - a);
}

export default function FollowDrag() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const positions = useRef(
    cards.map(() => ({
      x: 0,
      y: 0,
    })),
  );

  const gridPositions = useRef(INITIAL_GRID_POSITIONS);

  const dragging = useRef(false);
  const dragIndex = useRef(0);
  const dragOffset = useRef({ x: 0, y: 0 });
  const mouse = useRef({ x: 0, y: 0 });
  const initialized = useRef(false);
  const rafRef = useRef<number | null>(null);

  //   // Setup grid layout
    useLayoutEffect(() => {
      const container = containerRef.current;
      if (!container || initialized.current) return;
      initialized.current = true;

      const { width } = container.getBoundingClientRect();

      const cols = 4;
      const gap = 12;

      const totalWidth = cols * CARD_W + (cols - 1) * gap;
      const startX = width / 2 - totalWidth / 2;
      const startY = 120;

      cards.forEach((_, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);

        const x = startX + col * (CARD_W + gap);
        const y = startY + row * (CARD_H + gap);

        gridPositions.current[i] = { x, y };

        positions.current[i].x = x;
        positions.current[i].y = y;
      });
      console.log(positions, "position");
    }, []);

  useEffect(() => {
    function tick() {
      const pos = positions.current;
      const cards = cardRefs.current;

      if (dragging.current) {
        // Leader
        pos[dragIndex.current].x = lerp(
          pos[dragIndex.current].x,
          mouse.current.x - dragOffset.current.x,
          0.35,
        );

        pos[dragIndex.current].y = lerp(
          pos[dragIndex.current].y,
          mouse.current.y - dragOffset.current.y,
          0.35,
        );

        // Followers
        for (let i = 0; i < pos.length; i++) {
          if (i === dragIndex.current) continue;

          const lag =
            i < dragIndex.current
              ? dragIndex.current - i
              : i - dragIndex.current;

          const factor = LERP_FACTOR / (1 + lag * 0.3);

          pos[i].x = lerp(pos[i].x, pos[dragIndex.current].x, factor);
          pos[i].y = lerp(pos[i].y, pos[dragIndex.current].y, factor);
        }
      } else {
        // Return to grid
        for (let i = 0; i < pos.length; i++) {
          pos[i].x = lerp(pos[i].x, gridPositions.current[i].x, 0.08);
          pos[i].y = lerp(pos[i].y, gridPositions.current[i].y, 0.08);
        }
      }

      // Apply positions
      pos.forEach((p, i) => {
        const el = cards[i];
        if (!el) return;

        el.style.left = `${p.x.toFixed(2)}px`;
        el.style.top = `${p.y.toFixed(2)}px`;
      });

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent, index: number) => {
    e.preventDefault();

    dragging.current = true;
    dragIndex.current = index;

    const el = cardRefs.current[index];
    if (!el) return;

    const rect = el.getBoundingClientRect();

    dragOffset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    mouse.current = {
      x: e.clientX,
      y: e.clientY,
    };

    cardRefs.current.forEach((c, i) => {
      if (!c) return;

      c.style.zIndex =
        i === index ? "50" : String(cards.length - Math.abs(i - index));
    });

    const onMove = (e: MouseEvent) => {
      mouse.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    const onUp = () => {
      dragging.current = false;

      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  };

  return (
    <div
      ref={containerRef}
      className="w-full h-screen bg-[#0a0a0a] flex items-center justify-center overflow-hidden relative select-none"
    >
      {cards.map((card, i) => (
        <div
          key={card.id}
          ref={(el) => {
            cardRefs.current[i] = el;
          }}
          onMouseDown={(e) => handleMouseDown(e, i)}
          style={{
            position: "absolute",
            width: CARD_W,
            height: CARD_H,
            zIndex: cards.length - i,
            cursor: "grab",
            overflow: "hidden",
            willChange: "left, top",
            border: `1px solid ${card.borderColor}`,
          }}
          className="group relative bg-black rounded-2xl overflow-hidden cursor-pointer h-80"
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
      ))}
    </div>
  );
}
