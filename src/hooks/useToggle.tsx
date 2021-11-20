import { useState, useCallback } from "react";

type Output = [boolean, (value?: boolean) => void];

export function useToggle(initialValue: boolean = false): Output {
  const [value, setValue] = useState<boolean>(initialValue);

  const toggle = useCallback((value) => {
    setValue((currentValue) =>
      typeof value === "boolean" ? value : !currentValue
    );
  }, []);

  return [value, toggle];
}
