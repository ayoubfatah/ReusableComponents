export function YellowCard({ size }: { size: number }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      style={{ height: size, width: size }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_800_11560)">
        <path
          d="M9.5459 0.848389H4.45499C3.40063 0.848389 2.5459 1.70312 2.5459 2.75748V11.2421C2.5459 12.2965 3.40063 13.1512 4.45499 13.1512H9.5459C10.6003 13.1512 11.455 12.2965 11.455 11.2421V2.75748C11.455 1.70312 10.6003 0.848389 9.5459 0.848389Z"
          fill="#fece2f"
        />
      </g>

      <defs>
        <clipPath id="clip0_800_11560">
          <rect width="14" height="14" fill="white" stroke="none" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function Goal() {
  return <span className="text-[20px]">⚽️</span>;
}
