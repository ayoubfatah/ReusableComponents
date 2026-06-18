"use client";
import {
  ArrowUp,
  ChevronDown,
  Mic2,
  Monitor,
  Palette,
  Plus,
  Smartphone,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion";
import { Send, Sparkles } from "lucide-react";
import { ReactNode, useEffect, useRef, useState } from "react";

type AIConfig = {
  title: string;
  prompt: string;
  response: string;
  status: string;
  duration: number;
  width: number;
  borderSize: number;
  glowOpacity: number;
  glowBlur: number;
  maskY: number;
  maskX: number;
  maskPosX: number;
  maskPosY: number;
  maskTransparent: number;
  maskBlack: number;
};

const Example = () => {
  const [config, setConfig] = useState<AIConfig>({
    title: "Roma AI",
    prompt: "Summarize the last 3 meetings...",
    response:
      "Sure! Across your last 3 meetings, the main themes were Q3 budget approvals, the new design system rollout, and onboarding timelines for the Berlin team.",
    status: "Fetching context...",
    duration: 3,
    width: 700,
    borderSize: 1,
    glowOpacity: 0.4,
    glowBlur: 32,
    maskY: 100,
    maskX: 100,
    maskPosX: 50,
    maskPosY: 50,
    maskTransparent: 20,
    maskBlack: 100,
  });

  const setConfigValue = <K extends keyof AIConfig>(
    key: K,
    value: AIConfig[K],
  ) => {
    setConfig((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="relative px-4 py-24 bg-zinc-950 w-full min-h-screen flex justify-center items-center">
      <style>
        {`

        `}
      </style>

      <AICard config={config} />

      <AIControls config={config} setConfigValue={setConfigValue} />
    </div>
  );
};

const AICard = ({ config }: { config: AIConfig }) => {
  return (
    <AIGradientBorder
      duration={config.duration}
      maskY={config.maskY}
      maskX={config.maskX}
      maskPosX={config.maskPosX}
      maskPosY={config.maskPosY}
      maskTransparent={config.maskTransparent}
      maskBlack={config.maskBlack}
      borderSize={config.borderSize}
      glowOpacity={config.glowOpacity}
      glowBlur={config.glowBlur}
      width={config.width}
      className="mx-auto rounded-2xl border border-zinc-800"
    >
      <div className="grid gap-6 bg-zinc-800 p-4 rounded-2xl">
        <Header title={config.title} />
        <InputBar prompt={config.prompt} />
        <AITextOutput response={config.response} />
        <Thinking status={config.status} />
      </div>
      {/* <Composer /> */}

      {/* <input
        placeholder="Ask Anything ..."
        className="bg-zinc-800 border w-full rounded-2xl border-zinc-900 focus:outline-none p-3 text-white text-semibold"
      /> */}
    </AIGradientBorder>
  );
};

const Header = ({ title }: { title: string }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="size-2 rounded-full bg-violet-500" />
      <span className="text-xs text-zinc-500 font-medium tracking-widest uppercase">
        {title}
      </span>
    </div>
  );
};

const InputBar = ({ prompt }: { prompt: string }) => {
  return (
    <div className="flex items-center gap-3 px-2 py-3 rounded-xl bg-zinc-950 border border-zinc-800">
      <Sparkles className="text-violet-400 size-4 shrink-0" />
      <p className="text-sm text-zinc-400 flex-1">{prompt}</p>
      <Send className="text-zinc-600 size-4 shrink-0" />
    </div>
  );
};

const AITextOutput = ({ response }: { response: string }) => {
  return <p className="text-sm leading-relaxed text-zinc-300">{response}</p>;
};

const Thinking = ({ status }: { status: string }) => {
  return (
    <div className="flex gap-2 items-center p-2">
      <div className="flex gap-1">
        <span className="size-1.5 rounded-full bg-violet-500 animate-bounce [animation-delay:0ms]" />
        <span className="size-1.5 rounded-full bg-violet-500 animate-bounce [animation-delay:150ms]" />
        <span className="size-1.5 rounded-full bg-violet-500 animate-bounce [animation-delay:300ms]" />
      </div>
      <p className="text-xs text-zinc-500">{status}</p>
    </div>
  );
};

const AIGradientBorder = ({
  glowBlur,
  children,
  glowOpacity,
  className,
  maskX,
  duration = 3,
  width,
  maskY,
  borderSize,
  maskPosX,
  maskPosY,
  maskTransparent,
  maskBlack,
}: {
  glowBlur: number;
  children: ReactNode;
  borderSize: number;
  glowOpacity: number;
  className?: string;
  width: number;
  duration?: number;
  maskY: number;
  maskX: number;
  maskPosX: number;
  maskPosY: number;
  maskTransparent: number;
  maskBlack: number;
}) => {
  const turn = useMotionValue(0);

  useEffect(() => {
    turn.set(0);

    const controls = animate(turn, 1, {
      ease: "linear",
      duration,
      repeat: Infinity,
    });

    return () => controls.stop();
  }, [duration, turn]);

  const gradient = useMotionTemplate`
conic-gradient(
  from ${turn}turn,
 transparent 0%, rgb(145, 84, 231) 10%, rgb(96, 86, 240) 16.3%, rgb(64, 217, 198) 22.5%, rgb(66, 133, 244) 28.8%, rgb(145, 84, 231) 35%, transparent 45%
)`;

  return (
    <motion.div
      style={{
        backgroundImage: gradient,
        width,
        padding: borderSize,
      }}
      className={cn("relative overflow-hidden", className)}
    >
      <div className="absolute rounded-[inherit]"></div>

      <div className="relative">{children}</div>

      <motion.div
        style={{
          filter: `blur(${glowBlur}px)`,
          opacity: glowOpacity,
          backgroundImage: gradient,
          maskImage: `radial-gradient(
            ellipse ${maskX}% ${maskY}% at ${maskPosX}% ${maskPosY}%,
            transparent ${maskTransparent}%,
            black ${maskBlack}%
          )`,
          WebkitMaskImage: `radial-gradient(
            ellipse ${maskX}% ${maskY}% at ${maskPosX}% ${maskPosY}%,
            transparent ${maskTransparent}%,
            black ${maskBlack}%
          )`,
        }}
        className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
      ></motion.div>
    </motion.div>
  );
};

const AIControls = ({
  config,
  setConfigValue,
}: {
  config: AIConfig;
  setConfigValue: <K extends keyof AIConfig>(
    key: K,
    value: AIConfig[K],
  ) => void;
}) => {
  return (
    <aside className="fixed top-4 right-4 w-[300px] rounded-xl border border-white/10 bg-zinc-950/90 backdrop-blur-xl p-4 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-[11px] tracking-[0.2em] text-zinc-400 uppercase">
          controls
        </span>
      </div>

      <Slider
        label="gradient duration"
        id="duration"
        min={0.5}
        max={10}
        step={0.1}
        value={config.duration}
        onChange={(v) => setConfigValue("duration", v)}
        format={(v) => `${v.toFixed(1)}s`}
      />

      <Slider
        label="card width"
        id="width"
        min={300}
        max={900}
        step={10}
        value={config.width}
        onChange={(v) => setConfigValue("width", v)}
        format={(v) => `${v}px`}
      />

      <Slider
        label="border size"
        id="borderSize"
        min={0.5}
        max={8}
        step={0.5}
        value={config.borderSize}
        onChange={(v) => setConfigValue("borderSize", v)}
        format={(v) => `${v}px`}
      />

      <Slider
        label="glow opacity"
        id="glowOpacity"
        min={0}
        max={1}
        step={0.05}
        value={config.glowOpacity}
        onChange={(v) => setConfigValue("glowOpacity", v)}
        format={(v) => v.toFixed(2)}
      />

      <Slider
        label="glow blur"
        id="glowBlur"
        min={0}
        max={300}
        step={10}
        value={config.glowBlur}
        onChange={(v) => setConfigValue("glowBlur", v)}
        format={(v) => `${v}px`}
      />

      <span className="text-white/40 text-sm tracking-widest text-center">
        -- Mask --
      </span>

      <Slider
        label="mask Y"
        id="maskY"
        min={0}
        max={100}
        step={2}
        value={config.maskY}
        onChange={(v) => setConfigValue("maskY", v)}
        format={(v) => `${v}%`}
      />

      <Slider
        label="mask X"
        id="maskX"
        min={0}
        max={100}
        step={2}
        value={config.maskX}
        onChange={(v) => setConfigValue("maskX", v)}
        format={(v) => `${v}%`}
      />

      <Slider
        label="mask position X"
        id="maskPosX"
        min={0}
        max={100}
        step={2}
        value={config.maskPosX}
        onChange={(v) => setConfigValue("maskPosX", v)}
        format={(v) => `${v}%`}
      />

      <Slider
        label="mask position Y"
        id="maskPosY"
        min={0}
        max={100}
        step={2}
        value={config.maskPosY}
        onChange={(v) => setConfigValue("maskPosY", v)}
        format={(v) => `${v}%`}
      />

      <Slider
        label="mask transparent"
        id="maskTransparent"
        min={0}
        max={100}
        step={2}
        value={config.maskTransparent}
        onChange={(v) => setConfigValue("maskTransparent", v)}
        format={(v) => `${v}%`}
      />

      <Slider
        label="mask black"
        id="maskBlack"
        min={0}
        max={100}
        step={2}
        value={config.maskBlack}
        onChange={(v) => setConfigValue("maskBlack", v)}
        format={(v) => `${v}%`}
      />
    </aside>
  );
};

const Slider = ({
  label,
  id,
  min,
  max,
  step,
  value,
  onChange,
  format,
}: {
  label: string;
  id: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  format?: (value: number) => string;
}) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <label
          htmlFor={id}
          className="text-[11px] text-zinc-400 uppercase tracking-widest font-mono"
        >
          {label}
        </label>

        <span className="text-[11px] text-white font-mono tabular-nums">
          {format ? format(value) : value}
        </span>
      </div>

      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-white cursor-pointer"
      />
    </div>
  );
};

export default Example;

type Mode = "app" | "web";

type ComposerProps = {
  defaultValue?: string;
  onGenerate?: (data: { prompt: string; mode: Mode }) => void;
};
function Composer({
  defaultValue = "A browse tab for a mobile app for romance and date night ideas",
  onGenerate,
}: ComposerProps) {
  const [prompt, setPrompt] = useState(defaultValue);
  const [mode, setMode] = useState<Mode>("app");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div
      role="presentation"
      className="relative bg-zinc-800 text-white flex min-h-[220px] w-full flex-col justify-between rounded-2xl  p-4  backdrop-blur-glass transition-all duration-200"
    >
      <div className="relative mb-2 flex flex-1 gap-2">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe what you want to create..."
          className="min-h-[120px]  w-full  bg-transparent pt-1 text-base leading-relaxed text-white outline-none placeholder:text-secondary"
        />
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        tabIndex={-1}
        accept="image/png,.png,image/jpeg,.jpg,.jpeg,image/gif,.gif,image/webp,.webp,image/heic,.heic,image/heif,.heif,text/plain,.txt,text/markdown,.md,.markdown,text/html,.html,.htm,text/javascript,.js,.jsx,.ts,.tsx,application/json,.json,text/css,.css,image/svg+xml,.svg"
        className="sr-only"
      />

      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <IconButton
            ariaLabel="Add file"
            onClick={() => fileInputRef.current?.click()}
          >
            <Plus size={18} />
          </IconButton>

          <div
            role="radiogroup"
            className="relative flex gap-1 rounded-[32px] bg-transparent p-0.5 text-white! backdrop-blur-[40px]"
          >
            <ModeButton
              active={mode === "web"}
              onClick={() => setMode("web")}
              icon={<Monitor size={16} />}
            >
              Web
            </ModeButton>
          </div>
        </div>

        <div className="flex w-full items-center justify-end gap-2 md:w-auto md:justify-normal">
          <IconButton ariaLabel="Theme">
            <Palette size={18} />
          </IconButton>

          <button
            type="button"
            className="flex h-9 shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-full  px-2.5 py-1.5 text-white   transition-colors hover:bg-state-hover "
          >
            <Sparkles size={18} />
            <span className="whitespace-nowrap text-sm font-medium">
              3 Flash
            </span>
            <ChevronDown size={12} />
          </button>

          <IconButton ariaLabel="Start Live Mode">
            <Mic2 size={20} />
          </IconButton>

          <button
            type="button"
            aria-label="Generate designs"
            onClick={() => onGenerate?.({ prompt, mode })}
            className="flex size-9 items-center justify-center rounded-full bg-surface-inverse text-inverse-primary transition-transform duration-150 ease-out hover:scale-105 active:scale-95"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

function IconButton({
  children,
  ariaLabel,
  onClick,
}: {
  children: ReactNode;
  ariaLabel: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      className="flex size-9 cursor-pointer items-center justify-center rounded-full bg-transparent text-white transition-colors hover:bg-state-hover active:bg-state-pressed"
    >
      {children}
    </button>
  );
}

function ModeButton({
  active,
  icon,
  children,
  onClick,
}: {
  active: boolean;
  icon: ReactNode;
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={active}
      onClick={onClick}
      className={[
        "relative z-10 flex cursor-pointer items-center gap-1.5 rounded-[32px] px-2 py-2 text-sm font-medium transition-colors",
        active
          ? "text-primary"
          : "text-secondary hover:bg-state-hover hover:text-primary",
      ].join(" ")}
    >
      {active && (
        <span className="absolute inset-0 z-0 rounded-[32px] bg-state-active" />
      )}

      <span className="relative z-10 flex items-center gap-1.5">
        {icon}
        {children}
      </span>
    </button>
  );
}
