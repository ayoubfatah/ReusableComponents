import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useWorkspaceStore } from "../store";
import { UploadedImage } from "./UploadedImage";
import type { Step } from "../types";
import { useState, useEffect } from "react";
import { Check } from "../icons";

interface WorkspaceCardProps {
  step: Step;
  slug: string;
  isConfirmed: boolean;
  isContinue: boolean;
}

export function WorkspaceCard({
  step,
  slug,
  isConfirmed,
  isContinue,
}: WorkspaceCardProps) {
  const { uploadedImage } = useWorkspaceStore();
  const [showBlur, setShowBlur] = useState(false);
  const isTaken = step === "taken";

  useEffect(() => {
    if (isConfirmed) {
      setShowBlur(true);
      const timer = setTimeout(() => setShowBlur(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isConfirmed]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 6, width: "320px", height: "170px" }}
        animate={{
          opacity: 1,
          y: 0,
          borderRadius: isConfirmed ? "100%" : undefined,
          width: isConfirmed ? "130px" : "320px",
          height: isConfirmed ? "130px" : "170px",
          filter: showBlur ? "blur(0.5px)" : "none",
        }}
        exit={{ opacity: 0, y: -6, width: 0 }}
        transition={{ duration: 0.24, ease: [0.5, 1, 0.89, 1] }}
        layout="position"
        className={cn(
          "h-[170px] w-[320px] rounded-2xl p-6 flex flex-col justify-between transition-colors duration-500",
          isContinue && " items-center justify-center text-center",
          isConfirmed && "items-center justify-center ",
          isTaken ? "bg-[#c00b17]" : "bg-green-500",
        )}
      >
        {!isConfirmed &&
          (uploadedImage ? (
            <UploadedImage />
          ) : (
            <motion.div
              layoutId="workspace-circle"
              className={cn(
                " bg-white rounded-full",
                isContinue ? "size-[90px]" : "size-[40px]",
              )}
            />
          ))}
        {isConfirmed && <Check />}

        <div>
          {!isConfirmed && (
            <motion.h1
              layout="position"
              layoutId="workspace-title"
              className="text-white font-bold mt-2"
            >
              {slug || "Your workspace"}
            </motion.h1>
          )}
          {!isContinue && !isConfirmed && (
            <h2 className="text-white">{slug || "slug"}</h2>
          )}
        </div>
      </motion.div>

      <motion.div className="my-8 text-center">
        <AnimatePresence mode="wait">
          {!isContinue && !isConfirmed && (
            <motion.div
              key="create"
              initial={{ opacity: 0, filter: "blur(1px)", y: 6 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              exit={{ opacity: 0, y: -6, filter: "blur(1px)" }}
              transition={{
                duration: 0.23,
                ease: [0.5, 1, 0.89, 1],
              }}
            >
              <p className="font-semibold text-xl">Create Your workspace</p>
              <p className="text-md text-gray-500">
                Give your account and name
              </p>
            </motion.div>
          )}
          {isContinue && !isConfirmed && (
            <motion.div
              key="continue"
              initial={{ opacity: 0, filter: "blur(1px)", y: 6 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              exit={{ opacity: 0, filter: "blur(1px)", y: -6 }}
              transition={{
                duration: 0.23,
                ease: [0.5, 1, 0.89, 1],
              }}
            >
              <p className="font-semibold text-xl">Almost there!</p>
              <p className="text-md text-gray-500">
                Upload your logo to complete Your Workspace
              </p>
            </motion.div>
          )}
          {isConfirmed && (
            <motion.div
              key="confirmed"
              initial={{ opacity: 0, filter: "blur(0.4px)", y: 6 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              exit={{ opacity: 0, filter: "blur(0.4px)", y: -6 }}
              transition={{
                delay: 0.07,
                duration: 0.23,
                ease: [0.5, 1, 0.89, 1],
              }}
            >
              <p className="font-semibold text-xl">All set!</p>
              <p className="text-md text-gray-500">
                Your workspace is ready to go
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
