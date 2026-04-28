import { TextInput } from "./TextInput";
import { FileInput } from "./FileInput";
import { ButtonContainer } from "./ButtonContainer";
import { useWorkspaceStore } from "../store";
import { debounce, checkSlugAvailability } from "../utils";
import { useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ConfirmingButton } from "./ConfirmingButton";

export function InputSection() {
  const { step, isContinue, setSlug, setStep, isConfirmed } =
    useWorkspaceStore();

  const checkSlug = useCallback(
    debounce(async (value: string) => {
      if (!value) return setStep("idle");
      const available = await checkSlugAvailability(value);
      setStep(available ? "successful" : "taken");
    }, 500),
    [setStep],
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSlug(value);
    setStep("loading");
    checkSlug(value);
  };

  console.log(step, "step");
  return (
    <AnimatePresence>
      {isConfirmed || step === "confirming" ? (
        <div className=""></div>
      ) : (
        <motion.div
          exit={{
            scale: 0,
            opacity: 0,
            filter: "blur(10px)",
          }}
          className="flex flex-col gap-4 w-[380px]"
        >
          {!isContinue ? (
            <TextInput key={"text-input"} step={step} onChange={handleChange} />
          ) : (
            <FileInput key={"file-input"} />
          )}

          <ButtonContainer />
        </motion.div>
      )}
      {step === "confirming" && <ConfirmingButton key="confirming" />}
    </AnimatePresence>
  );
}
