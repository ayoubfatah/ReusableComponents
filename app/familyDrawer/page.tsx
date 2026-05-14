"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import useMeasure from "react-use-measure";
import { Drawer } from "vaul";

export default function FamilyDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState("default");

  const content = useMemo(() => {
    switch (view) {
      case "default":
        return (
          <div>
            <p>This is the default case</p>
            <div className="mt-6 flex flex-col items-start gap-2">
              <button onClick={() => setView("key")}>Key</button>
              <button onClick={() => setView("phrase")}>Phrase</button>
              <button onClick={() => setView("remove")}>Remove</button>
            </div>
          </div>
        );
      case "remove":
        return (
          <div>
            <p>
              You haven’t backed up your wallet yet. If you remove it, you could
              lose access forever. We suggest tapping and backing up your wallet
              first with a valid recovery method.
            </p>
            <button onClick={() => setView("default")}>Go back</button>
          </div>
        );

      case "phrase":
        return (
          <div>
            <p>
              Keep your Secret Phrase safe. Don’t share it with anyone else. If
              you lose it, we can’t recover it.
            </p>
            <button onClick={() => setView("default")}>Go back</button>
          </div>
        );
      case "key":
        return (
          <div>
            <p>
              Your Private Key is the key used to back up your wallet. Keep it
              secret and secure at all times.
            </p>
            <button onClick={() => setView("default")}>Go back</button>
          </div>
        );
    }
  }, [view]);

  const [ref, { height }] = useMeasure();
  return (
    <>
      <button
        className="focus-visible:shadow-focus-ring-button fixed top-1/2 left-1/2 h-[44px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gray-200 bg-white px-4 py-2 font-medium text-black transition-colors hover:bg-[#F9F9F8] md:font-medium"
        onClick={() => setIsOpen(true)}
      >
        Try it out
      </button>
      <Drawer.Root open={isOpen} onOpenChange={setIsOpen}>
        <Drawer.Portal>
          <Drawer.Overlay
            className="fixed inset-0 z-10 bg-black/30"
            onClick={() => setIsOpen(false)}
          />
          <Drawer.Content className="fixed inset-x-4 bottom-4 z-10 mx-auto max-w-[361px] overflow-hidden rounded-[36px] bg-[#FEFFFE] p-6 outline-hidden md:mx-auto md:w-full">
            <motion.div animate={{ height: height ?? 0 }}>
              <div ref={ref}>{content}</div>
            </motion.div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  );
}
