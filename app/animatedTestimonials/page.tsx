"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

const infos = [
  {
    name: "Jack Austin",
    jobTitle: "Dog Trainer",
    text: "Since using PurrfectCare, managing my bookings and client information has been a breeze. The automated reminders have reduced no-shows, and the staff scheduling feature saves us hours every week!",
    image:
      "https://purrfect-care-one.vercel.app/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1539571696357-5a69c17a67c6%3Fq%3D80%26w%3D2662%26auto%3Dformat%26fit%3Dcrop%26ixlib%3Drb-4.0.3%26ixid%3DM3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%253D%253D&w=1080&q=75",
  },
  {
    name: "Sofia Rodriguez",
    text: "PurrfectCare helped us streamline our operations and boost efficiency. The detailed analytics dashboard allowed us to identify peak times, leading to better staffing decisions and a 20% increase in revenue!",
    jobTitle: "Grooming Salon Owner",
    image:
      "https://purrfect-care-one.vercel.app/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1519419691348-3b3433c4c20e%3Fw%3D800%26auto%3Dformat%26fit%3Dcrop%26q%3D60%26ixlib%3Drb-4.0.3%26ixid%3DM3wxMjA3fDB8MHxzZWFyY2h8MjZ8fHBlb3BsZXxlbnwwfDF8MHx8fDI%253D&w=1080&q=75",
  },
  {
    name: "Lana Kim",
    text: "I love how easy it is to manage both client appointments and pet profiles. The custom service packages feature is a game-changer, letting me offer discounts and bundle services for my loyal clients!",
    jobTitle: "Owner of Cats Club",
    image:
      "https://purrfect-care-one.vercel.app/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1534528741775-53994a69daeb%3Fw%3D800%26auto%3Dformat%26fit%3Dcrop%26q%3D60%26ixlib%3Drb-4.0.3%26ixid%3DM3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVvcGxlfGVufDB8MXwwfHx8Mg%253D%253D&w=1080&q=75",
  },
  {
    name: "Lana Kim",
    text: "PurrfectCare helped us streamline our operations and boost efficiency. The detailed analytics dashboard allowed us to identify peak times, leading to better staffing decisions and a 20% increase in revenue!",
    jobTitle: "Pet Hotel Manager",
    image:
      "https://purrfect-care-one.vercel.app/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1512288094938-363287817259%3Fw%3D800%26auto%3Dformat%26fit%3Dcrop%26q%3D60%26ixlib%3Drb-4.0.3%26ixid%3DM3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDExfHx8ZW58MHx8fHx8&w=1080&q=75",
  },
];

export default function Page() {
  const [textNumber, setTextNumber] = useState(0);

  const handleNext = useCallback(() => {
    setTextNumber((prev) => (prev + 1) % infos.length);
  }, []);

  const handlePrevious = useCallback(() => {
    setTextNumber((prev) => (prev - 1 + infos.length) % infos.length);
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrevious();
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleNext, handlePrevious]);

  return (
    <div className="h-screen bg-white grid grid-cols-[350px_1fr]  w-[800px] mx-auto justify-center items-center text-black">
      <motion.div
        key={textNumber}
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.01,
            },
          },
        }}
        className="ml-[20px] "
      >
        <motion.div
          variants={{
            hidden: { y: 10 },
            visible: { y: 0 },
          }}
          className="flex flex-col mb-4"
        >
          <h1 className="font-bold text-[22px] ">{infos[textNumber].name}</h1>
          <span className="font-semibold text-[12px] text-black/60 ">
            {infos[textNumber].jobTitle}
          </span>
        </motion.div>
        <motion.div className="flex items-center gap-[6px] flex-wrap  h-[100px] w-[450px] ">
          {infos[textNumber].text.split(" ").map((c, i) => (
            <motion.span
              key={c + i}
              variants={{
                hidden: { opacity: 0, filter: "blur(8px)" },
                visible: { opacity: 1, filter: "blur(0px)" },
              }}
              className="transition-all w-fit text-[19px] font-light"
            >
              {c}
            </motion.span>
          ))}
        </motion.div>

        <div className=" flex items-center gap-10 mt-14 ">
          <button
            onClick={handlePrevious}
            className="px-5 py-2 bg-black text-white rounded-sm mt-10"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className="px-5 py-2  bg-black text-white rounded-sm mt-10"
          >
            Next
          </button>
        </div>
      </motion.div>
    </div>
  );
}
