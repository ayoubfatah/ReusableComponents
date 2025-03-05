import Image from "next/image";
import React from "react";

export default function Avatar() {
  return (
    <Image
      alt="dddd"
      src="https://st2.depositphotos.com/6672578/9743/i/450/depositphotos_97431594-businessman-smiling-confidently-at-camera.jpg"
      width={100}
      height={100}
      className="size-[74px] object-cover  mb-2 block bg-black rounded-full "
    />
  );
}
