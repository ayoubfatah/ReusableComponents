import type { ReactNode } from "react";

export type BtnState = "CONNECT" | "CONNECTING" | "CONNECTED";

export interface FieldProps {
  label: string;
  children: ReactNode;
}

export interface ConnectButtonProps {
  state: BtnState;
  disabled?: boolean;
  onClick: () => void;
}

export interface LabelChar {
  char: string;
  key: string;
}
