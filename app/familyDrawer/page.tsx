"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import useMeasure from "react-use-measure";
import { Drawer } from "vaul";
import { DefaultView, Key, Phrase, RemoveWallet } from "./Components";
import { X } from "lucide-react";
import CryptoWallet from "./Cryptowallet";

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState("default");
  const [elementRef, bounds] = useMeasure();

  const content = useMemo(() => {
    switch (view) {
      case "default":
        return <DefaultView setView={setView} />;
      case "remove":
        return <RemoveWallet setView={setView} />;
      case "phrase":
        return <Phrase setView={setView} />;
      case "key":
        return <Key setView={setView} />;
    }
  }, [view]);

  
  const previousHeightRef = useRef<number>(0);

  const layoutTransitionDuration = useMemo(() => {
    const MIN_DURATION = 0.25;
    const MAX_DURATION = 0.3;

    if (!previousHeightRef.current) {
      previousHeightRef.current = bounds.height;
      return MIN_DURATION;
    }

    const heightDifference = Math.abs(
      bounds.height - previousHeightRef.current,
    );
    previousHeightRef.current = bounds.height;
    // prettier-ignore
    const duration = Math.min(Math.max(heightDifference / 500, MIN_DURATION),MAX_DURATION,);

    return duration;
  }, [bounds.height]);

  return (
    <>
      <CryptoWallet onClick={() => setIsOpen(true)} />
      <Drawer.Root open={isOpen} onOpenChange={setIsOpen}>
        <Drawer.Portal>
          <Drawer.Overlay
            className="fixed inset-0 z-10 bg-black/30"
            onClick={() => setIsOpen(false)}
          />
          <Drawer.Content
            asChild
            className="fixed inset-x-4 bottom-4 z-10 mx-auto max-w-[361px] overflow-hidden rounded-[36px] bg-[#FEFFFE] outline-hidden md:mx-auto md:w-full"
          >
            <motion.div animate={{ height: bounds.height }}>
              <Drawer.Close asChild>
                <button
                  data-vaul-no-drag=""
                  className="focus-visible:shadow-focus-ring-button absolute top-7 right-8 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-[#F7F8F9] text-[#949595] transition-transform focus:scale-95 active:scale-75"
                >
                  <X />
                </button>
              </Drawer.Close>
              <div ref={elementRef} className="px-6 pt-2.5 pb-6 antialiased">
                <AnimatePresence initial={false} mode="popLayout" custom={view}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    key={view}
                    transition={{
                      duration: layoutTransitionDuration,
                      ease: [0.26, 0.08, 0.25, 1],
                    }}
                  >
                    {content}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  );
}
