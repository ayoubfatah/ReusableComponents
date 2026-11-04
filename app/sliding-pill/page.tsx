"use client";

import type { Transition } from "framer-motion";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";

type OptionKey = "web" | "images" | "files" | "research" | "think";

type Option = {
  key: OptionKey;
  label: string;
  placeholder: string;
  icon: React.ReactNode;
};

type SearchGlyphProps = {
  stroke: string;
};

type ButtonRefs = Record<OptionKey, HTMLButtonElement | null>;

const SIZE = 44;

const BASE = 0.35;
const PX_PER_SECOND = 350;
const MAX = 1.5;

const MORPH_DURATION = 0.5;
const BLUR = 2;
const SLIDE = 1.5;

const OPTIONS: Option[] = [
  {
    key: "web",
    label: "Web",
    placeholder: "Search the web…",
    icon: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M3.5 12h17" />
        <path d="M12 3.5c2.4 2.4 3.6 5.2 3.6 8.5s-1.2 6.1-3.6 8.5c-2.4-2.4-3.6-5.2-3.6-8.5S9.6 5.9 12 3.5z" />
      </>
    ),
  },
  {
    key: "images",
    label: "Images",
    placeholder: "Search images…",
    icon: (
      <>
        <rect x="3.5" y="5" width="17" height="14" rx="2.5" />
        <circle cx="9" cy="10" r="1.5" />
        <path d="M4 17l5-4.5 3.5 3 3-2.5 4.5 4" />
      </>
    ),
  },
  {
    key: "files",
    label: "Files",
    placeholder: "Search your files…",
    icon: (
      <>
        <path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z" />
        <path d="M14 3v5h5" />
      </>
    ),
  },
  {
    key: "research",
    label: "Deep research",
    placeholder: "Ask for a deep dive…",
    icon: (
      <>
        <path d="M12 3.5l8.5 4.5-8.5 4.5L3.5 8z" />
        <path d="M3.5 12.5L12 17l8.5-4.5" />
        <path d="M3.5 16.5L12 21l8.5-4.5" />
      </>
    ),
  },
  {
    key: "think",
    label: "Think",
    placeholder: "Ask something tricky…",
    icon: (
      <>
        <path d="M12 3.5a5.5 5.5 0 00-3.2 10c.7.5 1.2 1.3 1.2 2.2V16h4v-.3c0-.9.5-1.7 1.2-2.2A5.5 5.5 0 0012 3.5z" />
        <path d="M9.5 18.5h5M10.5 21h3" />
      </>
    ),
  },
];

const SearchGlyph = ({ stroke }: SearchGlyphProps) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    strokeWidth={2.2}
    strokeLinecap="round"
    strokeLinejoin="round"
    stroke={stroke}
  >
    <circle cx="11" cy="11" r="6.5" />
    <path d="M16 16l4.5 4.5" />
  </svg>
);

export default function SearchModePill() {
  const [active, setActive] = useState<OptionKey>("web");
  const [duration, setDuration] = useState<number>(1);
  const [distance, setDistance] = useState<number>(0);
  const [searching, setSearching] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");

  const refs = useRef<ButtonRefs>({
    web: null,
    images: null,
    files: null,
    research: null,
    think: null,
  });

  // bounce: 0 → smooth, no overshoot. Same duration everywhere keeps it in sync.
  const transition: Transition = { type: "spring", duration, bounce: 0 };
  const hasText = query.trim().length > 0;
  const current = OPTIONS.find((o) => o.key === active)!;

  const select = (key: OptionKey): void => {
    if (key === active) return;

    const from = refs.current[active]?.getBoundingClientRect();
    const to = refs.current[key]?.getBoundingClientRect();

    if (from && to) {
      const px = Math.abs(
        to.left + to.width / 2 - (from.left + from.width / 2),
      );

      setDistance(Math.round(px));
      setDuration(Math.min(MAX, BASE + px / PX_PER_SECOND));
    }

    setActive(key);
  };

  const toggleSearch = (open: boolean): void => {
    setDuration(MORPH_DURATION);
    setDistance(0);
    setSearching(open);
  };

  const send = (): void => {
    const q = query.trim();
    if (!q) return;
    setQuery("");
    toggleSearch(false);
  };

  //   const blockMotion = {
  //     initial: { opacity: 0, filter: `blur(${BLUR}px)` },
  //     animate: {
  //       opacity: 1,
  //       filter: "blur(0px)",
  //       transition: {
  //         duration: 0.35,
  //         delay: duration * 0.3,
  //         ease: "easeOut" as const,
  //       },
  //     },
  //     exit: {
  //       opacity: 0,
  //       filter: `blur(${BLUR}px)`,
  //       transition: { duration: 0.15 },
  //     },
  //   };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#ffffff",
        display: "grid",
        placeItems: "center",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <motion.div
        layout
        transition={transition}
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          padding: 5,
          borderRadius: 9999,
          background: "#ffffff",
          border: "1px solid #e4e4e7",
          boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
        }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {!searching ? (
            <motion.div
              key="options"
              //   {...blockMotion}
              style={{ display: "flex", alignItems: "center", gap: 2 }}
            >
              {OPTIONS.map((o) => {
                const isActive = active === o.key;

                return (
                  <motion.button
                    key={o.key}
                    ref={(el: HTMLButtonElement | null) => {
                      refs.current[o.key] = el;
                    }}
                    layout
                    transition={transition}
                    onClick={() => select(o.key)}
                    style={{
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      height: SIZE,
                      padding: 0,
                      border: "none",
                      background: "none",
                      borderRadius: 9999,
                      cursor: "pointer",
                      outline: "none",
                      WebkitTapHighlightColor: "transparent",
                    }}
                  >
                    {/* The travelling background */}
                    {isActive && (
                      <motion.div
                        layoutId="active-bg"
                        transition={transition}
                        style={{
                          position: "absolute",
                          inset: 0,
                          borderRadius: 9999,
                          background: "#111111",
                          zIndex: 0,
                        }}
                      />
                    )}

                    <motion.div
                      layout="position"
                      className="text-black"
                      transition={transition}
                      style={{
                        position: "relative",
                        zIndex: 1,
                        width: SIZE,
                        height: SIZE,
                        display: "grid",
                        placeItems: "center",
                      }}
                    >
                      <motion.svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        className="mix-blend-exclusion"
                        fill="none"
                        strokeWidth={2.2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        transition={{ duration: duration * 0.6 }}
                      >
                        {o.icon}
                      </motion.svg>
                    </motion.div>

                    <AnimatePresence mode="popLayout" initial={false}>
                      {isActive && (
                        <motion.span
                          key="label"
                          layout="position"
                          initial={{
                            opacity: 0,
                            filter: `blur(${BLUR}px)`,
                            x: SLIDE,
                          }}
                          animate={{ opacity: 1, filter: "blur(0px)", x: 0 }}
                          exit={{
                            opacity: 0,
                            filter: `blur(${BLUR}px)`,
                            transition: { duration: 0.12 },
                          }}
                          transition={{
                            duration: 0.4,
                            delay: duration * 0.3,
                            ease: "easeOut",
                          }}
                          style={{
                            position: "relative",
                            zIndex: 1,
                            paddingRight: 18,
                            color: "#ffffff",
                            fontSize: 14,
                            fontWeight: 600,
                            whiteSpace: "nowrap",
                            letterSpacing: 0.1,
                          }}
                        >
                          {o.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                );
              })}

              {/* Divider */}
              <motion.div
                layout
                transition={transition}
                style={{
                  width: 1,
                  height: 20,
                  margin: "0 4px",
                  background: "#e4e4e7",
                  flex: "none",
                }}
              />

              {/* Search button */}
              <motion.button
                layout
                transition={transition}
                onClick={() => toggleSearch(true)}
                aria-label="Search"
                style={{
                  display: "grid",
                  placeItems: "center",
                  width: SIZE,
                  height: SIZE,
                  padding: 0,
                  border: "none",
                  background: "none",
                  borderRadius: 9999,
                  cursor: "pointer",
                  outline: "none",
                  WebkitTapHighlightColor: "transparent",
                }}
              >
                <motion.div
                  layoutId="search-icon"
                  transition={transition}
                  style={{ display: "grid", placeItems: "center" }}
                >
                  <SearchGlyph stroke="#71717a" />
                </motion.div>
              </motion.button>
            </motion.div>
          ) : (
            /* ------------------------------ search field + send button */
            <motion.div
              key="search"
              //   {...blockMotion}
              style={{ display: "flex", alignItems: "center", gap: 2 }}
            >
              <motion.div
                layoutId="search-icon"
                transition={transition}
                style={{
                  width: SIZE,
                  height: SIZE,
                  display: "grid",
                  placeItems: "center",
                  flex: "none",
                }}
              >
                <SearchGlyph stroke="#111111" />
              </motion.div>

              <motion.div
                layout="position"
                transition={transition}
                style={{ width: "min(190px, 42vw)", flex: "none" }}
              >
                <input
                  autoFocus
                  value={query}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setQuery(e.target.value)
                  }
                  onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === "Enter") send();
                    if (e.key === "Escape") toggleSearch(false);
                  }}
                  placeholder={current.placeholder}
                  style={{
                    width: "100%",
                    border: "none",
                    outline: "none",
                    background: "transparent",
                    fontSize: 16,
                    color: "#111111",
                    fontFamily: "inherit",
                  }}
                />
              </motion.div>

              {/* Close */}
              <motion.button
                layout="position"
                transition={transition}
                onClick={() => toggleSearch(false)}
                aria-label="Close search"
                style={{
                  flex: "none",
                  width: 32,
                  height: 32,
                  display: "grid",
                  placeItems: "center",
                  border: "none",
                  background: "none",
                  borderRadius: 9999,
                  cursor: "pointer",
                  outline: "none",
                  WebkitTapHighlightColor: "transparent",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeWidth={2.4}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  stroke={"#a1a1aa"}
                >
                  <path d="M7 7l10 10M17 7L7 17" />
                </svg>
              </motion.button>

              {/* Send */}
              <motion.button
                layout="position"
                transition={transition}
                onClick={send}
                disabled={!hasText}
                aria-label="Send"
                initial={{ scale: 0.6 }}
                animate={{
                  scale: 1,
                  backgroundColor: hasText ? "#111111" : "#e4e4e7",
                }}
                whileTap={hasText ? { scale: 0.92 } : undefined}
                style={{
                  flex: "none",
                  width: 36,
                  height: 36,
                  margin: "0 4px 0 2px",
                  display: "grid",
                  placeItems: "center",
                  border: "none",
                  borderRadius: 9999,
                  cursor: hasText ? "pointer" : "default",
                  outline: "none",
                  WebkitTapHighlightColor: "transparent",
                }}
              >
                <motion.svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeWidth={2.4}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  animate={{ stroke: hasText ? "#ffffff" : "#a1a1aa" }}
                >
                  <path d="M12 19V6M6.5 11.5L12 6l5.5 5.5" />
                </motion.svg>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Debug readout + last sent message */}
      <div
        style={{
          position: "absolute",
          bottom: 32,
          textAlign: "center",
          color: "#a1a1aa",
          fontSize: 12,
          letterSpacing: 0.5,
          fontVariantNumeric: "tabular-nums",
          lineHeight: 1.7,
        }}
      >
        <div>
          distance {distance}px · duration {duration.toFixed(2)}s
        </div>
      </div>
    </div>
  );
}
