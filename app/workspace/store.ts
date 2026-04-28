import { create } from "zustand";
import type { Step } from "./types";

interface WorkspaceStore {
  // Form state
  slug: string;
  step: Step;
  isConfirmed: boolean;
  isContinue: boolean;

  // Image state
  uploadedImage: string | null;

  // Actions
  setSlug: (slug: string) => void;
  setStep: (step: Step) => void;
  setIsConfirmed: (confirmed: boolean) => void;
  setIsContinue: (isContinue: boolean) => void;
  setUploadedImage: (image: string | null) => void;

  // Confirm action with loading
  startConfirming: () => void;

  // Reset function
  reset: () => void;
}

export const useWorkspaceStore = create<WorkspaceStore>((set) => ({
  // Initial state
  slug: "",
  step: "idle",
  isConfirmed: false,
  isContinue: false,
  uploadedImage: null,

  // Setters
  setSlug: (slug) => set({ slug }),
  setStep: (step) => set({ step }),
  setIsConfirmed: (isConfirmed) => set({ isConfirmed }),
  setIsContinue: (isContinue) => set({ isContinue }),
  setUploadedImage: (uploadedImage) => set({ uploadedImage }),

  // Confirm with loading
  startConfirming: () => {
    set({ step: "confirming" });
    setTimeout(() => {
      set({ step: "successful", isConfirmed: true });
    }, 2000);
  },

  // Reset all state
  reset: () =>
    set({
      slug: "",
      step: "idle",
      isConfirmed: false,
      isContinue: false,
      uploadedImage: null,
    }),
}));
