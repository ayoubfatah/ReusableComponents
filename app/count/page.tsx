"use client";
import { motion } from "framer-motion";
import { useState } from "react";

import "./count.css";

export default function Page() {
  const [number, setNumber] = useState(0);

  return (
    <main className="h-screen w-screen justify-center items-center flex  bg-black">
      <div className="container ">
        <button
          onClick={() => setNumber((prev) => prev - 1)}
          className="text-[20px] cursor-pointer"
        >
          -
        </button>
        <div className="numberWrapper">
          <Number value={number} />
        </div>
        <button
          onClick={() => setNumber((prev) => prev + 1)}
          className="text-[20px] cursor-pointer"
        >
          +
        </button>
      </div>
    </main>
  );
}

function Number({ value }: { value: number }) {
  const digits = String(value).padStart(4, "0").split("");
  console.log(digits);

  return (
    <div className="number">
      {digits.map((digit, i) => (
        <Digit value={+digit} key={i} />
      ))}
    </div>
  );
}

const numbers = new Array(10).fill(null).map((_, i) => i);

function Digit({ value }: { value: number }) {
  const offset = `calc(${value} * -1 * 90px)`;
  console.log(value - 1 * (16 + 20), value);

  return (
    <div className="digitWrapper">
      <motion.div
        animate={{ y: offset }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 18,
          mass: 2,
        }}
        className="digits"
      >
        {numbers.map((num) => (
          <p key={num} className="digit">
            {num}
          </p>
        ))}
      </motion.div>
    </div>
  );
}
