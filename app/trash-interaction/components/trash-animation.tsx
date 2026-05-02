"use client";

import { AnimatePresence, MotionConfig, delay, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { TrashBack, TrashFront } from "./trash-assets";
import clsx from "clsx";

const IMAGES = [
  "https://examples.motion.dev/photos/creativestudio/finalcuticon.png",
  "https://examples.motion.dev/photos/creativestudio/pixelmatorpro.png",
  "https://examples.motion.dev/photos/creativestudio/logicpro.png",
  "https://examples.motion.dev/photos/creativestudio/keynote.png",
  "https://examples.motion.dev/photos/creativestudio/compressor.png",
  "https://examples.motion.dev/photos/creativestudio/freeform.png",
];

export function TrashAnimation() {
  const [imagesToRemove, setImagesToRemove] = useState<string[]>([]);
  const [readyToRemove, setReadyToRemove] = useState<boolean>(false);
  const [removed, setRemoved] = useState(false);

  // Filter images to show/hide based on selection state
  const imagesToShow = readyToRemove
    ? IMAGES.filter((img) => !imagesToRemove.includes(img))
    : IMAGES;

  // Reset states after trash animation completes
  // useEffect(() => {
  //   if (removed) {
  //     setTimeout(() => {
  //       setImagesToRemove([]);
  //       setReadyToRemove(false);
  //       setRemoved(false);
  //     }, 1200);
  //   }
  // }, [removed]);

  return (
    <div className="relative flex h-[500px]  flex-col items-center justify-center">
      <MotionConfig
        transition={{
          type: "spring",
          duration: 0.5,
          bounce: 0.3,
        }}
      >
        {/* MAIN GRID - Shows all images with selection checkboxes */}
        <ul className="grid grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {!readyToRemove &&
              imagesToShow.map((image) => {
                const isSelected = imagesToRemove.includes(image);

                return (
                  <motion.li
                    exit={
                      !isSelected
                        ? {
                            opacity: 0,
                            filter: "blur(4px)",
                            transition: { duration: 0.05 },
                          }
                        : {}
                    }
                    transition={{
                      duration: 0,
                    }}
                    key={image}
                    className="relative flex h-[100px] w-[100px]"
                  >
                    {/* SELECTION CHECKBOX - Shows when item is selected for deletion */}
                    <motion.div
                      exit={{ opacity: 0, transition: { duration: 0 } }}
                      className={clsx(
                        "pointer-events-none absolute top-2 right-2 flex h-4 w-4 items-center justify-center rounded-full border border-white/60",
                      )}
                    >
                      <AnimatePresence>
                        {isSelected ? (
                          <motion.div
                            initial={{
                              scale: 0,
                              opacity: 0,
                              filter: "blur(4px)",
                            }}
                            animate={{
                              scale: 1.1,
                              opacity: 1,
                              filter: "blur(0px)",
                            }}
                            exit={{
                              scale: 0,
                              opacity: 0,
                              filter: "blur(4px)",
                              transition: { duration: 0.1 },
                            }}
                            transition={{
                              type: "spring",
                              duration: 0.25,
                              bounce: 0,
                            }}
                          >
                            <div className="absolute inset-0.5 rounded-full bg-white" />
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="relative h-5 w-5 flex-shrink-0 rounded-full text-black"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                className="bg-white"
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM15.5805 9.97493C15.8428 9.65434 15.7955 9.18183 15.4749 8.91953C15.1543 8.65724 14.6818 8.70449 14.4195 9.02507L10.4443 13.8837L9.03033 12.4697C8.73744 12.1768 8.26256 12.1768 7.96967 12.4697C7.67678 12.7626 7.67678 13.2374 7.96967 13.5303L9.96967 15.5303C10.1195 15.6802 10.3257 15.7596 10.5374 15.7491C10.749 15.7385 10.9463 15.6389 11.0805 15.4749L15.5805 9.97493Z"
                                fill="currentColor"
                              />
                            </svg>
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </motion.div>

                    {/* IMAGE BUTTON - Click to select/deselect for deletion */}
                    <motion.button
                      layoutId={image}
                      className="overflow-hidden "
                      aria-label="Remove book"
                      onClick={() => {
                        if (isSelected) {
                          setImagesToRemove((images) =>
                            images.filter((img) => img !== image),
                          );
                        } else {
                          setImagesToRemove((images) => [...images, image]);
                        }
                      }}
                    >
                      <motion.img
                        className="rounded-xl "
                        alt="A guy"
                        src={image}
                        height={100}
                        width={100}
                      />
                    </motion.button>
                  </motion.li>
                );
              })}
          </AnimatePresence>
        </ul>

        {/* DELETION CONTROLS - Shows when items are selected for deletion */}
        <AnimatePresence mode="popLayout">
          {imagesToRemove.length > 0 && !readyToRemove ? (
            <motion.div
              initial={{
                filter: "blur(10px)",
                transform: "scale(0)",
                opacity: 0,
              }}
              animate={{
                filter: "blur(0px)",
                transform: "scale(1)",
                opacity: 1,
              }}
              exit={{
                filter: "blur(10px)",
                transform: "scale(0)",
                opacity: 0,
              }}
              className="absolute bottom-8 flex gap-1 rounded-xl p-1 shadow-[0_0_0_1px_rgba(0,0,0,0.08),0px_8px_8px_-8px_rgba(0,0,0,0.16)] will-change-transform"
            >
              <motion.div
                exit={{
                  opacity: 0,
                }}
                transition={{
                  duration: 0,
                }}
                className="flex w-full justify-between gap-1"
              >
                {/* TRASH BUTTON - Confirm deletion */}
                <button
                  onClick={() => {
                    if (readyToRemove) {
                      setRemoved(true);
                    } else {
                      setReadyToRemove(true);
                    }
                  }}
                  className="flex w-12 flex-col items-center gap-[1px] rounded-lg bg-[#1A1A1A pt-[6px] pb-1 text-[10px] font-medium text-[#A0A0A0] hover:bg-[#2A2A2A] hover:text-[#FF6B6B]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-4 w-4 flex-shrink-0"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.58393 5C8.28068 3.24301 9.99487 2 12.0009 2C14.007 2 15.7212 3.24301 16.4179 5H21.25C21.6642 5 22 5.33579 22 5.75C22 6.16421 21.6642 6.5 21.25 6.5H19.9532L19.0588 20.3627C18.9994 21.2835 18.2352 22 17.3124 22H6.68756C5.76481 22 5.0006 21.2835 4.94119 20.3627L4.04683 6.5H2.75C2.33579 6.5 2 6.16421 2 5.75C2 5.33579 2.33579 5 2.75 5H7.58393ZM9.26161 5C9.83935 4.09775 10.8509 3.5 12.0009 3.5C13.151 3.5 14.1625 4.09775 14.7403 5H9.26161Z"
                      fill="currentColor"
                    />
                  </svg>
                  Trash
                </button>
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        {/* TRASH EXECUTION BUTTON - Shows when ready to delete */}
        <AnimatePresence mode="popLayout">
          {readyToRemove && !removed ? (
            <motion.div
              className="absolute bottom-10 flex flex-col gap-2"
              initial={{ clipPath: "circle(3.2% at 50% 50%)" }}
              animate={{ clipPath: "circle(96.3% at 52% 83%)" }}
              exit={{ clipPath: "circle(3.2% at 50% 50%)" }}
              transition={{ duration: 0.2 }}
            >
              <button
                onClick={() => {
                  if (readyToRemove) {
                    setRemoved(true);
                  } else {
                    setReadyToRemove(true);
                  }
                }}
                className="flex h-8 w-[200px] items-center justify-center gap-[15px] rounded-full bg-[#FF3F40] text-center text-[13px] font-semibold text-[#FFFFFF]"
              >
                Trash {imagesToRemove.length} Collectibles
              </button>
            </motion.div>
          ) : null}
        </AnimatePresence>

        {/* TRASH ANIMATION - Shows trash can opening when deletion is confirmed */}
        <AnimatePresence mode="popLayout">
          {readyToRemove ? (
            <div className="absolute top-1/2 z-10 h-[114px] w-24 -translate-y-1/2">
              <motion.div
                initial={{ scale: 1.2, filter: "blur(4px)", opacity: 0 }}
                animate={{
                  scale: 1,
                  filter: "blur(0px)",
                  opacity: 1,
                  rotate: removed ? [0, -2, 2, 0] : 0,
                }}
                exit={{ scale: 1.2, filter: "blur(4px)", opacity: 0 }}
                transition={{
                  rotate: {
                    duration: 0.5,
                    repeat: removed ? 1 : 0,
                    delay: 0.2,
                  },
                }}
              >
                <TrashBack />
              </motion.div>

              <motion.div
                className="absolute top-[-60px] flex w-full flex-col-reverse items-center"
                animate={{ y: removed ? 100 : 80, opacity: removed ? 0 : 1 }}
                transition={{
                  delay: 0.18,
                }}
              >
                {imagesToRemove.map((image, index) => (
                  <li key={image} className="flex h-1 items-center gap-2">
                    <motion.img
                      layoutId={image}
                      alt="A guy"
                      className="rounded"
                      src={image}
                      height={65}
                      width={65}
                      style={{
                        rotate:
                          index % 2 === 0
                            ? 4 * (imagesToRemove.length - index + 1)
                            : -1 * (imagesToRemove.length - index + 1) * 4,
                      }}
                    />
                  </li>
                ))}
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  delay: 0.18,
                  duration: 0,
                }}
                className="absolute bottom-[0] left-[3px] h-full w-[90px]"
              >
                <TrashFront />
              </motion.div>
            </div>
          ) : null}
        </AnimatePresence>
      </MotionConfig>
    </div>
  );
}
