import { AnimatePresence } from "framer-motion";
import { IdleButton } from "./IdleButton";
import { LoadingButton } from "./LoadingButton";
import { TakenButton } from "./TakenButton";
import { SuccessButton } from "./SuccessButton";
import { ConfirmingButton } from "./ConfirmingButton";
import { useWorkspaceStore } from "../store";
import type { Step } from "../types";
import React from "react";

export function ButtonContainer() {
  const { step, setIsConfirmed, setIsContinue, startConfirming } =
    useWorkspaceStore();

  const buttonMap: Record<Step, React.ReactElement> = {
    idle: <IdleButton key="idle" />,
    loading: <LoadingButton key="loading" />,
    taken: <TakenButton key="taken" />,
    successful: (
      <SuccessButton
        key="successful"
        setIsContinue={setIsContinue}
        setIsConfirmed={setIsConfirmed}
        startConfirming={startConfirming}
      />
    ),
    confirming: <ConfirmingButton key="confirming" />,
  };

  return (
    <AnimatePresence mode="wait">
      {React.cloneElement(buttonMap[step], { key: step })}
    </AnimatePresence>
  );
}
