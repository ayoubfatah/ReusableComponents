import { BtnState, LabelChar } from "./types";

const LABEL_MAP: Record<BtnState, string> = {
  CONNECT: "Connect",
  CONNECTING: "Connecting",
  CONNECTED: "Connected",
};

export function labelChars(state: BtnState): LabelChar[] {
  const text = LABEL_MAP[state];
  const used: Record<string, number> = {};
  return text.split("").map((char) => {
    const k = (used[char] = (used[char] || 0) + 1);
    return { char, key: `${char}-${k}` };
  });
}

export function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
