import { JSX } from "react";
import { FieldProps } from "../../types";

export function Field({ label, children }: FieldProps): JSX.Element {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-mono tracking-wide text-[#999] uppercase">
        {label}
      </label>
      {children}
    </div>
  );
}
