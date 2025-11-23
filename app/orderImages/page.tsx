"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

// Define the spring physics configuration
const spring = {
  type: "spring",
  stiffness: 290,
  damping: 90,
  mass: 1,
};

export default function ImageReorder() {
  const [items, setItems] = useState([0, 1, 2, 3, 4, 5]);
  const [draggedItem, setDraggedItem] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent, item: number) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragEnter = (e: React.DragEvent, targetItem: number) => {
    if (draggedItem === null || draggedItem === targetItem) return;

    const newItems = [...items];
    const draggedIdx = newItems.indexOf(draggedItem);
    const targetIdx = newItems.indexOf(targetItem);

    // Swap positions
    newItems.splice(draggedIdx, 1);
    newItems.splice(targetIdx, 0, draggedItem);

    setItems(newItems);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br p-8">
      <div className="max-w-2xl mx-auto">
        <div className="grid grid-cols-3 gap-4">
          {items.map((item, index) => (
            <motion.div
              key={item}
              transition={spring} // Uses the spring physics for the animation
              draggable
              onDragStart={(e) => handleDragStart(e, item)}
              onDragEnter={(e) => handleDragEnter(e, item)}
              onDragEnd={handleDragEnd}
              onDragOver={(e) => e.preventDefault()}
              className={`
                relative aspect-[6/8] rounded-2xl cursor-grab active:cursor-grabbing select-none
               ${draggedItem === item ? "opacity-30" : "opacity-100"}
              `}
              initial={false} // Prevents animation on first load
              animate={{
                scale: draggedItem === item ? 1 : 1,
                zIndex: draggedItem === item ? 10 : 0,
              }}
            >
              <motion.div
                // Added an inner wrapper for cleaner scaling animations without affecting layout flow
                className="w-full h-full rounded-2xl bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center shadow-lg"
                layoutId={`card-container-${item}`}
              >
                <div className="text-center pointer-events-none">
                  <span className="text-6xl font-bold text-white drop-shadow-lg">
                    {item}
                  </span>
                  {index === 0 && (
                    <motion.div className="mt-2 text-white text-sm font-medium">
                      Main Image
                    </motion.div>
                  )}
                </div>
              </motion.div>

              {index === 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-3 right-3 bg-white rounded-full px-3 py-1 text-xs font-semibold text-rose-500 shadow pointer-events-none"
                >
                  Primary
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="mt-8 bg-white rounded-xl p-6 ">
          <h3 className="font-semibold text-gray-800 mb-2">Current Order:</h3>
          <div className="flex gap-2 flex-wrap">
            {items.map((item) => (
              <motion.div
                layout
                key={item}
                className="border-rose-700 border text-rose-700 font-bold rounded-lg px-4 py-2"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
