"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Lenis from "lenis";

export default function Page() {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main className="relative">
      <section className="bg-white mx-10 h-[100vh]">
        {/* Favorite */}
        <h1>
          <span className="sticky top-0 z-20 bg-white text-black text-[120px] pt-12 font-bold block">
            Favorite
          </span>
          <span className=" z-30 bg-white text-black text-[120px] font-bold block">
            Studio
          </span>
        </h1>
        {/* Image */}

        <div className="absolute  w-full h-full">
          <Image
            fill
            src="https://favorit.studio/_nuxt/img/favorit_studio_intro_d_01.2872866.jpg"
            alt="favorite"
            className="object-cover"
          />
        </div>

        {/* Studio */}

        {/* Extra space so Studio appears properly */}
      </section>

      {/* Next Section */}
      <section className="h-screen bg-blue-200 mx-10">
        <span className="text-[120px] font-bold">Third</span>
      </section>
    </main>
  );
}
