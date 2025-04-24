import React, { Dispatch, SetStateAction } from "react";

const Burger = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <button
      className="absolute  top-5 left-8 flex flex-col justify-center items-center size-[40px] bg-blue-500 border-none cursor-pointer z-10"
      onClick={() => setOpen(!open)}
    >
      {/* Burger Lines */}
      <div
        className={`w-8 h-1 bg-${
          open ? "white" : "white"
        } rounded-full transform transition-all duration-300 ${
          open ? "rotate-45 translate-y-2" : ""
        }`}
      ></div>
      <div
        className={`w-8 h-1 bg-${
          open ? "white" : "white"
        } rounded-full transition-opacity duration-300 ${
          open ? "opacity-0" : "opacity-100"
        }`}
      ></div>
      <div
        className={`w-8 h-1 bg-${
          open ? "white" : "white"
        } rounded-full transform transition-all duration-300 ${
          open ? "-rotate-45 -translate-y-2" : ""
        }`}
      ></div>
    </button>
  );
};

export default Burger;
