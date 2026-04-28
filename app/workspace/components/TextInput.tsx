import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useWorkspaceStore } from "../store";
import type { Step } from "../types";

interface TextInputProps {
  step: Step;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function TextInput({ step, onChange }: TextInputProps) {
  const { slug, setSlug, setStep } = useWorkspaceStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSlug(value);
    setStep("loading");
    onChange?.(e);
  };

  return (
    <motion.input
      initial={{
        opacity: 0.2,
        filter: "blur(1px)",
      }}
      animate={{
        opacity: 1,
        filter: "blur(0px)",
      }}
      transition={{ duration: 0.24, ease: [0.5, 1, 0.89, 1] }}
      exit={{
        opacity: 0.2,
        filter: "blur(1px)",
      }}
      key={"text-input"}
      type="text"
      value={slug}
      onChange={handleChange}
      placeholder="Workspace Name"
      className={cn(
        "ring-1 rounded-full bg-gray-100 p-2 px-4 w-full placeholder:text-green-600/60",
        "focus:outline-none transition-all duration-300",
        step === "idle" && "ring-gray-100",
        step === "loading" && "ring-gray-100",
        step === "taken" && "ring-[#c00b17]",
        step === "successful" && "ring-green-500",
      )}
    />
  );
}
