"use client";
import { useRef, useEffect } from "react";

export default function FilteredButton() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const animateRef = useRef<SVGAnimateElement>(null);
  const pointLightRef = useRef<SVGFEPointLightElement>(null);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!buttonRef.current || !pointLightRef.current || !animateRef.current)
        return;

      const rect = buttonRef.current.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      pointLightRef.current.setAttribute("x", mouseX.toString());
      pointLightRef.current.setAttribute("y", mouseY.toString());
      animateRef.current.beginElement();
    };

    const button = buttonRef.current;
    if (!button) return;
    button.addEventListener("pointerdown", handlePointerDown);

    return () => {
      if (button) button.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  return (
    <div className="flex flex-col h-screen justify-center items-center w-full mt-12">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="0"
        height="0"
        className="absolute"
      >
        <defs>
          <filter id="svgfm-filter">
            <feSpecularLighting
              surfaceScale="0"
              specularConstant="0"
              specularExponent="8"
              result="feSpecularLighting-bd398cde"
            >
              <fePointLight
                x="400"
                y="200"
                z="30"
                ref={pointLightRef}
              ></fePointLight>
              <animate
                ref={animateRef}
                attributeName="specularConstant"
                values="0;10"
                calcMode="spline"
                keySplines="0.55 0.085 0.68 0.53"
                dur="0.6s"
                begin="indefinite"
                fill="freeze"
              />
            </feSpecularLighting>
            <feComponentTransfer
              in="feSpecularLighting-bd398cde"
              result="feComponentTransfer-24faecef"
            >
              <feFuncA type="table" tableValues="0.5,1,0.5"></feFuncA>
            </feComponentTransfer>
            <feComponentTransfer
              in="feSpecularLighting-bd398cde"
              result="feComponentTransfer-2665a301"
            >
              <feFuncA type="table" tableValues="0,0,0.5,0"></feFuncA>
            </feComponentTransfer>
            <feDisplacementMap
              in="SourceGraphic"
              in2="feComponentTransfer-24faecef"
              scale="-15"
              yChannelSelector="A"
              xChannelSelector="A"
              result="feDisplacementMap-a80a9702"
            ></feDisplacementMap>
            <feBlend
              in="feDisplacementMap-a80a9702"
              in2="feComponentTransfer-2665a301"
              mode="lighten"
            ></feBlend>
          </filter>
        </defs>
      </svg>
      <button
        ref={buttonRef}
        className="flex flex-col items-center px-9 py-4 rounded text-white text-2xl font-normal bg-gradient-to-b from-zinc-700 to-zinc-800 transition-transform duration-200 cursor-pointer"
        style={{ filter: "url(#svgfm-filter)" }}
      >
        Submit
      </button>
    </div>
  );
}
