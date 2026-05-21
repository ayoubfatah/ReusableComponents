"use client";
import { useState, useEffect, useRef, useCallback } from "react";

// ─── Core scramble engine ────────────────────────────────────────────────────

const CHAR_SETS = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
  braille: "⠁⠂⠃⠄⠅⠆⠇⠈⠉⠊⠋⠌⠍⠎⠏⠐⠑⠒⠓⠔⠕⠖⠗⠘⠙⠚⠛⠜⠝⠞⠟",
  blocks: "▀▁▂▃▄▅▆▇█▉▊▋▌▍▎▏",
  shades: "░▒▓█",
  default: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
};

function getRandomChar(chars) {
  return chars[Math.floor(Math.random() * chars.length)];
}

function scramble(
  target,
  {
    chars = CHAR_SETS.default,
    duration = 800,
    revealDelay = 0,
    revealRate = 40,
    settleDuration = 200,
    perturbation = 0.1,
    from = "left",
    cursor = "▓",
    onUpdate,
    onComplete,
  } = {},
) {
  const text = target;
  const len = text.length;
  if (!len) return () => {};

  // Build reveal order
  let order = Array.from({ length: len }, (_, i) => i);
  if (from === "right") order.reverse();
  else if (from === "center") {
    const mid = Math.floor(len / 2);
    order = order.sort((a, b) => Math.abs(a - mid) - Math.abs(b - mid));
  } else if (from === "random") {
    order = order.sort(() => Math.random() - 0.5);
  }

  const revealTimes = new Array(len);
  order.forEach((charIdx, rankIdx) => {
    const base = revealDelay + rankIdx * revealRate;
    const jitter = perturbation * revealRate * (Math.random() * 2 - 1);
    revealTimes[charIdx] = base + jitter;
  });

  const totalDuration = Math.max(
    duration,
    revealDelay + len * revealRate + settleDuration + 100,
  );
  const settled = new Array(len).fill(false);
  let startTime = null;
  let rafId = null;
  let done = false;

  const tick = (ts) => {
    if (done) return;
    if (!startTime) startTime = ts;
    const elapsed = ts - startTime;

    let result = "";
    let allSettled = true;

    for (let i = 0; i < len; i++) {
      const ch = text[i];
      if (ch === " " || ch === "\n") {
        result += ch;
        continue;
      }

      const reveal = revealTimes[i];
      const settleEnd = reveal + settleDuration;

      if (elapsed >= settleEnd) {
        settled[i] = true;
        result += ch;
      } else if (elapsed >= reveal) {
        allSettled = false;
        const progress = (elapsed - reveal) / settleDuration;
        // Show cursor near the reveal front, scramble behind
        if (cursor && progress < 0.3) {
          result += cursor;
        } else {
          result += getRandomChar(chars);
        }
      } else {
        allSettled = false;
        result += getRandomChar(chars);
      }
    }

    onUpdate?.(result);

    if (allSettled || elapsed >= totalDuration) {
      onUpdate?.(text);
      done = true;
      onComplete?.();
      return;
    }

    rafId = requestAnimationFrame(tick);
  };

  rafId = requestAnimationFrame(tick);

  return () => {
    done = true;
    if (rafId) cancelAnimationFrame(rafId);
  };
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useScramble(text, options = {}, deps = []) {
  const [display, setDisplay] = useState(text);
  const cancelRef = useRef(null);

  const play = useCallback(() => {
    if (cancelRef.current) cancelRef.current();
    cancelRef.current = scramble(text, {
      ...options,
      onUpdate: setDisplay,
    });
  }, [text, ...deps]);

  useEffect(() => {
    return () => {
      if (cancelRef.current) cancelRef.current();
    };
  }, []);

  return { display, play };
}

// ─── ScrambleText component ───────────────────────────────────────────────────

export function ScrambleText({
  as: Tag = "span",
  children,
  options = {},
  autoPlay = false,
  trigger = "hover", // 'hover' | 'click' | 'auto' | 'none'
  className = "",
  style = {},
}) {
  const text = typeof children === "string" ? children : "";
  const { display, play } = useScramble(text, options, [
    JSON.stringify(options),
  ]);

  useEffect(() => {
    if (autoPlay || trigger === "auto") play();
  }, []);

  const handlers = {};
  if (trigger === "hover") {
    handlers.onMouseEnter = play;
    handlers.onPointerEnter = play;
  }
  if (trigger === "click") {
    handlers.onClick = play;
  }

  return (
    <Tag
      className={className}
      style={{ cursor: "default", ...style }}
      {...handlers}
    >
      {display}
    </Tag>
  );
}

// ─── Demo page ────────────────────────────────────────────────────────────────

const DEMO_OPTIONS = {
  chars: CHAR_SETS.default,
  duration: 800,
  revealRate: 35,
  settleDuration: 220,
  perturbation: 0.15,
  from: "left",
  cursor: "▓",
};

const INTRO_OPTIONS = {
  ...DEMO_OPTIONS,
  chars: CHAR_SETS.shades,
  duration: 900,
  perturbation: 0.2,
};

export default function Page() {
  // Staggered intro: each element plays after previous
  const items = [
    {
      tag: "h1",
      text: "Scramble Text",
      opts: { ...INTRO_OPTIONS, from: "left" },
      delay: 0,
    },
    {
      tag: "p",
      text: "A text scramble effect in React. Hover any element to replay the animation.",
      opts: { ...DEMO_OPTIONS, chars: CHAR_SETS.braille, from: "left" },
      delay: 300,
    },
    {
      tag: "h2",
      text: "Features",
      opts: { ...DEMO_OPTIONS, from: "center" },
      delay: 600,
    },
  ];

  const listItems = [
    "Named character sets — lowercase, uppercase, numbers, symbols, braille, blocks",
    "Directional reveal — left, right, center, random",
    "Adjustable interval between each character reveal",
    "Per-character settle duration for the scramble window",
    "Perturbation randomizes timing for organic feel",
    "Cursor sweep pattern during reveal phase",
    "Works with any duration, auto-calculated or fixed",
  ];

  return (
    <div style={styles.root}>
      {/* Subtle grid background */}
      <div style={styles.gridBg} />

      <main style={styles.main}>
        {/* Header */}
        <div style={styles.badge}>
          <ScrambleText
            options={{
              ...DEMO_OPTIONS,
              chars: CHAR_SETS.numbers,
              duration: 500,
            }}
            trigger="hover"
            style={styles.badgeText}
          >
            v1.0.0
          </ScrambleText>
        </div>

        <ScrambleText
          as="h1"
          autoPlay
          options={{ ...INTRO_OPTIONS, duration: 1000 }}
          trigger="hover"
          style={styles.h1}
        >
          Scramble Text
        </ScrambleText>

        <ScrambleText
          as="p"
          autoPlay
          options={{
            ...DEMO_OPTIONS,
            chars: CHAR_SETS.braille,
            revealDelay: 200,
          }}
          trigger="hover"
          style={styles.lead}
        >
          A lightweight text scramble effect in pure React. No dependencies.
          Hover any element to replay.
        </ScrambleText>

        <div style={styles.divider} />

        <ScrambleText
          as="h2"
          autoPlay
          options={{ ...DEMO_OPTIONS, from: "center", revealDelay: 400 }}
          trigger="hover"
          style={styles.h2}
        >
          Features
        </ScrambleText>

        <ul style={styles.ul}>
          {listItems.map((item, i) => (
            <li key={i} style={styles.li}>
              <span style={styles.bullet}>▸</span>
              <ScrambleText
                options={{
                  ...DEMO_OPTIONS,
                  from: "left",
                  chars: i % 2 === 0 ? CHAR_SETS.lowercase : CHAR_SETS.symbols,
                  duration: 600 + i * 30,
                }}
                trigger="hover"
                style={styles.liText}
              >
                {item}
              </ScrambleText>
            </li>
          ))}
        </ul>

        <div style={styles.divider} />

        <ScrambleText
          as="h2"
          options={{ ...DEMO_OPTIONS, from: "right" }}
          trigger="hover"
          style={styles.h2}
        >
          Character Sets
        </ScrambleText>

        <div style={styles.charGrid}>
          {Object.entries(CHAR_SETS).map(([name, chars]) => (
            <ScrambleText
              key={name}
              options={{
                chars,
                duration: 600,
                revealRate: 30,
                settleDuration: 180,
              }}
              trigger="hover"
              style={styles.charChip}
            >
              {name}
            </ScrambleText>
          ))}
        </div>

        <div style={styles.divider} />

        <ScrambleText
          as="h2"
          options={{ ...DEMO_OPTIONS, from: "left" }}
          trigger="hover"
          style={styles.h2}
        >
          How It Works
        </ScrambleText>

        <ScrambleText
          as="p"
          options={{
            ...DEMO_OPTIONS,
            chars: CHAR_SETS.braille,
            from: "random",
          }}
          trigger="hover"
          style={styles.body}
        >
          Each character gets an individual reveal time based on its position
          and a perturbation jitter. Before reveal, it cycles random characters.
          During the settle window, a cursor sweep passes through. After settle,
          the true character locks in.
        </ScrambleText>

        <ScrambleText
          as="p"
          options={{ ...DEMO_OPTIONS, from: "right" }}
          trigger="hover"
          style={styles.body}
        >
          Duration is either computed from text length × revealRate +
          settleDuration, or set explicitly. The hook exposes a play() function
          for programmatic control.
        </ScrambleText>

        <div style={styles.footer}>
          <ScrambleText
            options={{ chars: CHAR_SETS.shades, duration: 400 }}
            trigger="hover"
            style={styles.footerText}
          >
            Built with useScramble hook · React only · Zero deps
          </ScrambleText>
        </div>
      </main>
    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = {
  root: {
    minHeight: "100vh",
    background: "#090909",
    color: "#e8e4dc",
    fontFamily: "'Courier New', 'Courier', monospace",
    position: "relative",
    overflow: "hidden",
  },
  gridBg: {
    position: "fixed",
    inset: 0,
    backgroundImage:
      "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
    backgroundSize: "40px 40px",
    pointerEvents: "none",
    zIndex: 0,
  },
  main: {
    position: "relative",
    zIndex: 1,
    maxWidth: 680,
    margin: "0 auto",
    padding: "80px 24px 120px",
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  badge: {
    display: "inline-flex",
    alignSelf: "flex-start",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 4,
    padding: "2px 10px",
  },
  badgeText: {
    fontSize: "0.7rem",
    letterSpacing: "0.15em",
    color: "rgba(255,255,255,0.5)",
    textTransform: "uppercase",
  },
  h1: {
    fontSize: "clamp(2rem, 6vw, 3.5rem)",
    fontWeight: 700,
    lineHeight: 1.05,
    letterSpacing: "-0.02em",
    color: "#f0ece2",
    margin: 0,
    fontFamily: "'Courier New', monospace",
  },
  h2: {
    fontSize: "1.1rem",
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.45)",
    margin: 0,
  },
  lead: {
    fontSize: "1rem",
    lineHeight: 1.65,
    color: "rgba(232,228,220,0.65)",
    margin: 0,
    maxWidth: 520,
  },
  body: {
    fontSize: "0.875rem",
    lineHeight: 1.7,
    color: "rgba(232,228,220,0.5)",
    margin: 0,
  },
  divider: {
    height: 1,
    background: "rgba(255,255,255,0.07)",
    margin: "8px 0",
  },
  ul: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  li: {
    display: "flex",
    gap: 12,
    alignItems: "baseline",
  },
  bullet: {
    color: "rgba(255,255,255,0.2)",
    fontSize: "0.75rem",
    flexShrink: 0,
    userSelect: "none",
  },
  liText: {
    fontSize: "0.875rem",
    lineHeight: 1.5,
    color: "rgba(232,228,220,0.6)",
  },
  charGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
  },
  charChip: {
    display: "inline-block",
    padding: "5px 14px",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 3,
    fontSize: "0.75rem",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.55)",
    background: "rgba(255,255,255,0.03)",
    cursor: "default",
    transition: "border-color 0.2s, color 0.2s",
  },
  footer: {
    marginTop: 40,
    paddingTop: 24,
    borderTop: "1px solid rgba(255,255,255,0.06)",
  },
  footerText: {
    fontSize: "0.75rem",
    letterSpacing: "0.05em",
    color: "rgba(255,255,255,0.2)",
  },
};
