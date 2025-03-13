"use client";
import { motion } from "framer-motion";

import { ComponentPropsWithoutRef, useState } from "react";

export default function Page() {
  const [step, setStep] = useState(1);

  return (
    <main className="bg- h-screen w-full flex flex-col  justify-center items-center pt-10">
      <div className="w-[400px]  bg-white rounded-xl flex flex-col gap-10 py-8 px-10">
        <div className="flex justify-between items-center">
          <Step step={1} currentStep={step} />
          <Step step={2} currentStep={step} />
          <Step step={3} currentStep={step} />
          <Step step={4} currentStep={step} />
        </div>
        <div className="flex justify-between mt-auto w-full">
          <button onClick={() => setStep(step < 2 ? step : step - 1)}>
            Back
          </button>
          <button
            onClick={() => setStep(step === 5 ? step : step + 1)}
            className="py-2 px-4 bg-blue-500 text-white rounded-full"
          >
            Continue
          </button>
        </div>
      </div>
    </main>
  );
}

function Step({ step, currentStep }: { step: number; currentStep: number }) {
  const status =
    currentStep === step
      ? "active"
      : currentStep < step
      ? "inactive"
      : "complete";

  return (
    <div className="relative">
      <motion.div
        animate={status}
        variants={{
          active: {
            opacity: 0,
            scale: 1,
          },
          complete: {
            opacity: 1,
            scale: 1.25,
          },
          inactive: {
            opacity: 0,
          },
        }}
        className=" blur-sm absolute inset-0 bg-blue-200 rounded-full"
      />
      <motion.div
        className="relative flex justify-center items-center size-10 border-2  font-semibold  text-[18px] rounded-full "
        initial={false}
        transition={{ duration: 0.2 }}
        animate={status}
        variants={{
          inactive: {
            backgroundColor: "#FFFF",
            color: "oklch(0.869 0.022 252.894)",
            borderColor: "oklch(0.968 0.007 247.896)",
          },
          active: {
            backgroundColor: "#FFFF",
            color: "#3B82F6",
            borderColor: "#3B82F6",
          },
          complete: {
            backgroundColor: "#3B82F6",
            color: "#3B82F6",
            borderColor: "#3B82F6",
          },
        }}
      >
        {status === "complete" ? (
          <CheckIcon className="size-6 text-white" />
        ) : (
          <span>{step}</span>
        )}
      </motion.div>
    </div>
  );
}
function CheckIcon(props?: ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-check text-white"
    >
      <motion.path
        transition={{
          delay: 0,
          type: "tween",
          ease: "easeInOut",
          duration: 0.3,
        }}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        d="M4 12 9 17 20 6"
      />
    </svg>
  );
}
