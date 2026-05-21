import { create } from "zustand";

export type BtnState = "CONNECT" | "CONNECTING" | "CONNECTED";

type IntegrationStore = {
  btnState: BtnState;
  isRunning: boolean;
  done: boolean;
  footerHint: string;

  setBtnState: (state: BtnState) => void;
  setIsRunning: (value: boolean) => void;
  setDone: (value: boolean) => void;
  setFooterHint: (value: string) => void;

  reset: () => void;
};

export const useIntegrationStore = create<IntegrationStore>((set) => ({
  count: 1,

  btnState: "CONNECT",
  isRunning: false,
  done: false,
  footerHint: "TLS 1.3 · encrypted",

  setBtnState: (state) => set({ btnState: state }),
  setIsRunning: (value) => set({ isRunning: value }),
  setDone: (value) => set({ done: value }),
  setFooterHint: (value) => set({ footerHint: value }),

  reset: () =>
    set({
      btnState: "CONNECT",
      isRunning: false,
      done: false,
      footerHint: "TLS 1.3 · encrypted",
    }),
}));
