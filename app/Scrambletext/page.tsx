"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export const CHAR_SETS = {
  numbers: "0123456789",
  shades: "░▒▓█",
  tifinagh: "ⴰⴱⴲⴳⴴⴵⴶⴷⴸⴹⴺⴻⴼⴽⴾⴿⵀⵁⵂⵃⵄⵅⵆⵇⵈⵉⵊⵋⵌⵍⵎⵏⵐⵑⵒⵓⵔⵕⵖⵗⵘⵙⵚⵛⵜⵝⵞⵟⵠⵡⵢⵣⵤⵥⵦⵧ",
  lowerCase: "abcdefghijklmnopqrstuvwxyz",
  upperCase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  default: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
  moons: "☾☽◐◑◒◓◔◕●○◌",
  orbits: "⟐⟡⟢⟣⟲⟳↺↻⊙⊚⊛⊜",
  cosmic: "✦✧⋆★☆☄☾☽☉☿♀♁♂♃♄♅♆",
  constellations: "·∙•⋅∘°✦✧⋆",
  alien: "⌖⌬⍟⍣⎊⏃⟟⌰⟒⋔⍜⎍",
  navigation: "⌖⌘⌬⍟⊕⊗⊙◎◉⦿",
  asteroidField: "·∙•●○◦∘⋅⋆✦✧",
  deepSpace: "░▒▓█▄▀▁▂▃▅▆▇✦⋆",
  transmission: "01⎯|/\\_-+=*:.·",
  runic: "ᚠᚡᚢᚣᚤᚥᚦᚧᚨᚩᚪᚫᚬᚭᚮᚯᚰᚱᚲᚳᚴᚵᚶᚷᚸᚹᚺᚻᚼᚽᚾᚿ",
  coordinates: "XYZ0123456789+-°.′″",
} as const;

type CharSetName = keyof typeof CHAR_SETS;
type RevealFrom = "left" | "right" | "center" | "random";

interface ScrambleConfig {
  text: string;
  variant: CharSetName;
  duration: number;
  revealDelay: number;
  revealRate: number;
  settleDuration: number;
  perturbation: number;
  from: RevealFrom;
  cursor: string;
}

function getRandomChar(chars: string): string {
  return chars[Math.floor(Math.random() * chars.length)];
}

function useScramble(config: ScrambleConfig) {
  const [display, setDisplay] = useState(config.text);
  const cancelRef = useRef<(() => void) | null>(null);

  const play = useCallback(() => {
    cancelRef.current?.();

    const {
      text,
      variant,
      duration,
      revealDelay,
      revealRate,
      settleDuration,
      perturbation,
      from,
      cursor,
    } = config;

    const activeChars = CHAR_SETS[variant];
    const len = text.length;
    if (!len) return;

    const order = Array.from({ length: len }, (_, i) => i);
    if (from === "right") order.reverse();
    else if (from === "center") {
      const mid = Math.floor(len / 2);
      order.sort((a, b) => Math.abs(a - mid) - Math.abs(b - mid));
    } else if (from === "random") order.sort(() => Math.random() - 0.5);

    const revealTimes: number[] = new Array(len);
    order.forEach((charIndex, rankIndex) => {
      const base = revealDelay + rankIndex * revealRate;
      const jitter = perturbation * revealRate * (Math.random() * 2 - 1);
      revealTimes[charIndex] = base + jitter;
    });

    const totalDuration = Math.max(
      duration,
      revealDelay + len * revealRate + settleDuration + 100,
    );

    let startTime: number | null = null;
    let rafId: number | null = null;
    let done = false;

    const tick = (timestamp: number) => {
      if (done) return;
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;

      let result = "";
      let allSettled = true;

      for (let i = 0; i < len; i++) {
        const character = text[i];
        if (
          character === " " ||
          character === "\n" ||
          character === "_" ||
          character === "-"
        ) {
          result += character;
          continue;
        }

        const reveal = revealTimes[i];
        const settleEnd = reveal + settleDuration;

        if (elapsed >= settleEnd) {
          result += character;
        } else if (elapsed >= reveal) {
          allSettled = false;
          const progress = (elapsed - reveal) / settleDuration;
          result +=
            cursor && progress < 0.3 ? cursor : getRandomChar(activeChars);
        } else {
          allSettled = false;
          result += getRandomChar(activeChars);
        }
      }

      setDisplay(result);

      if (allSettled || elapsed >= totalDuration) {
        setDisplay(text);
        done = true;
        return;
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    cancelRef.current = () => {
      done = true;
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [config]);

  useEffect(() => {
    setDisplay(config.text);
  }, [config.text]);

  useEffect(() => {
    return () => cancelRef.current?.();
  }, []);

  return { display, play };
}

// ─── Slider control ──────────────────────────────────────────────────────────

interface SliderProps {
  label: string;
  id: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
  format?: (v: number) => string;
}

function Slider({
  label,
  min,
  max,
  step,
  value,
  onChange,
  format,
}: SliderProps) {
  const display = format ? format(value) : String(value);
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <span className="text-[11px] text-zinc-400 uppercase tracking-widest font-mono">
          {label}
        </span>
        <span className="text-[11px] text-white font-mono tabular-nums w-14 text-right">
          {display}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-white h-[2px] cursor-pointer"
        style={{ accentColor: "white" }}
      />
    </div>
  );
}

// ─── Select control ───────────────────────────────────────────────────────────

interface SelectProps<T extends string> {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
}

function Select<T extends string>({
  label,
  value,
  options,
  onChange,
}: SelectProps<T>) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[11px] text-zinc-400 uppercase tracking-widest font-mono">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="bg-transparent border border-zinc-700 text-white text-[12px] font-mono rounded px-2 py-1.5 outline-none focus:border-zinc-400 cursor-pointer"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-zinc-900">
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

const DEFAULT_CONFIG: ScrambleConfig = {
  text: "HELLO WORLD",
  variant: "upperCase",
  duration: 1200,
  revealDelay: 100,
  revealRate: 55,
  settleDuration: 220,
  perturbation: 0.18,
  from: "left",
  cursor: "█",
};
export default function Page() {
  const [config, setConfig] = useState<ScrambleConfig>(DEFAULT_CONFIG);
  const [inputText, setInputText] = useState(DEFAULT_CONFIG.text);
  const { display, play } = useScramble(config);

  const set = <K extends keyof ScrambleConfig>(
    key: K,
    value: ScrambleConfig[K],
  ) => setConfig((prev) => ({ ...prev, [key]: value }));

  // Auto-play on mount
  useEffect(() => {
    const t = setTimeout(play, 300);
    return () => clearTimeout(t);
  }, []);

  const handleTextCommit = () => {
    set("text", inputText || "scrambled.");
  };

  return (
    <main
      className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden"
      style={{ fontFamily: "monospace" }}
    >
      {/* Subtle grid bg */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Center stage */}
      <div className="flex flex-col items-center gap-6 select-none">
        <p
          className="text-[11px] tracking-[0.3em] text-zinc-600 uppercase"
          style={{ letterSpacing: "0.3em" }}
        >
          scrambled text effect
        </p>

        {/* Main display */}
        <div
          className="text-white w-[700px] text-center "
          style={{
            fontSize: "20px",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            minWidth: "6ch",
          }}
        >
          {display}
        </div>

        {/* Play button */}
        <button
          onClick={play}
          className="mt-2 px-6 py-2 border border-zinc-700 text-zinc-400 text-[11px] tracking-[0.2em] uppercase hover:border-zinc-400 hover:text-white transition-all duration-200 rounded-sm"
        >
          ▶ play
        </button>
      </div>

      {/* ── Control panel (top right) ── */}
      <aside
        className="fixed top-4 right-4 w-[280px] rounded-lg overflow-hidden"
        style={{
          background: "rgba(10,10,10,0.92)",
          border: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
      >
        {/* Panel header */}
        <div
          className="px-4 py-3 flex items-center justify-between"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <span className="text-[11px] tracking-[0.2em] text-zinc-400 uppercase">
            controls
          </span>
          <button
            onClick={play}
            className="text-[10px] tracking-widest text-zinc-500 hover:text-white transition-colors uppercase"
          >
            ▶ play
          </button>
        </div>

        <div className="p-4 flex flex-col gap-4">
          {/* Text input */}
          <div className="flex flex-col gap-1">
            <span className="text-[11px] text-zinc-400 uppercase tracking-widest font-mono">
              text
            </span>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onBlur={handleTextCommit}
              onKeyDown={(e) => e.key === "Enter" && handleTextCommit()}
              className="bg-transparent border border-zinc-700 text-white text-[12px] font-mono rounded px-2 py-1.5 outline-none focus:border-zinc-400 placeholder-zinc-600 w-full"
              placeholder="type something..."
              spellCheck={false}
            />
          </div>

          <Slider
            label=" duration (ms)"
            id="duration"
            min={0}
            max={5000}
            step={10}
            value={config.duration}
            onChange={(v) => set("duration", v)}
          />
          <Slider
            label="reveal delay (ms)"
            id="revealDelay"
            min={0}
            max={800}
            step={10}
            value={config.revealDelay}
            onChange={(v) => set("revealDelay", v)}
          />
          <Slider
            label="reveal rate (ms)"
            id="revealRate"
            min={5}
            max={200}
            step={5}
            value={config.revealRate}
            onChange={(v) => set("revealRate", v)}
          />
          <Slider
            label="settle duration (ms)"
            id="settleDuration"
            min={20}
            max={800}
            step={10}
            value={config.settleDuration}
            onChange={(v) => set("settleDuration", v)}
          />
          <Slider
            label="perturbation"
            id="perturbation"
            min={0}
            max={1}
            step={0.01}
            value={config.perturbation}
            onChange={(v) => set("perturbation", v)}
            format={(v) => v.toFixed(2)}
          />

          <div className="grid grid-cols-2 gap-3">
            <Select<CharSetName>
              label="char set"
              value={config.variant}
              onChange={(v) => set("variant", v)}
              options={Object.keys(CHAR_SETS).map((k) => ({
                value: k as CharSetName,
                label: k,
              }))}
            />
            <Select<RevealFrom>
              label="reveal from"
              value={config.from}
              onChange={(v) => set("from", v)}
              options={[
                { value: "left", label: "left" },
                { value: "right", label: "right" },
                { value: "center", label: "center" },
                { value: "random", label: "random" },
              ]}
            />
          </div>

          {/* Cursor input */}
          <div className="flex flex-col gap-1">
            <span className="text-[11px] text-zinc-400 uppercase tracking-widest font-mono">
              cursor char
            </span>
            <input
              type="text"
              value={config.cursor}
              onChange={(e) => set("cursor", e.target.value.slice(-1))}
              className="bg-transparent border border-zinc-700 text-white text-[12px] font-mono rounded px-2 py-1.5 outline-none focus:border-zinc-400 w-full"
              maxLength={1}
            />
          </div>
        </div>
      </aside>
    </main>
  );
}
