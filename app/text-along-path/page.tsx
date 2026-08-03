"use client";
import { useEffect, useRef, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

type NavItem = { title: string; desc?: string; href: string };
type NavLink = { label: string; items?: NavItem[] };

const NAV_LINKS: NavLink[] = [
  {
    label: "Product",
    items: [
      { title: "Flow for Mac", desc: "Dictate anywhere on macOS", href: "#" },
      { title: "Flow for Windows", desc: "Now in early access", href: "#" },
      {
        title: "Flow for iPhone",
        desc: "Capture thoughts on the go",
        href: "#",
      },
      { title: "Integrations", desc: "Works in every app you use", href: "#" },
    ],
  },
  {
    label: "Individuals",
    items: [
      { title: "Writers", desc: "Drafts at the speed of speech", href: "#" },
      { title: "Developers", desc: "Comments, commits, and docs", href: "#" },
      { title: "Students", desc: "Notes without the typing", href: "#" },
    ],
  },
  { label: "Business" },
  {
    label: "Resources",
    items: [
      { title: "Docs", href: "#" },
      { title: "Blog", href: "#" },
      { title: "Support", href: "#" },
    ],
  },
  {
    label: "Company",
    items: [
      { title: "About", href: "#" },
      { title: "Careers", href: "#" },
    ],
  },
];

/* How long the menu stays open after the pointer leaves.
   Gives you time to cross any small gap without it snapping shut. */
const CLOSE_DELAY = 140;

function Navbar() {
  const [open, setOpen] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const openMenu = (label: string) => {
    cancelClose();
    setOpen(label);
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(null), CLOSE_DELAY);
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        cancelClose();
        setOpen(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      cancelClose();
    };
  }, []);

  return (
    <header className="absolute inset-x-0 top-0 z-20 px-4 pt-5">
      <nav
        className="mx-auto flex w-full max-w-[1100px] items-center gap-8 rounded-[14px] border border-[#1A1A1A]/20 px-6 py-2.5 text-[#1A1A1A]"
        onMouseLeave={scheduleClose}
      >
        <a className="flex shrink-0 items-center gap-2.5">
          <WordmarkIcon />
          <span className="text-[26px] font-semibold leading-none tracking-tight">
            Flow
          </span>
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map(({ label, items }) => {
            const hasMenu = Boolean(items?.length);
            const isOpen = hasMenu && open === label;

            return (
              <li
                key={label}
                className="relative px-1 py-2"
                onMouseEnter={() => (hasMenu ? openMenu(label) : setOpen(null))}
                onFocus={() => hasMenu && openMenu(label)}
                onBlur={scheduleClose}
              >
                {/* tab cap — chrome only, no label of its own */}
                <div
                  aria-hidden
                  className={`pointer-events-none absolute inset-0 z-20 h-[57px] rounded-t-xl border-l-2 border-r-2 border-t-2 border-black bg-[#fefbf6] transition-opacity duration-150 motion-reduce:transition-none ${
                    isOpen ? "opacity-100" : "opacity-0"
                  }`}
                />

                <button
                  type="button"
                  aria-expanded={hasMenu ? isOpen : undefined}
                  className="relative z-[30] flex items-center gap-1.5 rounded-md px-1 py-1 text-[15px] font-bold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A1A1A]"
                >
                  {label}
                  {hasMenu && (
                    <ChevronIcon
                      className={`transition-transform duration-150 motion-reduce:transition-none ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </button>

                {hasMenu && (
                  <div
                    /* child of the <li>, so hovering the panel keeps the menu open */
                    className={`absolute inset-0 top-[55px] z-10 h-[400px] w-[300px] rounded-b-xl rounded-r-xl border-2 border-black bg-[#fefbf6] p-3 transition-[opacity,transform,visibility] duration-150 motion-reduce:transition-none ${
                      isOpen
                        ? "visible translate-y-0 opacity-100"
                        : "invisible -translate-y-0 opacity-0"
                    }`}
                  >
                    <ul className="flex flex-col gap-1">
                      {items!.map((item) => (
                        <li key={item.title}>
                          <a
                            href={item.href}
                            tabIndex={isOpen ? 0 : -1}
                            className="block rounded-lg px-3 py-2.5 transition-colors  "
                          >
                            <span className="block text-[15px] font-semibold">
                              {item.title}
                            </span>
                            {item.desc && (
                              <span className="mt-0.5 block text-[13px] text-[#1A1A1A]/60">
                                {item.desc}
                              </span>
                            )}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        <div className="ml-auto flex items-center gap-6">
          <span
            aria-hidden
            className="hidden h-9 w-px bg-[#1A1A1A]/20 lg:block"
          />
          <a
            href="#download"
            className="inline-flex whitespace-nowrap items-center gap-2.5 rounded-[10px] border border-[#1A1A1A] bg-[#DCC4FF] px-5 py-2.5 text-[15px] font-medium text-[#1A1A1A] transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A1A1A] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
          >
            <AppleIcon />
            Download for macOS
          </a>
        </div>
      </nav>
    </header>
  );
}

export default function Page() {
  const paths = useRef<(SVGTextPathElement | null)[]>([]);

  return (
    <main className="relative w-full h-screen items-center justify-center] p-4  bg-[#ffffeb]">
      <Navbar />
      <section
        className={` w-full  px-6  translate-y-[200px] text-center text-[#1A1A1A]`}
      >
        <h1 className="font-[family-name:var(--font-display)] text-[100px] font-normal leading-[1.05] tracking-[-0.015em]">
          <span className="text-[#7E7E70]">Don&rsquo;t type,</span>{" "}
          <span>just speak</span>
        </h1>

        <p className="mx-auto mt-8 max-w-[40ch] text-balance text-[16px] font-medium leading-[1.35]">
          The voice-to-text AI that turns speech into clear, polished writing in
          every app.
        </p>

        <a
          href="#download"
          className="mt-10 inline-flex items-center gap-3 rounded-[8px] border-2 border-[#1A1A1A] bg-[#E7CEF9] px-7 py-3.5 text-[clamp(1rem,1.3vw,1.25rem)] font-semibold text-[#1A1A1A] transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A1A1A] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
        >
          <AppleIcon />
          Download for macOS
        </a>

        <p className="mt-8 text-[clamp(0.875rem,1.1vw,1.05rem)] text-[#1A1A1A]/55">
          Available on Mac, Windows, iPhone, and Android
        </p>
      </section>

      <section className="relative z-0 flex w-full translate-y-[0px] items-center justify-center gap-4">
        <div className="w-1/2 translate-x-[10px]  translate-y-[70px] -rotate-10">
          <svg
            id="hero-svg-1"
            width="100%"
            height="auto"
            viewBox="0 0 1024 594"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="none"
              id="curve"
              d="M0.597656 50.924805C17.4612 143.2965 97.8522 293.141 284.508 353.548C440.828 399.056 583.839 294.067 500.618 184.7492C417.397 75.4309 238.217 282.098 499.258 441.668C551.913 477.802 817.468 561.26 1046.43 565.235"
            />
            <text className="text-[30px] font-light" style={{ fill: "gray" }}>
              {[...Array(1)].map((_, i) => (
                <textPath
                  key={i}
                  ref={(ref) => {
                    paths.current[i] = ref;
                  }}
                  startOffset={i * -100 + "%"}
                  href="#curve"
                >
                  Umm, hope your week has started well…I was talking to Cheyene
                  earlier but reception was really bad and I think their going
                  to handle the first part of the project, but I&rsquo;m not
                  totally sure. Also, I told the team the the new timeline
                  should be ready by Friday, although it&rsquo;s probably going
                  to slip. There&rsquo;s been a lot of back and forth and
                  honestly the the whole thing&rsquo;s been kind of chaotic,
                  like nobody really knows what&rsquo;s going on so can you
                  check in with them and see if the notes from yesterday&rsquo;s
                  meeting were sent out, or if they&rsquo;re still waiting. I
                  think Cheyene mentioned it but didn&rsquo;t confirm, and now
                  I&rsquo;m a little lost.
                </textPath>
              ))}
              <animate
                id="marquee-anim-1"
                attributeName="x"
                dur="20s"
                values="-3300; 0"
                repeatCount="indefinite"
              />
            </text>
          </svg>
        </div>

        <div className="w-1/2 translate-x-[40px] translate-y-2">
          <svg
            id="hero-svg-2"
            width="100%"
            height="auto"
            viewBox="0 0 1024 620"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              id="curve2"
              fill="none"
              stroke="#1A1A1A"
              strokeWidth={33}
              d="M2.04309 563.872C111.592 558.268 316.491 554.016 517.963 490.064C703.017 431.323 875.319 444.531 1021.88 453.216"
            />
            <text x={-4500} className="text-[30px] font-semibold">
              <textPath href="#curve2" fill="#fff" baselineShift="-30%">
                Hope your week is off to a good start. I was talking to Cheyene
                earlier, but the reception was really bad. I think they&rsquo;re
                going to handle the first part of the project, but I&rsquo;m not
                totally sure. I also told the team the new timeline should be
                ready by Friday &mdash; although it might slip. There&rsquo;s
                been a lot of back and forth, and honestly, the whole thing has
                been a bit chaotic. It feels like nobody really knows
                what&rsquo;s going on. Can you check in with them and see if the
                notes from yesterday&rsquo;s meeting were sent out, or if
                they&rsquo;re still waiting? I think Cheyene mentioned it, but
                didn&rsquo;t confirm &mdash; and now I&rsquo;m a little lost!
              </textPath>
              <animate
                id="marquee-anim-2"
                attributeName="x"
                dur="25s"
                values="-4500; 0"
                repeatCount="indefinite"
              />
            </text>
          </svg>
        </div>

        {/* Centered overlay layer — sits on top of both curves, no magic numbers.
          Adjust translate-y to taste; vh keeps it in place as the viewport changes. */}
        <div className="pointer-events-none absolute inset-0 z-10 grid place-items-center lg:translate-y-[19vh]">
          <HeroAnimation className=" translate-y-[-10px] " />
        </div>
      </section>
    </main>
  );
}

const SRC =
  "https://cdn.prod.website-files.com/682f84b3838c89f8ff7667db/683e1e4368e08951ef7080d5_Flow%20header%20animation_toasts_trimmed%20v2.lottie";

function HeroAnimation({ className = "" }: { className?: string }) {
  return (
    <div className={`w-[269px] max-w-[60vw] aspect-[269/161] ${className}`}>
      <DotLottieReact
        src={SRC}
        loop
        autoplay
        renderConfig={{ autoResize: true }}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}

function AppleIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 384 512"
      className="h-[1.1em] w-[1.1em]"
      fill="currentColor"
    >
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
  );
}

function ChevronIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className={`h-3.5 w-3.5 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function WordmarkIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="currentColor"
    >
      <rect x="2" y="9" width="2.6" height="6" rx="1.3" />
      <rect x="7" y="4" width="2.6" height="16" rx="1.3" />
      <rect x="12" y="7" width="2.6" height="10" rx="1.3" />
      <rect x="17" y="10" width="2.6" height="4" rx="1.3" />
    </svg>
  );
}
