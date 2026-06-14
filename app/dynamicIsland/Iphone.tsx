import React, { ReactNode } from "react";

export default function Iphone({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        backgroundImage: `url("/dynamicIsland.svg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="h-screen w-full  flex  justify-center items-center   bg-black"
    >
      <div
        style={{
          backgroundImage: `url("https://static1.squarespace.com/static/5e949a92e17d55230cd1d44f/t/67ffbc88ed6f7d0290cf666f/1744813199669/April16_iPhone.png")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className=" relative w-[446px] h-[1000px] translate-y-[400px] flex justify-center items-start  bg-black rounded-[85px] ring-white ring-2 border-10  py-6 border-[#232220]"
      >
        <div className="">{children}</div>

        <IphoneButtons />
        <IphoneButtons2 />
        <IphoneButtonOffOn />
      </div>
    </div>
  );
}

function IphoneButtons() {
  return (
    <svg
      className="absolute top-[468px] right-[-16px]"
      xmlns="http://www.w3.org/2000/svg"
      width="4"
      height="104"
      viewBox="0 0 4 104"
      fill="none"
    >
      <path
        d="M2.56384 0.12793H0.128296V133.168H2.56384C3.20071 133.168 3.71716 132.651 3.71716 132.014V1.28125C3.71692 0.644528 3.20056 0.128167 2.56384 0.12793Z"
        fill="#8F8F8A"
      />
      <path
        d="M2.56384 0.12793H0.128296V133.168H2.56384C3.20071 133.168 3.71716 132.651 3.71716 132.014V1.28125C3.71692 0.644528 3.20056 0.128167 2.56384 0.12793Z"
        fill="url(#paint0_linear_1_1693)"
      />
      <path
        d="M2.56384 0.12793H0.128296V133.168H2.56384C3.20071 133.168 3.71716 132.651 3.71716 132.014V1.28125C3.71692 0.644528 3.20056 0.128167 2.56384 0.12793Z"
        fill="url(#paint1_linear_1_1693)"
      />
      <path
        d="M2.56384 0.12793H0.128296V133.168H2.56384C3.20071 133.168 3.71716 132.651 3.71716 132.014V1.28125C3.71692 0.644528 3.20056 0.128167 2.56384 0.12793Z"
        stroke="url(#paint2_linear_1_1693)"
        stroke-width="0.256338"
      />
      <defs>
        <linearGradient
          id="paint0_linear_1_1693"
          x1="1.92256"
          y1="0"
          x2="1.92256"
          y2="133.296"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" stop-opacity="0" />
          <stop offset="0.0342813" stop-color="white" stop-opacity="0.68" />
          <stop offset="0.0641747" stop-opacity="0.66" />
          <stop offset="0.100711" stop-color="white" stop-opacity="0" />
          <stop offset="0.946031" stop-color="white" stop-opacity="0" />
          <stop offset="0.959317" stop-opacity="0.66" />
          <stop offset="0.969281" stop-color="white" stop-opacity="0.48" />
          <stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_1_1693"
          x1="5.28699"
          y1="59.2425"
          x2="2.88383"
          y2="59.2425"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.223275" />
          <stop offset="1" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_1_1693"
          x1="5.28699"
          y1="59.2426"
          x2="-0.480611"
          y2="59.2426"
          gradientUnits="userSpaceOnUse"
        >
          <stop />
          <stop offset="1" stop-opacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
function IphoneButtons2() {
  return (
    <svg
      className="absolute top-[468px] left-[-16px]"
      xmlns="http://www.w3.org/2000/svg"
      width="4"
      height="104"
      viewBox="0 0 4 104"
      fill="none"
    >
      <path
        d="M2.56384 0.12793H0.128296V133.168H2.56384C3.20071 133.168 3.71716 132.651 3.71716 132.014V1.28125C3.71692 0.644528 3.20056 0.128167 2.56384 0.12793Z"
        fill="#8F8F8A"
      />
      <path
        d="M2.56384 0.12793H0.128296V133.168H2.56384C3.20071 133.168 3.71716 132.651 3.71716 132.014V1.28125C3.71692 0.644528 3.20056 0.128167 2.56384 0.12793Z"
        fill="url(#paint0_linear_1_1693)"
      />
      <path
        d="M2.56384 0.12793H0.128296V133.168H2.56384C3.20071 133.168 3.71716 132.651 3.71716 132.014V1.28125C3.71692 0.644528 3.20056 0.128167 2.56384 0.12793Z"
        fill="url(#paint1_linear_1_1693)"
      />
      <path
        d="M2.56384 0.12793H0.128296V133.168H2.56384C3.20071 133.168 3.71716 132.651 3.71716 132.014V1.28125C3.71692 0.644528 3.20056 0.128167 2.56384 0.12793Z"
        stroke="url(#paint2_linear_1_1693)"
        stroke-width="0.256338"
      />
      <defs>
        <linearGradient
          id="paint0_linear_1_1693"
          x1="1.92256"
          y1="0"
          x2="1.92256"
          y2="133.296"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" stop-opacity="0" />
          <stop offset="0.0342813" stop-color="white" stop-opacity="0.68" />
          <stop offset="0.0641747" stop-opacity="0.66" />
          <stop offset="0.100711" stop-color="white" stop-opacity="0" />
          <stop offset="0.946031" stop-color="white" stop-opacity="0" />
          <stop offset="0.959317" stop-opacity="0.66" />
          <stop offset="0.969281" stop-color="white" stop-opacity="0.48" />
          <stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_1_1693"
          x1="5.28699"
          y1="59.2425"
          x2="2.88383"
          y2="59.2425"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.223275" />
          <stop offset="1" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_1_1693"
          x1="5.28699"
          y1="59.2426"
          x2="-0.480611"
          y2="59.2426"
          gradientUnits="userSpaceOnUse"
        >
          <stop />
          <stop offset="1" stop-opacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
function IphoneButtonOffOn() {
  return (
    <svg
      className="absolute     top-[308px] left-[-16px]"
      xmlns="http://www.w3.org/2000/svg"
      width="4"
      height="42"
      viewBox="0 0 4 42"
      fill="none"
    >
      <path
        d="M1.28125 0.12793H3.7168V40.8857H1.28125C0.644388 40.8855 0.127942 40.3693 0.12793 39.7324V1.28125C0.128167 0.644527 0.644527 0.128167 1.28125 0.12793Z"
        fill="#8F8F8A"
      />
      <path
        d="M1.28125 0.12793H3.7168V40.8857H1.28125C0.644388 40.8855 0.127942 40.3693 0.12793 39.7324V1.28125C0.128167 0.644527 0.644527 0.128167 1.28125 0.12793Z"
        fill="url(#paint0_linear_1_1690)"
      />
      <path
        d="M1.28125 0.12793H3.7168V40.8857H1.28125C0.644388 40.8855 0.127942 40.3693 0.12793 39.7324V1.28125C0.128167 0.644527 0.644527 0.128167 1.28125 0.12793Z"
        fill="url(#paint1_linear_1_1690)"
      />
      <path
        d="M1.28125 0.12793H3.7168V40.8857H1.28125C0.644388 40.8855 0.127942 40.3693 0.12793 39.7324V1.28125C0.128167 0.644527 0.644527 0.128167 1.28125 0.12793Z"
        stroke="url(#paint2_linear_1_1690)"
        stroke-width="0.256338"
      />
      <defs>
        <linearGradient
          id="paint0_linear_1_1690"
          x1="1.92254"
          y1="0"
          x2="1.92254"
          y2="41.0141"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" stop-opacity="0" />
          <stop offset="0.0790312" stop-color="white" stop-opacity="0.68" />
          <stop offset="0.145284" stop-opacity="0.66" />
          <stop offset="0.229605" stop-color="white" stop-opacity="0" />
          <stop offset="0.801784" stop-color="white" stop-opacity="0" />
          <stop offset="0.898151" stop-color="white" stop-opacity="0.48" />
          <stop offset="0.928492" stop-opacity="0.66" />
          <stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_1_1690"
          x1="-1.4419"
          y1="41.0141"
          x2="0.961268"
          y2="41.0141"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.223275" />
          <stop offset="1" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_1_1690"
          x1="-1.4419"
          y1="41.0141"
          x2="4.3257"
          y2="41.0141"
          gradientUnits="userSpaceOnUse"
        >
          <stop />
          <stop offset="1" stop-opacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
