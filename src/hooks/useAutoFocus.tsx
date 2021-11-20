import { useEffect } from "react";

import type { RefObject } from "react";

export function useAutoFocus(ref: RefObject<HTMLInputElement>) {
  useEffect(() => {
    ref.current?.focus();
  }, [ref]);
}
