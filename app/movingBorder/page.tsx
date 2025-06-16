"use client";
import Image from "next/image";
import "./test.css"; // Assuming test.css is in the same directory

export default function Page() {
  return (
    <div className="bg-black flex justify-center items-center h-screen text-white wf">
      <div className="w-[300px] h-[200px] bg-transparent px-6 py-4 flex justify-center items-end relative overflow-hidden">
        <div className="clip absolute top-1/2 right-1/2 bg-amber-400 w-[400px] h-[500px] translate-x-[50%] -translate-y-[50%]"></div>

        <div className="absolute inset-[1.5px] bg-black text-white p-4 flex flex-col items-center justify-center space-y-2">
          <Image
            alt="img"
            fill
            className="inset-0 absolute z-[99999]"
            src={
              "https://images.unsplash.com/photo-1643488072086-9d7318c0a04b?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
          />
        </div>
      </div>
    </div>
  );
}
