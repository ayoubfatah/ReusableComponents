"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import useMeasure from "react-use-measure";
import "./styles.css";

const variants = {
  initial: (direction: number) => {
    return { x: `${110 * direction}%`, opacity: 0 };
  },
  active: { x: "0%", opacity: 1 },
  exit: (direction: number) => {
    return { x: `${-110 * direction}%`, opacity: 0 };
  },
};

export default function MultiStepComponent() {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState<-1 | 1>(1);
  const [ref, bounds] = useMeasure();

  const content = useMemo(() => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <h2 className="heading">Welcome </h2>
            <p className="body-text">
              This quick setup will help you get started. We’ll walk you through
              the basics so you can start using the app right away.
            </p>
            <div className="skeletons animate-pulse">
              <div className="skeleton" style={{ width: 256 }} />
              <div className="skeleton" style={{ width: 192 }} />
              <div className="skeleton" />
              <div className="skeleton" style={{ width: 384 }} />
            </div>
          </>
        );

      case 1:
        return (
          <>
            <h2 className="heading">Customize your experience</h2>
            <p className="body-text">
              Choose your preferences so we can tailor the app to your needs.
              You can always change these later in settings.
            </p>
            <div className="skeletons animate-pulse">
              <div className="skeleton" style={{ width: 256 }} />
              <div className="skeleton" style={{ width: 192 }} />
              <div className="skeleton" style={{ width: 384 }} />
            </div>
          </>
        );

      case 2:
        return (
          <>
            <h2 className="heading">You are all set </h2>
            <p className="body-text">
              Everything is ready to go. Click below to start exploring and make
              the most out of the app.
            </p>
            <div className="skeletons animate-pulse">
              <div className="skeleton" style={{ width: 256 }} />
              <div className="skeleton" style={{ width: 192 }} />
              <div className="skeleton" style={{ width: 128 }} />
              <div className="skeleton" style={{ width: 224 }} />
              <div className="skeleton" style={{ width: 384 }} />
            </div>
          </>
        );

      default:
        return null;
    }
  }, [currentStep]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-black">
      <MotionConfig transition={{ duration: 0.5, type: "spring", bounce: 0 }}>
        <motion.div
          animate={{ height: bounds.height }}
          className="multi-step-wrapper"
          style={{ overflow: "hidden", position: "relative" }}
        >
          <div ref={ref} className="multi-step-inner">
            {/* Step dots */}
            <div className="step-header">
              <div className="dots">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className={`dot ${i === currentStep ? "active" : ""}`}
                  />
                ))}
              </div>
              <span className="step-label">Step {currentStep + 1} of 3</span>
            </div>

            <AnimatePresence
              mode="popLayout"
              initial={false}
              custom={direction}
            >
              <motion.div
                key={currentStep}
                variants={variants}
                initial="initial"
                animate="active"
                exit="exit"
                custom={direction}
              >
                {content}
              </motion.div>
            </AnimatePresence>

            <motion.div layout className="actions">
              <button
                className="btn btn-secondary"
                disabled={currentStep === 0}
                onClick={() => {
                  if (currentStep === 0) return;
                  setDirection(-1);
                  setCurrentStep((prev) => prev - 1);
                }}
              >
                Back
              </button>
              <button
                disabled={currentStep === 2}
                className="btn btn-primary"
                onClick={() => {
                  if (currentStep === 2) {
                    setDirection(-1);
                    return;
                  }
                  setDirection(1);
                  setCurrentStep((prev) => prev + 1);
                }}
              >
                Continue
              </button>
            </motion.div>
          </div>
        </motion.div>
      </MotionConfig>
    </main>
  );
}
