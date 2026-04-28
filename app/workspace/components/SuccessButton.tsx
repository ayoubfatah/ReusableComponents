import { motion, useAnimate, animate } from "framer-motion";
import { CheckIcon } from "../icons";
import { useRef, useState } from "react";

interface SuccessButtonProps {
  setIsContinue: (isContinue: boolean) => void;
  setIsConfirmed: (isConfirmed: boolean) => void;
  startConfirming: () => void;
}

export function SuccessButton({
  setIsContinue,
  setIsConfirmed,
  startConfirming,
}: SuccessButtonProps) {
  const [split, setSplit] = useState(false);
  const [scope] = useAnimate();
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const continueRef = useRef<HTMLButtonElement | null>(null);
  const backRef = useRef<HTMLButtonElement | null>(null);
  const labelRef = useRef<HTMLSpanElement | null>(null);

  const fadeOutLabel = () =>
    animate(
      labelRef.current!,
      { opacity: 0, y: 8 },
      { duration: 0.2, ease: [0.5, 1, 0.89, 1] },
    );

  const fadeInLabel = () =>
    animate(
      labelRef.current!,
      { opacity: 1, y: 0 },
      { duration: 0.24, ease: [0.5, 1, 0.89, 1] },
    );

  const handleContinue = async () => {
    if (split) {
      startConfirming();
      return;
    }
    setIsContinue(true);

    const totalWidth = wrapperRef.current?.offsetWidth ?? 380;
    const half = (totalWidth - 8) / 2;

    await fadeOutLabel();
    setSplit(true);

    await Promise.all([
      animate(
        backRef.current!,
        { width: [0, half], opacity: [0, 1] },
        { duration: 0.16, ease: [0.5, 1, 0.89, 1] },
      ),
      animate(
        continueRef.current!,
        { width: [totalWidth, half] },
        { duration: 0.16, ease: [0.5, 1, 0.89, 1] },
      ),
    ]);

    animate(labelRef.current!, { opacity: 0, y: 10 }, { duration: 0 });
    await fadeInLabel();
  };

  const handleBack = async () => {
    const totalWidth = wrapperRef.current?.offsetWidth ?? 380;
    const half = (totalWidth - 8) / 2;

    await fadeOutLabel();
    setSplit(false);
    setIsContinue(false);
    setIsConfirmed(false);

    await Promise.all([
      animate(
        backRef.current!,
        { width: [half, 0], opacity: [1, 0] },
        { duration: 0.16, ease: [0.5, 1, 0.89, 1] },
      ),
      animate(
        continueRef.current!,
        { width: [half, totalWidth] },
        { duration: 0.16, ease: [0.5, 1, 0.89, 1] },
      ),
    ]);

    animate(labelRef.current!, { opacity: 0, y: 10 }, { duration: 0 });
    await fadeInLabel();
  };

  return (
    <motion.div
      ref={(el) => {
        (scope as React.MutableRefObject<HTMLDivElement | null>).current = el;
        wrapperRef.current = el;
      }}
      className="flex items-center justify-center"
      style={{ gap: split ? 8 : 0 }}
    >
      <button
        ref={backRef}
        onClick={handleBack}
        style={{
          width: 0,
          opacity: 0,
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
        className="font-semibold py-2 rounded-full border ring-1 ring-gray-100 border-gray-200 bg-gray-100 text-gray-500 text-sm"
      >
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.16, ease: [0.5, 1, 0.89, 1] }}
        >
          Back
        </motion.span>
      </button>

      <button
        ref={continueRef}
        onClick={handleContinue}
        className="font-semibold w-full px-4 py-2 rounded-full ring-1 ring-green-500 bg-green-500 text-white"
      >
        <motion.span
          ref={labelRef}
          className="flex items-center gap-2 justify-center"
          initial={{ opacity: 0, y: 10, filter: "blur(1px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -10, filter: "blur(1px)" }}
          transition={{ duration: 0.16, ease: [0.5, 1, 0.89, 1] }}
        >
          {split && <CheckIcon />}
          {split ? "Confirm" : "Continue"}
        </motion.span>
      </button>
    </motion.div>
  );
}
