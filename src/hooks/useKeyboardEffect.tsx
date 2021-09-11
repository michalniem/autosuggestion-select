import { useEffect } from "react";

export function useKeyboardEffect(
  keyName: string,
  handler: (event: KeyboardEvent) => void
) {
  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.key === keyName) {
        handler(event);
      }
    };

    window.addEventListener("keydown", listener);

    return () => {
      document.removeEventListener(`keydown`, listener);
    };
  }, [keyName, handler]);
}
