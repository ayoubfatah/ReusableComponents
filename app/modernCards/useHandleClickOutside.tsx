import { useEffect } from "react";
import { RefObject } from "react";

export default function useHandleClickOutside(
  ref: RefObject<HTMLDivElement | null>,
  cb: () => void,
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref?.current && !ref.current.contains(event.target as Node)) {
        cb();
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [cb, ref]);

  return null;
}
